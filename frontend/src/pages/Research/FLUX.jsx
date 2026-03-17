import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, ExternalLink } from 'lucide-react';

const FLUX = () => {
  const [activeSection, setActiveSection] = useState('abstract');
  const [expandedSections, setExpandedSections] = useState({
    'building': true,
    'experiments': true,
    'appendix': false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let current = 'abstract';
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          current = section.getAttribute('data-section');
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sidebarItems = [
    { id: 'abstract', label: 'Abstract', level: 0 },
    { id: 'introduction', label: 'Introduction', level: 0 },
    { id: 'related-work', label: 'Related Work', level: 0 },
    { 
      id: 'building', 
      label: 'Building High-Quality Training Data with FLUX', 
      level: 0,
      expandable: true,
      children: [
        { id: 'text-extraction', label: 'Text Extraction', level: 1 },
        { id: 'heuristic-filtering', label: 'Heuristic Filtering', level: 1 },
        { id: 'deduplication', label: 'Deduplication', level: 1 },
        { id: 'model-classification', label: 'Model-Based Classification', level: 1 },
        { id: 'final-pipeline', label: 'The Final FLUX Pipeline', level: 1 },
      ]
    },
    { id: 'decontamination', label: 'Decontamination', level: 0 },
    { 
      id: 'experiments', 
      label: 'Experiments', 
      level: 0,
      expandable: true,
      children: [
        { id: 'flux-vs-dclm', label: 'FLUX vs. DCLM', level: 1 },
        { id: 'flux-base-vs-fineweb', label: 'FLUX-Base vs. FineWeb', level: 1 },
      ]
    },
    { id: 'conclusion', label: 'Conclusion and Limitations', level: 0 },
    { 
      id: 'appendix', 
      label: 'Appendix', 
      level: 0,
      expandable: true,
      children: [
        { id: 'training-setup', label: 'Training Setup and Hyperparameters', level: 1 },
        { id: 'evaluation-suite', label: 'Evaluation Suite and Metrics', level: 1 },
        { id: 'parser-analysis', label: 'Text Extraction: Parser Design', level: 1 },
        { id: 'filtering-specification', label: 'Filtering Pipeline: Stage-by-Stage', level: 1 },
        { id: 'bloom-filter', label: 'Bloom Filter Deduplication', level: 1 },
        { id: 'dual-bin-classification', label: 'Dual-Bin FastText Classification', level: 1 },
        { id: 'corpus-composition', label: 'Corpus Composition and Domain Analysis', level: 1 },
        { id: 'extended-results', label: 'Extended Evaluation Results', level: 1 },
      ]
    },
  ];

  const renderSidebarItem = (item) => {
    const isActive = activeSection === item.id;
    const isExpanded = expandedSections[item.id];
    
    return (
      <div key={item.id}>
        <div
          className={`flex items-center gap-2 py-2 px-3 cursor-pointer rounded-md transition-colors ${
            isActive ? 'bg-[#0B1F3B] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
          style={{ paddingLeft: item.level === 1 ? '24px' : '12px' }}
          onClick={() => {
            if (item.expandable) {
              toggleSection(item.id);
            }
            scrollToSection(item.id);
          }}
        >
          {item.expandable && (
            isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
          <span className={`text-sm ${item.level === 1 ? 'text-gray-600' : 'font-medium'}`}>
            {item.label}
          </span>
        </div>
        {item.children && isExpanded && (
          <div className="ml-2">
            {item.children.map(child => renderSidebarItem(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f1e9]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 fixed left-0 top-20 h-[calc(100vh-80px)] overflow-y-auto p-4">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
            <FileText size={20} className="text-[#0B1F3B]" />
            <span className="font-semibold text-[#0B1F3B]">Document Outline</span>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map(item => renderSidebarItem(item))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72">
          <div className="max-w-4xl mx-auto px-6 py-12 bg-[#fffdf7]">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              FLUX: Data Worth Training On
            </h1>
            
            {/* Authors */}
            <p className="text-gray-600 mb-6">
              Gowtham Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya
              <br />
              <span className="text-[#328CC1]">contact@blubridge.ai</span>
            </p>

            {/* Read the Paper Button */}
            <div className="mb-8">
              <a
                href="https://arxiv.org/pdf/2603.13972"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0B1F3B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#1a3a5c] transition-colors"
              >
                <ExternalLink size={18} />
                Read the Paper on arXiv
              </a>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-800 space-y-8" style={{ textAlign: "justify" }}>
              
              {/* Abstract */}
              <section id="abstract" data-section="abstract">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
                <p>
                  Modern large language model training is no longer limited by data availability, but by the inability of existing preprocessing pipelines to simultaneously achieve massive scale and high data quality. Current approaches are forced to sacrifice one for the other—either aggressively filtering to improve quality at the cost of severe token loss, or retaining large volumes of data while introducing substantial noise.
                </p>
                <p>
                  In this work, we introduce <strong>FLUX</strong>, a preprocessing pipeline specifically designed to break this long-standing trade-off by maximizing token retention while enforcing rigorous quality control. Models trained on FLUX-curated data consistently outperform prior methods. A 3B-parameter model trained on 60B tokens with FLUX achieves <strong>32.14% MMLU accuracy</strong>, surpassing the previous state-of-the-art pipeline DCLM (31.98%) and significantly outperforming FineWeb (29.88%). FLUX achieves the same aggregate score as a model trained on DCLM data using only 39B tokens, resulting in a <strong>34.4% reduction in training compute</strong>. At the data level, FLUX extracts 50B usable tokens from a single dump (CC-MAIN-2025-51), compared to 40B from DCLM (+25% retention). FLUX-Base yields 192B tokens, exceeding FineWeb's 170B while still maintaining superior quality.
                </p>
              </section>

              {/* Introduction */}
              <section id="introduction" data-section="introduction">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p>
                  The performance ceiling of modern large language models (LLMs) is increasingly determined not by parameter count or architecture, but by the quality and composition of their pretraining data. Despite exponential growth in raw web-scale corpora, a significant portion of this data is redundant, noisy, or semantically shallow—contributing little to downstream task performance while substantially inflating training costs.
                </p>
                <p>
                  Existing preprocessing pipelines such as DataComp (DCLM) and FineWeb have made meaningful progress by introducing structured filtering, deduplication, and classification stages. However, these pipelines operate under a restrictive assumption: that achieving high data quality necessarily requires discarding large volumes of potentially usable content.
                </p>
                <p>
                  In this work, we challenge this assumption. We introduce <strong>FLUX</strong>, a preprocessing pipeline that is designed from the ground up to jointly optimize data quality and token retention. Rather than treating quality and scale as competing objectives, FLUX takes an excision-first approach—preferring to remove low-quality lines within documents rather than discarding entire documents outright.
                </p>
              </section>

              {/* Related Work */}
              <section id="related-work" data-section="related-work">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Related Work</h2>
                <p>
                  Web-scale data curation pipelines typically follow a similar structure: they extract text from raw HTML, apply heuristic filters to remove boilerplate and low-quality content, perform deduplication to eliminate redundancy, and optionally use model-based classification to select high-quality documents. However, the design space remains large, and seemingly minor implementation choices—such as parser configurations or filter thresholds—can produce dramatically different downstream outcomes.
                </p>
                <p>
                  <strong>Heuristic Filtering:</strong> Filtering based on statistics (e.g., symbol-to-word ratios, average sentence length) has become a common approach, often borrowed from C4 or RedPajama. Yet the effectiveness of these filters is highly sensitive to threshold settings and often results in over-pruning. Broad threshold ranges are explored but rarely optimized jointly with downstream evaluation.
                </p>
                <p>
                  <strong>Model-Based Classification:</strong> Lightweight classifiers (e.g., FastText trained on Wikipedia vs. Common Crawl) offer a cost-effective means of quality filtering. Such classifiers, when trained on well-annotated proxies, can scale to billions of documents with minimal latency.
                </p>
              </section>

              {/* Building High-Quality Training Data with FLUX */}
              <section id="building" data-section="building">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Building High-Quality Training Data with FLUX</h2>
                <p>
                  In this section, we describe the design and implementation of the FLUX preprocessing pipeline. The pipeline comprises four major components: text extraction, heuristic filtering, deduplication, and model-based classification. Each stage is designed not only to improve quality but to preserve as much usable data as possible.
                </p>
              </section>

              {/* Text Extraction */}
              <section id="text-extraction" data-section="text-extraction">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3.1 Text Extraction</h3>
                <p>
                  Common Crawl provides data in both WARC and WET formats. WET files store structured metadata and pre-extracted text, while WARC files preserve raw HTTP responses including full HTML. Unlike prior approaches that rely solely on WET files, FLUX processes WARC files directly, enabling full control over extraction behavior.
                </p>
                <p>
                  In our extraction pipeline, we evaluated three parser families: Resiliparse, Trafilatura, and a custom parser we refer to as Apex. Using a c8a.8xlarge (32 vCPU) configuration and 13-gram Bloom filter filtering to improve text quality, we benchmarked each parser on token yield and compute cost.
                </p>
                <p>
                  As shown in our analysis, Apex achieves the best balance of token yield and compute efficiency. Trafilatura yields more tokens but at significantly higher computational cost. Given this trade-off, we adopt <strong>Apex</strong> as our parser of choice, applying targeted line-level filtering to maintain corpus quality.
                </p>
              </section>

              {/* Heuristic Filtering */}
              <section id="heuristic-filtering" data-section="heuristic-filtering">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3.2 Heuristic Filtering</h3>
                <p>
                  Heuristic filters are essential for removing obviously low-quality content—boilerplate, malformed documents, or machine-generated spam. However, aggressive heuristic filtering can discard significant volumes of useful signal. FLUX adopts a multi-stage approach that prioritizes line-level excision over whole-document rejection, thus minimizing loss of usable signal.
                </p>
                <p>
                  Our pipeline is partitioned into four functional blocks:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>URL-based Pre-filtering:</strong> Remove documents from known low-quality domains or URL patterns</li>
                  <li><strong>Language Identification:</strong> Filter non-English content using FastText at the document level</li>
                  <li><strong>Document-level Quality Gating:</strong> Apply coarse structural checks (e.g., Gopher Quality, Nemo rules)</li>
                  <li><strong>Line-level Cleaning:</strong> Apply fine-grained filters to remove low-quality lines within documents</li>
                </ul>
              </section>

              {/* Deduplication */}
              <section id="deduplication" data-section="deduplication">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3.3 Deduplication</h3>
                <p>
                  After filtering, we apply Bloom Filter-based Fuzzy Deduplication (BFF) to remove near-duplicate content at both the paragraph and document levels. Deduplication is performed across dumps, using a shared index built from the full corpus.
                </p>
                <p>
                  Deduplication substantially reduces corpus size while improving downstream performance. Our BFF configuration uses optimized false-positive rates and n-gram counts to balance precision with computational efficiency.
                </p>
              </section>

              {/* Model-Based Classification */}
              <section id="model-classification" data-section="model-classification">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3.4 Model-Based Classification</h3>
                <p>
                  Even after heuristic filtering, a significant fraction of web content remains superficially well-formed but semantically shallow. To address this, we deploy two FastText classifiers in a <strong>dual-bin logical-OR framework</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>DCLM Classifier:</strong> Trained on a signal emphasizing world knowledge</li>
                  <li><strong>BETR Classifier:</strong> Trained on a benchmark-proximate reasoning signal</li>
                </ul>
                <p>
                  A document is retained if it passes either classifier at its respective threshold. This dual-bin approach yields a more balanced and task-aligned corpus compared to single-classifier designs.
                </p>
              </section>

              {/* The Final FLUX Pipeline */}
              <section id="final-pipeline" data-section="final-pipeline">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3.5 The Final FLUX Pipeline</h3>
                <p>
                  We performed a staged ablation to establish the final FLUX configuration. Starting from a baseline (raw text only), we progressively added: (1) Apex parsing, (2) heuristic filtering, (3) deduplication, and (4) dual-bin classification.
                </p>
                <p>
                  Each stage contributes a measurable improvement to both aggregate score and MMLU performance:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Baseline:</strong> 49.89% aggregate, 28.46% MMLU</li>
                  <li><strong>+ Parser:</strong> 50.22% aggregate, 29.82% MMLU</li>
                  <li><strong>+ Filters:</strong> 50.58% aggregate, 30.16% MMLU</li>
                  <li><strong>+ Deduplication:</strong> 50.89% aggregate, 30.54% MMLU</li>
                  <li><strong>+ Classification (FLUX):</strong> 51.92% aggregate, 32.14% MMLU</li>
                </ul>
              </section>

              {/* Decontamination */}
              <section id="decontamination" data-section="decontamination">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Decontamination</h2>
                <p>
                  To mitigate train-test contamination, we implemented an n-gram overlap screening method to identify and remove benchmark-derived text from the pretraining pool. We constructed a unified reference set comprising all benchmark questions and reference answers from our evaluation suite.
                </p>
                <p>
                  We processed approximately 62 million documents (~60B tokens) against this reference set, flagging documents containing significant n-gram overlap. The contamination rate was found to be negligible, indicating that our pipeline does not artificially inflate benchmark scores through data leakage.
                </p>
              </section>

              {/* Experiments */}
              <section id="experiments" data-section="experiments">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Experiments</h2>
                <p>
                  We evaluate FLUX against two strong baselines: DCLM (DataComp-LM) and FineWeb. All comparisons use identical model architectures, training configurations, and evaluation protocols.
                </p>
              </section>

              {/* FLUX vs DCLM */}
              <section id="flux-vs-dclm" data-section="flux-vs-dclm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">5.1 FLUX vs. DCLM</h3>
                <p>
                  We compare FLUX against DCLM and FineWeb across multiple model scales using a nine-benchmark evaluation suite. Results demonstrate that FLUX consistently outperforms both baselines:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>3B scale:</strong> FLUX achieves 51.92% aggregate (vs. DCLM 51.34%) and 32.14% MMLU (vs. DCLM 31.98%)</li>
                  <li><strong>Token retention:</strong> FLUX extracts 50B tokens from a single dump vs. DCLM's 40B (+25%)</li>
                  <li><strong>Compute efficiency:</strong> FLUX achieves DCLM-level performance with 34.4% fewer FLOPs</li>
                </ul>
              </section>

              {/* FLUX-Base vs FineWeb */}
              <section id="flux-base-vs-fineweb" data-section="flux-base-vs-fineweb">
                <h3 className="text-xl font-bold text-gray-900 mb-3">5.2 FLUX-Base vs. FineWeb</h3>
                <p>
                  To isolate the contribution of FLUX's upstream pipeline (excluding classification), we compare FLUX-Base against FineWeb. FLUX-Base yields 192B tokens compared to FineWeb's 170B while maintaining superior downstream quality.
                </p>
                <p>
                  This result establishes that FLUX's core design—line-level excision, efficient parsing, and optimized deduplication—independently advances the state of the art in web-scale data curation.
                </p>
              </section>

              {/* Conclusion and Limitations */}
              <section id="conclusion" data-section="conclusion">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Conclusion and Limitations</h2>
                <p>
                  We introduced FLUX, a preprocessing pipeline that redefines the boundaries of scalable dataset construction for large language models. By combining line-level cleaning, whole-document language identification, and a dual-bin classification framework, FLUX achieves simultaneous improvements in data retention, downstream quality, and computational efficiency.
                </p>
                <p>
                  <strong>Key Contributions:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Breaking the retention-quality trade-off through excision-first design</li>
                  <li>Dual-bin classification for balanced world knowledge and reasoning signals</li>
                  <li>34.4% reduction in training compute for equivalent performance</li>
                  <li>+25% token retention over DCLM with improved quality</li>
                </ul>
                <p className="mt-4">
                  <strong>Limitations:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>English-only:</strong> Evaluation is limited to English; multilingual extension requires adapted quality classifiers</li>
                  <li><strong>Deduplication scope:</strong> Currently limited to two snapshots; full archive deduplication remains future work</li>
                  <li><strong>Model scale:</strong> Evaluation conducted up to 3B parameters; larger scales may reveal different dynamics</li>
                </ul>
              </section>

              {/* Appendix */}
              <section id="appendix" data-section="appendix">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Appendix</h2>
                <p>
                  The following sections provide detailed supplementary information on the FLUX pipeline implementation and evaluation.
                </p>
              </section>

              {/* Training Setup */}
              <section id="training-setup" data-section="training-setup">
                <h3 className="text-xl font-bold text-gray-900 mb-3">A. Training Setup and Hyperparameters</h3>
                <p>
                  All models are trained using the OLMo framework with PyTorch DDP in bf16 precision. Architecture choices include RMSNorm, SwiGLU activation, Rotary Position Embeddings (RoPE), and FlashAttention. Tokenization uses GPT-NeoX-20B-PII-Special with 50,280 vocabulary size.
                </p>
                <p>
                  Optimization uses AdamW with β1=0.9, β2=0.95, and weight decay of 0.1. Learning rate follows a cosine schedule with linear warmup.
                </p>
              </section>

              {/* Evaluation Suite */}
              <section id="evaluation-suite" data-section="evaluation-suite">
                <h3 className="text-xl font-bold text-gray-900 mb-3">B. Evaluation Suite and Metrics</h3>
                <p>
                  We use the lighteval framework with nine benchmark tasks spanning three categories:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>World Knowledge & Reasoning:</strong> MMLU, ARC-Easy, ARC-Challenge</li>
                  <li><strong>Language Understanding:</strong> HellaSwag, WinoGrande</li>
                  <li><strong>Commonsense Reasoning:</strong> PIQA, SocialIQA, CSQA, OpenBookQA</li>
                </ul>
              </section>

              {/* Parser Analysis */}
              <section id="parser-analysis" data-section="parser-analysis">
                <h3 className="text-xl font-bold text-gray-900 mb-3">C. Text Extraction: Parser Design and Token Yield Analysis</h3>
                <p>
                  We compared four parser configurations (V1, V2, V3, Apex) based on token yield and architectural choices. Apex was selected for its optimal balance of high yield and computational efficiency, enabling processing of web-scale data within practical resource constraints.
                </p>
              </section>

              {/* Filtering Specification */}
              <section id="filtering-specification" data-section="filtering-specification">
                <h3 className="text-xl font-bold text-gray-900 mb-3">D. Filtering Pipeline: Stage-by-Stage Specification</h3>
                <p>
                  The FLUX filtering pipeline comprises 13 distinct stages organized into four functional blocks. Each stage is calibrated to maximize quality improvement while minimizing token loss. Detailed filter specifications and removal statistics are provided for reproducibility.
                </p>
              </section>

              {/* Bloom Filter */}
              <section id="bloom-filter" data-section="bloom-filter">
                <h3 className="text-xl font-bold text-gray-900 mb-3">E. Bloom Filter Deduplication: Configuration and Scale</h3>
                <p>
                  We conducted extensive ablation studies to optimize BFF parameters including false-positive rate and n-gram count. The final configuration balances deduplication effectiveness with corpus scale retention, enabling efficient processing of multi-dump archives.
                </p>
              </section>

              {/* Dual-Bin Classification */}
              <section id="dual-bin-classification" data-section="dual-bin-classification">
                <h3 className="text-xl font-bold text-gray-900 mb-3">F. Dual-Bin FastText Classification: Threshold Sweep and Operating Point Selection</h3>
                <p>
                  We performed a comprehensive sweep over (T_DCLM, T_BETR) threshold pairs to identify the optimal operating point. The selected configuration maximizes aggregate benchmark performance while maintaining high token retention.
                </p>
              </section>

              {/* Corpus Composition */}
              <section id="corpus-composition" data-section="corpus-composition">
                <h3 className="text-xl font-bold text-gray-900 mb-3">G. Corpus Composition and Domain Analysis</h3>
                <p>
                  Analysis of the FLUX-curated corpus reveals a diverse distribution across domains including news, educational content, technical documentation, and general web. The pipeline effectively reduces representation of low-quality domains while preserving topical diversity.
                </p>
              </section>

              {/* Extended Results */}
              <section id="extended-results" data-section="extended-results">
                <h3 className="text-xl font-bold text-gray-900 mb-3">H. Extended Evaluation Results</h3>
                <p>
                  Per-benchmark learning curves and results at 530M and 1B scales confirm consistency of FLUX's improvements across compute regimes. The pipeline maintains its advantage over baselines throughout training, with gains becoming more pronounced at larger scales.
                </p>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FLUX;
