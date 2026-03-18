import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';

const SectionNumber = ({ num }) => (
  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0B1F3B] text-white text-sm font-bold mr-3 flex-shrink-0">
    {num}
  </span>
);

const StatCard = ({ label, value, sub, highlight }) => (
  <div className={`rounded-xl p-5 text-center ${highlight ? 'bg-[#0B1F3B] text-white' : 'bg-white border border-gray-200'}`}>
    <p className={`text-3xl font-extrabold mb-1 ${highlight ? 'text-emerald-400' : 'text-[#0B1F3B]'}`}>{value}</p>
    <p className={`text-sm font-medium ${highlight ? 'text-gray-300' : 'text-gray-600'}`}>{label}</p>
    {sub && <p className={`text-xs mt-1 ${highlight ? 'text-gray-400' : 'text-gray-400'}`}>{sub}</p>}
  </div>
);

const FLUX3 = () => {
  useDocumentTitle('FLUX: Data Worth Training On | BluBridge');
  useMetaDescription('FLUX is a preprocessing pipeline designed to eliminate the trade-off between data quality and token retention for large language model training.');

  return (
    <div className="min-h-screen bg-[#f5f3eb]" data-testid="flux3-page">
      {/* Hero Header */}
      <div className="bg-[#0B1F3B] text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <p className="text-emerald-400 uppercase tracking-widest text-sm font-semibold mb-4">BluBridge Research</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6" data-testid="flux3-title">
            FLUX: Data Worth<br />Training On
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            A preprocessing pipeline that eliminates the trade-off between data quality and token retention, while operating with minimal computational cost.
          </p>
          <a
            href="https://arxiv.org/pdf/2603.13972"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="flux3-read-paper-btn"
          >
            <button className="bg-white text-[#0B1F3B] px-8 py-3 rounded-full font-bold hover:bg-emerald-400 hover:text-white transition-all duration-300 shadow-lg">
              Read the Paper
            </button>
          </a>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Opening Quote */}
        <div className="relative bg-white rounded-2xl shadow-sm p-8 mb-12 border-l-4 border-emerald-500">
          <svg className="absolute top-4 left-6 w-8 h-8 text-emerald-200 opacity-60" fill="currentColor" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>
          <p className="text-xl md:text-2xl font-light text-gray-700 italic pl-8 leading-relaxed">
            Model performance is visible. Data curation is not.<br />
            <span className="font-semibold not-italic text-[#0B1F3B]">Yet the latter determines the former.</span>
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <p className="text-gray-700 leading-relaxed mb-5">
            Before parameters are scaled, before benchmarks are reported, and before models are deployed, the <strong>training corpus</strong> is constructed. That construction process determines what information is preserved, what is filtered out, and what ultimately shapes the model's behavior.
          </p>
          <p className="text-gray-700 leading-relaxed mb-5">
            Every token retained is a <strong>deliberate choice</strong>. Every token discarded is a <strong>trade-off</strong>. At web scale, those decisions compound — setting the ceiling for what a language model can achieve.
          </p>
          <p className="text-gray-700 leading-relaxed mb-5">
            In recent years, the conversation around large language models has centered on scale — larger architectures, more training tokens, and increasing compute budgets. <strong>Data preparation</strong> has quietly become a competitive trade secret — rarely disclosed, minimally examined, and fundamental to performance.
          </p>
          <p className="text-gray-700 leading-relaxed mb-5">
            Leading LLMs such as <strong>ChatGPT</strong>, <strong>LLaMA</strong>, and <strong>Mistral</strong> have disclosed architectural details and benchmark results, but their data curation pipelines remain largely proprietary.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We believe the next phase of LLM progress requires <strong>transparency at the data layer</strong>. At <strong>BluBridge Technologies</strong>, we intend to release FLUX as open source in the future, enabling broader scrutiny, validation, and community-driven improvement.
          </p>
        </div>

        {/* Key Objective */}
        <div className="bg-gradient-to-r from-[#0B1F3B] to-[#1a3a5c] rounded-2xl p-8 mb-12 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-3 text-emerald-400 uppercase tracking-wider">Core Objective</h3>
          <p className="text-lg leading-relaxed">
            Eliminate the traditional trade-off between <strong>data quality</strong> and <strong>token retention</strong>, while operating with <strong>minimal computational cost</strong>. FLUX achieves this by outperforming DCLM and FineWeb in both Quality and Retention.
          </p>
        </div>

        {/* ======== Section 1: FLUX vs DCLM ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-flux-vs-dclm">
            <SectionNumber num="1" />
            FLUX vs DCLM
          </h2>

          <div className="my-6 rounded-xl overflow-hidden border border-gray-200">
            <img
              src="/images/flux/flux-vs-dclm.png"
              alt="FLUX vs DCLM learning curve comparison"
              className="w-full"
            />
          </div>

          <p className="text-gray-700 leading-relaxed mb-5">
            At the <strong>3B scale</strong> (60B training tokens), aggregate learning-curve analysis shows that FLUX consistently outperforms DCLM across the full training budget, with the gap widening steadily beyond 30B tokens.
          </p>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            <StatCard value="51.92" label="FLUX Score" sub="Aggregate" highlight />
            <StatCard value="50.48" label="DCLM Score" sub="Aggregate" />
            <StatCard value="7 / 9" label="Benchmarks Won" sub="by FLUX" highlight />
            <StatCard value="+25%" label="Token Retention" sub="vs DCLM" />
          </div>

          <p className="text-gray-700 leading-relaxed mb-5">
            <strong>Largest gains observed:</strong> ARC-Challenge (+2.9pp), WinoGrande (+2.9pp), SocialIQA (+2.2pp), and PIQA (+1.9pp).
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            At the <strong>corpus level</strong>, FLUX extracts <strong>50B tokens</strong> from a single Common Crawl dump, compared to 40B for DCLM. Across two dumps, FLUX yields <strong>365B tokens</strong> post-deduplication, exceeding DCLM's 302B tokens by 21%.
          </p>

          <p className="text-gray-700 leading-relaxed">
            These results demonstrate that FLUX improves both downstream model performance and token retention simultaneously. <strong>FLUX strictly dominates DCLM on both axes.</strong>
          </p>
        </div>

        {/* ======== Section 2: FLUX-Base vs FineWeb ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-flux-base-vs-fineweb">
            <SectionNumber num="2" />
            FLUX-Base vs FineWeb
          </h2>

          <div className="my-6 rounded-xl overflow-hidden border border-gray-200">
            <img
              src="/images/flux/flux-base-vs-fineweb.png"
              alt="FLUX-Base vs FineWeb comparison"
              className="w-full"
            />
          </div>

          <p className="text-gray-700 leading-relaxed mb-5">
            The comparison with FineWeb is conducted using <strong>FLUX-Base</strong>, which represents the FLUX pipeline <em>without</em> the classifier stage.
          </p>

          {/* Side-by-side Comparison */}
          <div className="grid md:grid-cols-2 gap-4 my-8">
            <div className="rounded-xl border-2 border-gray-200 p-6 text-center">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">FineWeb</p>
              <p className="text-3xl font-extrabold text-gray-400">170B</p>
              <p className="text-sm text-gray-500">tokens retained</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50 p-6 text-center">
              <p className="text-xs uppercase tracking-wider text-emerald-600 mb-2">FLUX-Base</p>
              <p className="text-3xl font-extrabold text-emerald-600">192B</p>
              <p className="text-sm text-emerald-500">tokens retained (+12%)</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-5">
            Even without classifier-based filtering, the FLUX preprocessing framework achieves <strong>superior token retention</strong> through its parser, filtering, and deduplication design.
          </p>

          <p className="text-gray-700 leading-relaxed">
            At the final checkpoint, FLUX-Base achieves an aggregate score of <strong>48.53</strong> vs <strong>48.05</strong> for FineWeb — retention gains translate directly into improved downstream performance.
          </p>
        </div>

        {/* ======== Section 3: Compute Savings ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-compute-savings">
            <SectionNumber num="3" />
            Compute Savings
          </h2>

          <div className="my-6 rounded-xl overflow-hidden border border-gray-200 max-w-md mx-auto">
            <img
              src="/images/flux/compute-savings.png"
              alt="Compute savings comparison"
              className="w-full"
            />
          </div>

          <div className="bg-[#0B1F3B] rounded-2xl p-8 my-8 text-center">
            <p className="text-6xl font-black text-emerald-400 mb-2">34.4%</p>
            <p className="text-white text-lg font-medium mb-4">Compute Savings</p>
            <div className="flex flex-col md:flex-row justify-center gap-6 text-sm">
              <div className="text-gray-400">
                <span className="text-gray-500">DCLM:</span> <span className="text-white font-mono">1.227 × 10²¹</span> FLOPs
              </div>
              <div className="text-gray-400">
                <span className="text-emerald-400">FLUX:</span> <span className="text-white font-mono">8.044 × 10²⁰</span> FLOPs
              </div>
            </div>
          </div>
        </div>

        {/* ======== Section 4: APEX Parser ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-apex">
            <SectionNumber num="4" />
            APEX: A Statistical Parser for Large-Scale Web Data Extraction
          </h2>

          <p className="text-gray-700 leading-relaxed mb-5">
            Web crawl archives distributed by <strong>Common Crawl</strong> are available in three standardized formats:
          </p>

          <div className="grid md:grid-cols-3 gap-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
              <p className="font-bold text-[#0B1F3B] mb-1">WARC</p>
              <p className="text-xs text-gray-500">Raw HTTP + full HTML</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
              <p className="font-bold text-[#0B1F3B] mb-1">WET</p>
              <p className="text-xs text-gray-500">Pre-extracted plain text</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
              <p className="font-bold text-[#0B1F3B] mb-1">WAT</p>
              <p className="text-xs text-gray-500">Structured metadata</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-5">
            For pretraining pipelines operating at scale, direct processing of <strong>WARC data</strong> is preferred. Within FLUX, WARC ingestion is performed via <strong>FastWARC</strong>, and HTML parsing is delegated to <strong>Resiliparse</strong>.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            A distinguishing characteristic of <strong>APEX</strong> is its departure from fixed semantic tag heuristics in favor of <strong>statistical main-content detection</strong>:
          </p>

          {/* Three Signals */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#0B1F3B] text-white flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-0.5">1</div>
              <div>
                <p className="font-bold text-[#0B1F3B]">Content Density</p>
                <p className="text-sm text-gray-600">Character-to-node ratio within a given subtree</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#0B1F3B] text-white flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="font-bold text-[#0B1F3B]">Link Density</p>
                <p className="text-sm text-gray-600">Proportion of anchor-enclosed text within a candidate region</p>
              </div>
            </div>
            <div className="flex items-start bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#0B1F3B] text-white flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 mt-0.5">3</div>
              <div>
                <p className="font-bold text-[#0B1F3B]">Structural Depth</p>
                <p className="text-sm text-gray-600">Relative position of a node with respect to the document root</p>
              </div>
            </div>
          </div>
        </div>

        {/* ======== Section 5: Parser Benchmark ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-parser-benchmark">
            <SectionNumber num="5" />
            Parser Benchmark Results
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>APEX</strong> achieves the highest token yield across both configurations, producing <strong>279.5B multilingual tokens</strong> and <strong>54B English tokens</strong>.
          </p>

          {/* Styled Table */}
          <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#0B1F3B] text-white">
                  <th className="px-5 py-3 text-left font-semibold">Parser</th>
                  <th className="px-5 py-3 text-left font-semibold">Tokens (Multilingual)</th>
                  <th className="px-5 py-3 text-left font-semibold">Tokens (English)</th>
                  <th className="px-5 py-3 text-left font-semibold">Compute Cost (hrs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">Resiliparse</td>
                  <td className="px-5 py-3 text-gray-700">279.4B</td>
                  <td className="px-5 py-3 text-gray-700">54.6B</td>
                  <td className="px-5 py-3 text-gray-700">6.63</td>
                </tr>
                <tr className="bg-emerald-50 font-semibold">
                  <td className="px-5 py-3 text-emerald-800">APEX</td>
                  <td className="px-5 py-3 text-emerald-800">279.5B</td>
                  <td className="px-5 py-3 text-emerald-800">54.0B</td>
                  <td className="px-5 py-3 text-emerald-700">4.31</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">Trafilatura</td>
                  <td className="px-5 py-3 text-gray-700">136.7B</td>
                  <td className="px-5 py-3 text-gray-700">35.5B</td>
                  <td className="px-5 py-3 text-gray-700">47.33</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 italic mb-6">
            Evaluation on 10K WARC files from CC-MAIN-2025-51 Common Crawl snapshot.
          </p>

          <div className="my-6 rounded-xl overflow-hidden border border-gray-200">
            <img
              src="/images/flux/parser-benchmark.png"
              alt="Parser benchmark comparison"
              className="w-full"
            />
            <p className="text-xs text-gray-500 italic text-center py-3 bg-gray-50">
              Comparative parser evaluation on a 530M-scale model trained on 10.6B tokens.
            </p>
          </div>
        </div>

        {/* ======== Section 6: Deterministic Filter Pipeline ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-filter-pipeline">
            <SectionNumber num="6" />
            Deterministic Filter Pipeline
          </h2>

          <p className="text-gray-700 leading-relaxed mb-5">
            Most data preprocessing pipelines face a frustrating trade-off: <strong>filter aggressively</strong> for quality and you lose too many tokens, or <strong>keep everything</strong> and let noise degrade your model.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
            <p className="font-bold text-amber-800 mb-2">FLUX's Approach: Line-Level Excision</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Instead of discarding entire documents, FLUX <strong>surgically removes only the problematic lines</strong> — cookie banners, social media counters, navigation breadcrumbs, JavaScript artifacts, and form labels — and keeps the rest. This is enforced across <strong>eleven distinct heuristic classes</strong>.
            </p>
          </div>
        </div>

        {/* ======== Section 7: Filtering Stage Results ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-filtering-results">
            <SectionNumber num="7" />
            Filtering Stage Results
          </h2>

          <p className="text-xs text-gray-500 italic mb-6">
            530M scale · 10.6B tokens · post-deduplication
          </p>

          <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#0B1F3B] text-white">
                  <th className="px-5 py-3 text-left font-semibold">Pipeline</th>
                  <th className="px-5 py-3 text-left font-semibold">Post-Dedup Tokens</th>
                  <th className="px-5 py-3 text-left font-semibold">Aggregate (530M)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">FineWeb</td>
                  <td className="px-5 py-3 text-gray-700">24.50B</td>
                  <td className="px-5 py-3 text-gray-700">44.31</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">DCLM</td>
                  <td className="px-5 py-3 text-gray-700">24.81B</td>
                  <td className="px-5 py-3 text-gray-700">44.40</td>
                </tr>
                <tr className="bg-emerald-50 font-semibold">
                  <td className="px-5 py-3 text-emerald-800">FLUX</td>
                  <td className="px-5 py-3 text-emerald-700">27.22B</td>
                  <td className="px-5 py-3 text-emerald-700">45.45</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-6 rounded-xl overflow-hidden border border-gray-200">
            <img
              src="/images/flux/flux-base-comparison.png"
              alt="FLUX filtering design and retention-quality behavior"
              className="w-full"
            />
            <p className="text-xs text-gray-500 italic text-center py-3 bg-gray-50">
              Overview of FLUX filtering design and its retention-quality behavior.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#0B1F3B]">
            <p className="text-gray-700 leading-relaxed">
              <strong>The core insight:</strong> When you remove only what is genuinely bad rather than discarding everything that contains something bad, you get <strong>more data</strong> and <strong>better data</strong> at the same time. FLUX is 6.26× faster to preprocess per terabyte.
            </p>
          </div>
        </div>

        {/* ======== Section 8: Preprocessing Efficiency ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-preprocessing">
            <SectionNumber num="8" />
            Preprocessing Efficiency
          </h2>

          <p className="text-xs text-gray-500 italic mb-6">
            Filtering-stage compute cost on identical hardware (c8a.8xlarge, 32 vCPUs) over 10,000 WARC files.
          </p>

          <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#0B1F3B] text-white">
                  <th className="px-5 py-3 text-left font-semibold">Pipeline</th>
                  <th className="px-5 py-3 text-left font-semibold">Input</th>
                  <th className="px-5 py-3 text-left font-semibold">Wall-clock</th>
                  <th className="px-5 py-3 text-left font-semibold">CPU-hrs</th>
                  <th className="px-5 py-3 text-left font-semibold">vs. FLUX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">DCLM</td>
                  <td className="px-5 py-3 text-gray-700">1.20 TB</td>
                  <td className="px-5 py-3 text-gray-700">11 hr 7 min</td>
                  <td className="px-5 py-3 text-gray-700">355.7</td>
                  <td className="px-5 py-3 text-red-500 font-semibold">6.26× slower</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">FineWeb</td>
                  <td className="px-5 py-3 text-gray-700">0.60 TB</td>
                  <td className="px-5 py-3 text-gray-700">5 hr 39 min</td>
                  <td className="px-5 py-3 text-gray-700">181.0</td>
                  <td className="px-5 py-3 text-red-500 font-semibold">6.36× slower</td>
                </tr>
                <tr className="bg-emerald-50 font-semibold">
                  <td className="px-5 py-3 text-emerald-800">FLUX</td>
                  <td className="px-5 py-3 text-emerald-800">1.03 TB</td>
                  <td className="px-5 py-3 text-emerald-700">1 hr 31 min</td>
                  <td className="px-5 py-3 text-emerald-700">48.5</td>
                  <td className="px-5 py-3 text-emerald-600">1.00× (baseline)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ======== Section 9: Dual-Bin Classifier ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-dual-bin">
            <SectionNumber num="9" />
            Dual-Bin Classifier
          </h2>

          <p className="text-gray-700 leading-relaxed mb-5">
            Content classification in large-scale data pipelines is typically performed using <strong>model-based filtering</strong>. Heuristic rules alone are insufficient to remove semantically weak or low-information content.
          </p>

          <p className="text-gray-700 leading-relaxed mb-5">
            Such data — while structurally valid — often degrades downstream learning quality. Removing it requires <strong>classifier-based filtering</strong> using lightweight models such as <strong>fastText</strong>.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            FLUX adopts a <strong>dual-bin classification strategy</strong> for better separation between high-quality and low-quality content:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl bg-[#0B1F3B] p-6 text-center">
              <p className="text-emerald-400 font-bold text-lg mb-1">BETR Classifier</p>
              <p className="text-gray-400 text-sm">Introduced in Blu-WERP</p>
            </div>
            <div className="rounded-xl bg-[#0B1F3B] p-6 text-center">
              <p className="text-emerald-400 font-bold text-lg mb-1">DCLM Classifier</p>
              <p className="text-gray-400 text-sm">DataComp-LM standard</p>
            </div>
          </div>
        </div>

        {/* ======== Section 10: Acceptance Rule ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-acceptance-rule">
            <SectionNumber num="10" />
            Acceptance Rule
          </h2>

          <p className="text-gray-700 leading-relaxed mb-5">
            Given a document <em>d</em>, let <strong>s<sub>DCLM</sub>(d)</strong> and <strong>s<sub>BETR</sub>(d)</strong> denote the scalar confidence scores produced by the respective classifiers, each calibrated to [0, 1].
          </p>

          <p className="text-gray-700 mb-4">Document <em>d</em> is accepted if and only if:</p>

          <div className="bg-[#0f172a] text-white p-6 rounded-xl my-6 text-center font-mono shadow-inner">
            <p className="text-lg">
              s<sub>DCLM</sub>(d) &ge; &tau;<sub>DCLM</sub> &nbsp;&nbsp;<span className="text-emerald-400 font-bold text-xl">&#8744;</span>&nbsp;&nbsp; s<sub>BETR</sub>(d) &ge; &tau;<sub>BETR</sub>
            </p>
          </div>

          <div className="my-6 rounded-xl overflow-hidden border border-gray-200">
            <img
              src="/images/flux/threshold-ablation.png"
              alt="Threshold ablation experiments"
              className="w-full"
            />
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <p className="font-bold text-emerald-800 mb-3">Optimal Thresholds</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-600 mb-1">BETR</p>
                <p className="text-2xl font-mono font-bold text-[#0B1F3B]">0.76</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-600 mb-1">DCLM</p>
                <p className="text-2xl font-mono font-bold text-[#0B1F3B]">0.025119</p>
              </div>
            </div>
            <p className="text-xs text-emerald-600 mt-3">
              Best performance across aggregate benchmarks and MMLU.
            </p>
          </div>
        </div>

        {/* ======== Section 11: The FLUX Pipeline ======== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 mb-10" style={{ textAlign: "justify" }}>
          <h2 className="flex items-center text-2xl font-bold text-[#0B1F3B] mb-6" data-testid="flux3-section-pipeline">
            <SectionNumber num="11" />
            The FLUX Pipeline
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            A <strong>staged ablation</strong> across the major pipeline components — parser selection, heuristic filtering, deduplication, and classification — reveals consistent, progressive improvement:
          </p>

          {/* Vertical Pipeline Steps */}
          <div className="space-y-0 mb-8">
            <div className="flex items-stretch">
              <div className="flex flex-col items-center mr-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                <div className="w-0.5 flex-1 bg-gray-200"></div>
              </div>
              <div className="pb-6">
                <p className="font-bold text-gray-700">Parser Only</p>
                <p className="text-sm text-gray-500">Aggregate: <span className="font-mono font-semibold text-gray-700">41.23</span></p>
              </div>
            </div>
            <div className="flex items-stretch">
              <div className="flex flex-col items-center mr-4">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                <div className="w-0.5 flex-1 bg-gray-200"></div>
              </div>
              <div className="pb-6">
                <p className="font-bold text-gray-700">+ Filters</p>
                <p className="text-sm text-gray-500">Aggregate: <span className="font-mono font-semibold text-gray-700">42.43</span> <span className="text-blue-500 text-xs">(+1.20)</span></p>
              </div>
            </div>
            <div className="flex items-stretch">
              <div className="flex flex-col items-center mr-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                <div className="w-0.5 flex-1 bg-gray-200"></div>
              </div>
              <div className="pb-6">
                <p className="font-bold text-gray-700">+ Deduplication</p>
                <p className="text-sm text-gray-500">Aggregate: <span className="font-mono font-semibold text-gray-700">45.45</span> <span className="text-indigo-500 text-xs">(+3.02)</span></p>
              </div>
            </div>
            <div className="flex items-stretch">
              <div className="flex flex-col items-center mr-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
              </div>
              <div>
                <p className="font-bold text-gray-700">+ Classification</p>
                <p className="text-sm text-gray-500">Aggregate: <span className="font-mono font-semibold text-emerald-600">48.22</span> <span className="text-emerald-500 text-xs">(+2.77)</span></p>
              </div>
            </div>
          </div>

          <div className="my-6 rounded-xl overflow-hidden border border-gray-200">
            <img
              src="/images/flux/pipeline-ablation.png"
              alt="Pipeline ablation results"
              className="w-full"
            />
          </div>

          {/* Final Results */}
          <div className="bg-gradient-to-r from-[#0B1F3B] to-[#1a3a5c] rounded-2xl p-8 mt-8 text-center shadow-lg">
            <p className="text-emerald-400 uppercase tracking-widest text-sm font-semibold mb-4">Final FLUX Results at 3B Scale</p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl md:text-5xl font-black text-white">51.92%</p>
                <p className="text-sm text-gray-400 mt-1">Aggregate Score</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-white">32.14%</p>
                <p className="text-sm text-gray-400 mt-1">MMLU Score</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FLUX3;
