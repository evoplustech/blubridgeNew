import React from 'react';
import { Users, FileText, ExternalLink } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Research = () => {
  useDocumentTitle('Papers & Publications | BluBridge');

  return (
    <div 
      className="min-h-screen pt-24 pb-16"
      style={{
        backgroundColor: '#f3f1e9',
      }}
    >
      <div className="container-custom">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#0B1F3B] mb-12">
          Papers & Publications
        </h1>

        {/* Paper Card */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-sm border border-[#E8EDD8]"
            style={{ backgroundColor: '#fffdf7' }}
          >
            
            {/* Paper Title */}
            <h2 className="text-xl md:text-2xl font-bold text-[#0B1F3B] leading-tight mb-6">
              Blu-WERP (Web Extraction and Refinement Pipeline): A Scalable Pipeline for Preprocessing Large Language Model Datasets
            </h2>

            {/* Authors Row */}
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-[#6B7280]" />
              <span className="text-[#2F3A4A] text-sm">
                Gowtham, Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya
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
                Blubridge proudly presents the process behind "Blu-WERP", our pipeline that sets a new industry standard for scalable, high-quality LLM pretraining data this month. In our paper, we demonstrate training and evaluation details, including the data preparation pipeline, from JusText extraction to Benchmark-targeted classification...
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
