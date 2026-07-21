import React from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useMetaDescription from '../../hooks/useMetaDescription';

const FLUX4 = () => {
  useDocumentTitle('FLUX: Data Worth Training On | BluBridge');
  useMetaDescription('FLUX is a preprocessing pipeline designed to eliminate the trade-off between data quality and token retention for large language model training.');

  return (
    <div className="min-h-screen bg-[#e8eaf3]">
      <div className="max-w-4xl mx-auto px-6 py-12 bg-[#f1f2fa]">
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
          
          {/* Opening Statement */}
          <p className="text-xl font-medium text-gray-900 leading-relaxed mb-2">
            <strong>Model performance is visible.</strong>
          </p>
          <p className="text-xl font-medium text-gray-900 leading-relaxed mb-2">
            <strong>Data curation is not.</strong>
          </p>
          <p className="text-xl font-medium text-gray-900 leading-relaxed mb-6">
            <strong>Yet the latter determines the former.</strong>
          </p>

          <p className="mb-6">
            Before parameters are scaled, before benchmarks are reported, and before models are deployed, the <strong>training corpus</strong> is constructed. That construction process determines what information is preserved, what is filtered out, and what ultimately shapes the model's behavior.
          </p>

          <p className="mb-6">
            Every token retained is a <strong>deliberate choice</strong>. Every token discarded is a <strong>trade-off</strong>. At web scale, those decisions compound — setting the ceiling for what a language model can achieve.
          </p>

          <p className="mb-6">
            In recent years, the conversation around large language models has centered on <strong>scale</strong> — larger architectures, more training tokens, and increasing compute budgets. Model releases are evaluated by parameter counts and benchmark scores. <strong>Data preparation</strong> has quietly become a <strong>competitive trade secret</strong> — rarely disclosed, minimally examined, and fundamental to performance.
          </p>

          <p className="mb-6">
            One reason data curation receives limited scrutiny is the <strong>lack of transparency</strong> around it. Leading LLMs such as <strong>ChatGPT</strong>, <strong>LLaMA</strong>, and <strong>Mistral</strong> have disclosed architectural details and benchmark results, but their data curation pipelines remain <strong>largely proprietary</strong>.
          </p>

          <p className="mb-10">
            We believe the next phase of LLM progress requires <strong>transparency at the data layer</strong>. At <strong>BluBridge Technologies</strong>, we intend to release <strong>FLUX as open source</strong> in the future, enabling broader scrutiny, validation, and community-driven improvement.
          </p>

          <p className="mb-10">
            The objective of FLUX is to eliminate the traditional trade-off between <strong>data quality</strong> and <strong>token retention</strong>, while operating with <strong>minimal computational cost</strong>. Flux achieves it comprehensively by outperforming <strong>DCLM</strong> and <strong>Fineweb</strong> in both the <strong>Quality</strong> and <strong>Retention</strong>.
          </p>

          {/* FLUX vs DCLM Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Flux vs DCLM</h2>

          {/* Image: FLUX vs DCLM */}
          <div className="my-8">
            <img 
              src="/images/flux/flux-vs-dclm.png" 
              alt="FLUX vs DCLM learning curve comparison showing FLUX consistently outperforming DCLM"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          <p className="mb-6">
            At the <strong>3B scale</strong> (<strong>60B training tokens</strong>), aggregate learning-curve analysis shows that <strong>FLUX consistently outperforms DCLM</strong> across the full training budget, with the gap widening steadily beyond <strong>30B tokens</strong>.
          </p>

          <p className="mb-6">
            At the final checkpoint, FLUX achieves an aggregate score of <strong>51.92</strong>, surpassing DCLM's <strong>50.48</strong> by <strong>1.44 percentage points</strong> across a nine-benchmark suite.
          </p>

          <p className="mb-6">
            On <strong>MMLU</strong>, FLUX reaches <strong>32.14%</strong>, compared to <strong>31.98%</strong> for DCLM.
          </p>

          <p className="mb-6">
            Across individual benchmarks, FLUX outperforms DCLM on <strong>7 of 9 tasks</strong>, with the largest gains observed on <strong>ARC-Challenge (+2.9pp)</strong>, <strong>WinoGrande (+2.9pp)</strong>, <strong>SocialIQA (+2.2pp)</strong>, and <strong>PIQA (+1.9pp)</strong>.
          </p>

          <p className="mb-6">
            At the corpus level, FLUX extracts <strong>50B tokens</strong> from a single Common Crawl dump, compared to <strong>40B</strong> for DCLM — a <strong>25% increase</strong> in token retention. Across two dumps, FLUX yields <strong>365B tokens</strong> post-deduplication, exceeding DCLM's <strong>302B tokens</strong> by <strong>21%</strong>.
          </p>

          <p className="mb-10">
            These results demonstrate that FLUX improves both <strong>downstream model performance</strong> and <strong>token retention</strong> simultaneously. The retention advantage does not trade off against quality — <strong>FLUX strictly dominates DCLM on both axes</strong>.
          </p>

          {/* Flux-Base vs Fineweb Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Flux-Base vs Fineweb</h2>

          {/* Image: Flux-Base vs FineWeb */}
          <div className="my-8">
            <img 
              src="/images/flux/flux-base-vs-fineweb.png" 
              alt="FLUX-Base vs FineWeb comparison showing FLUX-Base outperforming FineWeb"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          <p className="mb-6">
            The comparison with FineWeb is conducted using <strong>FLUX-Base</strong>, which represents the FLUX pipeline <em>without</em> the classifier stage.
          </p>

          <p className="mb-6">
            On a single dump, FineWeb retains <strong>170B tokens</strong>, whereas FLUX-Base retains <strong>192B tokens</strong> — approximately <strong>12% higher retention</strong>. This demonstrates that even without classifier-based filtering, the FLUX preprocessing framework achieves <strong>superior token retention</strong> through its parser, filtering, and deduplication design.
          </p>

          <p className="mb-6">
            Aggregate learning-curve analysis at the <strong>1B parameter scale</strong> (<strong>20B training tokens</strong>) shows that <strong>FLUX-Base consistently outperforms FineWeb</strong> across the full training budget.
          </p>

          <p className="mb-10">
            At the final checkpoint, FLUX-Base achieves an aggregate score of <strong>48.53</strong>, compared to <strong>48.05</strong> for FineWeb. These results indicate that the retention gains observed in FLUX-Base translate directly into <strong>improved downstream model performance</strong>, even without classifier-based filtering.
          </p>

          {/* Compute Savings Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Compute Savings</h2>

          {/* Image: Compute Savings */}
          <div className="my-8">
            <img 
              src="/images/flux/compute-savings.png" 
              alt="Compute savings comparison showing FLUX achieves 34.4% compute savings over DCLM"
              className="w-full max-w-md mx-auto rounded-lg border border-gray-200"
            />
          </div>

          <p className="mb-10">
            At the <strong>3B scale</strong>, a model trained on DCLM curated data requires <strong>1.227 × 10²¹ FLOPs</strong> to reach an aggregate benchmark score of <strong>50.48</strong>. In contrast, a model trained on the FLUX-curated dataset achieves the same performance using only <strong>8.044 × 10²⁰ FLOPs</strong>, resulting in approximately <strong>34.4% compute savings</strong>.
          </p>

          {/* APEX Parser Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">APEX: A Statistical Parser for Large-Scale Web Data Extraction</h2>

          <p className="mb-6">
            Web crawl archives distributed by <strong>Common Crawl</strong> are available in three standardized formats: <strong>WARC</strong>, <strong>WET</strong>, and <strong>WAT</strong>. WARC files encapsulate raw HTTP responses alongside full HTML content. WET files deliver pre-extracted plain text; and WAT files expose structured metadata records. For pretraining pipelines operating at scale, direct processing of <strong>WARC data</strong> is preferred, as it affords complete control over extraction behavior, content filtering criteria, and downstream text quality.
          </p>

          <p className="mb-6">
            Within the FLUX extraction pipeline, WARC ingestion is performed via <strong>FastWARC</strong>, a C-implemented archive reader engineered for <strong>low per-record latency</strong> and <strong>minimal memory overhead</strong>. HTML parsing and content extraction are delegated to <strong>Resiliparse</strong>, a high-throughput framework purpose-built for large-scale web corpora, with robust tolerance for malformed markup, tag soup, and encoding inconsistencies commonly encountered in real-world crawl data.
          </p>

          <p className="mb-6">
            A distinguishing characteristic of <strong>Apex</strong> is its departure from fixed semantic tag heuristics in favor of <strong>statistical main-content detection</strong>. Candidate page regions are evaluated through a composite scoring function incorporating three orthogonal signals:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Content Density</strong> — character-to-node ratio within a given subtree</li>
            <li><strong>Link Density</strong> — proportion of anchor-enclosed text within a candidate region</li>
            <li><strong>Structural Depth</strong> — relative position of a node with respect to the document root</li>
          </ul>

          {/* Parser Benchmark Results */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Parser Benchmark Results</h2>

          <p className="mb-6">
            <strong>Apex</strong> achieves the highest token yield across both evaluation configurations, producing <strong>279.5B multilingual tokens</strong> and <strong>54B English tokens</strong>, and is adopted as the <strong>production parser</strong> for the FLUX pipeline.
          </p>

          {/* Table 1 */}
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Parser</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Total Tokens (Multilingual)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Total Tokens (English)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Aggregate Compute Cost (hrs)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Resiliparse</td>
                  <td className="border border-gray-300 px-4 py-2">279.4B</td>
                  <td className="border border-gray-300 px-4 py-2">54.6B</td>
                  <td className="border border-gray-300 px-4 py-2">6.63</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold"><strong>Apex</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>279.5B</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>54.0B</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>4.31</strong></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Trafilatura</td>
                  <td className="border border-gray-300 px-4 py-2">136.7B</td>
                  <td className="border border-gray-300 px-4 py-2">35.5B</td>
                  <td className="border border-gray-300 px-4 py-2">47.33</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 italic mb-4">
            Evaluation performed on a sample of 10K WARC files drawn from the CC-MAIN-2025-51 Common Crawl snapshot.
          </p>

          {/* Image: Parser Benchmark */}
          <div className="my-8">
            <img 
              src="/images/flux/parser-benchmark.png" 
              alt="Parser benchmark comparison showing APEX, Resiliparse, and Trafilatura performance"
              className="w-full rounded-lg border border-gray-200"
            />
            <p className="text-sm text-gray-600 italic text-center mt-2">
              Comparative parser evaluation of APEX, Resiliparse, and Trafilatura conducted on a 530M-scale model trained on 10.6B tokens.
            </p>
          </div>

          {/* Deterministic Filter Pipeline */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Deterministic Filter Pipeline for Large-Scale Web Data Curation</h2>

          <p className="mb-10">
            Most data preprocessing pipelines for large language models face a frustrating trade-off: filter aggressively for quality and you lose too many tokens, or keep everything and let noise degrade your model. <strong>FLUX takes a different approach</strong>. Instead of discarding an entire document the moment it contains a bad line, the pipeline <strong>surgically removes only the problematic lines</strong> — things like cookie banners, social media counters, navigation breadcrumbs, JavaScript artifacts, and form labels — and keeps the rest. This <strong>line-level excision</strong>, enforced across <strong>eleven distinct heuristic classes</strong>, is the core reason FLUX retains <strong>27.2B</strong> post-deduplication tokens from the same input where DCLM retains only <strong>24.8B</strong> and FineWeb retains <strong>24.5B</strong>.
          </p>

          {/* Filtering Stage Results */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Filtering Stage Results</h2>

          <p className="text-sm text-gray-600 italic mb-4">
            530M scale · 10.6B tokens · post-deduplication
          </p>

          {/* Table 2 */}
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Pipeline</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Post-Dedup Tokens</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Aggregate (530M)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">FineWeb</td>
                  <td className="border border-gray-300 px-4 py-2">24.50B</td>
                  <td className="border border-gray-300 px-4 py-2">44.31</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">DCLM</td>
                  <td className="border border-gray-300 px-4 py-2">24.81B</td>
                  <td className="border border-gray-300 px-4 py-2">44.40</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold"><strong>FLUX</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>27.22B</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>45.45</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <img 
              src="/images/flux/flux-base-comparison.png" 
              alt="DCLM-RefinedWeb vs FineWeb vs FLUX BASE - Heuristic filtering overview showing retention-quality behavior"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>
          <p className="text-sm text-gray-600 italic mb-6">
            Heuristic filtering summary (530M scale; 10.6B tokens). Overview figure for the FLUX filtering design and its retention–quality behavior.
          </p>

          <p className="mb-10">
            The result speaks for itself. In ablation studies, <strong>FLUX is the only configuration that simultaneously outperforms both DCLM and FineWeb</strong> on token retention and downstream model quality. At the <strong>530M scale</strong> trained on <strong>10.6B tokens</strong>, FLUX retains <strong>27.22B</strong> post-deduplication tokens and achieves an aggregate score of <strong>45.45</strong> — compared to <strong>24.81B</strong> tokens and <strong>44.40</strong> for DCLM, and <strong>24.50B</strong> tokens and <strong>44.31</strong> for FineWeb — while also being <strong>6.26× faster</strong> to preprocess per terabyte. The core insight is simple: <strong>when you remove only what is genuinely bad rather than discarding everything that contains something bad, you get more data and better data at the same time</strong>.
          </p>

          {/* Preprocessing Efficiency */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Preprocessing Efficiency</h2>

          <p className="text-sm text-gray-600 italic mb-4">
            Filtering-stage compute cost on identical hardware (c8a.8xlarge, 32 vCPUs) over 10,000 WARC files.
          </p>

          {/* Table 3 */}
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Pipeline</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Input</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Wall-clock</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">CPU-hrs</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">CPU-hrs/TB</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">vs. FLUX</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">DCLM</td>
                  <td className="border border-gray-300 px-4 py-2">1.20 TB</td>
                  <td className="border border-gray-300 px-4 py-2">11 hr 7 min</td>
                  <td className="border border-gray-300 px-4 py-2">355.7</td>
                  <td className="border border-gray-300 px-4 py-2">296.4</td>
                  <td className="border border-gray-300 px-4 py-2">6.26×</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">FineWeb</td>
                  <td className="border border-gray-300 px-4 py-2">0.60 TB</td>
                  <td className="border border-gray-300 px-4 py-2">5 hr 39 min</td>
                  <td className="border border-gray-300 px-4 py-2">181.0</td>
                  <td className="border border-gray-300 px-4 py-2">301.3</td>
                  <td className="border border-gray-300 px-4 py-2">6.36×</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold"><strong>FLUX</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>1.03 TB</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>1 hr 31 min</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>48.5</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>47.3</strong></td>
                  <td className="border border-gray-300 px-4 py-2"><strong>1.00×</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dual-Bin Classifier */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Dual-Bin Classifier</h2>

          <p className="mb-6">
            Content classification in large-scale data pipelines is typically performed using <strong>model-based filtering</strong>. Heuristic rules alone are insufficient to remove semantically weak or low-information content.
          </p>

          <p className="mb-6">
            Such semantically weak data — while structurally valid — often <strong>degrades downstream learning quality</strong>. Removing it requires <strong>classifier-based filtering</strong>, using lightweight models such as <strong>fastText</strong> or larger language models to assess semantic relevance and information density.
          </p>

          <p className="mb-6">
            One of the core objectives of FLUX is to <strong>minimize computational overhead</strong> during preprocessing. To evaluate the efficiency of classifier-based filtering, we conducted comparative compute experiments between <strong>lightweight fastText classifiers</strong> and <strong>LLM-based classification methods</strong> on representative sample inputs.
          </p>

          <p className="mb-6">
            In practice, single-bin classifiers can be sensitive to threshold selection and may struggle to balance false positives and false negatives effectively. To improve separation between high-quality and low-quality content, FLUX adopts a <strong>dual-bin classification strategy</strong>, enabling more controlled filtering.
          </p>

          <p className="mb-10">
            We adopted the two strongest bins — the <strong>BETR classifier bin</strong> introduced in our earlier <strong>Blu-WERP</strong> work and the <strong>DCLM classifier bin</strong>.
          </p>

          {/* Acceptance Rule */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Acceptance Rule</h2>

          <p className="mb-6">
            <strong>Acceptance rule.</strong> Given a document 𝑑, let 𝑠<sub>DCLM</sub>(𝑑) and 𝑠<sub>BETR</sub>(𝑑) denote the scalar confidence scores produced by 𝜙<sub>DCLM</sub> and 𝜙<sub>BETR</sub> respectively, each calibrated to [0, 1] for the positive (high-quality) class label. Document 𝑑 is accepted into the final corpus if and only if:
          </p>

          <div className="bg-gray-100 p-6 rounded-lg my-6 text-center">
            <p className="font-mono text-lg">
              𝑠<sub>DCLM</sub>(𝑑) ≥ 𝜏<sub>DCLM</sub> &nbsp;&nbsp;&nbsp; ∨ &nbsp;&nbsp;&nbsp; 𝑠<sub>BETR</sub>(𝑑) ≥ 𝜏<sub>BETR</sub>
            </p>
          </div>

          <p className="mb-6">
            The default threshold for the <strong>BETR classifier bin</strong> in Blu-WERP is <strong>0.635</strong>, while the <strong>DCLM classifier bin</strong> uses a default threshold of <strong>0.0182</strong> in its original configuration.
          </p>

          <p className="mb-6">
            In FLUX, rather than relying solely on these defaults, we conducted <strong>multiple ablation experiments</strong> on <strong>530M params model</strong>, across different threshold combinations to identify an <strong>optimized operating point</strong>. This allowed us to balance token retention and downstream performance more effectively within the dual-bin framework.
          </p>

          {/* Image: Threshold Ablation */}
          <div className="my-8">
            <img 
              src="/images/flux/threshold-ablation.png" 
              alt="Threshold ablation experiments showing different DCLM and BETR threshold combinations"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          <p className="mb-10">
            Among the evaluated configurations, the combination of the <strong>BETR bin at a threshold of 0.76</strong> and the <strong>DCLM bin at 0.025119</strong> produced the strongest results. This setting achieved the <strong>best performance</strong> across both the aggregate benchmark suite and MMLU, establishing it as the <strong>optimal operating point</strong> for FLUX within our dual-bin framework.
          </p>

          {/* The FLUX Pipeline */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The FLUX Pipeline</h2>

          <p className="mb-6">
            To establish the final FLUX configuration, we performed a <strong>staged ablation</strong> across the major pipeline components: <strong>parser selection</strong>, <strong>heuristic filtering</strong>, <strong>deduplication</strong>, and <strong>classification</strong>.
          </p>

          <p className="mb-6">
            When progressively adding each component — beginning with the parser and sequentially incorporating filters, deduplication, and finally classification — we observed <strong>consistent performance improvements</strong> at the <strong>530M parameter scale</strong>. The aggregate score increased from <strong>41.23</strong> (Parser only) to <strong>42.43</strong> (Parser + Filters), then to <strong>45.45</strong> (Parser + Filters + Deduplication), and finally to <strong>48.22</strong> (Full pipeline with Classification).
          </p>

          {/* Image: Pipeline Ablation */}
          <div className="my-8">
            <img 
              src="/images/flux/pipeline-ablation.png" 
              alt="Pipeline ablation showing progressive improvements from parser to classifier"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>

          <p className="mb-10">
            This progressive improvement trend is further reflected at the <strong>3B scale</strong>, where the complete FLUX pipeline achieves an aggregate score of <strong>51.92%</strong> and an MMLU score of <strong>32.14%</strong>, demonstrating <strong>consistent gains across model sizes</strong>.
          </p>

        </div>
      </div>
    </div>
  );
};

export default FLUX4;
