import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Html, Lightformer, useTexture } from '@react-three/drei';
import { Bloom, EffectComposer, SSAO, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { PROG, TL } from './storeConfig.js';

// ─── STORE STAGE — scroll-built premium boutique ─────────────────────────────
// One master scroll timeline drives EVERYTHING. The room opens as a finished
// but EMPTY shell (bare floor, plain walls, ceiling) and the store assembles
// itself around the camera as you scroll:
//
//   0.10–0.22  wood floor lays itself in, board by board
//   0.22–0.38  bronze uprights rise, rails extend, ceiling frames lower
//   0.38–0.50  cabinets slide out of the walls, panels, shelving, mirror
//   0.50–0.63  bare clothing rails rise, furniture lands, dress forms stand
//   0.63–0.78  garments drop onto the rails, rack by rack
//   0.78–0.88  shelf stock, folded stacks, pieces on the forms
//   0.88–0.96  downlights, track heads, the pendant comes down — room warms
//   0.96–1.00  hotspots + the finished composition
//
// Nothing autoplays: every value is a pure function of the smoothed scroll
// progress in PROG (written by StoreHero's rAF loop), so scrolling up reverses
// the construction exactly. Tech: three + @react-three/fiber (frameloop="demand"
// — renders only while progress moves), drei for the baked local environment
// (no network) and projected product hotspots.
//
// Entrance pattern: staged objects live inside <Enter>, hidden until their
// window opens, then ease from an offset/scaled pose into rest. Direction is
// choreographed — verticals grow bottom→top, horizontals extend side→centre or
// back→front, drawers slide out of the wall, garments drop onto the rail.

// ── timeline helpers ────────────────────────────────────────────────────────
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const win = (p, a, b) => clamp01((p - a) / (b - a)); // windowed 0→1
const easeOut = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic
const smoothstep = (t) => t * t * (3 - 2 * t); // camera ease
const lerp = (a, b, t) => a + (b - a) * t;

// Stagger item i of n inside a shared window: each piece gets `durFrac` of the
// window and the starts are spread over what's left, so the last one lands
// exactly on the window's end. Pure — same input, same choreography every run.
const stag = (range, i, n, durFrac = 0.45) => {
  const [a, b] = range;
  const dur = (b - a) * durFrac;
  const travel = (b - a) - dur;
  const t0 = n > 1 ? a + (travel * i) / (n - 1) : a;
  return [t0, t0 + dur];
};

// ── room layout constants (metres) ──────────────────────────────────────────
const HALF_W = 7.1; // inner face of the side walls
const BACK_Z = -11.0; // inner face of the back wall
// Where the boards stop. Runs well past the entrance line on purpose: portrait
// phones finish on a 72° lens and look down on the ground in front of the shop,
// so ending the oak at the threshold left the bottom 40% of the phone frame as
// one blank limestone plane. Desktop's narrower lens never reaches this far.
const FRONT_Z = 6.6;
const ROOM_H = 4.6; // floor → ceiling
const RACK_L = { x: -5.55, z0: -10.0, z1: -3.6, n: 10 };
const RACK_R = { x: 5.55, z0: -9.6, z1: -4.0, n: 9 };
const TABLE_POS = [0, 0, -6.2];
const SHELF_POS = [3.6, 0, -10.5];
const MIRROR_POS = [-4.2, 1.35, -10.9]; // flush panel on the back wall
// Island table planogram: six positions on the top (relative to TABLE_POS).
// One row only — a second row would sit behind the first at this camera angle
// and all but disappear. Small z jitter keeps it from reading as a printed grid.
const TABLE_Y = 0.755; // table top surface (slab centre 0.72 + half thickness)
const TABLE_SLOTS = [
  [-1.0, -0.05],
  [-0.6, 0.1],
  [-0.2, -0.1],
  [0.2, 0.08],
  [0.6, -0.06],
  [1.0, 0.06],
];

// Two plinths where the dress forms used to stand — each carries one guest
// brand piece at the front of the room, where the camera finishes.
const PLINTHS = [
  { pos: [2.7, 0, -3.3], win: [0.54, 0.63] },
  { pos: [-2.45, 0, -2.0], win: [0.56, 0.63] },
];
const PLINTH_Y = 0.94; // pedestal top surface
const BAY_SHELVES = [0.5, 1.04, 1.58]; // shelf board heights in each bay
const BAY_PER = 7; // products per shelf level

// Vertical framework uprights, floor to ceiling, along both side walls.
// Cabinets sit BETWEEN them (in z), so nothing intersects.
const POST_Z = [-9.8, -7.4, -5.0, -2.6, -0.2];
const POST_X = 6.9; // just proud of the wall, behind the cabinets' front face
const CAB_Z = [
  [-9.6, -7.6],
  [-7.2, -5.2],
  [-4.8, -2.8],
  [-2.4, -0.4],
];

// camera pull-back: start just inside the empty room (one-point perspective,
// like standing in the doorway), finish on a wide symmetric storefront view
const CAM_A = [0.9, 1.68, 0.6];
const CAM_C = [0.6, 1.95, 4.2];
const CAM_B = [0, 2.55, 8.9];
const TGT_A = [-0.12, 1.85, -11.0];
const TGT_B = [0, 1.5, -6.2];

const rackSlots = (n, z0, z1) =>
  Array.from({ length: n }, (_, i) => (n === 1 ? (z0 + z1) / 2 : z0 + (i * (z1 - z0)) / (n - 1)));

// gradient used by the back-wall mirror (module scope — built once)
const MIRROR_TEX = (() => {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#22262e'); // dark ceiling
  g.addColorStop(0.42, '#2b303a');
  g.addColorStop(0.6, '#565b62'); // horizon
  g.addColorStop(0.78, '#9d9689'); // lit floor
  g.addColorStop(1, '#d8d1c4');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
})();

// ── Enter: an object assembling into place inside its scroll window ─────────
// d = offset at t=0 (position), s = uniform scale at t=0, sx/sy/sz = per-axis
// scale at t=0 (overrides s), r = rotation offset at t=0. Hidden before the
// window opens; `fade` ramps material opacity (and hands shadows over mid-ease)
// so nothing the camera can already see ever pops in.
// NOTE: `fade` mutates materials — only use it on groups with their OWN inline
// materials, never on a group sharing a module-scope material.
function Enter({ p, d = [0, 0, 0], s, sx, sy, sz, r = [0, 0, 0], fade = false, children }) {
  const g = useRef();
  const cache = useRef(null);
  useFrame(() => {
    const pr = g.current;
    if (!pr) return;
    const on = PROG.p >= p[0];
    if (pr.visible !== on) pr.visible = on;
    if (!on) return;
    const e = easeOut(win(PROG.p, p[0], p[1]));
    const inv = 1 - e;
    pr.position.set(d[0] * inv, d[1] * inv, d[2] * inv);
    const ax = (v) => {
      const base = v !== undefined ? v : s;
      return base !== undefined ? base + (1 - base) * e : 1;
    };
    pr.scale.set(ax(sx), ax(sy), ax(sz));
    pr.rotation.set(r[0] * inv, r[1] * inv, r[2] * inv);
    if (fade) {
      if (!cache.current) {
        const mats = [];
        const meshes = [];
        const seen = new Set();
        pr.traverse((o) => {
          if (!o.isMesh || !o.material) return;
          meshes.push(o);
          const list = Array.isArray(o.material) ? o.material : [o.material];
          list.forEach((m) => {
            if (seen.has(m)) return;
            seen.add(m);
            mats.push(m);
          });
        });
        cache.current = { mats, meshes, shadowed: meshes.filter((m) => m.castShadow) };
      }
      const op = Math.min(1, e * 3); // opaque early — then it just settles
      const { mats, shadowed } = cache.current;
      for (let i = 0; i < mats.length; i += 1) {
        const m = mats[i];
        if (!m.transparent) m.transparent = true;
        if (m.opacity !== op) m.opacity = op;
      }
      const sh = e >= 0.6;
      for (let i = 0; i < shadowed.length; i += 1) {
        if (shadowed[i].castShadow !== sh) shadowed[i].castShadow = sh;
      }
    }
  });
  return (
    <group ref={g} visible={false}>
      {children}
    </group>
  );
}

// ── camera + tone-mapping rig ───────────────────────────────────────────────
function Rig() {
  const { camera, gl, scene, size } = useThree();
  const pos = useMemo(() => new THREE.Vector3(), []);
  const tgt = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const p = PROG.p;
    const t = smoothstep(p);
    const u = 1 - t;
    // Portrait phones can't fit an 11m-wide store at any sane lens — on portrait
    // the final frame stays wide and keeps a low gaze, so the merchandised
    // centre fills the frame and the ceiling edge lands under the navbar
    // instead of leaving a band of void at the top.
    const portrait = size.width / size.height < 0.9;
    pos.set(
      u * u * CAM_A[0] + 2 * u * t * CAM_C[0] + t * t * CAM_B[0],
      u * u * CAM_A[1] + 2 * u * t * CAM_C[1] + t * t * CAM_B[1],
      u * u * CAM_A[2] + 2 * u * t * CAM_C[2] + t * t * CAM_B[2],
    );
    tgt.set(
      lerp(TGT_A[0], TGT_B[0], t),
      lerp(TGT_A[1], portrait ? 0.42 : TGT_B[1], t),
      lerp(TGT_A[2], TGT_B[2], t),
    );
    camera.position.copy(pos);
    camera.lookAt(tgt);
    // Portrait can't fit an 11m-wide store on a normal lens, and the side
    // rails — where all the hanging stock lives — sit at ±5.55m. Ending on a
    // wide 72° lens is what brings them back into frame, so phones still get
    // the CLOTHES beat instead of an empty middle distance.
    const fov = lerp(46, portrait ? 72 : 36, t);
    if (Math.abs(camera.fov - fov) > 0.01) {
      Object.assign(camera, { fov });
      camera.updateProjectionMatrix();
    }
    // exposure lifts with the final lighting beat
    Object.assign(gl, { toneMappingExposure: lerp(0.95, 1.03, win(p, 0.84, 1)) });
    // gentle haze for depth — never heavy enough to grey out the back wall
    if (scene.fog) Object.assign(scene.fog, { near: lerp(8, 16, t), far: lerp(42, 66, t) });
    // the baked environment warms up as the store fills, then again with the
    // lights — so "lights come up" actually transforms the room
    // The baked env is an omnidirectional fill: every unit of it subtracts a
    // unit of shadow contrast, so it stays low and the directional key carries
    // the room instead.
    Object.assign(scene, { environmentIntensity: lerp(0.54, 0.74, win(p, 0.6, 0.96)) });
    // QA hook: rendered-frame counter (lets tests wait for an actual frame
    // instead of guessing how long software GL takes)
    window.__frames = (window.__frames || 0) + 1;
  });
  return null;
}

// ── shared materials — module scope so the light ramp can drive them every
// frame without threading mutable props through the tree. Never passed to a
// fading <Enter> (fading mutates opacity, which would leak across the scene).
const stripMat = new THREE.MeshStandardMaterial({
  color: '#1a1b1f',
  emissive: new THREE.Color('#ffe9c4'),
  emissiveIntensity: 0,
  roughness: 0.5,
});
const headMat = new THREE.MeshStandardMaterial({
  color: '#141519',
  emissive: new THREE.Color('#ffe0b4'),
  emissiveIntensity: 0,
  roughness: 0.42,
  metalness: 0.55,
});
const downMat = new THREE.MeshStandardMaterial({
  color: '#efe9df',
  emissive: new THREE.Color('#ffe6bd'),
  emissiveIntensity: 0,
  roughness: 0.6,
});
// warm limestone subfloor — the empty room's floor, visible until the boards land
const baseMat = new THREE.MeshStandardMaterial({
  color: '#ded7c9',
  roughness: 0.72,
  metalness: 0,
  envMapIntensity: 0.55,
});
// board seams read as dark lines between the oak strips
// Plank joints: warm and light rather than a dark rule on every board. The
// hard dark seam was most of what made the floor read as printed stripes.
const seamMat = new THREE.MeshStandardMaterial({ color: '#8a7a62', roughness: 0.92 });
// three oak tones so the floor doesn't read as one flat sheet. Kept a good
// step darker than the walls: at a lighter value the planks clipped to white
// under the shopfront wash and the whole floor read as a blank sheet.
const OAK = ['#a9814f', '#9c7648', '#b48d5c'].map(
  (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.58, metalness: 0, envMapIntensity: 0.5 }),
);
const bronzeMat = new THREE.MeshStandardMaterial({
  color: '#a87a44',
  roughness: 0.3,
  metalness: 0.92,
  envMapIntensity: 1.15,
});
const wallMat = new THREE.MeshStandardMaterial({
  color: '#efe9df',
  roughness: 0.95,
  envMapIntensity: 0.28,
});
// The ceiling is seen from below and no fixture lights it until the last beat,
// so it carries its own soft bounce — a white plaster ceiling reads as a bright
// surface even in an unlit room. Without this the ceiling collapses to a dark
// band across the top of the opening frame.
const ceilMat = new THREE.MeshStandardMaterial({
  color: '#f7f4ee',
  roughness: 0.97,
  emissive: new THREE.Color('#cdc5b4'),
  emissiveIntensity: 0.72,
});
const cabMat = new THREE.MeshStandardMaterial({ color: '#f2eee6', roughness: 0.8 });
const cabGapMat = new THREE.MeshStandardMaterial({ color: '#d6cfc2', roughness: 0.9 });

// ── lights: base showroom light + the late "lights come up" beat ────────────
function Lighting({ shadows }) {
  const { gl } = useThree();
  const amb = useRef();
  const key = useRef();
  const spotA = useRef();
  const spotB = useRef();
  const pend = useRef();
  const tgtA = useMemo(() => new THREE.Object3D(), []);
  const tgtB = useMemo(() => new THREE.Object3D(), []);
  const keyTgt = useMemo(() => new THREE.Object3D(), []);
  const sunTgt = useMemo(() => new THREE.Object3D(), []);
  const sun = useRef();
  useEffect(() => {
    // R3F assigns shadow-camera-* straight onto the ortho camera without
    // re-projecting it, so the frustum would silently stay on three's default
    // ±5 box and most of the room would fall outside the shadow map.
    const l = sun.current;
    if (l) l.shadow.camera.updateProjectionMatrix();
    window.__shadow = {
      shadowMap: gl.shadowMap.enabled,
      cast: !!l?.castShadow,
      extents: l ? [l.shadow.camera.left, l.shadow.camera.right] : null,
      far: l?.shadow.camera.far ?? null,
    };
  }, [gl, shadows]);
  useFrame(() => {
    const p = PROG.p;
    const lit = win(p, TL.light[0], TL.light[1]); // 0.88 → 0.96, the fixture beat
    // The reference showroom is lit soft and warm: almost no hard shadow bands,
    // detail alive inside every shadow. That means a gentler directional and a
    // much fuller ambient/environment fill than a daylight exterior would take
    // — the sun still draws the shapes, it just no longer crushes everything
    // it isn't touching.
    if (amb.current) amb.current.intensity = 0.21 + 0.15 * lit;
    // soft daylight through the open shopfront — present from 0% so the empty
    // room already reads as premium, then eases back as the fixtures take over.
    // Kept below the old value so the floor stops pooling into a blown white
    // hotspot in the middle of the room.
    if (key.current) key.current.intensity = 180 * (1 - 0.3 * lit);
    if (sun.current) sun.current.intensity = 2.3 * (1 - 0.3 * lit);
    if (spotA.current) spotA.current.intensity = 480 * lit;
    if (spotB.current) spotB.current.intensity = 380 * lit;
    if (pend.current) pend.current.intensity = 34 * lit;
    stripMat.emissiveIntensity = 2.4 * lit;
    headMat.emissiveIntensity = 2.1 * win(p, 0.9, 0.96);
    downMat.emissiveIntensity = 2.2 * win(p, 0.9, 0.96);
    // the subfloor gains a little sheen as the boards go down
    baseMat.envMapIntensity = lerp(0.55, 0.7, win(p, TL.floor[0], TL.floor[1]));
  });
  return (
    <>
      <ambientLight ref={amb} intensity={0.26} color="#ffe9d1" />
      {/* Shape light. A directional key rakes in from high front-right so
          every built piece throws a shadow the camera can actually see — a
          light sat in line with the camera hides its own shadows behind the
          objects, which is why the build read as flat stickers. */}
      <primitive object={sunTgt} position={[-2, 0, -4]} />
      <directionalLight
        ref={sun}
        position={[13, 14, 6]}
        target={sunTgt}
        intensity={2.6}
        color="#ffe4c0"
        castShadow={shadows}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-17}
        shadow-camera-right={17}
        shadow-camera-top={17}
        shadow-camera-bottom={-17}
        shadow-camera-near={1}
        shadow-camera-far={64}
        shadow-bias={-0.0004}
        shadow-normalBias={0.035}
      />
      {/* daylight wash from the open storefront — no shadow of its own, it
          exists to pool warm light across the floor and give the room depth */}
      <primitive object={keyTgt} position={[0, 0.6, -6.6]} />
      <spotLight
        ref={key}
        position={[0.4, 4.4, 7.0]}
        target={keyTgt}
        angle={1.0}
        penumbra={0.95}
        decay={2}
        distance={40}
        intensity={200}
        color="#ffe9cf"
      />
      <primitive object={tgtA} position={[0, 0, -6.2]} />
      <spotLight
        ref={spotA}
        position={[0, 4.45, -6.2]}
        target={tgtA}
        angle={0.55}
        penumbra={0.6}
        decay={2}
        distance={26}
        intensity={0}
        color="#ffe8cc"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-near={0.6}
        shadow-camera-far={16}
      />
      <primitive object={tgtB} position={[2.4, 0, -2.9]} />
      <spotLight
        ref={spotB}
        position={[2.4, 4.45, -2.9]}
        target={tgtB}
        angle={0.58}
        penumbra={0.65}
        decay={2}
        distance={24}
        intensity={0}
        color="#ffeeda"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-near={0.6}
        shadow-camera-far={16}
      />
      {/* the pendant's own glow, once it has come down */}
      <pointLight ref={pend} position={[0, 3.3, -6.2]} intensity={0} distance={13} decay={2} color="#ffdca8" />
    </>
  );
}

// ── the brand sign (canvas texture, painted-look unlit graphic) ─────────────
function useSignTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 256;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 1024, 256);
    ctx.fillStyle = '#26221c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    try {
      ctx.letterSpacing = '30px';
    } catch {
      /* engines without letter-spacing draw untracked */
    }
    ctx.font = '900 156px "Helvetica Neue", Helvetica, Arial, sans-serif';
    ctx.fillText('OATARA', 524, 138);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
}

// ── soft contact pool under anything standing on the floor ──────────────────
// The directional throws its shadow away from the storefront, so without this
// every plinth and shelf unit read as floating a centimetre above the boards.
// One shared radial gradient, drawn once, reused by every decal.
let _aoTex = null;
function aoTexture() {
  if (_aoTex) return _aoTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(0,0,0,0.62)');
  grd.addColorStop(0.45, 'rgba(0,0,0,0.34)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  _aoTex = new THREE.CanvasTexture(c);
  _aoTex.colorSpace = THREE.SRGBColorSpace;
  return _aoTex;
}

function AO({ pos, w, d, o = 1 }) {
  return (
    <mesh position={[pos[0], 0.014, pos[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[w, d]} />
      <meshBasicMaterial
        map={aoTexture()}
        transparent
        opacity={o}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

// ── one product standing on a surface ──────────────────────────────────────
// The catalogue cutouts are already photographed in three-quarter view with
// their own highlights and contact shadow, so a single aspect-correct plane
// reads as a solid object — and unlike a box, the transparent surround stays
// transparent instead of showing the pack's interior.
function PackShot({ tex, x, y, z, face, maxW = 0.34, maxH = 0.46, start, span, drop = 0.4 }) {
  const iw = tex && tex.image ? tex.image.width : 512;
  const ih = tex && tex.image ? tex.image.height : 560;
  let h = maxH;
  let w = (h * iw) / ih;
  if (w > maxW) {
    h *= maxW / w;
    w = maxW;
  }
  return (
    <Enter p={[start, start + span]} d={[0, drop, 0]} s={0.72} r={[0, 0, 0.045]} fade>
      <group position={[x, y, z]} rotation={[0, face, 0]}>
        <mesh position={[0, h / 2, 0]} castShadow>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial
            map={tex}
            transparent
            alphaTest={0.3}
            roughness={0.66}
            metalness={0}
            envMapIntensity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Enter>
  );
}

// ── a shelving bay: bronze uprights, three oak shelves, then the stock lands ─
// Products are yawed to face the storefront rather than the side wall. A plane
// square to the wall would be seen almost edge-on from where the camera
// finishes, and every carton would collapse into a sliver.
function ShelfBay({ side, spec, items, texs, enter, stockRange, offset = 0 }) {
  const x = side < 0 ? RACK_L.x : RACK_R.x;
  const mid = (spec.z0 + spec.z1) / 2;
  const len = spec.z1 - spec.z0;
  const face = Math.atan2(-x, CAM_B[2] - mid);
  const zs = rackSlots(BAY_PER, spec.z0 + 0.42, spec.z1 - 0.42);
  const metal = '#8d6337'; // bronze, in step with the wall framework
  const slots = [];
  BAY_SHELVES.forEach((sy, si) => {
    zs.forEach((z, zi) => {
      const item = items.length ? items[(si * BAY_PER + zi + offset) % items.length] : null;
      if (item) slots.push({ item, key: `${si}-${zi}`, y: sy + 0.022, z });
    });
  });
  const n = Math.max(1, slots.length);
  return (
    <group>
      <AO pos={[x, 0, mid]} w={1.0} d={len + 0.5} o={0.85} />
      <Enter p={enter} sy={0}>
        {[spec.z0, spec.z1].map((z) => (
          <group key={z}>
            <mesh position={[x, 0.03, z]} castShadow>
              <boxGeometry args={[0.52, 0.06, 0.22]} />
              <meshStandardMaterial color={metal} metalness={0.3} roughness={0.45} envMapIntensity={1.1} />
            </mesh>
            <mesh position={[x, 1.04, z]} castShadow>
              <cylinderGeometry args={[0.03, 0.03, 2.04, 14]} />
              <meshStandardMaterial color={metal} metalness={0.35} roughness={0.4} envMapIntensity={1.1} />
            </mesh>
            <mesh position={[x, 2.07, z]} castShadow>
              <boxGeometry args={[0.5, 0.05, 0.16]} />
              <meshStandardMaterial color="#a8783f" metalness={0.85} roughness={0.28} envMapIntensity={1.1} />
            </mesh>
          </group>
        ))}
        {/* cross rail across the top, keeping the bay visually tied together */}
        <mesh position={[x, 2.07, mid]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.024, len + 0.2, 14]} />
          <meshStandardMaterial color="#a8783f" metalness={0.85} roughness={0.26} envMapIntensity={1.1} />
        </mesh>
        {BAY_SHELVES.map((sy) => (
          <mesh key={sy} position={[x, sy, mid]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.044, len]} />
            <meshStandardMaterial color="#c3a177" roughness={0.55} envMapIntensity={0.5} />
          </mesh>
        ))}
      </Enter>
      {slots.map((s, i) => {
        const w = stag(stockRange, i, n, 0.42);
        return (
          <PackShot
            key={s.key}
            tex={texs[s.item.id]}
            x={x}
            y={s.y}
            z={s.z}
            face={face}
            start={w[0]}
            span={w[1] - w[0]}
          />
        );
      })}
    </group>
  );
}

// ── display plinth — a pedestal carrying one guest-brand hero piece ─────────
// Takes the two spots the dress forms held, so the front of the room keeps its
// vertical anchors, but what stands on them is now real, shoppable stock.
function Plinth({ cfg, item, tex, start, span }) {
  if (!item) return null;
  const face = Math.atan2(-cfg.pos[0], CAM_B[2] - cfg.pos[2]);
  return (
    <group position={cfg.pos}>
      <AO pos={[0, 0, 0]} w={1.15} d={1.15} />
      <Enter p={cfg.win} sy={0}>
        <mesh position={[0, (PLINTH_Y - 0.04) / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.48, PLINTH_Y - 0.04, 0.48]} />
          <meshStandardMaterial color="#ece6da" roughness={0.72} envMapIntensity={0.5} />
        </mesh>
        <mesh position={[0, PLINTH_Y - 0.02, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.56, 0.04, 0.56]} />
          <meshStandardMaterial color="#cbbfa8" roughness={0.5} envMapIntensity={0.6} />
        </mesh>
      </Enter>
      <PackShot
        tex={tex}
        x={0}
        y={PLINTH_Y}
        z={0}
        face={face}
        maxW={0.4}
        maxH={0.54}
        start={start}
        span={span}
        drop={0.5}
      />
    </group>
  );
}

// ── hotspot overlays (projected HTML, appear in the final beat) ─────────────
function Hotspots({ entries, currency, onOpen }) {
  const wraps = useRef([]);
  useFrame(() => {
    const o = win(PROG.p, TL.final[0], 0.995);
    const list = wraps.current;
    for (let i = 0; i < list.length; i += 1) {
      const el = list[i];
      if (!el) continue;
      const op = o.toFixed(3);
      if (el.style.opacity !== op) el.style.opacity = op;
      const pe = o > 0.5 ? 'auto' : 'none';
      if (el.style.pointerEvents !== pe) el.style.pointerEvents = pe;
    }
  });
  return entries.map((e) => (
    <Html key={e.id} position={e.pos} zIndexRange={[3, 1]}>
      <div
        className="store-hot"
        ref={(el) => {
          wraps.current[e.slot] = el;
        }}
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <button
          type="button"
          className="store-hot__dot"
          aria-label={`View ${e.name}`}
          onClick={() => onOpen(e.id)}
        >
          <span className="store-hot__ring" />
        </button>
        <span className="store-hot__label">
          <b>{e.name}</b>
          <i>
            {currency}
            {(Number(e.price) || 0).toFixed(2)}
          </i>
        </span>
      </div>
    </Html>
  ));
}

// ── SHELL: the empty room. Floor base, walls, ceiling — present at 0%, so the
// very first frame is a finished but unfurnished space, never a black void. ──
function Shell({ signTex }) {
  return (
    <group>
      {/* limestone subfloor — the boards will lay over this */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <primitive object={baseMat} attach="material" />
      </mesh>
      {/* front lip — caps the boards where the oak gives way to stone */}
      <mesh position={[0, 0.035, FRONT_Z]} receiveShadow>
        <boxGeometry args={[14.2, 0.07, 0.24]} />
        <meshStandardMaterial color="#8f897d" roughness={0.7} />
      </mesh>

      {/* back wall + skirting */}
      <group position={[0, ROOM_H / 2, BACK_Z - 0.11]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[14.44, ROOM_H, 0.22]} />
          <primitive object={wallMat} attach="material" />
        </mesh>
        <mesh position={[0, -ROOM_H / 2 + 0.06, 0.14]}>
          <boxGeometry args={[14.44, 0.12, 0.04]} />
          <meshStandardMaterial color="#2c2823" roughness={0.7} />
        </mesh>
      </group>

      {/* back-wall shadow-gap reveals — the room already has architecture at
          0%, so the opening frame is a finished space rather than a blank slab */}
      {[-6, -4, -2, 2, 4, 6].map((x) => (
        <mesh key={`rv${x}`} position={[x, ROOM_H / 2 + 0.06, BACK_Z + 0.022]} receiveShadow>
          <boxGeometry args={[0.05, ROOM_H - 0.36, 0.045]} />
          <meshStandardMaterial color="#3a352d" roughness={0.9} />
        </mesh>
      ))}

      {/* side walls + skirting */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * (HALF_W + 0.11), ROOM_H / 2, -4.5]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.22, ROOM_H, 13.5]} />
            <primitive object={wallMat} attach="material" />
          </mesh>
          <mesh position={[-s * 0.13, -ROOM_H / 2 + 0.06, 0]}>
            <boxGeometry args={[0.04, 0.12, 13.5]} />
            <meshStandardMaterial color="#2c2823" roughness={0.7} />
          </mesh>
          {/* continuous datum line, kept flush with the back-wall module */}
          <mesh position={[-s * 0.12, ROOM_H / 2 - 1.0, 0]}>
            <boxGeometry args={[0.04, 0.05, 13.5]} />
            <meshStandardMaterial color="#4f4739" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Ceiling slab. It runs past the shop threshold to z≈11 — a real
          soffit does, and portrait phones finish the journey on a wide lens
          that looks up over the threshold; without the run-out they would see
          raw background above it. Desktop's narrow lens never reaches the
          overhang, so this is invisible there. */}
      <mesh position={[0, ROOM_H + 0.08, -0.15]} receiveShadow>
        <boxGeometry args={[14.5, 0.16, 22.3]} />
        <primitive object={ceilMat} attach="material" />
      </mesh>
      {/* perimeter shadow gap — reads as a floating ceiling */}
      <mesh position={[0, ROOM_H - 0.03, BACK_Z + 0.1]}>
        <boxGeometry args={[14.4, 0.06, 0.16]} />
        <meshStandardMaterial color="#33302a" roughness={0.9} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={`cg${s}`} position={[s * (HALF_W - 0.08), ROOM_H - 0.03, -4.5]}>
          <boxGeometry args={[0.16, 0.06, 13.4]} />
          <meshStandardMaterial color="#33302a" roughness={0.9} />
        </mesh>
      ))}

      {/* the sign waits until the back wall is dressed */}
      <Enter p={[0.44, 0.5]} fade>
        {/* sits proud of the back-wall panels (they reach +0.095), so the
            lettering is never buried behind them once the wall is dressed */}
        <mesh position={[0, 3.3, BACK_Z + 0.16]}>
          <planeGeometry args={[3.4, 0.85]} />
          <meshBasicMaterial map={signTex} transparent toneMapped={false} />
        </mesh>
      </Enter>
    </group>
  );
}

// ── STAGE 1: the wood finish, board by board, extending from the back wall
// toward the camera. Each board grows out of the back wall (scale-z anchored
// there) so the floor reads as being LAID, not faded in. ────────────────────
function FloorBoards() {
  const N = 44; // ~0.32m planks — the 18-board version read as giant slabs
  const depth = FRONT_Z - BACK_Z;
  const boards = useMemo(() => {
    const slot = (HALF_W * 2) / N;
    return Array.from({ length: N }, (_, i) => ({
      x: -HALF_W + slot * (i + 0.5),
      slot,
      w: stag(TL.floor, i, N, 0.5),
      tone: i % 3,
    }));
  }, []);
  return (
    <group>
      {boards.map((b, i) => (
        // anchored on the back wall; scaling z grows it forward toward camera
        <group key={i} position={[b.x, 0, BACK_Z]}>
          <Enter sz={0} p={b.w}>
            {/* dark seam bed, then the oak board sitting proud of it */}
            <mesh position={[0, 0.015, depth / 2]} receiveShadow>
              <boxGeometry args={[b.slot - 0.012, 0.03, depth]} />
              <primitive object={seamMat} attach="material" />
            </mesh>
            <mesh position={[0, 0.05, depth / 2]} receiveShadow>
              <boxGeometry args={[b.slot - 0.05, 0.042, depth]} />
              <primitive object={OAK[b.tone]} attach="material" />
            </mesh>
          </Enter>
        </group>
      ))}
    </group>
  );
}

// ── STAGE 2: architectural framework ────────────────────────────────────────
// verticals grow bottom→top out of the floor; rails extend back→front out of
// the back wall; ceiling frames slide in from the left. All coordinated.
function Framework() {
  const railLen = 11.4;
  // one shared counter for the whole stage: 10 uprights + 4 rails
  // + 4 ceiling frames + 1 back beam, so every window lands inside TL.frame
  const nPost = POST_Z.length * 2;
  const nTot = nPost + 9;
  return (
    <group>
      {/* uprights along both walls, staggered left bank then right bank */}
      {[-1, 1].map((sx) =>
        POST_Z.map((z, i) => {
          const idx = (sx < 0 ? 0 : POST_Z.length) + i;
          return (
            <group key={`p${sx}${z}`} position={[sx * POST_X, 0, z]}>
              <Enter p={stag(TL.frame, idx, nTot, 0.42)} sy={0}>
                <mesh position={[0, ROOM_H / 2, 0]} castShadow>
                  <boxGeometry args={[0.075, ROOM_H, 0.075]} />
                  <primitive object={bronzeMat} attach="material" />
                </mesh>
              </Enter>
            </group>
          );
        }),
      )}

      {/* two long rails per side, growing out of the back wall toward camera */}
      {[-1, 1].map((sx) =>
        [4.3, 2.75].map((y, j) => {
          const idx = nPost + (sx > 0 ? 2 : 0) + j;
          return (
            <group key={`r${sx}${y}`} position={[sx * POST_X, y, BACK_Z - 0.3]}>
              <Enter p={stag(TL.frame, idx, nTot, 0.5)} sz={0}>
                <mesh position={[0, 0, railLen / 2]} castShadow>
                  <boxGeometry args={[0.07, 0.07, railLen]} />
                  <primitive object={bronzeMat} attach="material" />
                </mesh>
              </Enter>
            </group>
          );
        }),
      )}

      {/* ceiling frames slide in from the left */}
      {[-8.6, -5.6, -2.6, 0.4].map((z, i) => (
        <group key={`c${z}`} position={[-6.8, ROOM_H - 0.08, z]}>
          <Enter p={stag(TL.frame, nPost + 4 + i, nTot, 0.5)} sx={0}>
            <mesh position={[6.7, 0, 0]} castShadow>
              <boxGeometry args={[13.4, 0.075, 0.075]} />
              <primitive object={bronzeMat} attach="material" />
            </mesh>
          </Enter>
        </group>
      ))}

      {/* back-wall beam, extending side → centre */}
      <group position={[-6.7, 3.7, BACK_Z + 0.16]}>
        <Enter p={stag(TL.frame, nTot - 1, nTot, 0.6)} sx={0}>
          <mesh position={[6.7, 0, 0]} castShadow>
            <boxGeometry args={[13.4, 0.08, 0.07]} />
            <primitive object={bronzeMat} attach="material" />
          </mesh>
        </Enter>
      </group>
    </group>
  );
}

// ── STAGE 3: storage — cabinets slide out of the walls (drawer fronts settle
// in behind them), back-wall panels arrive from the left, shelving + mirror. ─
function Storage() {
  const panelH = 3.4;
  const nCab = CAB_Z.length * 2;
  // one shared counter: 8 drawer cabinets + 5 back-wall panels
  // + the shelf unit + the mirror — all inside TL.storage
  const nTot = nCab + 7;
  return (
    <group>
      {/* side-wall drawer cabinets, staggered; fronts close a beat later */}
      {[-1, 1].map((sx) =>
        CAB_Z.map(([z0, z1], i) => {
          const zc = (z0 + z1) / 2;
          const zl = z1 - z0;
          const idx = i * 2 + (sx > 0 ? 1 : 0);
          const w = stag(TL.storage, idx, nTot, 0.44);
          const fw = [w[1] - 0.03, w[1] + 0.035];
          const out = sx * 0.34; // drawer faces start pulled toward the room
          return (
            <group key={`cab${sx}${z0}`} position={[sx * 6.75, 0, zc]}>
              <Enter p={w} d={[sx * 1.1, 0, 0]}>
                <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
                  <boxGeometry args={[0.58, 0.9, zl]} />
                  <primitive object={cabMat} attach="material" />
                </mesh>
                {/* shadow gap, so the unit reads as drawers not a solid block */}
                <mesh position={[-sx * 0.3, 0.45, 0]}>
                  <boxGeometry args={[0.02, 0.03, zl - 0.12]} />
                  <primitive object={cabGapMat} attach="material" />
                </mesh>
              </Enter>
              <Enter p={fw} d={[out, 0, 0]}>
                <mesh position={[-sx * 0.3, 0.225, 0]} castShadow>
                  <boxGeometry args={[0.03, 0.36, zl - 0.1]} />
                  <primitive object={cabMat} attach="material" />
                </mesh>
                <mesh position={[-sx * 0.3, 0.675, 0]} castShadow>
                  <boxGeometry args={[0.03, 0.36, zl - 0.1]} />
                  <primitive object={cabMat} attach="material" />
                </mesh>
                {/* slim brass pull */}
                <mesh position={[-sx * 0.34, 0.675, 0]}>
                  <boxGeometry args={[0.03, 0.022, 0.34]} />
                  <primitive object={bronzeMat} attach="material" />
                </mesh>
              </Enter>
            </group>
          );
        }),
      )}

      {/* back-wall panels, sliding out from behind the left wall */}
      {[-5.6, -2.8, 0, 2.8, 5.6].map((x, i) => (
        <group key={`pan${x}`} position={[x, panelH / 2 + 0.2, BACK_Z + 0.06]}>
          <Enter p={stag(TL.storage, nCab + i, nTot, 0.5)} d={[-9, 0, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[2.6, panelH, 0.07]} />
              <meshStandardMaterial color="#e6dfd3" roughness={0.92} envMapIntensity={0.3} />
            </mesh>
          </Enter>
        </group>
      ))}

      {/* back shelf unit — arrives with the storage beat, stocked later */}
      <Enter p={stag(TL.storage, nCab + 5, nTot, 0.6)} d={[0, 2.4, 0]} fade>
        <group position={SHELF_POS}>
          <mesh position={[-1.36, 1.0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 2.0, 0.42]} />
            <meshStandardMaterial color="#f0ede6" roughness={0.85} />
          </mesh>
          <mesh position={[1.36, 1.0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 2.0, 0.42]} />
            <meshStandardMaterial color="#f0ede6" roughness={0.85} />
          </mesh>
          {[0.34, 0.98, 1.62].map((y) => (
            <mesh key={y} position={[0, y, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.79, 0.055, 0.42]} />
              <meshStandardMaterial color="#f0ede6" roughness={0.85} />
            </mesh>
          ))}
        </group>
      </Enter>

      {/* full-length mirror, wiping up into place */}
      <Enter p={stag(TL.storage, nCab + 6, nTot, 0.55)} d={[0, -0.9, 0]} fade>
        <group position={MIRROR_POS}>
          <mesh>
            <boxGeometry args={[1.7, 2.7, 0.06]} />
            <meshStandardMaterial color="#1c1e22" roughness={0.5} metalness={0.4} envMapIntensity={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <boxGeometry args={[1.56, 2.56, 0.02]} />
            {/* emissiveMap carries the gradient so the panel always reads as a
                mirror (lit floor at the bottom, dark room at the top) even when
                the baked env has no energy in the reflected directions */}
            <meshStandardMaterial
              map={MIRROR_TEX}
              emissive="#ffffff"
              emissiveMap={MIRROR_TEX}
              emissiveIntensity={0.34}
              metalness={0.2}
              roughness={0.3}
              envMapIntensity={1.4}
            />
          </mesh>
        </group>
      </Enter>
    </group>
  );
}

// ── STAGE 4: bare rails rise out of the floor, furniture lands, forms stand ─
function RailsAndFurniture() {
  return (
    <group>
      {/* rug unfurls under the centre table */}
      <Enter p={stag(TL.rails, 0, 1, 0.55)} d={[0, 0.35, 0]} s={0.7} fade>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[TABLE_POS[0], 0.1, TABLE_POS[2]]} receiveShadow>
          <planeGeometry args={[4.8, 3.2]} />
          <meshStandardMaterial color="#4a4640" roughness={0.95} />
        </mesh>
      </Enter>

      {/* centre table drops in */}
      <Enter p={stag(TL.rails, 1, 3, 0.5)} d={[0, 2.6, 0]} fade>
        <group position={TABLE_POS}>
          <AO pos={[0, 0, 0]} w={3.5} d={2.1} />
          <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 0.07, 1.2]} />
            <meshStandardMaterial color="#b3936b" roughness={0.55} envMapIntensity={0.5} />
          </mesh>
          <mesh position={[-1.05, 0.36, 0]} castShadow>
            <boxGeometry args={[0.09, 0.72, 1.05]} />
            <meshStandardMaterial color="#a98a63" roughness={0.6} />
          </mesh>
          <mesh position={[1.05, 0.36, 0]} castShadow>
            <boxGeometry args={[0.09, 0.72, 1.05]} />
            <meshStandardMaterial color="#a98a63" roughness={0.6} />
          </mesh>
        </group>
      </Enter>

      {/* low bench at the back, arrives with the furniture beat */}
      <Enter p={stag(TL.rails, 2, 3, 0.5)} d={[0, 1.9, 0]} fade>
        <group position={[-2.2, 0, -9.6]}>
          <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.9, 0.12, 0.7]} />
            <meshStandardMaterial color="#c9a173" roughness={0.6} envMapIntensity={0.5} />
          </mesh>
          {[-0.8, 0.8].map((x) => (
            <mesh key={x} position={[x, 0.19, 0]} castShadow>
              <boxGeometry args={[0.1, 0.38, 0.6]} />
              <meshStandardMaterial color="#2a2724" roughness={0.6} />
            </mesh>
          ))}
        </group>
      </Enter>
    </group>
  );
}

// ── wall shelving on the back wall, running under the sign ──────────────────
// Three tiers across five metres. The reference showroom dresses every wall,
// and this was the last big blank surface in the wide shot — five metres of
// bare plaster behind the island is most of what made it read as a set.
const WALL = { x0: -2.7, x1: 2.5, z: BACK_Z + 0.17, ys: [0.62, 1.34, 2.06] };
const WALL_PER = 6;

function WallShelves({ items, texs, range }) {
  const len = WALL.x1 - WALL.x0;
  const mid = (WALL.x0 + WALL.x1) / 2;
  const xs = Array.from(
    { length: WALL_PER },
    (_, i) => WALL.x0 + 0.46 + (i * (len - 0.92)) / (WALL_PER - 1),
  );
  const slots = [];
  WALL.ys.forEach((sy, si) => {
    xs.forEach((x, xi) => {
      const item = items.length ? items[(si * WALL_PER + xi) % items.length] : null;
      if (item) slots.push({ item, key: `${si}-${xi}`, y: sy + 0.03, x });
    });
  });
  // square to the storefront: this wall faces the camera head-on, so no yaw
  const face = Math.atan2(0, CAM_B[2] - WALL.z);
  const n = Math.max(1, slots.length);
  return (
    <group>
      <Enter p={[0.4, 0.47]} sy={0}>
        {WALL.ys.map((sy) => (
          <mesh key={sy} position={[mid, sy, WALL.z]} castShadow receiveShadow>
            <boxGeometry args={[len, 0.055, 0.34]} />
            <meshStandardMaterial color="#c3a177" roughness={0.55} envMapIntensity={0.5} />
          </mesh>
        ))}
        {/* bronze standards carrying the shelves */}
        {[WALL.x0 + 0.06, mid, WALL.x1 - 0.06].map((x) => (
          <mesh key={x} position={[x, 1.1, WALL.z + 0.1]} castShadow>
            <boxGeometry args={[0.05, 2.2, 0.05]} />
            <meshStandardMaterial color="#8d6337" metalness={0.35} roughness={0.4} envMapIntensity={1.1} />
          </mesh>
        ))}
      </Enter>
      {slots.map((s, i) => {
        const w = stag(range, i, n, 0.42);
        return (
          <PackShot
            key={s.key}
            tex={texs[s.item.id]}
            x={s.x}
            y={s.y}
            z={WALL.z}
            face={face}
            maxW={0.36}
            maxH={0.5}
            start={w[0]}
            span={w[1] - w[0]}
          />
        );
      })}
    </group>
  );
}

// ── STAGE 6: goods — the island table planogram + the back-wall shelf ───────
function Goods({ staged, texs }) {
  const tableItems = staged.table || [];
  const shelfItems = staged.shelf || [];
  const n = Math.max(1, tableItems.length + shelfItems.length);
  const shelfYs = [0.34, 0.98, 1.62];
  return (
    <group>
      {/* island table — one row, each pack angled to the storefront */}
      {tableItems.map((item, i) => {
        const slot = TABLE_SLOTS[i % TABLE_SLOTS.length];
        const wx = TABLE_POS[0] + slot[0];
        const wz = TABLE_POS[2] + slot[1];
        const w = stag(TL.goods, i, n, 0.45);
        return (
          <PackShot
            key={item.id}
            tex={texs[item.id]}
            x={wx}
            y={TABLE_Y}
            z={wz}
            face={Math.atan2(-wx, CAM_B[2] - wz)}
            maxW={0.32}
            maxH={0.44}
            start={w[0]}
            span={w[1] - w[0]}
          />
        );
      })}

      {/* back-wall shelf unit, square on to the storefront */}
      {shelfItems.map((item, j) => {
        const sy = shelfYs[j % shelfYs.length];
        const w = stag(TL.goods, tableItems.length + j, n, 0.45);
        return (
          <PackShot
            key={item.id}
            tex={texs[item.id]}
            x={SHELF_POS[0] - 0.8 + j * 0.4}
            y={SHELF_POS[1] + sy + 0.0275}
            z={SHELF_POS[2] + 0.06}
            face={0}
            maxW={0.4}
            maxH={0.5}
            start={w[0]}
            span={w[1] - w[0]}
          />
        );
      })}
    </group>
  );
}

// ── STAGE 7: lighting fixtures — ceiling downlights, track rails + heads,
// and the pendant, which descends into place as the room warms up. ──────────
function Fixtures() {
  const down = useMemo(
    () =>
      [-4.5, -1.5, 1.5, 4.5].flatMap((x, xi) =>
        [-9, -6, -3, 0].map((z, zi) => ({
          x,
          z,
          w: stag([0.88, 0.925], xi * 4 + zi, 16, 0.55),
        })),
      ),
    [],
  );
  return (
    <group>
      {/* recessed downlights, popping in across the first half of the beat */}
      {down.map((d, i) => (
        <group key={i} position={[d.x, ROOM_H - 0.02, d.z]}>
          <Enter p={d.w} s={0.2}>
            <mesh>
              <cylinderGeometry args={[0.14, 0.16, 0.05, 18]} />
              <primitive object={downMat} attach="material" />
            </mesh>
          </Enter>
        </group>
      ))}

      {/* track rails lower out of the ceiling, then the heads light up */}
      {[-1.5, 1.5].map((x, ti) => (
        <group key={x} position={[x, ROOM_H - 0.1, -4.6]}>
          <Enter p={stag([0.89, 0.935], ti, 2, 0.6)} d={[0, 0.5, 0]}>
            <mesh>
              <boxGeometry args={[0.06, 0.05, 10]} />
              <primitive object={stripMat} attach="material" />
            </mesh>
          </Enter>
        </group>
      ))}
      {[-8, -5, -2].map((z, hi) =>
        [-1.5, 1.5].map((x, xi) => (
          <group key={`${x}${z}`} position={[x, ROOM_H - 0.2, z]}>
            <Enter p={stag([0.9, 0.945], hi * 2 + xi, 6, 0.5)} d={[0, 0.4, 0]} s={0.3}>
              <mesh rotation={[0.18, 0, x < 0 ? 0.35 : -0.35]}>
                <cylinderGeometry args={[0.05, 0.055, 0.14, 14]} />
                <primitive object={headMat} attach="material" />
              </mesh>
            </Enter>
          </group>
        )),
      )}

      {/* the pendant descends over the centre table — the final flourish */}
      <group position={[0, 0, -6.2]}>
        <Enter p={[0.91, 0.96]} d={[0, 1.5, 0]} fade>
          <mesh position={[0, 4.5, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 1.1, 8]} />
            <meshStandardMaterial color="#8a6a3f" metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh position={[0, 3.66, 0]} castShadow>
            <coneGeometry args={[0.52, 0.4, 28, 1, true]} />
            <meshStandardMaterial
              color="#c9973f"
              metalness={0.85}
              roughness={0.3}
              side={THREE.DoubleSide}
              envMapIntensity={1.3}
            />
          </mesh>
          <mesh position={[0, 3.5, 0]}>
            <sphereGeometry args={[0.15, 18, 14]} />
            <meshStandardMaterial
              color="#fff1d4"
              emissive="#ffe0a8"
              emissiveIntensity={3.4}
              toneMapped={false}
            />
          </mesh>
        </Enter>
      </group>
    </group>
  );
}

// ── the room + everything in it (suspends on textures, then signals ready) ──
function Scene({ staged, currency, onOpen, onReady, shadows }) {
  // textures: every staged cutout, loaded once, keyed by product id
  const all = useMemo(
    () => [
      ...(staged.bay || []),
      ...(staged.shelf || []),
      ...(staged.table || []),
      ...(staged.plinth || []),
    ],
    [staged],
  );
  const urls = useMemo(() => Array.from(new Set(all.map((s) => s.tex))), [all]);
  const loaded = useTexture(urls);
  const texs = useMemo(() => {
    const byUrl = {};
    urls.forEach((u, i) => {
      byUrl[u] = loaded[i];
    });
    const byId = {};
    all.forEach((s) => {
      const t = byUrl[s.tex];
      if (t) {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 4;
        t.generateMipmaps = true;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        byId[s.id] = t;
      }
    });
    return byId;
  }, [urls, loaded, all]);

  // veil lifts on the first frame after the whole set mounted
  const readySent = useRef(false);
  useFrame(() => {
    if (!readySent.current) {
      readySent.current = true;
      onReady();
    }
  });

  const signTex = useSignTexture();

  // hotspot entries pinned to real merchandise — three island-table pieces and
  // both plinths (a pin on all six table packs would just be a cluster)
  const hotspots = useMemo(() => {
    const out = [];
    const add = (item, pos) => {
      if (item) out.push({ id: item.id, name: item.name, price: item.price, pos, slot: out.length });
    };
    const table = staged.table || [];
    [0, 2, 4].forEach((i) => {
      const item = table[i];
      const slot = TABLE_SLOTS[i % TABLE_SLOTS.length];
      if (!item || !slot) return;
      add(item, [TABLE_POS[0] + slot[0], TABLE_Y + 0.3, TABLE_POS[2] + slot[1] + 0.14]);
    });
    (staged.plinth || []).forEach((item, i) => {
      const c = PLINTHS[i];
      if (!c) return;
      add(item, [c.pos[0], PLINTH_Y + 0.36, c.pos[2] + 0.12]);
    });
    return out;
  }, [staged]);

  return (
    <>
      <Lighting shadows={shadows} />
      <Shell signTex={signTex} />
      <FloorBoards />
      <Framework />
      <Storage />
      <RailsAndFurniture />

      {/* ── BAYS — bronze standards and oak shelves rise, then stock lands ── */}
      <ShelfBay
        side={-1}
        spec={RACK_L}
        items={staged.bay || []}
        texs={texs}
        enter={[0.5, 0.575]}
        stockRange={[TL.clothes[0], 0.715]}
        offset={0}
      />
      <ShelfBay
        side={1}
        spec={RACK_R}
        items={staged.bay || []}
        texs={texs}
        enter={[0.52, 0.6]}
        stockRange={[0.705, TL.clothes[1]]}
        offset={5}
      />

      {/* ── PLINTHS — stand up with the bays, take their piece with the goods */}
      {(staged.plinth || []).map((item, i) => {
        const cfg = PLINTHS[i];
        if (!cfg) return null;
        const w = stag(TL.goods, i, Math.max(1, (staged.plinth || []).length), 0.5);
        return (
          <Plinth
            key={item.id}
            cfg={cfg}
            item={item}
            tex={texs[item.id]}
            start={w[0]}
            span={w[1] - w[0]}
          />
        );
      })}

      <WallShelves items={staged.bay || []} texs={texs} range={TL.goods} />
      <Goods staged={staged} texs={texs} />
      <Fixtures />

      <Hotspots entries={hotspots} currency={currency} onOpen={onOpen} />
    </>
  );
}

// ── bridge: hands the renderer's invalidate() to the scroll loop ────────────
function Bridge() {
  const { invalidate } = useThree();
  useEffect(() => {
    PROG.invalidate = invalidate;
    window.__invalidate = () => PROG.invalidate?.(); // QA: force one render
    return () => {
      PROG.invalidate = null;
      window.__invalidate = null;
    };
  }, [invalidate]);
  return null;
}

// ── the canvas ──────────────────────────────────────────────────────────────
export default function StoreStage({ staged, currency, onOpen, onReady, isMobile }) {
  const shadows = !isMobile;
  return (
    <Canvas
      frameloop="demand"
      shadows={shadows ? { type: THREE.PCFSoftShadowMap } : false}
      dpr={isMobile ? 1 : [1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ fov: 46, near: 0.1, far: 130, position: CAM_A }}
      style={{ touchAction: 'pan-y' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.98;
        // never swallow vertical touch scrolling over the hero (mobile)
        gl.domElement.style.touchAction = 'pan-y';
      }}
    >
      <color attach="background" args={['#0a0b0f']} />
      <fog attach="fog" args={['#0a0b0f', 8, 42]} />
      <Rig />
      {/* baked local environment — reflections without any network fetch */}
      <Environment frames={1} resolution={128}>
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#fff2dd"
          position={[0, 5.5, -4]}
          rotation-x={Math.PI / 2}
          scale={[8, 16, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.85}
          color="#dee4ee"
          position={[7, 2.5, 5]}
          rotation-y={-Math.PI / 2}
          scale={[6, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.7}
          color="#ffdfbe"
          position={[-7, 2.5, 2]}
          rotation-y={Math.PI / 2}
          scale={[5, 4, 1]}
        />
        {/* frontal fill — lights the faces of the stock on the bays and the
            island table, and gives the back-wall mirror something soft to
            reflect. Warm, because the showroom reads amber end to end. */}
        <Lightformer
          form="rect"
          intensity={1.25}
          color="#f7ead6"
          position={[0, 2.6, 8]}
          rotation-y={Math.PI}
          scale={[9, 5, 1]}
        />
      </Environment>
      <Bridge />
      <Suspense fallback={null}>
        <Scene
          staged={staged}
          currency={currency}
          onOpen={onOpen}
          onReady={onReady}
          shadows={shadows}
        />
      </Suspense>
      {/* Post pass, desktop only. SSAO is what stops a clean CG interior reading
          as a set: it darkens corners, shelf undersides and the gaps between
          stock — the occlusion real rooms have and flat fills never fake.
          Bloom lets the fixtures glow. multisampling keeps the canvas MSAA that
          a composer would otherwise bypass. */}
      {!isMobile && (
        <EffectComposer multisampling={4} enableNormalPass>
          <SSAO samples={9} radius={0.35} intensity={1.1} luminanceInfluence={0.35} />
          <Bloom
            intensity={0.16}
            luminanceThreshold={0.92}
            luminanceSmoothing={0.18}
            mipmapBlur
          />
          <Vignette offset={0.3} darkness={0.45} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
