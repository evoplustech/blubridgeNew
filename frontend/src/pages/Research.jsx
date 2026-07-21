import React from 'react';
import { Users, FileText, ExternalLink } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

/* ------------------------------------------------------------------
   RESEARCH — Editorial Chronicle Redesign (light theme #f1f2fa)
   Content preserved verbatim:
   • Page title: "Papers & Publications"
   • Paper 01 — BluTrain (June 2026): full title, authors, abstract
     text with "More »" link to arxiv/2606.24780, "View on arXiv" link
   • Paper 02 — FLUX (March 2026): full title, authors, abstract, "More »"
     link to /Research/FLUX-Data, arxiv/2603.13972
   • Paper 03 — Blu-WERP (November 2025): full title, authors, abstract,
     "More »" link to /Research/Blu-Werp, arxiv/2511.18054
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
    idx: '01',
    tag: 'SYSTEMS',
    year: '2026',
    date: 'June 2026',
    title: 'BluTrain: A Robust, Lightweight, and Architecture-General C++/CUDA Framework for AI Systems',
    authors: BLUTRAIN_AUTHORS,
    abstract: (
      <>
        Progress in deep learning is, at scale, more a matter of systems engineering than of modelling: the behaviour of a model in training (its throughput, its memory footprint, and the numerical fidelity of the result) is determined less by the architecture itself than by how that architecture is expressed on the hardware.
        <a href="https://arxiv.org/abs/2606.24780" target="_blank" rel="noopener noreferrer" className="text-bb-accent hover:underline ml-1">More »</a>
      </>
    ),
    arxiv: 'https://arxiv.org/abs/2606.24780',
    arxivId: 'arxiv:2606.24780',
  },
  {
    id: 'flux',
    idx: '02',
    tag: 'DATA PIPELINE',
    year: '2026',
    date: 'March 2026',
    title: 'FLUX: Data Worth Training On — A Preprocessing Pipeline for Large Language Model Training',
    authors: FLUX_AUTHORS,
    abstract: (
      <>
        FLUX is a preprocessing pipeline designed to improve the quality of large-scale web datasets used for training language models. The pipeline maximises token retention while maintaining strong filtering standards during dataset construction
        <a href="Research/FLUX-Data" className="text-bb-accent hover:underline ml-1">More »</a>
      </>
    ),
    arxiv: 'https://arxiv.org/abs/2603.13972',
    arxivId: 'arxiv:2603.13972',
  },
  {
    id: 'bluwerp',
    idx: '03',
    tag: 'DATA PIPELINE',
    year: '2025',
    date: 'November 2025',
    title: 'Blu-WERP (Web Extraction and Refinement Pipeline): A Scalable Pipeline for Preprocessing Large Language Model Datasets',
    authors: BLUWERP_AUTHORS,
    abstract: (
      <>
        Blubridge is proudly presenting the process behind &quot;Blu-WERP&quot;, our pipeline that is setting a new industry standard for scalable, high-quality LLM pretraining data this month. In our paper, we are demonstrating training and evaluation details, including the data preparation pipeline, from JusText extraction to Benchmark-targeted classification...
        <a href="Research/Blu-Werp" className="text-bb-accent hover:underline ml-1">More »</a>
      </>
    ),
    arxiv: 'https://arxiv.org/abs/2511.18054',
    arxivId: 'arxiv:2511.18054',
  },
];

const Research = () => {
  useDocumentTitle('Research | Blubridge');
  useMetaDescription('Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.');

  return (
    <div className="min-h-screen text-bb-ink" style={{ background: '#f1f2fa' }} data-testid="research-page">

      {/* ============================================================
          MASTHEAD
          ============================================================ */}
      <section className="relative overflow-hidden" style={{ paddingTop: '48px', paddingBottom: '64px' }}>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(10,18,48,0.04) 1px, transparent 1px), linear-gradient(rgba(10,18,48,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
          }}
        />

        <div className="bb-container relative">
          <div className="flex items-center justify-between pb-6 border-b border-bb-line">
            <span className="bb-eyebrow">/ Papers &amp; Publications</span>
            <span className="bb-caption hidden sm:block">VOL. 2026 · ARCHIVE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-14 lg:pt-16 items-end">
            <div className="lg:col-span-8">
              <h1 className="bb-display" style={{ fontSize: 'clamp(42px, 7vw, 112px)' }}>
                Papers &amp; Publications
              </h1>
            </div>
            <div className="lg:col-span-4 space-y-3">
              <p className="bb-caption">/ 03 ENTRIES</p>
              <p className="text-bb-ink-2 text-[15px] leading-[1.7]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Research from BluBridge across systems engineering, training frameworks, and data pipelines. Chronicled newest first.
              </p>
            </div>
          </div>

          {/* Ticker strip */}
          <div className="mt-14 grid grid-cols-3 border-t border-bb-line pt-5">
            {[
              { k: 'LATEST',   v: 'June 2026' },
              { k: 'DOMAIN',   v: 'Deep Learning · Systems' },
              { k: 'ACCESS',   v: 'Open · arXiv' },
            ].map((it) => (
              <div key={it.k}>
                <dt className="bb-caption">{it.k}</dt>
                <dd className="text-[14px] mt-1 text-bb-ink" style={{ fontFamily: 'Geist, sans-serif' }}>{it.v}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CHRONICLE — timeline archive
          ============================================================ */}
      <section className="pb-24" data-testid="research-chronicle">
        <div className="bb-container">
          <div className="relative">
            {/* Vertical spine (desktop only) */}
            <div
              aria-hidden
              className="hidden md:block absolute top-0 bottom-0"
              style={{ left: '116px', width: '1px', background: '#d4d8e8' }}
            />

            {papers.map((p, i) => (
              <article
                key={p.id}
                data-testid={`paper-${p.id}`}
                className="relative py-14 first:pt-6 border-b border-bb-line last:border-b-0"
              >
                {/* Year label + node on spine (desktop) */}
                <div className="hidden md:block absolute left-0 top-14" style={{ width: '116px', paddingRight: '24px' }}>
                  <span className="bb-caption block">{p.date.toUpperCase()}</span>
                  <span className="font-mono text-[10px] text-bb-ink-3 mt-1 block">{p.tag}</span>
                </div>

                {/* Node dot on spine */}
                <div
                  aria-hidden
                  className="hidden md:block absolute"
                  style={{ left: '110px', top: '62px' }}
                >
                  <span className="block w-3 h-3 rounded-full bg-white border border-bb-ink" />
                  <span className="block absolute inset-0 w-3 h-3 rounded-full border border-bb-ink/30" style={{ transform: 'scale(2)' }} />
                </div>

                <div className="md:pl-[152px]">
                  {/* Mobile meta */}
                  <div className="flex items-center gap-3 md:hidden mb-4">
                    <span className="bb-caption">{p.date.toUpperCase()}</span>
                    <span className="w-6 h-px bg-bb-line-strong" />
                    <span className="font-mono text-[10px] text-bb-ink-3">{p.tag}</span>
                  </div>

                  {/* Header row */}
                  <div className="flex items-baseline gap-4 mb-4">
                    <span
                      className="font-mono text-[13px] text-bb-ink-3 select-none"
                      style={{ letterSpacing: '0.12em' }}
                    >
                      / {p.idx}
                    </span>
                    <span className="hidden md:inline font-mono text-[11px] text-bb-ink-3">{p.arxivId}</span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-bb-ink mb-5"
                    style={{ fontFamily: 'Geist, sans-serif', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.12 }}
                  >
                    {p.title}
                  </h2>

                  {/* Authors row */}
                  <div className="flex items-start gap-2 mb-6 pb-6 border-b border-bb-line" data-testid={`${p.id}-authors`}>
                    <Users className="w-[13.5px] h-[13.5px] text-bb-ink-3 mt-[5px] flex-shrink-0" strokeWidth={1.5} />
                    <p className="text-[13.5px] text-bb-ink-2 leading-[1.7]">
                      {p.authors.join(', ')}
                    </p>
                  </div>

                  {/* Abstract + links */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-bb-ink-3" strokeWidth={1.5} />
                        <span className="bb-caption">Abstract</span>
                      </div>
                      <p className="text-bb-ink text-[16px] leading-[1.75]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {p.abstract}
                      </p>
                    </div>

                    <div className="lg:col-span-4 lg:pl-6 lg:border-l lg:border-bb-line">
                      <p className="bb-caption mb-3">/ Access</p>
                      <a
                        href={p.arxiv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-bb-ink hover:text-bb-accent transition-colors group"
                      >
                        <span className="font-mono text-[13px]">{p.arxivId}</span>
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <div className="mt-6 pt-6 border-t border-bb-line">
                        <p className="bb-caption mb-2">/ Contributors</p>
                        <p className="font-mono text-[12px] text-bb-ink-2">
                          {p.authors.length.toString().padStart(2, '0')} named
                        </p>
                      </div>
                    </div>
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
