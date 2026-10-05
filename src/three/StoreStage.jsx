import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Html, Lightformer, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { PROG } from './storeConfig.js';

// ─── STORE STAGE — scroll-built premium boutique (replaces the space film) ──
// One master scroll timeline drives EVERYTHING: the camera pulls back along a
// bezier path while the room assembles around it — walls slide in, the ceiling
// lowers, lights warm on, racks drop, garments land rail by rail, mannequins
// rise and get dressed, hotspots appear at the end. Nothing autoplays: every
// value is a pure function of the smoothed scroll progress in PROG (written
// by StoreHero's rAF loop), so scrolling up reverses the construction exactly.
//
// Tech: three + @react-three/fiber (frameloop="demand" — renders only while
// progress moves; the rAF loop calls PROG.invalidate), drei for the baked
// local environment (no network) and the projected product hotspots.
// Garment/product textures are pre-cut transparent WebPs from the real
// catalogue (public/images/store/<id>.webp) — same-origin, one decode.
//
// Entrance pattern: every staged object lives inside <Enter>, hidden until
// its window opens, then eases from an offset/scaled pose into rest while
// fading up (objects the camera can already see never pop in).

// ── timeline helpers ────────────────────────────────────────────────────────
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const win = (p, a, b) => clamp01((p - a) / (b - a)); // windowed 0→1
const easeOut = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic
const smoothstep = (t) => t * t * (3 - 2 * t); // camera ease
const lerp = (a, b, t) => a + (b - a) * t;

// ── staged catalogue ids + scroll state live in storeConfig.js ──────────────

// ── room layout constants (metres) ──────────────────────────────────────────
const RAIL_Y = 2.0;
const RACK_L = { x: -5.55, z0: -10.0, z1: -3.6, n: 10 };
const RACK_R = { x: 5.55, z0: -9.6, z1: -4.0, n: 9 };
const TABLE_POS = [0, 0, -6.2];
const SHELF_POS = [3.6, 0, -10.55];
const MIRROR_POS = [-4.2, 1.35, -10.96]; // flush panel on the back wall
const MANNS = [
  { pos: [2.7, 0, -3.3], dress: '#d8cfbf', win: [0.46, 0.55], dw: [0.72, 0.82] },
  { pos: [-2.45, 0, -2.0], dress: '#8d8478', win: [0.48, 0.57], dw: [0.74, 0.84] },
];

// camera pull-back: from deep inside one spot to a wide storefront view
const CAM_A = [1.4, 1.55, -2.4];
const CAM_C = [0.9, 1.9, 3.6];
const CAM_B = [0, 2.6, 9.2];
// start gazing down at the lit bare floor (empty room), lift the gaze as the
// store builds → the horizon sits high, so p=0 reads as a warm pool of light
// in a dark room rather than a half-black frame
const TGT_A = [-0.7, 0.3, -7.6];
const TGT_B = [0, 1.35, -5.2];

const rackSlots = (n, z0, z1) =>
  Array.from({ length: n }, (_, i) => (n === 1 ? (z0 + z1) / 2 : z0 + (i * (z1 - z0)) / (n - 1)));

// ── Enter: an object assembling into place inside its scroll window ─────────
// d = offset at t=0 (position), s = scale at t=0, sy = scale-y at t=0,
// r = rotation offset at t=0. Hidden before the window opens; `fade` ramps
// material opacity (and hands shadows over mid-ease) so objects the camera
// can already see never pop in.
function Enter({ p, d = [0, 0, 0], s, sy, r = [0, 0, 0], fade = false, children }) {
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
    const sc = s != null ? s + (1 - s) * e : 1;
    pr.scale.set(sc, sy != null ? sy + (1 - sy) * e : sc, sc);
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
    // Portrait phones can't fit an 11m-wide store at any sane lens — so on
    // portrait the final frame stays wide (fov 56) and keeps a low gaze:
    // the merchandised centre (sign, dressed mannequins, table, shelf) fills
    // the frame, and the ceiling edge lands under the navbar instead of
    // leaving a band of void at the top.
    const portrait = size.width / size.height < 0.9;
    pos.set(
      u * u * CAM_A[0] + 2 * u * t * CAM_C[0] + t * t * CAM_B[0],
      u * u * CAM_A[1] + 2 * u * t * CAM_C[1] + t * t * CAM_B[1],
      u * u * CAM_A[2] + 2 * u * t * CAM_C[2] + t * t * CAM_B[2],
    );
    tgt.set(
      lerp(TGT_A[0], TGT_B[0], t),
      lerp(TGT_A[1], portrait ? 0.31 : TGT_B[1], t),
      lerp(TGT_A[2], TGT_B[2], t),
    );
    camera.position.copy(pos);
    camera.lookAt(tgt);
    const fov = lerp(42, portrait ? 56 : 35, t);
    if (Math.abs(camera.fov - fov) > 0.01) {
      Object.assign(camera, { fov });
      camera.updateProjectionMatrix();
    }
    Object.assign(gl, { toneMappingExposure: lerp(0.94, 1.08, easeOut(win(p, 0.84, 1))) });
    // haze ramp: tight fog while the room is empty (the floor melts into the
    // dark instead of a hard edge), looser once the full store is in frame
    if (scene.fog) Object.assign(scene.fog, { near: lerp(6, 15, t), far: lerp(30, 55, t) });
    // dim the baked environment while the room is a construction site, then
    // bring it up with the lights → the power-on beat actually transforms it
    Object.assign(scene, { environmentIntensity: lerp(0.5, 1, win(p, 0.3, 0.42)) });
    // QA hook: rendered-frame counter (lets tests wait for an actual frame
    // instead of guessing how long software GL takes)
    window.__frames = (window.__frames || 0) + 1;
  });
  return null;
}

// ── shared materials — module scope so the light ramp can drive them every
// frame without threading mutable props through the tree ─────────────────────
const stripMat = new THREE.MeshStandardMaterial({
  color: '#141518',
  emissive: new THREE.Color('#fff0d8'),
  emissiveIntensity: 0,
  roughness: 0.5,
});
const headMat = new THREE.MeshStandardMaterial({
  color: '#101216',
  emissive: new THREE.Color('#ffe9c8'),
  emissiveIntensity: 0,
  roughness: 0.42,
  metalness: 0.55,
});
const floorMat = new THREE.MeshStandardMaterial({
  color: '#d6d0c4',
  roughness: 0.78,
  metalness: 0,
  envMapIntensity: 0.45,
});

// ── lights: the power-on ramp + emissive fixtures + floor sheen ─────────────
function Lighting({ shadows }) {
  const amb = useRef();
  const pool = useRef();
  const spotA = useRef();
  const spotB = useRef();
  const tgtA = useMemo(() => new THREE.Object3D(), []);
  const tgtB = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    const p = PROG.p;
    const on = win(p, 0.3, 0.42);
    if (amb.current) amb.current.intensity = 0.07 + 0.4 * on;
    if (pool.current) pool.current.intensity = 420 * (1 - 0.4 * on);
    if (spotA.current) spotA.current.intensity = 520 * on;
    if (spotB.current) spotB.current.intensity = 430 * on;
    stripMat.emissiveIntensity = 3.2 * on;
    headMat.emissiveIntensity = 2.6 * on;
    const sheen = win(p, 0.08, 0.22);
    floorMat.roughness = lerp(0.78, 0.34, sheen);
    floorMat.envMapIntensity = lerp(0.45, 1, sheen);
  });
  return (
    <>
      <ambientLight ref={amb} intensity={0.07} color="#fff3e4" />
      {/* the construction lamp — on from 0%, a lone pool of light on bare floor */}
      <spotLight
        ref={pool}
        position={[-1.2, 4.5, -7.4]}
        angle={0.62}
        penumbra={0.68}
        decay={2}
        distance={30}
        intensity={420}
        color="#ffd9ab"
      />
      <primitive object={tgtA} position={[0, 0, -6.2]} />
      <spotLight
        ref={spotA}
        position={[0, 4.45, -6.2]}
        target={tgtA}
        angle={0.52}
        penumbra={0.55}
        decay={2}
        distance={24}
        intensity={0}
        color="#fff1da"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-near={0.6}
        shadow-camera-far={14}
      />
      <primitive object={tgtB} position={[2.4, 0, -2.9]} />
      <spotLight
        ref={spotB}
        position={[2.4, 4.45, -2.9]}
        target={tgtB}
        angle={0.56}
        penumbra={0.6}
        decay={2}
        distance={24}
        intensity={0}
        color="#fff4e2"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-near={0.6}
        shadow-camera-far={14}
      />
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
    ctx.fillStyle = '#15171b';
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

// ── one garment hanging from a rail (aspect preserved, width capped) ────────
function fitGarment(tex, long) {
  const iw = tex && tex.image ? tex.image.width : 512;
  const ih = tex && tex.image ? tex.image.height : 760;
  let h = long ? 1.15 : 0.95;
  let w = (h * iw) / ih;
  const maxW = 0.62;
  if (w > maxW) {
    h *= maxW / w;
    w = maxW;
  }
  return { w, h };
}

function Garment({ tex, x, z, face, start, span, long }) {
  const { w, h } = fitGarment(tex, long);
  return (
    <group position={[x, RAIL_Y, z]} rotation={[0, face, 0]}>
      <Enter p={[start, start + span]} d={[0, 0.3, 0]} s={0.5} r={[0, 0, 0.08]} fade>
        <mesh position={[0, -(0.075 + h / 2), 0]}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial
            map={tex}
            transparent
            alphaTest={0.32}
            roughness={0.92}
            metalness={0}
            envMapIntensity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[w * 0.8, 0.022, 0.03]} />
          <meshStandardMaterial color="#8b6a49" roughness={0.6} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.042, 0.0075, 8, 20]} />
          <meshStandardMaterial color="#2a2c30" metalness={0.9} roughness={0.3} />
        </mesh>
      </Enter>
    </group>
  );
}

// ── a rack: feet, posts, rail + its garments ────────────────────────────────
function Rack({ side, spec, items, texs, enter, stagger0, staggerK }) {
  const x = side < 0 ? RACK_L.x : RACK_R.x;
  const face = side < 0 ? Math.PI / 2 : -Math.PI / 2;
  const zs = rackSlots(items.length, spec.z0, spec.z1);
  const mid = (spec.z0 + spec.z1) / 2;
  const len = spec.z1 - spec.z0;
  const metal = '#17181b';
  return (
    <group>
      <Enter p={enter} d={[0, 2.9, 0]} fade>
        <mesh position={[x, 0.03, spec.z0]} castShadow>
          <boxGeometry args={[0.5, 0.06, 0.22]} />
          <meshStandardMaterial color={metal} metalness={0.8} roughness={0.34} envMapIntensity={1} />
        </mesh>
        <mesh position={[x, 0.03, spec.z1]} castShadow>
          <boxGeometry args={[0.5, 0.06, 0.22]} />
          <meshStandardMaterial color={metal} metalness={0.8} roughness={0.34} envMapIntensity={1} />
        </mesh>
        <mesh position={[x, RAIL_Y / 2 + 0.03, spec.z0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, RAIL_Y, 14]} />
          <meshStandardMaterial color={metal} metalness={0.85} roughness={0.3} envMapIntensity={1} />
        </mesh>
        <mesh position={[x, RAIL_Y / 2 + 0.03, spec.z1]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, RAIL_Y, 14]} />
          <meshStandardMaterial color={metal} metalness={0.85} roughness={0.3} envMapIntensity={1} />
        </mesh>
        <mesh position={[x, RAIL_Y, mid]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.026, 0.026, len + 0.2, 14]} />
          <meshStandardMaterial color="#1b1d21" metalness={0.9} roughness={0.24} envMapIntensity={1.1} />
        </mesh>
      </Enter>
      {items.map((item, i) => (
        <Garment
          key={item.id}
          tex={texs[item.id]}
          x={x}
          z={zs[i]}
          face={face}
          start={stagger0 + i * staggerK}
          span={0.07}
          long={item.long}
        />
      ))}
    </group>
  );
}

// ── mannequin (dress form on a pole) ────────────────────────────────────────
function Mannequin({ cfg }) {
  const formPts = useMemo(
    () =>
      [
        [0.028, 1.42], [0.06, 1.41], [0.1, 1.37], [0.135, 1.3], [0.16, 1.18],
        [0.15, 1.04], [0.125, 0.94], [0.145, 0.84], [0.17, 0.72], [0.168, 0.6],
        [0.1, 0.52],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    [],
  );
  const dressPts = useMemo(
    () =>
      [
        [0.2, 1.34], [0.215, 1.2], [0.185, 1.04], [0.165, 0.94], [0.205, 0.78],
        [0.26, 0.6], [0.3, 0.44], [0.31, 0.4],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    [],
  );
  return (
    <group position={cfg.pos}>
      <Enter p={cfg.win} sy={0}>
        <mesh position={[0, 0.013, 0]} castShadow>
          <cylinderGeometry args={[0.19, 0.21, 0.026, 32]} />
          <meshStandardMaterial color="#1b1d21" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.27, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.52, 12]} />
          <meshStandardMaterial color="#24262b" metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh castShadow>
          <latheGeometry args={[formPts, 40]} />
          <meshStandardMaterial color="#1f2126" roughness={0.52} metalness={0.12} envMapIntensity={0.6} />
        </mesh>
      </Enter>
      <Enter p={cfg.dw} d={[0, 1.25, 0]} r={[0, 0, 0.05]} fade>
        <mesh castShadow>
          <latheGeometry args={[dressPts, 40]} />
          <meshStandardMaterial
            color={cfg.dress}
            roughness={0.82}
            metalness={0}
            side={THREE.DoubleSide}
            envMapIntensity={0.4}
          />
        </mesh>
      </Enter>
    </group>
  );
}

// ── hotspot overlays (projected HTML, appear in the final beat) ─────────────
function Hotspots({ entries, currency, onOpen }) {
  const wraps = useRef([]);
  useFrame(() => {
    const o = win(PROG.p, 0.86, 0.94);
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

// ── the room + everything in it (suspends on textures, then signals ready) ──
function Scene({ staged, currency, onOpen, onReady, shadows }) {
  // textures: every staged cutout, loaded once, keyed by product id
  const urls = useMemo(() => {
    const all = [...staged.left, ...staged.right, ...staged.shelf];
    return Array.from(new Set(all.map((s) => s.tex)));
  }, [staged]);
  const loaded = useTexture(urls);
  const texs = useMemo(() => {
    const byUrl = {};
    urls.forEach((u, i) => {
      byUrl[u] = loaded[i];
    });
    const byId = {};
    [...staged.left, ...staged.right, ...staged.shelf].forEach((s) => {
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
  }, [urls, loaded, staged]);

  // veil lifts on the first frame after the whole set mounted
  const readySent = useRef(false);
  useFrame(() => {
    if (!readySent.current) {
      readySent.current = true;
      onReady();
    }
  });

  const signTex = useSignTexture();

  // mirror "reflection": a floor-to-ceiling gradient tinted into the metal —
  // reads as a real full-length boutique mirror instead of a black hole
  const mirrorTex = useMemo(() => {
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
  }, []);

  // hotspot entries on real merchandise (guarded by slot existence)
  const hotspots = useMemo(() => {
    const out = [];
    const add = (item, pos) => {
      if (item) out.push({ id: item.id, name: item.name, price: item.price, pos, slot: out.length });
    };
    const l = staged.left;
    const r = staged.right;
    const lZ = rackSlots(l.length, RACK_L.z0, RACK_L.z1);
    const rZ = rackSlots(r.length, RACK_R.z0, RACK_R.z1);
    // sit the pin just in front of the garment face (0.2m off the rail), at
    // the garment's own centre height (long pieces hang lower)
    const gy = (item) => (item && item.long ? 1.42 : 1.52);
    add(l[0], [RACK_L.x + 0.2, gy(l[0]), lZ[0]]);
    add(l[6], [RACK_L.x + 0.2, gy(l[6]), lZ[6]]);
    add(r[0], [RACK_R.x - 0.2, gy(r[0]), rZ[0]]);
    add(r[4], [RACK_R.x - 0.2, gy(r[4]), rZ[4]]);
    add(staged.shelf[0], [SHELF_POS[0] - 0.72, 0.6, SHELF_POS[2] + 0.18]);
    return out;
  }, [staged]);

  return (
    <>
      <Lighting shadows={shadows} />

      {/* ── FLOOR — present at 0% (the bare empty room), gains its sheen ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <primitive object={floorMat} attach="material" />
      </mesh>
      {/* front lip — marks the shop edge as the camera clears it ── */}
      <mesh position={[0, 0.035, 2.02]} receiveShadow>
        <boxGeometry args={[14.2, 0.07, 0.24]} />
        <meshStandardMaterial color="#8f897d" roughness={0.7} />
      </mesh>

      {/* ── BACK WALL — rises from below, carries the sign + baseboard ── */}
      <Enter p={[0.06, 0.18]} d={[0, -5.4, 0]}>
        <group position={[0, 2.3, -11.11]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[14.44, 4.6, 0.22]} />
            <meshStandardMaterial color="#e9e4da" roughness={0.94} envMapIntensity={0.25} />
          </mesh>
          <mesh position={[0, 0.5, 0.14]}>
            <planeGeometry args={[3.4, 0.85]} />
            <meshBasicMaterial map={signTex} transparent toneMapped={false} />
          </mesh>
          <mesh position={[0, -2.24, 0.13]}>
            <boxGeometry args={[14.44, 0.12, 0.04]} />
            <meshStandardMaterial color="#23252a" roughness={0.7} />
          </mesh>
        </group>
      </Enter>

      {/* ── BACK-WALL MIRROR PANEL — a boutique back-of-store mirror ── */}
      <Enter p={[0.44, 0.54]} d={[0, -0.9, 0]} fade>
        <group position={MIRROR_POS}>
          <mesh>
            <boxGeometry args={[1.7, 2.7, 0.06]} />
            <meshStandardMaterial color="#1c1e22" roughness={0.5} metalness={0.4} envMapIntensity={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.045]}>
            <boxGeometry args={[1.56, 2.56, 0.02]} />
            {/* emissiveMap carries the gradient so the panel always reads as
                a mirror (lit floor at the bottom, dark room at the top) even
                when the baked env has no energy in the reflected directions */}
            <meshStandardMaterial
              map={mirrorTex}
              emissive="#ffffff"
              emissiveMap={mirrorTex}
              emissiveIntensity={0.32}
              metalness={0.2}
              roughness={0.3}
              envMapIntensity={1.4}
            />
          </mesh>
        </group>
      </Enter>

      {/* ── SIDE WALLS — slide in from the dark ── */}
      <Enter p={[0.1, 0.22]} d={[-6.4, 0, 0]}>
        <group position={[-7.21, 2.3, -4.5]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.22, 4.6, 13.5]} />
            <meshStandardMaterial color="#e7e2d8" roughness={0.94} envMapIntensity={0.25} />
          </mesh>
          <mesh position={[0.13, -2.24, 0]}>
            <boxGeometry args={[0.04, 0.12, 13.5]} />
            <meshStandardMaterial color="#23252a" roughness={0.7} />
          </mesh>
        </group>
      </Enter>
      <Enter p={[0.13, 0.25]} d={[6.4, 0, 0]}>
        <group position={[7.21, 2.3, -4.5]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[0.22, 4.6, 13.5]} />
            <meshStandardMaterial color="#e7e2d8" roughness={0.94} envMapIntensity={0.25} />
          </mesh>
          <mesh position={[-0.13, -2.24, 0]}>
            <boxGeometry args={[0.04, 0.12, 13.5]} />
            <meshStandardMaterial color="#23252a" roughness={0.7} />
          </mesh>
        </group>
      </Enter>

      {/* ── CEILING — lowers in with fixtures already mounted ── */}
      <Enter p={[0.2, 0.3]} d={[0, 4.7, 0]}>
        <group>
          <mesh position={[0, 4.68, -4.5]} receiveShadow>
            <boxGeometry args={[14.5, 0.16, 13.6]} />
            <meshStandardMaterial color="#efece4" roughness={0.96} />
          </mesh>
          <mesh position={[-2.7, 4.56, -4.6]}>
            <boxGeometry args={[0.14, 0.035, 10]} />
            <primitive object={stripMat} attach="material" />
          </mesh>
          <mesh position={[2.7, 4.56, -4.6]}>
            <boxGeometry args={[0.14, 0.035, 10]} />
            <primitive object={stripMat} attach="material" />
          </mesh>
          <mesh position={[-1.5, 4.5, -4.6]}>
            <boxGeometry args={[0.05, 0.05, 10]} />
            <meshStandardMaterial color="#141518" roughness={0.5} metalness={0.4} />
          </mesh>
          <mesh position={[1.5, 4.5, -4.6]}>
            <boxGeometry args={[0.05, 0.05, 10]} />
            <meshStandardMaterial color="#141518" roughness={0.5} metalness={0.4} />
          </mesh>
          {[-8, -5, -2].map((z) => (
            <group key={`hl${z}`}>
              <mesh position={[-1.5, 4.4, z]} rotation={[0.18, 0, 0.35]}>
                <cylinderGeometry args={[0.05, 0.055, 0.14, 14]} />
                <primitive object={headMat} attach="material" />
              </mesh>
              <mesh position={[1.5, 4.4, z]} rotation={[0.18, 0, -0.35]}>
                <cylinderGeometry args={[0.05, 0.055, 0.14, 14]} />
                <primitive object={headMat} attach="material" />
              </mesh>
            </group>
          ))}
        </group>
      </Enter>

      {/* ── RUG — grounds the centre table ── */}
      <Enter p={[0.38, 0.46]} d={[0, 0.4, 0]} s={0.75} fade>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[TABLE_POS[0], 0.012, TABLE_POS[2]]} receiveShadow>
          <planeGeometry args={[4.8, 3.2]} />
          <meshStandardMaterial color="#34363c" roughness={0.95} />
        </mesh>
      </Enter>

      {/* ── RACKS — drop in, then garments land rail by rail ── */}
      <Rack
        side={-1}
        spec={RACK_L}
        items={staged.left}
        texs={texs}
        enter={[0.34, 0.44]}
        stagger0={0.5}
        staggerK={staged.left.length > 1 ? 0.26 / (staged.left.length - 1) : 0}
      />
      <Rack
        side={1}
        spec={RACK_R}
        items={staged.right}
        texs={texs}
        enter={[0.37, 0.47]}
        stagger0={0.545}
        staggerK={staged.right.length > 1 ? 0.235 / (staged.right.length - 1) : 0}
      />

      {/* ── CENTRE TABLE — drops in, then folds stack on it ── */}
      <Enter p={[0.4, 0.5]} d={[0, 2.6, 0]} fade>
        <group position={TABLE_POS}>
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
      {[
        { x: -0.78, z: -0.18, colors: ['#e8e2d6', '#26282c'] },
        { x: 0.02, z: 0.2, colors: ['#a89b88', '#d9cfc0', '#3a3f46'] },
        { x: 0.8, z: -0.14, colors: ['#2c2e33', '#cfc6b6'] },
      ].map((stack, si) =>
        stack.colors.map((col, ci) => {
          const idx = si * 3 + ci;
          const start = 0.58 + idx * 0.014;
          return (
            <Enter key={`st${si}-${ci}`} p={[start, start + 0.05]} d={[0, 0.35, 0]} s={0.4} fade>
              <mesh
                position={[TABLE_POS[0] + stack.x, 0.755 + 0.0375 + ci * 0.076, TABLE_POS[2] + stack.z]}
                castShadow
              >
                <boxGeometry args={[0.46, 0.075, 0.34]} />
                <meshStandardMaterial color={col} roughness={0.88} />
              </mesh>
            </Enter>
          );
        }),
      )}

      {/* ── BACK SHELF UNIT — arrives with furniture, stocked later ── */}
      <Enter p={[0.42, 0.52]} d={[0, 2.4, 0]} fade>
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
          {staged.shelf.map((item, i) => {
            const start = 0.61 + i * 0.017;
            const shelfY = [0.34, 0.98, 1.62][i % 3] + 0.0275;
            const h = 0.46;
            const t = texs[item.id];
            const iw = t && t.image ? t.image.width : 512;
            const ih = t && t.image ? t.image.height : 560;
            const w = Math.min(0.5, (h * iw) / ih);
            return (
              <Enter key={item.id} p={[start, start + 0.055]} d={[0, 0.3, 0]} s={0.5} fade>
                <mesh
                  position={[-0.72 + i * 0.48, shelfY + h / 2, 0.06]}
                  rotation={[0, (i - 1.5) * 0.14, 0]}
                >
                  <planeGeometry args={[w, h]} />
                  <meshStandardMaterial
                    map={t}
                    transparent
                    alphaTest={0.32}
                    roughness={0.7}
                    envMapIntensity={0.4}
                  />
                </mesh>
              </Enter>
            );
          })}
        </group>
      </Enter>

      {/* ── MANNEQUINS — rise, then get dressed in the final beats ── */}
      {MANNS.map((cfg) => (
        <Mannequin key={cfg.pos[0]} cfg={cfg} />
      ))}

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
      camera={{ fov: 42, near: 0.1, far: 130, position: CAM_A }}
      style={{ touchAction: 'pan-y' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.94;
        // never swallow vertical touch scrolling over the hero (mobile)
        gl.domElement.style.touchAction = 'pan-y';
      }}
    >
      <color attach="background" args={['#07090f']} />
      <fog attach="fog" args={['#07090f', 6, 30]} />
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
          intensity={0.8}
          color="#cfe0ff"
          position={[7, 2.5, 5]}
          rotation-y={-Math.PI / 2}
          scale={[6, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.6}
          color="#ffe2c4"
          position={[-7, 2.5, 2]}
          rotation-y={Math.PI / 2}
          scale={[5, 4, 1]}
        />
        {/* frontal fill — lights the faces of garments/mannequins and gives
            the back-wall mirror something soft to reflect */}
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#e8eeff"
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
    </Canvas>
  );
}
