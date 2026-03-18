import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';

const FLUX2 = () => {
  useDocumentTitle('FLUX: Data Worth Training On | BluBridge');
  useMetaDescription('FLUX is a preprocessing pipeline designed to eliminate the trade-off between data quality and token retention for large language model training.');

  return (
    <div className="min-h-screen bg-[#f3f1e9]">
      <div className="max-w-4xl mx-auto px-6 py-12 bg-[#fffdf7]">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          FLUX: Data Worth Training On
        </h1>

        {/* Read the Paper Button */}
        <div className="mb-10">
          <a
            href="https://arxiv.org/pdf/2603.13972"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#0B1F3B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#1a3a5c] transition-colors">
              Read the Paper
            </button>
          </a>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-800" style={{ textAlign: "justify" }}>
          
          {/* Opening Statement - Emphasized */}
          <div className="bg-gray-50 border-l-4 border-[#0B1F3B] p-6 mb-8 rounded-r-lg">
            <p className="text-xl font-semibold text-gray-900 mb-2 italic">
              Model performance is visible.
            </p>
             <p className="text-xl font-semibold text-gray-900 mb-2 italic">
               Data curation is not. 
            </p>
              <p className="text-xl font-semibold text-gray-900 mb-2 italic">
               "Yet the latter determines the former."
            </p>
          </div>

          <p className="mb-6">
            Before parameters are scaled, before benchmarks are reported, and before models are deployed, the <strong>training corpus</strong> is constructed. That construction process determines what information is preserved, what is filtered out, and what ultimately shapes the model's behavior.
          </p>

          <p className="mb-6">
            Every token retained is a <strong>deliberate choice</strong>. Every token discarded is a <strong>trade-off</strong>. At web scale, those decisions compound — setting the ceiling for what a language model can achieve.
          </p>

          <p className="mb-6">
            In recent years, the conversation around large language models has centered on scale — larger architectures, more training tokens, and increasing compute budgets. Model releases are evaluated by parameter counts and benchmark scores. <strong>Data preparation</strong> has quietly become a competitive trade secret — rarely disclosed, minimally examined, and fundamental to performance.
          </p>

          <p className="mb-6">
            One reason data curation receives limited scrutiny is the <strong>lack of transparency</strong> around it. Leading LLMs such as <strong>ChatGPT</strong>, <strong>LLaMA</strong>, and <strong>Mistral</strong> have disclosed architectural details and benchmark results, but their data curation pipelines remain largely proprietary.
          </p>

          <p className="mb-10">
            We believe the next phase of LLM progress requires <strong>transparency at the data layer</strong>. At <strong>BluBridge Technologies</strong>, we intend to release FLUX as open source in the future, enabling broader scrutiny, validation, and community-driven improvement.
          </p>

          {/* Key Objective Box */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-3">FLUX Objective</h3>
            <p className="mb-0 text-gray-600">
              Eliminate the traditional trade-off between <strong>data quality</strong> and <strong>token retention</strong>, while operating with <strong>minimal computational cost</strong>. FLUX achieves this by outperforming DCLM and FineWeb in both Quality and Retention.
            </p>
          </div>

          {/* FLUX vs DCLM Section */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            FLUX vs DCLM
          </h2>

          {/* Image: FLUX vs DCLM */}
          <div className="my-8">
            <img 
              src="/images/flux/flux-vs-dclm.png" 
              alt="FLUX vs DCLM learning curve comparison"
              className="w-full rounded-lg border border-gray-200 shadow-sm"
            />
          </div>

          <p className="mb-6">
            At the <strong>3B scale</strong> (60B training tokens), aggregate learning-curve analysis shows that FLUX consistently outperforms DCLM across the full training budget, with the gap widening steadily beyond 30B tokens.
          </p>

          {/* Key Results Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-green-800 mb-3">Key Results at Final Checkpoint:</h4>
            <ul className="list-none space-y-2 mb-0">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>FLUX Aggregate Score:</strong> 51.92 vs DCLM's 50.48 (+1.44 pp)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>MMLU:</strong> 32.14% vs 31.98%</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span><strong>Outperforms on 7 of 9 benchmarks</strong></span>
              </li>
            </ul>
          </div>

          <p className="mb-6">
            <strong>Largest gains observed:</strong> ARC-Challenge (+2.9pp), WinoGrande (+2.9pp), SocialIQA (+2.2pp), and PIQA (+1.9pp).
          </p>

          <p className="mb-6">
            At the <strong>corpus level</strong>, FLUX extracts <strong>50B tokens</strong> from a single Common Crawl dump, compared to 40B for DCLM — a <strong>25% increase</strong> in token retention. Across two dumps, FLUX yields <strong>365B tokens</strong> post-deduplication, exceeding DCLM's 302B tokens by 21%.
          </p>

          <p className="mb-10">
            These results demonstrate that FLUX improves both downstream model performance and token retention simultaneously. The retention advantage does not trade off against quality — <strong>FLUX strictly dominates DCLM on both axes</strong>.
          </p>

          {/* Flux-Base vs Fineweb Section */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            FLUX-Base vs FineWeb
          </h2>

          {/* Image: Flux-Base vs FineWeb */}
          <div className="my-8">
            <img 
              src="/images/flux/flux-base-vs-fineweb.png" 
              alt="FLUX-Base vs FineWeb comparison"
              className="w-full rounded-lg border border-gray-200 shadow-sm"
            />
          </div>

          <p className="mb-6">
            The comparison with FineWeb is conducted using <strong>FLUX-Base</strong>, which represents the FLUX pipeline <em>without</em> the classifier stage.
          </p>

          {/* Comparison Box */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">FineWeb Retention</p>
              <p className="text-2xl font-bold text-gray-800">170B tokens</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-sm text-green-700 mb-1">FLUX-Base Retention</p>
              <p className="text-2xl font-bold text-gray-600">192B tokens</p>
              <p className="text-sm text-green-600">(+12% higher)</p>
            </div>
          </div>

          <p className="mb-6">
            This demonstrates that even without classifier-based filtering, the FLUX preprocessing framework achieves <strong>superior token retention</strong> through its parser, filtering, and deduplication design.
          </p>

          <p className="mb-6">
            Aggregate learning-curve analysis at the <strong>1B parameter scale</strong> (20B training tokens) shows that FLUX-Base consistently outperforms FineWeb across the full training budget.
          </p>

          <p className="mb-10">
            At the final checkpoint, FLUX-Base achieves an aggregate score of <strong>48.53</strong>, compared to <strong>48.05</strong> for FineWeb. These results indicate that the retention gains translate directly into improved downstream model performance.
          </p>

          {/* Compute Savings Section */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            Compute Savings
          </h2>

          {/* Image: Compute Savings */}
          <div className="my-8">
            <img 
              src="/images/flux/compute-savings.png" 
              alt="Compute savings comparison"
              className="w-full max-w-md mx-auto rounded-lg border border-gray-200 shadow-sm"
            />
          </div>

          {/* Compute Savings Highlight */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
            <div className="text-center">
              <p className="text-4xl font-bold text-black-800 mb-2">34.4%</p>
              <p className="text-lg text-black-700 font-medium">Compute Savings</p>
            </div>
            <p className="text-sm text-black-600 mt-4 text-center">
              DCLM requires <strong>1.227 × 10²¹ FLOPs</strong> to reach 50.48 aggregate score.<br/>
              FLUX achieves the same with only <strong>8.044 × 10²⁰ FLOPs</strong>.
            </p>
          </div>

          {/* APEX Parser Section */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            APEX: A Statistical Parser for Large-Scale Web Data Extraction
          </h2>

          <p className="mb-6">
            Web crawl archives distributed by <strong>Common Crawl</strong> are available in three standardized formats:
          </p>

          <ul className="list-none space-y-2 mb-6">
            <li><strong>WARC</strong> — Raw HTTP responses with full HTML content</li>
            <li><strong>WET</strong> — Pre-extracted plain text</li>
            <li><strong>WAT</strong> — Structured metadata records</li>
          </ul>

          <p className="mb-6">
            For pretraining pipelines operating at scale, direct processing of <strong>WARC data</strong> is preferred, as it affords complete control over extraction behavior, content filtering criteria, and downstream text quality.
          </p>

          <p className="mb-6">
            Within the FLUX extraction pipeline, WARC ingestion is performed via <strong>FastWARC</strong>, a C-implemented archive reader engineered for low per-record latency and minimal memory overhead. HTML parsing and content extraction are delegated to <strong>Resiliparse</strong>, a high-throughput framework purpose-built for large-scale web corpora.
          </p>

          <p className="mb-6">
            A distinguishing characteristic of <strong>APEX</strong> is its departure from fixed semantic tag heuristics in favor of <strong>statistical main-content detection</strong>. Candidate page regions are evaluated through a composite scoring function incorporating three orthogonal signals:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <ul className="list-none space-y-3 mb-0">
              <li className="flex items-start">
                <span className="bg-[#0B1F3B] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                <span><strong>Content Density</strong> — Character-to-node ratio within a given subtree</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#0B1F3B] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                <span><strong>Link Density</strong> — Proportion of anchor-enclosed text within a candidate region</span>
              </li>
              <li className="flex items-start">
                <span className="bg-[#0B1F3B] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                <span><strong>Structural Depth</strong> — Relative position of a node with respect to the document root</span>
              </li>
            </ul>
          </div>

          {/* Parser Benchmark Results */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            Parser Benchmark Results
          </h2>

          <p className="mb-6">
            <strong>APEX</strong> achieves the highest token yield across both evaluation configurations, producing <strong>279.5B multilingual tokens</strong> and <strong>54B English tokens</strong>, and is adopted as the production parser for the FLUX pipeline.
          </p>

          {/* Table 1 */}
          <div className="overflow-x-auto my-6 -mx-6 px-6">
            <table className="min-w-[480px] w-full border border-gray-300 text-sm">
              <thead className="bg-[#0B1F3B] text-white">
                <tr>
                  <th className="border border-gray-300 px-3 md:px-4 py-3 text-left font-semibold">Parser</th>
                  <th className="border border-gray-300 px-3 md:px-4 py-3 text-left font-semibold">Tokens (Multilingual)</th>
                  <th className="border border-gray-300 px-3 md:px-4 py-3 text-left font-semibold">Tokens (English)</th>
                  <th className="border border-gray-300 px-3 md:px-4 py-3 text-left font-semibold">Compute Cost (hrs)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">Resiliparse</td>
                  <td className="border border-gray-300 px-4 py-3">279.4B</td>
                  <td className="border border-gray-300 px-4 py-3">54.6B</td>
                  <td className="border border-gray-300 px-4 py-3">6.63</td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="border border-gray-300 px-4 py-3">APEX ★</td>
                  <td className="border border-gray-300 px-4 py-3">279.5B</td>
                  <td className="border border-gray-300 px-4 py-3">54.0B</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700">4.31</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">Trafilatura</td>
                  <td className="border border-gray-300 px-4 py-3">136.7B</td>
                  <td className="border border-gray-300 px-4 py-3">35.5B</td>
                  <td className="border border-gray-300 px-4 py-3">47.33</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 italic mb-4">
            Evaluation performed on 10K WARC files from CC-MAIN-2025-51 Common Crawl snapshot.
          </p>

          {/* Image: Parser Benchmark */}
          <div className="my-8">
            <img 
              src="/images/flux/parser-benchmark.png" 
              alt="Parser benchmark comparison"
              className="w-full rounded-lg border border-gray-200 shadow-sm"
            />
            <p className="text-sm text-gray-600 italic text-center mt-2">
              Comparative parser evaluation on a 530M-scale model trained on 10.6B tokens.
            </p>
          </div>

          {/* Deterministic Filter Pipeline */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            Deterministic Filter Pipeline
          </h2>

          <p className="mb-6">
            Most data preprocessing pipelines face a frustrating trade-off: <strong>filter aggressively</strong> for quality and you lose too many tokens, or <strong>keep everything</strong> and let noise degrade your model.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="font-semibold text-yellow-800 mb-2">FLUX's Different Approach:</p>
            <p className="text-yellow-700 mb-0">
              Instead of discarding entire documents, FLUX <strong>surgically removes only problematic lines</strong> — cookie banners, social media counters, navigation breadcrumbs, JavaScript artifacts, and form labels — and keeps the rest.
            </p>
          </div>

          <p className="mb-10">
            This <strong>line-level excision</strong>, enforced across eleven distinct heuristic classes, is why FLUX retains <strong>27.2B</strong> post-deduplication tokens where DCLM retains only <strong>24.8B</strong> and FineWeb retains <strong>24.5B</strong>.
          </p>

          {/* Filtering Stage Results */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            Filtering Stage Results
          </h2>

          <p className="text-sm text-gray-600 italic mb-4">
            530M scale · 10.6B tokens · post-deduplication
          </p>

          {/* Table 2 */}
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-[#0B1F3B] text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Pipeline</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Post-Dedup Tokens</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Aggregate (530M)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">FineWeb</td>
                  <td className="border border-gray-300 px-4 py-3">24.50B</td>
                  <td className="border border-gray-300 px-4 py-3">44.31</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">DCLM</td>
                  <td className="border border-gray-300 px-4 py-3">24.81B</td>
                  <td className="border border-gray-300 px-4 py-3">44.40</td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="border border-gray-300 px-4 py-3">FLUX ★</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700">27.22B</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700">45.45</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Image: Filtering Overview */}
          <div className="my-8">
            <img 
              src="/images/flux/flux-base-comparison.png" 
              alt="FLUX filtering design and retention-quality behavior"
              className="w-full rounded-lg border border-gray-200 shadow-sm"
            />
            <p className="text-sm text-gray-600 italic text-center mt-2">
              Overview of FLUX filtering design and its retention–quality behavior.
            </p>
          </div>

          <p className="mb-10">
            <strong>The core insight is simple:</strong> when you remove only what is genuinely bad rather than discarding everything that contains something bad, you get <strong>more data</strong> and <strong>better data</strong> at the same time.
          </p>

          {/* Preprocessing Efficiency */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            Preprocessing Efficiency
          </h2>

          <p className="text-sm text-gray-600 italic mb-4">
            Filtering-stage compute cost on identical hardware (c8a.8xlarge, 32 vCPUs) over 10,000 WARC files.
          </p>

          {/* Table 3 */}
          <div className="overflow-x-auto my-6 -mx-6 px-6">
            <table className="min-w-[520px] w-full border border-gray-300 text-sm">
              <thead className="bg-[#0B1F3B] text-white">
                <tr>
                  <th className="border border-gray-300 px-3 md:px-4 py-3 text-left font-semibold">Pipeline</th>
                  <th className="border border-gray-300 px-3 md:px-4 py-3 text-left font-semibold">Input</th>
                  <th className="border border-gray-300 px-3 md:px-4 py-3 text-left font-semibold">Wall-clock</th>
                  <th className="border border-gray-300 px-3 md:px-4 py-3 text-left font-semibold">CPU-hrs</th>
                  <th className="border border-gray-300 px-3 md:px-4 py-3 text-left font-semibold">vs. FLUX</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">DCLM</td>
                  <td className="border border-gray-300 px-4 py-3">1.20 TB</td>
                  <td className="border border-gray-300 px-4 py-3">11 hr 7 min</td>
                  <td className="border border-gray-300 px-4 py-3">355.7</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">6.26× slower</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">FineWeb</td>
                  <td className="border border-gray-300 px-4 py-3">0.60 TB</td>
                  <td className="border border-gray-300 px-4 py-3">5 hr 39 min</td>
                  <td className="border border-gray-300 px-4 py-3">181.0</td>
                  <td className="border border-gray-300 px-4 py-3 text-red-600">6.36× slower</td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="border border-gray-300 px-4 py-3">FLUX ★</td>
                  <td className="border border-gray-300 px-4 py-3">1.03 TB</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700">1 hr 31 min</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700">48.5</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-700">1.00× (baseline)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dual-Bin Classifier */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            Dual-Bin Classifier
          </h2>

          <p className="mb-6">
            Content classification in large-scale data pipelines is typically performed using <strong>model-based filtering</strong>. Heuristic rules alone are insufficient to remove semantically weak or low-information content.
          </p>

          <p className="mb-6">
            Such semantically weak data — while structurally valid — often degrades downstream learning quality. Removing it requires <strong>classifier-based filtering</strong>, using lightweight models such as <strong>fastText</strong> or larger language models to assess semantic relevance and information density.
          </p>

          <p className="mb-6">
            In practice, single-bin classifiers can be sensitive to threshold selection. To improve separation between high-quality and low-quality content, FLUX adopts a <strong>dual-bin classification strategy</strong>:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-black-800 mb-2">BETR Classifier</h4>
              <p className="text-sm text-black-700 mb-0">Introduced in Blu-WERP work</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <h4 className="font-bold text-black-800 mb-2">DCLM Classifier</h4>
              <p className="text-sm text-black-700 mb-0">DataComp-LM standard</p>
            </div>
          </div>

          {/* Acceptance Rule */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            Acceptance Rule
          </h2>

          <p className="mb-6">
            Given a document <em>d</em>, let <strong>s<sub>DCLM</sub>(d)</strong> and <strong>s<sub>BETR</sub>(d)</strong> denote the scalar confidence scores produced by the respective classifiers, each calibrated to [0, 1] for the positive (high-quality) class label.
          </p>

          <p className="mb-4">Document <em>d</em> is accepted into the final corpus if and only if:</p>

          <div className="bg-gray-900 text-white p-6 rounded-lg my-6 text-center font-mono">
            <p className="text-lg mb-0">
              s<sub>DCLM</sub>(d) ≥ τ<sub>DCLM</sub> &nbsp;&nbsp;<span className="text-yellow-400 font-bold">∨</span>&nbsp;&nbsp; s<sub>BETR</sub>(d) ≥ τ<sub>BETR</sub>
            </p>
          </div>

          {/* Image: Threshold Ablation */}
          <div className="my-8">
            <img 
              src="/images/flux/threshold-ablation.png" 
              alt="Threshold ablation experiments"
              className="w-full rounded-lg border border-gray-200 shadow-sm"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-10">
            <h4 className="font-bold text-gray-800 mb-3">Optimal Thresholds Found:</h4>
            <ul className="list-none space-y-2 mb-0">
              <li><strong>BETR threshold:</strong> 0.76</li>
              <li><strong>DCLM threshold:</strong> 0.025119</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3 mb-0">
              This configuration achieved best performance across both the aggregate benchmark suite and MMLU.
            </p>
          </div>

          {/* The FLUX Pipeline */}
          <h2 className="text-2xl font-bold text-[#0B1F3B] mt-12 mb-6 pb-2 border-b-2 border-[#0B1F3B]">
            The FLUX Pipeline
          </h2>

          <p className="mb-6">
            To establish the final FLUX configuration, we performed a <strong>staged ablation</strong> across the major pipeline components: parser selection, heuristic filtering, deduplication, and classification.
          </p>

          {/* Pipeline Stages */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <div className="w-24 md:w-32 text-right pr-3 md:pr-4 text-xs md:text-sm text-gray-600 flex-shrink-0">Parser only</div>
              <div className="flex-1 bg-gray-200 rounded-full h-7 relative overflow-hidden">
                <div className="bg-gray-500 h-7 rounded-full flex items-center justify-end pr-2" style={{width: '41%'}}>
                  <span className="text-xs font-semibold text-white">41.23</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 md:w-32 text-right pr-3 md:pr-4 text-xs md:text-sm text-gray-600 flex-shrink-0">+ Filters</div>
              <div className="flex-1 bg-gray-200 rounded-full h-7 relative overflow-hidden">
                <div className="bg-blue-500 h-7 rounded-full flex items-center justify-end pr-2" style={{width: '42.4%'}}>
                  <span className="text-xs font-semibold text-white">42.43</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 md:w-32 text-right pr-3 md:pr-4 text-xs md:text-sm text-gray-600 flex-shrink-0">+ Dedup</div>
              <div className="flex-1 bg-gray-200 rounded-full h-7 relative overflow-hidden">
                <div className="bg-indigo-500 h-7 rounded-full flex items-center justify-end pr-2" style={{width: '45.4%'}}>
                  <span className="text-xs font-semibold text-white">45.45</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 md:w-32 text-right pr-3 md:pr-4 text-xs md:text-sm text-gray-600 flex-shrink-0">+ Classifier</div>
              <div className="flex-1 bg-gray-200 rounded-full h-7 relative overflow-hidden">
                <div className="bg-green-500 h-7 rounded-full flex items-center justify-end pr-2" style={{width: '48.2%'}}>
                  <span className="text-xs font-semibold text-white">48.22</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image: Pipeline Ablation */}
          <div className="my-8">
            <img 
              src="/images/flux/pipeline-ablation.png" 
              alt="Pipeline ablation results"
              className="w-full rounded-lg border border-gray-200 shadow-sm"
            />
          </div>

          {/* Final Results Box */}
          <div className="bg-gray-100 text-gray-600 p-6 rounded-lg mb-10">
            <h3 className="text-xl font-bold mb-4 text-center">Final FLUX Results at 3B Scale</h3>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-gray-800">51.92%</p>
                <p className="text-sm text-gray-600">Aggregate Score</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">32.14%</p>
                <p className="text-sm text-gray-600">MMLU Score</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FLUX2;
