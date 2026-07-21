import React from 'react';

const FLUX = () => {
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
            Model performance is visible.
          </p>
          <p className="text-xl font-medium text-gray-900 leading-relaxed mb-2">
            Data curation is not.
          </p>
          <p className="text-xl font-medium text-gray-900 leading-relaxed mb-6">
            Yet the latter determines the former.
          </p>

          <p className="mb-6">
            Before parameters are scaled, before benchmarks are reported, and before models are deployed, the training corpus is constructed. That construction process determines what information is preserved, what is filtered out, and what ultimately shapes the model's behavior.
          </p>

          <p className="mb-6">
            Every token retained is a deliberate choice. Every token discarded is a trade-off. At web scale, those decisions compound — setting the ceiling for what a language model can achieve.
          </p>

          <p className="mb-6">
            In recent years, the conversation around large language models has centered on scale — larger architectures, more training tokens, and increasing compute budgets. Model releases are evaluated by parameter counts and benchmark scores. Data preparation has quietly become a competitive trade secret — rarely disclosed, minimally examined, and fundamental to performance.
          </p>

          <p className="mb-6">
            One reason data curation receives limited scrutiny is the lack of transparency around it. Leading LLMs such as ChatGPT, LLaMA, and Mistral have disclosed architectural details and benchmark results, but their data curation pipelines remain largely proprietary.
          </p>

          <p className="mb-10">
            We believe the next phase of LLM progress requires transparency at the data layer. At BluBridge Technologies, we intend to release FLUX as open source in the future, enabling broader scrutiny, validation, and community-driven improvement.
          </p>

          <p className="mb-10">
            The objective of FLUX is to eliminate the traditional trade-off between data quality and token retention, while operating with minimal computational cost. Flux achieves it comprehensively by outperforming DCLM and Fineweb in both the Quality and Retention.
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
            At the 3B scale (60B training tokens), aggregate learning-curve analysis shows that FLUX consistently outperforms DCLM across the full training budget, with the gap widening steadily beyond 30B tokens.
          </p>

          <p className="mb-6">
            At the final checkpoint, FLUX achieves an aggregate score of 51.92, surpassing DCLM's 50.48 by 1.44 percentage points across a nine-benchmark suite.
          </p>

          <p className="mb-6">
            On MMLU, FLUX reaches 32.14%, compared to 31.98% for DCLM.
          </p>

          <p className="mb-6">
            Across individual benchmarks, FLUX outperforms DCLM on 7 of 9 tasks, with the largest gains observed on ARC-Challenge (+2.9pp), WinoGrande (+2.9pp), SocialIQA (+2.2pp), and PIQA (+1.9pp).
          </p>

          <p className="mb-6">
            At the corpus level, FLUX extracts 50B tokens from a single Common Crawl dump, compared to 40B for DCLM — a 25% increase in token retention. Across two dumps, FLUX yields 365B tokens post-deduplication, exceeding DCLM's 302B tokens by 21%.
          </p>

          <p className="mb-10">
            These results demonstrate that FLUX improves both downstream model performance and token retention simultaneously. The retention advantage does not trade off against quality — FLUX strictly dominates DCLM on both axes.
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
            The comparison with FineWeb is conducted using FLUX-Base, which represents the FLUX pipeline without the classifier stage.
          </p>

          <p className="mb-6">
            On a single dump, FineWeb retains 170B tokens, whereas FLUX-Base retains 192B tokens — approximately 12% higher retention. This demonstrates that even without classifier-based filtering, the FLUX preprocessing framework achieves superior token retention through its parser, filtering, and deduplication design.
          </p>

          <p className="mb-6">
            Aggregate learning-curve analysis at the 1B parameter scale (20B training tokens) shows that FLUX-Base consistently outperforms FineWeb across the full training budget.
          </p>

          <p className="mb-10">
            At the final checkpoint, FLUX-Base achieves an aggregate score of 48.53, compared to 48.05 for FineWeb. These results indicate that the retention gains observed in FLUX-Base translate directly into improved downstream model performance, even without classifier-based filtering.
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
            At the 3B scale, a model trained on DCLM curated data requires 1.227 × 10²¹ FLOPs to reach an aggregate benchmark score of 50.48. In contrast, a model trained on the FLUX-curated dataset achieves the same performance using only 8.044 × 10²⁰ FLOPs, resulting in approximately 34.4% compute savings.
          </p>

          {/* APEX Parser Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">APEX: A Statistical Parser for Large-Scale Web Data Extraction</h2>

          <p className="mb-6">
            Web crawl archives distributed by Common Crawl are available in three standardized formats: WARC, WET, and WAT. WARC files encapsulate raw HTTP responses alongside full HTML content. WET files deliver pre-extracted plain text; and WAT files expose structured metadata records. For pretraining pipelines operating at scale, direct processing of WARC data is preferred, as it affords complete control over extraction behavior, content filtering criteria, and downstream text quality.
          </p>

          <p className="mb-6">
            Within the FLUX extraction pipeline, WARC ingestion is performed via FastWARC, a C-implemented archive reader engineered for low per-record latency and minimal memory overhead. HTML parsing and content extraction are delegated to Resiliparse, a high-throughput framework purpose-built for large-scale web corpora, with robust tolerance for malformed markup, tag soup, and encoding inconsistencies commonly encountered in real-world crawl data.
          </p>

          <p className="mb-6">
            A distinguishing characteristic of Apex is its departure from fixed semantic tag heuristics in favor of statistical main-content detection. Candidate page regions are evaluated through a composite scoring function incorporating three orthogonal signals:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Content Density</strong> — character-to-node ratio within a given subtree</li>
            <li><strong>Link Density</strong> — proportion of anchor-enclosed text within a candidate region</li>
            <li><strong>Structural Depth</strong> — relative position of a node with respect to the document root</li>
          </ul>

          {/* Parser Benchmark Results */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Parser Benchmark Results</h2>

          <p className="mb-6">
            Apex achieves the highest token yield across both evaluation configurations, producing 279.5B multilingual tokens and 54B English tokens, and is adopted as the production parser for the FLUX pipeline.
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
                  <td className="border border-gray-300 px-4 py-2 font-semibold">Apex</td>
                  <td className="border border-gray-300 px-4 py-2">279.5B</td>
                  <td className="border border-gray-300 px-4 py-2">54.0B</td>
                  <td className="border border-gray-300 px-4 py-2">4.31</td>
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
            Most data preprocessing pipelines for large language models face a frustrating trade-off: filter aggressively for quality and you lose too many tokens, or keep everything and let noise degrade your model. FLUX takes a different approach. Instead of discarding an entire document the moment it contains a bad line, the pipeline surgically removes only the problematic lines — things like cookie banners, social media counters, navigation breadcrumbs, JavaScript artifacts, and form labels — and keeps the rest. This line-level excision, enforced across eleven distinct heuristic classes, is the core reason FLUX retains 27.2B post-deduplication tokens from the same input where DCLM retains only 24.8B and FineWeb retains 24.5B.
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
                  <td className="border border-gray-300 px-4 py-2 font-semibold">FLUX</td>
                  <td className="border border-gray-300 px-4 py-2">27.22B</td>
                  <td className="border border-gray-300 px-4 py-2">45.45</td>
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

          {/* Image: Filtering Stage Overview */}
         

          <p className="mb-10">
            The result speaks for itself. In ablation studies, FLUX is the only configuration that simultaneously outperforms both DCLM and FineWeb on token retention and downstream model quality. At the 530M scale trained on 10.6B tokens, FLUX retains 27.22B post-deduplication tokens and achieves an aggregate score of 45.45 — compared to 24.81B tokens and 44.40 for DCLM, and 24.50B tokens and 44.31 for FineWeb — while also being 6.26× faster to preprocess per terabyte. The core insight is simple: when you remove only what is genuinely bad rather than discarding everything that contains something bad, you get more data and better data at the same time.
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
                  <td className="border border-gray-300 px-4 py-2 font-semibold">FLUX</td>
                  <td className="border border-gray-300 px-4 py-2">1.03 TB</td>
                  <td className="border border-gray-300 px-4 py-2">1 hr 31 min</td>
                  <td className="border border-gray-300 px-4 py-2">48.5</td>
                  <td className="border border-gray-300 px-4 py-2">47.3</td>
                  <td className="border border-gray-300 px-4 py-2">1.00×</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dual-Bin Classifier */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Dual-Bin Classifier</h2>

          <p className="mb-6">
            Content classification in large-scale data pipelines is typically performed using model-based filtering. Heuristic rules alone are insufficient to remove semantically weak or low-information content.
          </p>

          <p className="mb-6">
            Such semantically weak data — while structurally valid — often degrades downstream learning quality. Removing it requires classifier-based filtering, using lightweight models such as fastText or larger language models to assess semantic relevance and information density.
          </p>

          <p className="mb-6">
            One of the core objectives of FLUX is to minimize computational overhead during preprocessing. To evaluate the efficiency of classifier-based filtering, we conducted comparative compute experiments between lightweight fastText classifiers and LLM-based classification methods on representative sample inputs.
          </p>

          <p className="mb-6">
            In practice, single-bin classifiers can be sensitive to threshold selection and may struggle to balance false positives and false negatives effectively. To improve separation between high-quality and low-quality content, FLUX adopts a dual-bin classification strategy, enabling more controlled filtering.
          </p>

          <p className="mb-10">
            We adopted the two strongest bins — the BETR classifier bin introduced in our earlier Blu-WERP work and the DCLM classifier bin.
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
            The default threshold for the BETR classifier bin in Blu-WERP is 0.635, while the DCLM classifier bin uses a default threshold of 0.0182 in its original configuration.
          </p>

          <p className="mb-6">
            In FLUX, rather than relying solely on these defaults, we conducted multiple ablation experiments on 530M params model, across different threshold combinations to identify an optimized operating point. This allowed us to balance token retention and downstream performance more effectively within the dual-bin framework.
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
            Among the evaluated configurations, the combination of the BETR bin at a threshold of 0.76 and the DCLM bin at 0.025119 produced the strongest results. This setting achieved the best performance across both the aggregate benchmark suite and MMLU, establishing it as the optimal operating point for FLUX within our dual-bin framework.
          </p>

          {/* The FLUX Pipeline */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">The FLUX Pipeline</h2>

          <p className="mb-6">
            To establish the final FLUX configuration, we performed a staged ablation across the major pipeline components: parser selection, heuristic filtering, deduplication, and classification.
          </p>

          <p className="mb-6">
            When progressively adding each component — beginning with the parser and sequentially incorporating filters, deduplication, and finally classification — we observed consistent performance improvements at the 530M parameter scale. The aggregate score increased from 41.23 (Parser only) to 42.43 (Parser + Filters), then to 45.45 (Parser + Filters + Deduplication), and finally to 48.22 (Full pipeline with Classification).
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
            This progressive improvement trend is further reflected at the 3B scale, where the complete FLUX pipeline achieves an aggregate score of 51.92% and an MMLU score of 32.14%, demonstrating consistent gains across model sizes.
          </p>

        </div>
      </div>
    </div>
  );
};

export default FLUX;
