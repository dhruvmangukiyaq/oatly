import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth, getSession } from '../hooks/useAuth.js';
import '../styles/LoginPage.css';

/* ==========================================================================
   LOGIN / SIGNUP — first step of the shop (e-commerce conversion).
   Brutalist Oatly card: tabs for log in / create account, inline
   validation, show/hide password, session persisted in localStorage.
   ========================================================================== */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  if (getSession()) {
    return (
      <div className="login-page">
        <SEO title="Account | Oatly" description="Your Oatly shop account." pathname="/login" />
        <div className="login-card">
          <h1>You&rsquo;re already logged in.</h1>
          <p>Head to the shop or check your account.</p>
          <div className="login-actions">
            <Link to="/products" className="login-btn">Shop now</Link>
            <Link to="/" className="login-btn login-btn--ghost">Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'signup' && name.trim().length < 2) {
      setError('Please tell us your name (2+ letters).');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('That email doesn’t look right. Check it once more.');
      return;
    }
    if (password.length < 6) {
      setError('Password needs at least 6 characters.');
      return;
    }
    const res = mode === 'login' ? login(email, password) : signup(name, email, password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    navigate('/products');
  };

  return (
    <div className="login-page">
      <SEO
        title={mode === 'login' ? 'Log in | Oatly' : 'Create account | Oatly'}
        description="Log in or create your Oatly shop account to check out faster."
        pathname="/login"
      />
      <div className="login-card">
        <p className="login-kicker">Oatly shop</p>
        <h1>{mode === 'login' ? 'Welcome back.' : 'Join the oat club.'}</h1>
        <p className="login-sub">
          {mode === 'login'
            ? 'Log in to check out faster and track your orders.'
            : 'One account for faster checkout, order history and oat-mail.'}
        </p>

        <div className="login-tabs" role="tablist" aria-label="Log in or sign up">
          <button
            type="button" role="tab" aria-selected={mode === 'login'}
            className={mode === 'login' ? 'is-active' : ''}
            onClick={() => { setMode('login'); setError(''); }}
          >
            <LogIn size={15} aria-hidden="true" /> Log in
          </button>
          <button
            type="button" role="tab" aria-selected={mode === 'signup'}
            className={mode === 'signup' ? 'is-active' : ''}
            onClick={() => { setMode('signup'); setError(''); }}
          >
            <UserPlus size={15} aria-hidden="true" /> Sign up
          </button>
        </div>

        <form onSubmit={submit} noValidate>
          {mode === 'signup' && (
            <label className="login-field">
              <span><UserIcon size={15} aria-hidden="true" /> Name</span>
              <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="OATY HUMAN" autoComplete="name"
              />
            </label>
          )}
          <label className="login-field">
            <span><Mail size={15} aria-hidden="true" /> Email</span>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="YOU@EXAMPLE.COM" autoComplete="email"
            />
          </label>
          <label className="login-field">
            <span><Lock size={15} aria-hidden="true" /> Password</span>
            <span className="login-pw">
              <input
                type={showPw ? 'text' : 'password'} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="MIN. 6 CHARACTERS" autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button" aria-label={showPw ? 'Hide password' : 'Show password'}
                onClick={() => setShowPw((v) => !v)}
              >
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>

          {error && <p className="login-error" role="alert">{error}</p>}

          <button type="submit" className="login-btn login-btn--big">
            {mode === 'login' ? 'Log in →' : 'Create account →'}
          </button>
        </form>

        <p className="login-fine">
          Demo shop — accounts live only in this browser. No oat-mails, promise.
        </p>
      </div>
    </div>
  );
}
