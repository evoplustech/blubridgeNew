import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, Users } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const publications = [
  {
    key: 'nova',
    index: 'PUB/001',
    arxiv: 'arXiv:2608.00029',
    published: 'July 2026',
    arxivUrl: 'https://arxiv.org/abs/2608.00029',
    title: 'Nova: An End-to-End MLIR Compiler for Deep Learning',
    authors: 'Adwaid Suresh, Aparna A, Harshini V M, Jona Delcy C A, Killi Uma Maheswara Rao, Ram Charan Golla, Surendra Vendra',
    abstract: 'The performance of deep learning models at scale relies heavily on how effectively high-level mathematical operations are mapped to underlying physical hardware. While high-level tensor frameworks provide flexible abstractions for model design, their eager execution models inherently lack the whole-graph visibility and granular control over hardware and memory required to maximize physical hardware utilization natively. To bridge this gap, we designed Nova, an automated end-to-end JIT compiler whose defining purpose is to achieve absolute control over this hardware mapping: fusing operations across operation boundaries, optimizing complex memory hierarchies, and tuning execution down to the register level ',
    moreExternal: 'https://arxiv.org/abs/2608.00029',
    revClass: 'in-rev',
  },
  {
    key: 'blutrain',
    index: 'PUB/002',
    arxiv: 'arXiv:2606.24780',
    published: 'June 2026',
    arxivUrl: 'https://arxiv.org/abs/2606.24780',
    title: 'BluTrain: A Robust, Lightweight, and Architecture-General C++/CUDA Framework for AI Systems',
    authors: 'Adhitya Charan, Adwaid Suresh, Anuj Kumar, Aparna A, Dhanakumar K, Dharun MS, Dinesh G, Goutham Kumar Reddy K, Harshini V M, Jenifa D, Jona Delcy C A, Kathirvel S, Killi Uma Maheswara Rao, Kiruthik Kanna M, Kurra Vishnu Sai, Madhumithaa G K, Navin Kumar V, Ram Charan Golla, Revathi T, Rishikkanth R, Sanjay Krishna MV, Surendra Vendra',
    abstract: 'Progress in deep learning is, at scale, more a matter of systems engineering than of modelling: the behaviour of a model in training (its throughput, its memory footprint, and the numerical fidelity of the result) is determined less by the architecture itself than by how that architecture is expressed on the hardware. ',
    moreExternal: 'https://arxiv.org/abs/2606.24780',
    revClass: 'in-rev in-rev-d1',
  },
  {
    key: 'flux',
    index: 'PUB/003',
    arxiv: 'arXiv:2603.13972',
    published: 'March 2026',
    arxivUrl: 'https://arxiv.org/abs/2603.13972',
    title: 'FLUX: Data Worth Training On — A Preprocessing Pipeline for Large Language Model Training',
    authors: 'Gowtham, Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya',
    abstract: 'FLUX is a preprocessing pipeline designed to improve the quality of large-scale web datasets used for training language models. The pipeline maximises token retention while maintaining strong filtering standards during dataset construction',
    moreInternal: '/Research/FLUX-Data',
    revClass: 'in-rev in-rev-d2',
  },
  {
    key: 'bluwerp',
    index: 'PUB/004',
    arxiv: 'arXiv:2511.18054',
    published: 'November 2025',
    arxivUrl: 'https://arxiv.org/abs/2511.18054',
    title: 'Blu-WERP (Web Extraction and Refinement Pipeline): A Scalable Pipeline for Preprocessing Large Language Model Datasets',
    authors: 'Gowtham, Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya',
    abstract: 'Blubridge is proudly presenting the process behind "Blu-WERP", our pipeline that is setting a new industry standard for scalable, high-quality LLM pretraining data this month. In our paper, we are demonstrating training and evaluation details, including the data preparation pipeline, from JusText extraction to Benchmark-targeted classification...',
    moreInternal: '/Research/Blu-Werp',
    revClass: 'in-rev in-rev-d2',
  },
];

const tokenOrder = ['t-c', 't-d', 't-a', 't-b', 't-d', 't-c', 't-a', 't-d', 't-b', 't-c', 't-a', 't-b'];

export default function Research() {
  useDocumentTitle('Research | Blubridge');
  const rootRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    rootRef.current?.querySelectorAll('.in-rev').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="internal-site" data-testid="research-page" ref={rootRef}>

      {/* ===== HERO ===== */}
      <header className="in-hero" style={{ paddingBottom: '3rem' }}>
        <div className="in-bluefield" aria-hidden="true"></div>
        <div className="in-scanline" aria-hidden="true"></div>
        <div className="in-wrap relative">
          <div className="flex items-center gap-4 mb-6 in-rev">
            <span className="in-eyebrow">Publication Index</span>
            <div className="hidden sm:block w-44">
              <div className="in-tokenstrip" aria-hidden="true">
                {tokenOrder.map((t, i) => (<span key={i} className={`in-token ${t}`}></span>))}
              </div>
            </div>
          </div>
          <h1 className="in-h1 in-rev in-rev-d1">Papers &amp; Publications</h1>
        </div>
      </header>

      {/* ===== PUBLICATIONS ===== */}
      <div className="in-wrap pb-20">
        <div className="mb-10 in-rev">
          <div className="in-signal-divider" aria-hidden="true"><span>ARCHIVE // 004 ENTRIES</span></div>
        </div>
        <div className="space-y-10 max-w-6xl">
          {publications.map((pub) => (
            <article key={pub.key} className={`in-folio ${pub.revClass}`} data-testid={`publication-${pub.key}`}>
              <div className="in-folio-edge" aria-hidden="true"></div>
              <div className="grid md:grid-cols-12 gap-6 p-7 md:p-10">
                <div className="md:col-span-3 md:border-r md:pr-6" style={{ borderColor: 'var(--in-border)' }}>
                  <p className="text-sm">
                    <span className="font-bold" style={{ color: 'var(--in-ink)' }}>Published:</span>
                    <span className="ml-1" style={{ color: 'var(--in-ink-2)' }}>{pub.published}</span>
                  </p>
                  <a
                    href={pub.arxivUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors"
                    data-testid={`${pub.key}-arxiv-link`}
                    style={{ background: 'var(--in-ink)', color: 'rgb(248, 249, 253)', padding: '10px 18px', borderRadius: '3px' }}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />View on arXiv
                  </a>
                </div>
                <div className="md:col-span-9">
                  <h2 className="in-h3 !text-[1.4rem] leading-tight mb-4">{pub.title}</h2>
                  <div className="mb-5" data-testid={`${pub.key}-authors`}>
                    <p className="leading-relaxed" style={{ fontSize: '13.7px', color: 'var(--in-ink-2)' }}>
                      <Users className="w-[13.5px] h-[13.5px] inline-block align-middle mr-[7px] -mt-[2px]" aria-hidden="true" style={{ color: 'var(--in-muted)' }} />
                      {pub.authors}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4" aria-hidden="true" style={{ color: 'var(--in-muted)' }} />
                    <span className="in-eyebrow">Abstract</span>
                  </div>
                  <p className="in-body">
                    {pub.abstract}
                    {pub.moreExternal ? (
                      <a href={pub.moreExternal} target="_blank" rel="noopener noreferrer" className="hover:underline ml-1" style={{ color: 'var(--in-accent)' }}>More »</a>
                    ) : (
                      <Link to={pub.moreInternal} className="hover:underline ml-1" style={{ color: 'var(--in-accent)' }}>More »</Link>
                    )}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
