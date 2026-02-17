'use client';

import { useState } from 'react';
import Link from 'next/link';

export function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-75 fixed-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" href="/">
          <i className="bi bi-check2-square me-2"></i>Taskflow
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <a className="nav-link" href="#features" onClick={() => setOpen(false)}>Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#how-it-works" onClick={() => setOpen(false)}>How it works</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/login" onClick={() => setOpen(false)}>Sign in</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary rounded-pill px-4" href="/register" onClick={() => setOpen(false)}>
                Get started
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
