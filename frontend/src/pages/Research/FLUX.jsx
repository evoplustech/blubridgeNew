import React from 'react';

const FLUX = () => {
  return (
    <div className="min-h-screen bg-[#f3f1e9]">
      <div className="max-w-4xl mx-auto px-6 py-12 bg-[#fffdf7]">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
          
          {/* Abstract */}
          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Abstract</h2>
          <p>
            Modern large language model training is no longer limited by data availability, but by the inability of existing preprocessing pipelines to simultaneously achieve massive scale and high data quality. Current approaches are forced to sacrifice one for the other—either aggressively filtering to improve quality at the cost of severe token loss, or retaining large volumes of data while introducing substantial noise.
          </p>

          <p>
            In this work, we introduce FLUX, a preprocessing pipeline specifically designed to break this long-standing trade-off by maximizing token retention while enforcing rigorous quality control. Models trained on FLUX-curated data consistently outperform prior methods.
          </p>

          {/* Key Results */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Key Results</h2>
          
          <ul className="list-disc pl-6 space-y-3">
            <li>
              A <strong>3B-parameter model</strong> trained on 60B tokens with FLUX achieves <strong>32.14% MMLU accuracy</strong>, surpassing the previous state-of-the-art pipeline DCLM (31.98%) and significantly outperforming FineWeb (29.88%).
            </li>
            <li>
              FLUX achieves the same aggregate score as a model trained on DCLM data using only <strong>39B tokens</strong>, resulting in a <strong>34.4% reduction in training compute</strong>.
            </li>
            <li>
              At the data level, FLUX extracts <strong>50B usable tokens</strong> from a single dump (CC-MAIN-2025-51), compared to 40B from DCLM (<strong>+25% retention</strong>).
            </li>
            <li>
              FLUX-Base yields <strong>192B tokens</strong>, exceeding FineWeb's 170B while still maintaining superior quality.
            </li>
          </ul>

          {/* Breaking the Retention-Quality Trade-off */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Breaking the Retention-Quality Trade-off</h2>
          <p>
            FLUX's primary achievement is demonstrating that high token retention and high data quality are not mutually exclusive. It achieves this through a refined filtering strategy that excises low-quality lines rather than entire documents. This approach allows FLUX to preserve valuable content within documents that might otherwise be discarded entirely.
          </p>

          {/* Computational Efficiency */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Computational Efficiency</h2>
          <p>
            FLUX significantly reduces training compute requirements. A 3B-parameter model trained on FLUX-curated data achieves the same performance as a DCLM-trained model but with approximately 34.4% fewer FLOPs. This translates to substantial cost savings for organizations training large language models.
          </p>

          {/* Pipeline Architecture */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Pipeline Architecture</h2>
          <p>
            The pipeline is built on a deterministic, 13-stage filtering process that progressively refines data quality. Key stages include:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>URL-based pre-filtering:</strong> Initial filtering based on URL patterns and domain quality</li>
            <li><strong>Language identification:</strong> Ensuring content matches target language requirements</li>
            <li><strong>Document-level quality gating:</strong> Coarse filtering to remove obviously low-quality documents</li>
            <li><strong>Line-level cleaning:</strong> Granular removal of low-quality lines within documents</li>
            <li><strong>Dual-bin FastText classification:</strong> Advanced quality control balancing world knowledge and reasoning signals</li>
          </ul>

          {/* Dual-Bin Classification */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Effective Dual-Bin Classification</h2>
          <p>
            The integration of a dual-bin FastText classifier (combining a standard DCLM classifier with a benchmark-targeted BETR classifier) allows for a more nuanced selection of high-quality documents, balancing world knowledge and reasoning signals. This technique could be explored for other data curation tasks.
          </p>

          {/* Conclusion */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Conclusion</h2>
          <p>
            Overall, FLUX establishes a new state of the art in web-scale data preprocessing by demonstrating that high retention, strong quality control, and computational efficiency can be achieved simultaneously, redefining the limits of scalable dataset construction for modern language models.
          </p>

          <p>
            FLUX establishes a new paradigm for web-scale dataset construction, laying the groundwork for future data-centric research, especially in multilingual settings and for larger model scales.
          </p>

          {/* Authors */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Authors</h2>
          <p>
            Gowtham, Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya
          </p>

        </div>
      </div>
    </div>
  );
};

export default FLUX;
