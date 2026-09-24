import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found | BluBridge');
  return <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28" data-testid="page-not-found">
    <p className="mb-5 font-mono text-sm text-bb-accent" data-testid="page-not-found-code">404</p>
    <h1 className="text-4xl sm:text-5xl font-semibold !tracking-normal" data-testid="page-not-found-heading">Page not found</h1>
    <p className="mt-6 text-sm sm:text-base text-bb-ink-2" data-testid="page-not-found-message">This page is not available.</p>
    <Link to="/" className="bb-btn-primary mt-8 inline-flex" data-testid="page-not-found-home">Back to Home</Link>
  </section>;
}