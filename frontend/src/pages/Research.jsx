import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

/* ------------------------------------------------------------------
   RESEARCH — Minimal editorial redesign (background #f0f1f9)
   Content preserved verbatim:
   • Page title: "Papers & Publications"
   • 3 papers with dates, titles, authors, abstracts, "More »" links,
     and "View on arXiv" links
   ------------------------------------------------------------------ */

const BLUTRAIN_AUTHORS = [
  'Adhitya Charan', 'Adwaid Suresh', 'Anuj Kumar', 'Aparna A', 'Dhanakumar K',
  'Dharun MS', 'Dinesh G', 'Goutham Kumar Reddy K', 'Harshini V M', 'Jenifa D', 'Jona Delcy C A',
  'Kathirvel S', 'Killi Uma Maheswara Rao', 'Kiruthik Kanna M', 'Kurra Vishnu Sai', 'Madhumithaa G K',
  'Navin Kumar V', 'Ram Charan Golla', 'Revathi T', 'Rishikkanth R', 'Sanjay Krishna MV', 'Surendra Vendra'
];
const FLUX_AUTHORS    = ['Gowtham', 'Sai Rupesh', 'Sanjay Kumar', 'Saravanan', 'Venkata Chaithanya'];
const BLUWERP_AUTHORS = ['Gowtham', 'Sai Rupesh', 'Sanjay Kumar', 'Saravanan', 'Venkata Chaithanya'];

const papers = [
  {
    id: 'blutrain',
    date: 'June 2026',
    title: 'BluTrain: A Robust, Lightweight, and Architecture-General C++/CUDA Framework for AI Systems',
    authors: BLUTRAIN_AUTHORS,
    abstract: (
      <>
        Progress in deep learning is, at scale, more a matter of systems engineering than of modelling: the behaviour of a model in training (its throughput, its memory footprint, and the numerical fidelity of the result) is determined less by the architecture itself than by how that architecture is expressed on the hardware.
        <a href="https://arxiv.org/abs/2606.24780" target="_blank" rel="noopener noreferrer" style={{ color: '#0a1230', marginLeft: '4px', borderBottom: '1px solid #0a1230' }}>More »</a>
      </>
    ),
    arxiv: 'https://arxiv.org/abs/2606.24780',
  },
  {
    id: 'flux',
    date: 'March 2026',
    title: 'FLUX: Data Worth Training On — A Preprocessing Pipeline for Large Language Model Training',
    authors: FLUX_AUTHORS,
    abstract: (
      <>
        FLUX is a preprocessing pipeline designed to improve the quality of large-scale web datasets used for training language models. The pipeline maximises token retention while maintaining strong filtering standards during dataset construction
        <a href="Research/FLUX-Data" style={{ color: '#0a1230', marginLeft: '4px', borderBottom: '1px solid #0a1230' }}>More »</a>
      </>
    ),
    arxiv: 'https://arxiv.org/abs/2603.13972',
  },
  {
    id: 'bluwerp',
    date: 'November 2025',
    title: 'Blu-WERP (Web Extraction and Refinement Pipeline): A Scalable Pipeline for Preprocessing Large Language Model Datasets',
    authors: BLUWERP_AUTHORS,
    abstract: (
      <>
        Blubridge is proudly presenting the process behind &quot;Blu-WERP&quot;, our pipeline that is setting a new industry standard for scalable, high-quality LLM pretraining data this month. In our paper, we are demonstrating training and evaluation details, including the data preparation pipeline, from JusText extraction to Benchmark-targeted classification...
        <a href="Research/Blu-Werp" style={{ color: '#0a1230', marginLeft: '4px', borderBottom: '1px solid #0a1230' }}>More »</a>
      </>
    ),
    arxiv: 'https://arxiv.org/abs/2511.18054',
  },
];

const Research = () => {
  useDocumentTitle('Research | Blubridge');
  useMetaDescription('Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.');

  return (
    <div className="min-h-screen" style={{ background: '#f0f1f9', color: '#0a1230' }} data-testid="research-page">

      {/* ============================================================
          MASTHEAD — just the title, breathing space
          ============================================================ */}
      <section style={{ paddingTop: '96px', paddingBottom: '48px' }}>
        <div className="bb-container">
          <h1
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: 'clamp(44px, 6.4vw, 96px)',
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 1,
              color: '#0a1230',
              margin: 0,
            }}
          >
            Papers &amp; Publications
          </h1>
        </div>
      </section>

      {/* ============================================================
          PAPER LIST — vertical, hairline separators, no spine
          ============================================================ */}
      <section style={{ paddingBottom: '128px' }} data-testid="research-chronicle">
        <div className="bb-container">
          <div style={{ borderTop: '1px solid #c9cee0' }}>
            {papers.map((p) => (
              <article
                key={p.id}
                data-testid={`paper-${p.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12"
                style={{ borderBottom: '1px solid #c9cee0', paddingTop: '56px', paddingBottom: '56px' }}
              >
                {/* Left rail — date */}
                <div className="lg:col-span-2">
                  <p
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '11px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#5f6a89',
                      margin: 0,
                    }}
                  >
                    {p.date}
                  </p>
                </div>

                {/* Main — title, authors, abstract, arxiv link */}
                <div className="lg:col-span-10">
                  <h2
                    style={{
                      fontFamily: 'Geist, sans-serif',
                      fontSize: 'clamp(22px, 2.4vw, 32px)',
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.18,
                      color: '#0a1230',
                      margin: 0,
                      maxWidth: '900px',
                    }}
                  >
                    {p.title}
                  </h2>

                  <p
                    className="mt-5"
                    data-testid={`${p.id}-authors`}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13.5px',
                      lineHeight: 1.7,
                      color: '#5f6a89',
                      margin: '20px 0 0',
                      maxWidth: '900px',
                    }}
                  >
                    {p.authors.join(', ')}
                  </p>

                  <p
                    className="mt-8"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      lineHeight: 1.8,
                      color: '#2a3352',
                      margin: '32px 0 0',
                      maxWidth: '780px',
                    }}
                  >
                    {p.abstract}
                  </p>

                  <div className="mt-8" style={{ marginTop: '32px' }}>
                    <a
                      href={p.arxiv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 group"
                      style={{
                        fontFamily: 'Geist, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#0a1230',
                        borderBottom: '1px solid #0a1230',
                        paddingBottom: '3px',
                        textDecoration: 'none',
                      }}
                    >
                      View on arXiv
                      <span
                        aria-hidden
                        className="inline-block group-hover:translate-x-1"
                        style={{ fontFamily: 'IBM Plex Mono', transition: 'transform 200ms ease' }}
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Research;
