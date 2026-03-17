import React from 'react';
import { Users, FileText, ExternalLink, Calendar } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

const Research = () => {
  useDocumentTitle('Research | Blubridge');
  useMetaDescription('Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.');

  return (
    <div 
      className="min-h-screen pt-24 pb-16"
      style={{
        backgroundColor: '#f3f1e9',
      }}
    >
      <div className="container-custom">
        {/* Page Title */}
        <h1 className="text-4xl md:text-4xl font-bold text-center text-[#0B1F3B] mb-12">
          Papers & Publications
        </h1>

        <div className="max-w-8xl mx-auto px-4 space-y-8">
          
          {/* Paper Card 1 - FLUX (NEW - TOP) */}
          <div 
            className="backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-sm border border-[#E8EDD8]"
            style={{ backgroundColor: '#fffdf7' }}
          >
            
            {/* Paper Title */}
            <h2 className="text-xl md:text-2xl font-bold text-[#0B1F3B] leading-tight mb-4">
              FLUX: Data Worth Training On
            </h2>

            {/* Authors Row */}
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#6B7280]" />
              <span className="text-[#2F3A4A] text-sm">
                Gowtham, Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya
              </span>
            </div>

            {/* Publish Date */}
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-[#6B7280]" />
              <span className="text-[#6B7280] text-sm">
                Published: March 2026
              </span>
            </div>

            {/* Divider */}
            <hr className="border-[#E8EDD8] mb-6" />

            {/* Abstract Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#6B7280]" />
                <span className="text-[#0B1F3B] font-medium">Abstract</span>
              </div>
              
              <p className="text-[#2F3A4A] leading-relaxed text-base">
                Modern large language model training is no longer limited by data availability, but by the inability of existing preprocessing pipelines to simultaneously achieve massive scale and high data quality. In this work, we introduce FLUX, a preprocessing pipeline specifically designed to break this long-standing trade-off by maximizing token retention while enforcing rigorous quality control. Models trained on FLUX-curated data consistently outperform prior methods...
                <a href="Research/FLUX" className="text-[#328CC1] hover:underline ml-1">More »</a>
              </p>
            </div>

            {/* External Link */}
            <a 
              href="https://arxiv.org/pdf/2603.13972" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#328CC1] hover:underline text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              View on arXiv
            </a>
          </div>

          {/* Paper Card 2 - Blu-WERP (Existing) */}
          <div 
            className="backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-sm border border-[#E8EDD8]"
            style={{ backgroundColor: '#fffdf7' }}
          >
            
            {/* Paper Title */}
            <h2 className="text-xl md:text-2xl font-bold text-[#0B1F3B] leading-tight mb-4">
              Blu-WERP (Web Extraction and Refinement Pipeline): A Scalable Pipeline for Preprocessing Large Language Model Datasets
            </h2>

            {/* Authors Row */}
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#6B7280]" />
              <span className="text-[#2F3A4A] text-sm">
                Gowtham, Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya
              </span>
            </div>

            {/* Publish Date */}
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-[#6B7280]" />
              <span className="text-[#6B7280] text-sm">
                Published: November 2025
              </span>
            </div>

            {/* Divider */}
            <hr className="border-[#E8EDD8] mb-6" />

            {/* Abstract Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#6B7280]" />
                <span className="text-[#0B1F3B] font-medium">Abstract</span>
              </div>
              
              <p className="text-[#2F3A4A] leading-relaxed text-base">
                Blubridge is proudly presenting the process behind "Blu-WERP", our pipeline that is setting a new industry standard for scalable, high-quality LLM pretraining data this month. In our paper, we are demonstrating training and evaluation details, including the data preparation pipeline, from JusText extraction to Benchmark-targeted classification...
                <a href="Research/Blu-Werp" className="text-[#328CC1] hover:underline ml-1">More »</a>
              </p>
            </div>

            {/* External Link */}
            <a 
              href="https://arxiv.org/abs/2511.18054" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#328CC1] hover:underline text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              View on arXiv
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Research;
