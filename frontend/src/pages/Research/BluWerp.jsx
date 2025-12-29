import React from 'react';

const BluWerp = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Blu-WERP: Introducing the new State of Art preprocessing pipeline for LLM training
        </h1>

        {/* Read the Paper Button */}
        <div className="mb-8">
         <a
  href="https://arxiv.org/abs/2511.18054"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="bg-[#0B1F3B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#1a3a5c] transition-colors">
    Read the Paper
  </button>
</a>
        </div>

        {/* Introduction Paragraphs */}
        <div className="prose prose-lg max-w-none text-gray-800 space-y-6">
          <p>
            In today's rapidly evolving technological landscape, artificial intelligence is no longer just a tool. It is a force actively shaping how individuals work, how industries operate, and even how nations govern. Around the world, governments are beginning to recognize its strategic importance; for example, Albania recently appointed a Minister of State for Artificial Intelligence to oversee public procurement and strengthen anti-corruption efforts.
          </p>

          <p>
            Yet, the true hero of modern AI isn't the model itself, it's the data behind it. No matter how advanced a language model may seem, its capabilities are ultimately limited by the quality, cleanliness, and diversity of the data it is trained on. Every second, millions of new documents, posts, articles, and digital traces are generated worldwide, forming a vast ocean of information with immense economic and societal value. But transforming this raw, noisy data into something meaningful, reliable, and safe for training requires rigorous engineering, careful filtering, and principled design.
          </p>

          <p>
            In BluBridge, we came up with a Research to have a State of the Art Pipeline and the result of the Research is Blu-WERP arxiv paper. This paper presents Blu-WERP, a novel data preprocessing pipeline designed to optimize the quality of Common Crawl WARC files for LLM training. During the research, we conducted comprehensive evaluations using models with 150M, 400M, 530M, 750M, and 1B parameters, testing against nine standard benchmarks categorized as World Knowledge & Reasoning (MMLU, ARC-Easy, ARC-Challenge). Language Understanding (HellaSwag, Winogrande), and Commonsense Reasoning (PIQA, SocialIQA, CSQA, OpenBookQA). Results show Blu-WERP consistently achieved superior performance across all model scales. At the 1B parameter scale, Relatively Blu-WERP demonstrates a 4.0% and 9.5% aggregate improvement over DCLM and Fineweb respectively.
          </p>

          <p>
            At BluBridge, we set out to develop a state-of-the-art data preprocessing pipeline tailored for modern LLM training. This effort resulted in Blu-WERP, our newly released arXiv paper, which introduces a novel and highly effective pipeline purpose-built to enhance the quality of Common Crawl WARC files.
          </p>

          <p>
            As part of our research, we conducted extensive evaluations across models with 150M, 400M, 530M, 750M, and 1B parameters, benchmarking performance on nine widely recognized tasks spanning three categories:
          </p>

          {/* Bullet Points */}
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>World Knowledge & Reasoning:</strong> MMLU, ARC-Easy, ARC-Challenge</li>
            <li><strong>Language Understanding:</strong> HellaSwag, Winogrande</li>
            <li><strong>Commonsense Reasoning:</strong> PIQA, SocialIQA, CSQA, OpenBookQA</li>
          </ul>

          <p>
            Across all model scales, Blu-WERP consistently delivered superior results. At the 1B parameter scale, Blu-WERP achieved a 4.0% aggregate improvement over DCLM and a 9.5% improvement over FineWeb, demonstrating clear gains in downstream evaluation performance.
          </p>

          {/* Figure 1: Final Aggregate Score */}
          <div className="my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Aggregate Score</h2>
            <img 
              src="https://customer-assets.emergentagent.com/job_blubridge-research/artifacts/8ynk6ey2_figure1.png" 
              alt="Final Aggregate Score" 
              className="w-full max-w-3xl"
            />
            <p className="text-sm text-gray-600 mt-2 italic">
              Figure 1: Aggregate benchmark performance comparison across five datasets. Blu-WERP achieves 53.88% aggregate accuracy, outperforming DCLM (51.81%) and other base lines.
            </p>
          </div>

          {/* Figure 2: All Benchmark Metrics */}
          <div className="my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All Benchmark Metrics</h2>
            <img 
              src="https://customer-assets.emergentagent.com/job_blubridge-research/artifacts/mkkdlsa7_figure2.webp" 
              alt="All Benchmark Metrics" 
              className="w-full max-w-3xl"
            />
            <p className="text-sm text-gray-600 mt-2 italic">
              Evaluation results across nine benchmarks from the standardized evaluation suite. Our dataset outperforms all other corpora on the majority of tasks, with competitive results comparable to DCLM. While performance on MMLU and SocialIQA slightly trails DCLM, our dataset achieves parity in benchmarks assessing world knowledge (MMLU, ARC Easy, ARC Challenge) and demonstrates superior results in language understanding (HellaSwag, SocialIQA) and common-sense reasoning (CSQA, PIQA).
            </p>
          </div>

          <p>
            To achieve this results, we had done multiple ablations across multiple components, that contains Parser, Deduplication and Classifier.
          </p>

          {/* Parser Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Parser</h2>
          
          <p>
            Text extraction marks the first stage in transforming raw Common Crawl HTML data into clean text that can be effectively filtered and deduplicated. To understand its influence on overall pipeline quality, we evaluated four extraction tools: Resiliparse jusText Trafilatura, and the default WET text provided by Common Crawl.
          </p>

          <p>
            A key distinction among these tools lies in how they handle language detection. jusText incorporates a stopword-based filtering mechanism during extraction, which automatically discards pages that lack clear linguistic structure. In contrast, Resiliparse and Trafilatura do not apply such constraints, leading to higher initial text retention immediately after parsing.
          </p>

          {/* Figure 3: Parsers Aggregate Score */}
          <div className="my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Parsers Aggregate Score</h2>
            <img 
              src="https://customer-assets.emergentagent.com/job_blubridge-research/artifacts/t16l0jad_figure3.webp" 
              alt="Parsers Aggregate Score" 
              className="w-full max-w-3xl"
            />
            <p className="text-sm text-gray-600 mt-2 italic">
              Figure 3: Aggregate benchmark performance across four parser configurations. Jus-text achieves highest aggregate score (0.4474) with 49.96% retention, followed by Trafilatura (0.4429, 43.25% retention), Resiliparse (0.4402, 19.44% retention), and WET baseline (0.4057)
            </p>
          </div>

          <p>
            To increase the overall information richness of our dataset, we apply deduplication using a Bloom Filter-based technique. Web-scale text collections often contain large amounts of repeated or mirrored content, and keeping these duplicates artificially inflates the dataset while adding little real value. Removing them ensures that models encounter a greater variety of unique text within the same token budget, which is known to improve downstream performance.
          </p>

          <p>
            As part of the research, we compared several deduplication approaches, including Bloom Filters, MinHash, and Suffix Array based methods and hybrid tests within them. We also tested different Bloom Filter configurations to identify which variant would be most effective for large-scale corpus cleaning.
          </p>

          <p>
            After extensive experimentation, we adopted a deduplication setup that provides the best trade-off between speed and accuracy, ensuring that the final processed corpus maintains high quality without incurring unnecessary computational cost.
          </p>

          {/* Figure 4: Deduplication Aggregate Score */}
          <div className="my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deduplication Aggregate Score</h2>
            <img 
              src="https://customer-assets.emergentagent.com/job_blubridge-research/artifacts/w86i571k_figure4.png" 
              alt="Deduplication Aggregate Score" 
              className="w-full max-w-3xl"
            />
            <p className="text-sm text-gray-600 mt-2 italic">
              Figure 4: Deduplication Ablation tests across Bloom filter Settings with and without the integration of Min-Hash, this shows Bloom-filter Old Both setting has a higher aggregate score of 49.22% followed by the Hybrid method of Exact+Sub-String+Min-Hash.
            </p>
          </div>

          {/* Classifier Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Classifier</h2>
          
          <p>
            Even after applying structural filters and removing repetitive content, a large amount of web text remains that is grammatically correct but lacks real substance or depth. This text is often superficial, promotional, or otherwise low-value despite appearing well-written. To tackle this issue, we add a semantic quality classifier as the final step in our data-processing pipeline. This classifier is trained to separate genuinely informative and educationally valuable documents from generic or low-quality ones. We chose a FastText-based classifier because it is highly efficient at scale and handles the wide vocabulary variation typical of web data extremely well. By using subword information, FastText can generalize robustly across different styles and domains, enabling us to reliably categorize massive volumes of web documents into high-value and low-value groups with minimal computational cost. The semantic classifier complements the earlier filtering stages: while those remove noise, boilerplate, and duplicates, this final classifier focuses on conceptual richness and usefulness. As a result, the curated dataset is not only clean and diverse but also genuinely substantive providing the kind of high-quality content that best supports effective pretraining of language models and strong downstream reasoning capabilities.
          </p>

          {/* Classifiers Aggregate Score - Note: Figure 5 image not provided */}
          <div className="my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Classifiers Aggregate Score</h2>
            <p className="text-sm text-gray-600 mt-2 italic">
              Figure 5: Classifier ablation comparison across four approaches. BETR-based FastText classifier achieves highest aggregate accuracy (0.538), outperforming DeBERTa (0.4948), DCLM-bin fasttext classifier (0.5137), and LLaMA-Score+BERT (0.5128) methods.
            </p>
          </div>

          {/* Limitations Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Limitations</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Language and domain scope</h3>
          <p>
            Our evaluation focuses exclusively on English web data and general-purpose benchmarks. Extension to multilingual corpora and domain-specific evaluations (e.g., code, scientific literature) remains unexamined and may require adapted quality classifiers.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Factual accuracy</h3>
          <p>
            Our pipeline does not verify factual correctness of retained documents. While classifier-based filtering prioritizes educational content, it cannot guarantee truthfulness, potentially retaining misinformation present in the original web crawl.
          </p>

          {/* Next Work Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Next Work</h2>
          <p>
            At this time, we might beat DCLM in the Benchmark Metrics by 4% relatively, but we are lagging behind them in the data retention and the gap is 33%, we are working on this issue to retain more data by the end of the pipeline and also the data obtained from the pipeline should beat the DCLM and Fineweb in the benchmark Metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BluWerp;
