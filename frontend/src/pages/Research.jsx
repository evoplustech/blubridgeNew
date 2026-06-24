import React from 'react';
import { Users, FileText, ExternalLink, Calendar } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

const BLUTRAIN_AUTHORS = [
  'Adhitya Charan', 'Adwaid Suresh', 'Anuj Kumar', 'Aparna A', 'Dhanakumar K',
  'Dharun MS', 'Dinesh G', 'Goutham Kumar Reddy K', 'Harshini V M', 'Jenifa D', 'Jona Delcy C A',
  'Kathirvel S', 'Killi Uma Maheswara Rao', 'Kiruthik Kanna M', 'Kurra Vishnu Sai', 'Madhumithaa G K',
  'Navin Kumar V', 'Ram Charan Golla', 'Revathi T', 'Rishikkanth R', 'Sanjay Krishna MV', 'Surendra Vendra'
];
const FLUX_AUTHORS = ['Gowtham', 'Sai Rupesh', 'Sanjay Kumar', 'Saravanan', 'Venkata Chaithanya'];
const BLUWERP_AUTHORS = ['Gowtham', 'Sai Rupesh', 'Sanjay Kumar', 'Saravanan', 'Venkata Chaithanya'];

const AuthorPills = ({ authors, paper }) => (
  <div className="flex items-start gap-2 mb-5 mt-4" data-testid={`${paper}-authors`}>
    <Users className="w-[13.5px] h-[13.5px] text-[#6B7280] flex-shrink-0 mt-1" />
    <p className="text-[#2F3A4A] leading-relaxed" style={{ fontSize: '13.5px' }}>
      {authors.join(', ')}
    </p>
  </div>
);

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
          
          {/* Paper Card 1 - BluTrain (NEW - TOP) */}
          <div 
            className="backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-sm border border-[#E8EDD8]"
            style={{ backgroundColor: '#fffdf7' }}
          >
            
            {/* Paper Title */}
            <h2 className="text-[1.4rem] font-bold text-[#0B1F3B] leading-tight mb-4">
              BluTrain: A Robust, Lightweight, and Architecture-General C++/CUDA Framework for AI Systems
            </h2>

            {/* Authors Row */}
            <AuthorPills authors={BLUTRAIN_AUTHORS} paper="blutrain" />

            {/* Publish Date */}
            <p className="text-sm mb-6">
              <span className="font-bold text-[#0B1F3B]">Published:</span>
              <span className="text-[#2F3A4A] ml-1">June 2026</span>
            </p>

            {/* Divider */}
            <hr className="border-[#E8EDD8] mb-6" />

            {/* Abstract Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#6B7280]" />
                <span className="text-[#0B1F3B] font-medium">Abstract</span>
              </div>
              
              <p className="text-[#2F3A4A] leading-relaxed text-base">
               Progress in deep learning is, at scale, more a matter of systems engineering than of modelling: the behaviour of a model in training (its throughput, its memory footprint, and the numerical fidelity of the result) is determined less by the architecture itself than by how that architecture is expressed on the hardware. <a href="https://arxiv.org/abs/2606.24780" target="_blank" className="text-[#328CC1] hover:underline ml-1">More »</a>
              </p>
            </div>

            {/* External Link */}
            <a 
              href="https://arxiv.org/abs/2606.24780" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#328CC1] hover:underline text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              View on arXiv
            </a>
          </div>

          {/* Paper Card 2 - FLUX (NEW - TOP) */}
          <div 
            className="backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-sm border border-[#E8EDD8]"
            style={{ backgroundColor: '#fffdf7' }}
          >
            
            {/* Paper Title */}
            <h2 className="text-[1.4rem] font-bold text-[#0B1F3B] leading-tight mb-4">
              FLUX: Data Worth Training On — A Preprocessing Pipeline for Large Language Model Training
            </h2>

            {/* Authors Row */}
            <AuthorPills authors={FLUX_AUTHORS} paper="flux" />

            {/* Publish Date */}
            <p className="text-sm mb-6">
              <span className="font-bold text-[#0B1F3B]">Published:</span>
              <span className="text-[#2F3A4A] ml-1">March 2026</span>
            </p>

            {/* Divider */}
            <hr className="border-[#E8EDD8] mb-6" />

            {/* Abstract Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#6B7280]" />
                <span className="text-[#0B1F3B] font-medium">Abstract</span>
              </div>
              
              <p className="text-[#2F3A4A] leading-relaxed text-base">
                FLUX is a preprocessing pipeline designed to improve the quality of large-scale web datasets used for training language models. The pipeline maximises token retention while maintaining strong filtering standards during dataset construction
                <a href="Research/FLUX-Data" className="text-[#328CC1] hover:underline ml-1">More »</a>
              </p>
            </div>

            {/* External Link */}
            <a 
              href="https://arxiv.org/abs/2603.13972" 
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
            <h2 className="text-[1.4rem] font-bold text-[#0B1F3B] leading-tight mb-4">
              Blu-WERP (Web Extraction and Refinement Pipeline): A Scalable Pipeline for Preprocessing Large Language Model Datasets
            </h2>

            {/* Authors Row */}
            <AuthorPills authors={BLUWERP_AUTHORS} paper="bluwerp" />

            {/* Publish Date */}
            <p className="text-sm mb-6">
              <span className="font-bold text-[#0B1F3B]">Published:</span>
              <span className="text-[#2F3A4A] ml-1">November 2025</span>
            </p>

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
