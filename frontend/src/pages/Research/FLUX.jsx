import React from 'react';

const FLUX = () => {
  return (
    <div className="min-h-screen bg-[#f3f1e9]">
      <div className="max-w-4xl mx-auto px-6 py-12 bg-[#fffdf7]">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          FLUX: Data Worth Training On
        </h1>

        {/* Read the Paper Button */}
        <div className="mb-8">
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
        <div className="prose prose-lg max-w-none text-gray-800 space-y-6" style={{ textAlign: "justify" }}>
          
          <p>
            FLUX is a preprocessing pipeline designed to improve the quality and efficiency of large-scale web datasets used for training language models.
          </p>

          <p>
            Large language models rely heavily on the quality and composition of their training data. While much of the recent progress in AI has focused on scaling model parameters and computational resources, the datasets used during pretraining play an equally important role in determining model capability and generalization.
          </p>

          <p>
            FLUX addresses the challenge of preparing web-scale training data by improving dataset quality while preserving a larger fraction of usable tokens during dataset construction.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Challenge of Web-Scale Training Data</h2>

          <p>
            Preparing datasets for large language model training presents a persistent challenge. Raw web corpora contain a wide range of undesirable content including duplicated text, boilerplate pages, fragmented sentences, and other low-information artifacts.
          </p>

          <p>
            Most preprocessing pipelines must therefore balance two competing goals:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>improving dataset quality through aggressive filtering</li>
            <li>preserving dataset scale by retaining large volumes of raw web data</li>
          </ul>

          <p>
            Aggressive filtering reduces noise but removes large portions of available tokens, while retaining scale introduces significant noise into the training corpus.
          </p>

          <p>
            FLUX is designed to improve this balance by maximizing token retention while maintaining strong filtering standards.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Pipeline Architecture</h2>

          <p>
            The FLUX pipeline processes raw web data through multiple stages designed to progressively improve dataset quality while preserving useful tokens.
          </p>

          <p>
            The pipeline consists of four major stages:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Text extraction</li>
            <li>Heuristic filtering</li>
            <li>Deduplication</li>
            <li>Model-based classification</li>
          </ul>

          <p>
            Each stage progressively improves dataset quality while maintaining strong retention of useful tokens.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Pipeline Design</h2>

          <p>
            Several design principles guide the FLUX pipeline.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Line-Level Cleaning</h3>

          <p>
            Instead of rejecting entire documents when noise is detected, FLUX performs line-level cleaning. Low-quality segments are removed while useful content within the same document is preserved. This approach significantly improves token retention.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Efficient Parsing</h3>

          <p>
            FLUX uses the Apex parser for text extraction, providing high token yield while maintaining low computational overhead during preprocessing.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">Dual-Bin Classification</h3>

          <p>
            FLUX introduces a dual-bin FastText classification framework that combines complementary signals for identifying high-quality content. Documents are retained if they satisfy either classifier, improving the balance between token retention and dataset quality.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Experimental Results</h2>

          <p>
            To evaluate the effectiveness of FLUX, models were trained using datasets curated by the pipeline and compared with models trained on datasets produced by existing preprocessing pipelines.
          </p>

          <p>
            A 3B parameter model trained on 60B tokens curated using FLUX achieves 32.14% on the MMLU benchmark, outperforming models trained on datasets produced by pipelines such as DCLM and FineWeb.
          </p>

          <p>
            Across the evaluation suite:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>FLUX aggregate score:</strong> 51.92</li>
            <li><strong>DCLM aggregate score:</strong> 50.48</li>
            <li><strong>FineWeb aggregate score:</strong> 48.83</li>
          </ul>

          <p>
            At the data level, FLUX extracts 50B usable tokens from a single Common Crawl dump, compared with 40B tokens for DCLM, representing a 25% improvement in token retention.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why Data Pipelines Matter</h2>

          <p>
            As language models continue to scale, improvements in dataset construction become increasingly important.
          </p>

          <p>
            Better preprocessing pipelines influence:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>model capability</li>
            <li>training efficiency</li>
            <li>computational cost</li>
            <li>scalability of training systems</li>
          </ul>

          <p>
            FLUX demonstrates that strong filtering, high token retention, and computational efficiency can coexist within a single web-scale preprocessing pipeline.
          </p>

        </div>
      </div>
    </div>
  );
};

export default FLUX;
