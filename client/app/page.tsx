import Link from 'next/link';
import Image from 'next/image';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import './landing.css';

export default function LandingPage() {
  return (
    <div className="landing-bootstrap">
      <LandingNavbar />

      {/* Hero with gradient background */}
      <section
        className="hero position-relative min-vh-100 d-flex align-items-center overflow-hidden"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #312e81 100%)',
        }}
      >
        <div className="container position-relative text-white text-center py-5" style={{ zIndex: 2 }}>
          <p className="text-uppercase letter-spacing-2 mb-3 opacity-90">
            <i className="bi bi-stars me-1"></i> Simple task management
          </p>
          <h1 className="display-3 fw-bold mb-4 lh-sm">
            Ship tasks,<br />not chaos
          </h1>
          <p className="lead mx-auto mb-5" style={{ maxWidth: '32rem' }}>
            A focused dashboard for teams who value clarity. Create tasks, track progress,
            and get more done—without the clutter.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link href="/register" className="btn btn-primary btn-lg rounded-pill px-5 py-3 shadow">
              Start free <i className="bi bi-arrow-right ms-2"></i>
            </Link>
            <Link href="/login" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3">
              Sign in
            </Link>
          </div>
          <p className="mt-4 small opacity-75">No credit card required · Free forever</p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <h3 className="fw-bold display-6 mb-1">10k+</h3>
              <p className="mb-0 opacity-90">Tasks completed</p>
            </div>
            <div className="col-md-4">
              <h3 className="fw-bold display-6 mb-1">500+</h3>
              <p className="mb-0 opacity-90">Active users</p>
            </div>
            <div className="col-md-4">
              <h3 className="fw-bold display-6 mb-1">99.9%</h3>
              <p className="mb-0 opacity-90">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-5 py-lg-6 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Everything you need to stay on track</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '28rem' }}>
              Built for individuals and small teams who want clarity without complexity.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="rounded-3 bg-primary bg-opacity-10 text-primary d-inline-flex p-3 mb-3">
                    <i className="bi bi-list-task fs-3"></i>
                  </div>
                  <h5 className="card-title fw-bold">Task list</h5>
                  <p className="card-text text-muted small">
                    Create, edit, and complete tasks with a clean list view. Filter by status and search in seconds.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="rounded-3 bg-success bg-opacity-10 text-success d-inline-flex p-3 mb-3">
                    <i className="bi bi-graph-up-arrow fs-3"></i>
                  </div>
                  <h5 className="card-title fw-bold">Dashboard</h5>
                  <p className="card-text text-muted small">
                    See total, completed, and pending tasks at a glance. One click to jump into your list.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="rounded-3 bg-info bg-opacity-10 text-info d-inline-flex p-3 mb-3">
                    <i className="bi bi-person-badge fs-3"></i>
                  </div>
                  <h5 className="card-title fw-bold">Profile</h5>
                  <p className="card-text text-muted small">
                    Keep your name and email up to date. Your data stays private and secure.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="rounded-3 bg-warning bg-opacity-10 text-warning d-inline-flex p-3 mb-3">
                    <i className="bi bi-shield-check fs-3"></i>
                  </div>
                  <h5 className="card-title fw-bold">Secure</h5>
                  <p className="card-text text-muted small">
                    JWT auth, encrypted passwords, and rate limiting. Built with security in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-5 py-lg-6">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="display-6 fw-bold mb-4">Get started in under a minute</h2>
              <ul className="list-unstyled">
                <li className="d-flex gap-3 mb-4">
                  <span className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{ width: 40, height: 40 }}>1</span>
                  <div>
                    <h6 className="fw-bold mb-1">Create your account</h6>
                    <p className="text-muted small mb-0">Sign up with your email—no credit card required.</p>
                  </div>
                </li>
                <li className="d-flex gap-3 mb-4">
                  <span className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{ width: 40, height: 40 }}>2</span>
                  <div>
                    <h6 className="fw-bold mb-1">Add your first task</h6>
                    <p className="text-muted small mb-0">Type a title, add an optional description, and hit Create.</p>
                  </div>
                </li>
                <li className="d-flex gap-3">
                  <span className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{ width: 40, height: 40 }}>3</span>
                  <div>
                    <h6 className="fw-bold mb-1">Track and complete</h6>
                    <p className="text-muted small mb-0">Use the dashboard to see progress and mark tasks done.</p>
                  </div>
                </li>
              </ul>
              <Link href="/register" className="btn btn-primary rounded-pill px-4 mt-2">
                Create free account
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="position-relative rounded-4 overflow-hidden shadow-lg border">
                <Image
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
                  alt="Organized desk"
                  width={600}
                  height={400}
                  className="img-fluid w-100"
                  style={{ objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-white bg-opacity-90 small text-muted">
                  <i className="bi bi-check2-all text-primary me-1"></i> Focus on what matters.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 py-lg-6 bg-dark text-white">
        <div className="container text-center py-5">
          <h2 className="display-6 fw-bold mb-3">Ready to get more done?</h2>
          <p className="lead opacity-90 mb-4">
            Join others who ship tasks without the chaos.
          </p>
          <Link href="/register" className="btn btn-light btn-lg rounded-pill px-5 py-3">
            Start free today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-black text-white-50">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <span className="fw-bold text-white fs-5">
                <i className="bi bi-check2-square me-2"></i>Taskflow
              </span>
              <p className="small mt-2 mb-0">
                A simple task dashboard for teams who value clarity and speed.
              </p>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="text-white mb-3">Product</h6>
              <ul className="list-unstyled small">
                <li><Link href="#features" className="text-white-50 text-decoration-none">Features</Link></li>
                <li><Link href="#how-it-works" className="text-white-50 text-decoration-none">How it works</Link></li>
                <li><Link href="/login" className="text-white-50 text-decoration-none">Sign in</Link></li>
                <li><Link href="/register" className="text-white-50 text-decoration-none">Sign up</Link></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="text-white mb-3">Legal</h6>
              <ul className="list-unstyled small">
                <li><a href="#" className="text-white-50 text-decoration-none">Privacy</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Terms</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-4 border-secondary" />
          <p className="small mb-0">&copy; {new Date().getFullYear()} Taskflow. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
