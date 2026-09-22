const express = require('express');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
const securityHeaders = require('./securityHeaders');

const app = express();
securityHeaders(app);
const PORT = Number(process.env.PORT);
if (!PORT) throw new Error('PORT is required');

const buildDir = path.join(__dirname, 'build');
const indexPath = path.join(buildDir, 'index.html');

function ensureBuildExists() {
  if (!fs.existsSync(indexPath)) {
    console.log('[auto-rebuild] build/index.html missing — rebuilding...');
    try {
      execSync('cd /app/frontend && yarn build', { stdio: 'inherit', timeout: 120000 });
      console.log('[auto-rebuild] Build completed successfully.');
    } catch (e) {
      console.error('[auto-rebuild] Build failed:', e.message);
    }
  }
}

ensureBuildExists();

setInterval(() => {
  if (!fs.existsSync(indexPath)) {
    ensureBuildExists();
  }
}, 30000);

// ─── Auto-rebuild watcher: rebuilds whenever src/ changes (debounced) ───
const srcDir = path.join(__dirname, 'src');
let rebuildTimer = null;
let isRebuilding = false;
let pendingRebuild = false;

function triggerRebuild(reason) {
  if (isRebuilding) {
    pendingRebuild = true;
    return;
  }
  isRebuilding = true;
  console.log(`[auto-rebuild] Change detected (${reason}). Rebuilding...`);
  try {
    execSync('cd /app/frontend && yarn build', { stdio: 'inherit', timeout: 180000 });
    console.log('[auto-rebuild] Rebuild completed.');
  } catch (e) {
    console.error('[auto-rebuild] Rebuild failed:', e.message);
  } finally {
    isRebuilding = false;
    if (pendingRebuild) {
      pendingRebuild = false;
      setTimeout(() => triggerRebuild('queued'), 500);
    }
  }
}

function scheduleRebuild(filename) {
  if (rebuildTimer) clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(() => triggerRebuild(filename || 'src change'), 2000);
}

if (fs.existsSync(srcDir)) {
  try {
    fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      if (filename.includes('node_modules') || filename.startsWith('.') || filename.endsWith('~')) return;
      scheduleRebuild(filename);
    });
    console.log('[auto-rebuild] Watching src/ for changes (2s debounce).');
  } catch (e) {
    console.error('[auto-rebuild] Failed to start watcher:', e.message);
  }
}
// ─── End auto-rebuild watcher ───

// Build version tracking for live reload
let buildVersion = Date.now().toString();
fs.watchFile(indexPath, { interval: 2000 }, () => {
  buildVersion = Date.now().toString();
  console.log('[live-reload] Build changed, new version:', buildVersion);
});

app.get('/build-version.json', (req, res) => {
  res.status(404).send('Not found');
});

// Live reload script injected into pages
const liveReloadScript = `
<script>
(function(){
  var currentVersion = null;
  setInterval(function(){
    fetch('/build-version.json').then(function(r){return r.json()}).then(function(d){
      if(currentVersion && currentVersion !== d.version){ location.reload(); }
      currentVersion = d.version;
    }).catch(function(){});
  }, 3000);
})();
</script>
`;

// Headers and confinement are installed before every route, including early errors.

// Block source map requests in production
app.use((req, res, next) => {
  if (req.url.endsWith('.map')) {
    return res.status(404).send('Not found');
  }
  next();
});

// SEO Content for each route - EXACT visible content from each page
const seoContent = {
  '/': {
    title: 'Frontier AI Research and Enterprise Solutions | Blubridge',
    description: 'Blubridge is an independent AI research lab engineering deep learning systems from first principles and delivering enterprise-grade AI models, infrastructure, and deployment solutions.',
    content: `
      <h1>Beyond the Horizon</h1>
      <p>Frontier AI Research Lab.</p>
      
      <h2>OUR FRONTIER AI EXPERTISE</h2>
      
      <h3>By Industry</h3>
      <ul>
        <li>Telco</li>
        <li>Finance & Insurance</li>
        <li>Education</li>
        <li>Legal</li>
        <li>Software & Technology</li>
        <li>Manufacturing</li>
        <li>Government</li>
        <li>Healthcare</li>
        <li>Oil & Gas</li>
        <li>Construction & Infra</li>
      </ul>
      
      <h3>By Services</h3>
      
      <h4>Model Customization</h4>
      <p>Research-driven model adaptation using domain data, structured training workflows, and controlled specialization methods. We focus on reproducible training pipelines, evaluation rigor, and system-level correctness.</p>
      
      <h4>Value Realization</h4>
      <p>From use-case validation to engineering prototypes, we help translate AI experimentation into measurable technical outcomes and deployment-ready system designs.</p>
      
      <h4>Deployment</h4>
      <p>Engineering-led deployment architectures across cloud, private, and controlled infrastructure environments, with focus on reliability, performance, and operational constraints.</p>
      
      <h2>BluBridge Infrastructure for custom AI deployment Solutions</h2>
      
      <h3>Data</h3>
      <p>We help you design & build custom datasets for your bespoke requirement.</p>
      <ul>
        <li>Efficient Data Pipeline</li>
        <li>Multimodal & Multilinguistic Dataset</li>
        <li>Synthetic data generation</li>
        <li>Domain Specific Dataset curation</li>
      </ul>
      
      <h3>Pre-training</h3>
      <p>We are building a series of pre-trained models uniquely suited for different work loads.</p>
      <ul>
        <li>Natural Language Processing</li>
        <li>Speech Recognition & Generation</li>
        <li>Sequence Models & Visual Models</li>
        <li>Recommender Systems</li>
      </ul>
      
      <h3>Mid-training</h3>
      <p>A custom mid-training for domain specific requirement.</p>
      <ul>
        <li>Curriculum-based refinement</li>
        <li>Domain-specific mid-training</li>
        <li>Stability and bias control</li>
        <li>Performance shaping</li>
      </ul>
      
      <h3>Post-training</h3>
      <p>Enhanced model readiness through targeted refinement, evaluation, and optimization for real-world performance.</p>
      <ul>
        <li>Fine-tuning for accuracy</li>
        <li>Safety and quality checks</li>
        <li>Inference optimization</li>
        <li>Production readiness</li>
      </ul>
      
      <h3>Agent Build</h3>
      <p>Design intelligent agents that reason, act, and adapt across real workflows, turning models into autonomous systems.</p>
      <ul>
        <li>Task-aware agent design</li>
        <li>Tool and API integration</li>
        <li>Multi-step reasoning flows</li>
        <li>Production-grade orchestration</li>
      </ul>
      
      <h3>Inference Optimization</h3>
      <p>Optimizing models for fast, reliable, and cost-efficient execution in real-world environments.</p>
      <ul>
        <li>Low-latency execution</li>
        <li>Memory-efficient serving</li>
        <li>Hardware-level tuning</li>
        <li>Scalable inference pipelines</li>
      </ul>
      
      <h3>Infrastructure Scaling</h3>
      <p>Expanding AI systems seamlessly, ensuring performance is remaining consistent as demand and complexity grow.</p>
      <ul>
        <li>Elastic compute expansion</li>
        <li>High-throughput orchestration</li>
        <li>Load-aware resource scaling</li>
        <li>Production-grade resilience</li>
      </ul>
      
      <h2>Work with BluBridge</h2>
      <p>We are a small creative group driven by rigorous scientific thinking. Our work blends deep research with real-world execution, building AI models that are efficient, practical, and powerful, guided by both academic excellence and an agile, business-ready approach.</p>
      
      <h2>Know more about our Research</h2>
    `
  },
  '/solutions': {
    title: 'Applied AI Solutions - For your Use Case | Blubridge',
    description: 'Research-driven AI model customization and deployment engineering solutions for enterprise systems, from domain training to production-grade infrastructure.',
    content: `
      <h1>Engineering AI-Native Systems for Enterprise Frontiers</h1>
      <p>Partnering with ambitious organizations from model development to production grade deployment through research-driven, system-level AI engineering.</p>
      
      <h2>Domain-Specialized Models, Engineered on Proprietary Data</h2>
      <p>Adapt general-purpose foundation models into domain-aligned systems through research-driven training and controlled model engineering. Model customization capabilities are under active development across training, specialization, and inference optimization workflows. This track focuses on repeatable training discipline, evaluation rigor, and system-level correctness.</p>
      
      <h3>Custom Pre-Training</h3>
      <p>We are building and validating domain oriented pre-training and continued training pipelines using customized datasets and controlled training configurations.</p>
      <ul>
        <li>Full pre-training workflows using curated domain data mixtures and custom training recipes</li>
        <li>Continued pre-training from open or internal checkpoints using domain corpora</li>
        <li>Tokenization and dataset strategy design for domain signal preservation</li>
        <li>Training evaluation and regression tracking frameworks</li>
      </ul>
      
      <h3>Specialized Model Capabilities</h3>
      <p>Specialization workflows are in prototype and validation stages to adapt model behavior and task performance through structured fine-tuning and alignment methods.</p>
      <ul>
        <li>Supervised fine-tuning pipelines for task-specific adaptation</li>
        <li>Preference and behavior alignment methods under controlled evaluation</li>
        <li>Synthetic data generation for robustness and edge-case coverage</li>
        <li>Retrieval-grounded model workflows under prototype validation</li>
        <li>Prompt and tool orchestration layers for bounded enterprise tasks</li>
      </ul>
      
      <h3>Inference & Deployment Optimization</h3>
      <p>Inference and deployment optimization capabilities are under development to support efficient and reliable model serving.</p>
      <ul>
        <li>Inference profiling and performance characterization</li>
        <li>Quantization and efficiency experiments</li>
        <li>Runtime and batching strategy evaluation</li>
        <li>Containerized inference deployment patterns under internal testing</li>
        <li>Observability hooks for latency, throughput, and drift measurement</li>
      </ul>
      
      <h3>Customization Stack</h3>
      <p>Our comprehensive customization stack gives you full control from data to deployment, with flexibility at every layer</p>
      <table>
        <tr><th>DATA</th><th>PLATFORM</th><th>INFRASTRUCTURE & HARDWARE</th></tr>
        <tr><td>Instruction Datasets</td><td>Training Pipelines</td><td>Distributed Training</td></tr>
        <tr><td>Domain Corpora</td><td>Experiment Manager</td><td>GPU Orchestration</td></tr>
        <tr><td>Prompt Templates</td><td>Hyperparameter Tuning</td><td>NVIDIA H100 / A100</td></tr>
        <tr><td>Alignment Packs</td><td>Model Versioning</td><td>High-Speed Storage</td></tr>
        <tr><td>Fine-Tuning Kits</td><td>Adapter Management</td><td>High-Speed Networking</td></tr>
      </table>
      
      <h2>Value Realization</h2>
      <p>We start from your current AI maturity and engineer toward deployable systems. From use-case discovery through model development and deployment validation, our engineering teams remain directly engaged across the full lifecycle.</p>
      
      <h3>Proof of Value</h3>
      <p>Find pain points that can be AI adopted in your business & help you build use case exclusively based on your organization type, business goals and data.</p>
      
      <h3>Custom Training</h3>
      <p>Model training cycles with systematic iteration, evaluation checkpoints, and deployment-aware performance validation.</p>
      
      <h3>Deployment Engineering</h3>
      <p>Production deployment execution with runtime optimization, observability integration, and operational readiness verification.</p>
      
      <h2>Deployment</h2>
      <p>Bringing enterprise AI systems to production with engineering discipline across tooling, serving, and infrastructure integration.</p>
      
      <h3>Self-Deployment Tooling</h3>
      <p>Full-stack engineering packages for teams deploying and managing LLMs on their own infrastructure.</p>
      <ul>
        <li>Pre-configured inference servers</li>
        <li>Monitoring and alerting templates</li>
        <li>Documentation and runbooks</li>
        <li>Integration guides for common enterprise stacks</li>
      </ul>
      
      <h3>Serving Frameworks</h3>
      <p>Optimized model serving with support for batching, streaming, caching, and multi-tenant workloads.</p>
      <ul>
        <li>vLLM, TGI, and TensorRT-LLM integrations</li>
        <li>Custom serving layers with advanced scheduling</li>
        <li>API gateway and rate limiting</li>
        <li>Embedding and retrieval serving</li>
      </ul>
      
      <h3>Infrastructure Tracks</h3>
      <p>Deployment architectures suited to enterprise security, compliance, and operational requirements.</p>
      <ul>
        <li>Private Cloud Track: On-prem or VPC-based deployments</li>
        <li>Hybrid Track: Coordinated cloud and on-prem serving</li>
        <li>Edge Track: Optimized deployments for latency-sensitive use cases</li>
        <li>Sovereign Track: Deployments meeting jurisdictional data residency requirements</li>
      </ul>
      
      <h2>Let's Build Together</h2>
      <p>Ready to discuss your requirements? Contact us to explore how we can engineer AI systems tailored to your needs.</p>
    `
  },
  '/solutions/model-customization': {
    title: 'Model Customization | Blubridge',
    description: 'Custom AI model development and fine-tuning services for enterprise applications.',
    content: `
      <h1>Model Customization</h1>
      <p>Build AI models trained specifically for your data, domain, and use case with full control over architecture and training.</p>
      
      <h2>Custom Pre-Training</h2>
      <p>We build foundational LLMs optimized for vertical use cases, multilingual requirements, or niche domains.</p>
      <ul>
        <li>Full-stack training infrastructure: Distributed compute, efficient data pipelines, robust checkpointing</li>
        <li>Architecture experimentation: Attention variants, MoE structures, positional encodings</li>
        <li>Tokenization tuning: Domain-aware tokenizer construction for improved performance on specialized corpora</li>
        <li>Evaluation and benchmarking</li>
      </ul>
      
      <h2>Specialized Model Capabilities</h2>
      <p>We enhance base models with domain-specific reasoning, tool usage, and multi-turn dialogue capabilities.</p>
      <ul>
        <li>Supervised fine-tuning (SFT): Instruction tuning on curated, domain-specific datasets</li>
        <li>Reinforcement Learning from Human Feedback (RLHF)</li>
        <li>Tool-augmented training: Enabling web search, API calls, and retrieval integration within model responses</li>
        <li>Function calling and schema adherence: Structuring outputs for downstream system integrations</li>
      </ul>
      
      <h2>Inference and Deployment Optimization</h2>
      <p>We ensure models perform reliably in production, optimizing for throughput, latency, and operational costs.</p>
      <ul>
        <li>Quantization: INT8, INT4, and hybrid strategies with minimal accuracy loss</li>
        <li>Batching and scheduling strategies: Continuous batching, speculative decoding</li>
        <li>Containerized serving: Kubernetes-native deployments with health checks, autoscaling, and metrics</li>
        <li>Multi-backend support: vLLM, TensorRT-LLM, TGI, custom CUDA kernels</li>
      </ul>
    `
  },
  '/solutions/value-realization': {
    title: 'AI Value Realization Solutions & Measurable ROI | BluBridge',
    description: 'Transform AI investments into measurable business outcomes with our value realization framework.',
    content: `
      <h1>Engineering AI Value from Exploration to Deployment</h1>
      <p>From use-case validation to engineering prototypes, we help translate AI experimentation into measurable technical outcomes and deployment-ready system designs.</p>
      
      <h2>What You Get</h2>
      
      <h3>Optimised Business Impact</h3>
      <p>Identify high-value AI use cases aligned with business goals and data readiness.</p>
      
      <h3>Simplified Execution</h3>
      <p>Structured engineering workflows from prototype to production deployment.</p>
      
      <h3>Versatile Platform</h3>
      <p>Flexible infrastructure supporting diverse AI workloads and deployment patterns.</p>
      
      <h2>Build, Train, Deploy</h2>
      <p>Structured engagement model from AI exploration through production deployment and ongoing optimization.</p>
      
      <h2>AI Metrics That Matter</h2>
      <h3>ROI Per Dollar</h3>
      <p>$7 ROI per dollar spent on AI initiatives</p>
      
      <h3>ROI & Efficiency Boost</h3>
      <p>$2.6T potential productivity gains from generative AI</p>
      
      <h3>Formal ROI Tracking</h3>
      <p>70% of organizations have formal GenAI ROI tracking</p>
      
      <h3>Positive AI ROI</h3>
      <p>74% of organizations report positive AI ROI</p>
      
      <h2>Measurable Impact AI at Scale</h2>
      <ul>
        <li>LLM Training - Deploy domain-specific LLMs trained on your proprietary data with our managed training infrastructure</li>
        <li>AI Infrastructure - Access purpose-built GPU clusters with optimized networking, storage, and orchestration</li>
        <li>Model Fine-tuning - Adapt foundation models to your specific use cases with structured fine-tuning workflows</li>
        <li>ML Inference - Deploy optimized inference endpoints with auto-scaling and low-latency serving</li>
        <li>Serverless AI - Run AI workloads without infrastructure management overhead</li>
        <li>Sovereign Cloud - Deploy in compliant, jurisdiction-specific environments</li>
      </ul>
      
      <h2>FAQs</h2>
      <p>Common questions about AI value realization and ROI measurement.</p>
    `
  },
  '/solutions/deployment': {
    title: 'AI Deployment & Scalable Model Production | BluBridge',
    description: 'Enterprise AI deployment solutions with optimized infrastructure and production-grade reliability.',
    content: `
      <h1>Bringing AI to Production Through Engineering Discipline</h1>
      <p>Production deployment execution with runtime optimization, observability integration, and operational readiness verification.</p>
      
      <h2>What You Get</h2>
      
      <h3>Optimise for Performance</h3>
      <p>Deploy AI models with optimized inference pipelines and resource utilization.</p>
      
      <h3>Accelerate Time to Market</h3>
      <p>Streamlined deployment workflows from model development to production.</p>
      
      <h3>Cost-Effective Scalability</h3>
      <p>Efficient resource allocation and auto-scaling for variable workloads.</p>
      
      <h2>From Lab to Live</h2>
      <h3>Package</h3>
      <p>Containerize and prepare models for deployment with standardized packaging.</p>
      
      <h3>Verify</h3>
      <p>Validate model performance and behavior in staging environments.</p>
      
      <h3>Release</h3>
      <p>Deploy to production with controlled rollout and monitoring.</p>
      
      <h3>Operate</h3>
      <p>Manage deployed models with observability and maintenance workflows.</p>
      
      <h2>Performance Metrics</h2>
      <h3>30% Faster Time to Value for Your AI Projects</h3>
      <h3>40% Efficiency Improvement</h3>
      
      <h2>Deployment Patterns</h2>
      <h3>Faster to Production</h3>
      <p>3x faster deployment cycles</p>
      
      <h3>Enterprise Deployment</h3>
      <p>1000+ models deployed</p>
      
      <h3>Workforce Reach</h3>
      <p>500k+ employees reached</p>
      
      <h2>Key Services</h2>
      <h3>AI Compute</h3>
      <p>Purpose-built GPU infrastructure for AI workloads.</p>
      
      <h3>AI Marketplace</h3>
      <p>Pre-built models and components for rapid deployment.</p>
      
      <h2>FAQs</h2>
      <p>Common questions about AI deployment and production operations.</p>
    `
  },
  '/solutions/training': {
    title: 'AI Model Training Solutions | BluBridge',
    description: 'Enterprise AI training infrastructure with optimized GPU clusters and distributed training capabilities.',
    content: `
      <h1>AI Model Training</h1>
      <p>Train large language models and deep learning networks efficiently with our optimized GPU clusters.</p>
      
      <h2>Training Infrastructure</h2>
      <ul>
        <li>80% Lower Cost</li>
        <li>30% Faster Training</li>
        <li>99.9% Uptime</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>Distributed training support</li>
        <li>Efficient data pipelines</li>
        <li>Robust checkpointing</li>
        <li>Multi-node scaling</li>
      </ul>
    `
  },
  '/solutions/inference': {
    title: 'AI Inference Solutions | BluBridge',
    description: 'High-performance AI inference with optimized serving and low-latency endpoints.',
    content: `
      <h1>AI & ML Inference</h1>
      <p>Deploy production-ready inference endpoints with auto-scaling and low latency.</p>
      
      <h2>Performance Metrics</h2>
      <ul>
        <li>7.2X Performance improvement</li>
        <li>+40% Efficiency gains</li>
        <li>Sub-100ms Latency</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>Optimized model serving</li>
        <li>Continuous batching</li>
        <li>Speculative decoding</li>
        <li>Multi-backend support</li>
      </ul>
    `
  },
  '/solutions/fine-tuning': {
    title: 'AI Fine-Tuning Solutions | BluBridge',
    description: 'Customized AI model fine-tuning services for enterprise applications.',
    content: `
      <h1>Model Fine-Tuning</h1>
      <p>Fine-tune pre-trained models on your custom datasets with automated pipelines.</p>
      
      <h2>Performance Metrics</h2>
      <ul>
        <li>+40% Efficiency improvement</li>
        <li>30% Faster fine-tuning</li>
        <li>Custom Datasets support</li>
      </ul>
      
      <h2>Techniques</h2>
      <ul>
        <li>Supervised Fine-Tuning (SFT)</li>
        <li>Reinforcement Learning from Human Feedback (RLHF)</li>
        <li>LoRA and QLoRA</li>
        <li>Instruction tuning</li>
      </ul>
    `
  },
  '/solutions/ai-development': {
    title: 'AI Development Solutions | BluBridge',
    description: 'Complete AI development environment for building, testing, and deploying AI applications.',
    content: `
      <h1>AI Development</h1>
      <p>Complete development environment for building, testing, and deploying AI applications.</p>
      
      <h2>Development Tools</h2>
      <ul>
        <li>80% Lower Cost</li>
        <li>30% Faster development</li>
        <li>Integrated Tools</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>End-to-end development workflows</li>
        <li>Testing and validation pipelines</li>
        <li>Version control and collaboration</li>
        <li>Deployment automation</li>
      </ul>
    `
  },
  '/solutions/industry/telco': {
    title: 'AI Solutions for Telecommunications | BluBridge',
    description: 'AI solutions for network optimization, predictive maintenance, and customer experience in telecommunications.',
    content: `
      <h1>AI for Telecommunications</h1>
      <p>Network optimization and predictive maintenance solutions for telecom operators.</p>
      
      <h2>Use Cases</h2>
      <ul>
        <li>Network Optimization - AI-driven network planning and resource allocation</li>
        <li>Predictive Maintenance - Proactive equipment maintenance and failure prediction</li>
        <li>Customer Experience - Personalized services and intelligent customer support</li>
        <li>Fraud Detection - Real-time fraud detection and prevention</li>
      </ul>
    `
  },
  '/solutions/industry/software-technology': {
    title: 'AI Solutions for Software & Technology | BluBridge',
    description: 'AI-powered development tools and intelligent automation for software companies.',
    content: `
      <h1>AI for Software & Technology</h1>
      <p>AI-powered development tools and intelligent automation solutions.</p>
      
      <h2>Use Cases</h2>
      <ul>
        <li>Code Generation - AI-assisted code completion and generation</li>
        <li>Testing Automation - Intelligent test case generation and execution</li>
        <li>DevOps Intelligence - AI-driven deployment and monitoring</li>
        <li>Documentation - Automated documentation generation</li>
      </ul>
    `
  },
  '/solutions/industry/finance-insurance': {
    title: 'AI Solutions for Finance & Insurance | BluBridge',
    description: 'AI solutions for risk analysis, fraud detection, and customer service in financial services.',
    content: `
      <h1>AI for Finance & Insurance</h1>
      <p>Risk analysis and fraud detection solutions for financial institutions.</p>
      
      <h2>Use Cases</h2>
      <ul>
        <li>Risk Analysis - AI-driven credit scoring and risk assessment</li>
        <li>Fraud Detection - Real-time transaction monitoring and fraud prevention</li>
        <li>Customer Service - Intelligent chatbots and personalized recommendations</li>
        <li>Compliance - Automated regulatory compliance monitoring</li>
      </ul>
    `
  },
  '/solutions/industry/manufacturing': {
    title: 'AI Solutions for Manufacturing | BluBridge',
    description: 'AI solutions for quality control, predictive maintenance, and process optimization in manufacturing.',
    content: `
      <h1>AI for Manufacturing</h1>
      <p>Quality control and automation solutions for manufacturing operations.</p>
      
      <h2>Use Cases</h2>
      <ul>
        <li>Quality Control - AI-powered visual inspection and defect detection</li>
        <li>Predictive Maintenance - Equipment failure prediction and maintenance scheduling</li>
        <li>Process Optimization - AI-driven production planning and optimization</li>
        <li>Supply Chain - Demand forecasting and inventory optimization</li>
      </ul>
    `
  },
  '/solutions/industry/education': {
    title: 'AI Solutions for Education | BluBridge',
    description: 'AI solutions for personalized learning, assessment, and educational content creation.',
    content: `
      <h1>AI for Education</h1>
      <p>Personalized learning platforms and intelligent tutoring systems.</p>
      
      <h2>Use Cases</h2>
      <ul>
        <li>Personalized Learning - Adaptive learning paths based on student performance</li>
        <li>Assessment - Automated grading and feedback generation</li>
        <li>Content Creation - AI-assisted educational content development</li>
        <li>Student Support - Intelligent tutoring and Q&A systems</li>
      </ul>
    `
  },
  '/solutions/industry/government': {
    title: 'AI Solutions for Government | BluBridge',
    description: 'Secure and sovereign AI solutions for government agencies and public sector organizations.',
    content: `
      <h1>AI for Government</h1>
      <p>Secure and sovereign AI solutions for public sector organizations.</p>
      
      <h2>Use Cases</h2>
      <ul>
        <li>Citizen Services - Intelligent chatbots and automated service delivery</li>
        <li>Document Processing - Automated document analysis and classification</li>
        <li>Security - AI-powered threat detection and monitoring</li>
        <li>Policy Analysis - Data-driven policy evaluation and impact assessment</li>
      </ul>
    `
  },
  '/solutions/industry/legal': {
    title: 'AI Solutions for Legal | BluBridge',
    description: 'AI solutions for document analysis, contract review, and legal research.',
    content: `
      <h1>AI for Legal</h1>
      <p>Document analysis and research solutions for legal professionals.</p>
      
      <h2>Use Cases</h2>
      <ul>
        <li>Contract Review - AI-powered contract analysis and risk identification</li>
        <li>Legal Research - Intelligent case law search and analysis</li>
        <li>Document Review - Automated document classification and summarization</li>
        <li>Due Diligence - AI-assisted due diligence and compliance review</li>
      </ul>
    `
  },
  '/solutions/industry/healthcare': {
    title: 'AI Solutions for Healthcare | BluBridge',
    description: 'AI solutions for medical imaging, diagnostics, and patient care in healthcare.',
    content: `
      <h1>AI for Healthcare</h1>
      <p>Medical imaging and diagnostics solutions for healthcare providers.</p>
      
      <h2>Use Cases</h2>
      <ul>
        <li>Medical Imaging - AI-powered image analysis and diagnostic support</li>
        <li>Clinical Decision Support - Evidence-based treatment recommendations</li>
        <li>Patient Care - Personalized care plans and monitoring</li>
        <li>Administrative - Automated scheduling and documentation</li>
      </ul>
    `
  },
  '/products/training': {
    title: 'AI Training Infrastructure | BluBridge',
    description: 'Enterprise AI training infrastructure with 80% lower costs and 30% faster training times.',
    content: `
      <h1>Model Training</h1>
      <p>Train large language models and deep learning networks efficiently with our optimized GPU clusters.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>80% Lower Cost - Optimized infrastructure reduces training costs</li>
        <li>30% Faster Training - Efficient distributed training acceleration</li>
        <li>99.9% Uptime - Enterprise-grade reliability</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>Distributed training across multiple GPU nodes</li>
        <li>Efficient data pipelines and preprocessing</li>
        <li>Robust checkpointing and fault tolerance</li>
        <li>Multi-node scaling and orchestration</li>
      </ul>
    `
  },
  '/products/inference': {
    title: 'AI Inference Infrastructure | BluBridge',
    description: 'High-performance AI inference with 7.2X performance improvement and 40% better efficiency.',
    content: `
      <h1>AI & ML Inference</h1>
      <p>Deploy production-ready inference endpoints with auto-scaling and low latency.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>7.2X Performance - Optimized inference throughput</li>
        <li>+40% Efficiency - Better resource utilization</li>
        <li>Sub-100ms Latency - Low-latency serving</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>Optimized model serving with batching</li>
        <li>Continuous batching for higher throughput</li>
        <li>Speculative decoding support</li>
        <li>Multi-backend deployment options</li>
      </ul>
    `
  },
  '/products/fine-tuning': {
    title: 'AI Fine-Tuning Platform | BluBridge',
    description: 'Enterprise AI fine-tuning platform with 40% efficiency improvement and 30% faster results.',
    content: `
      <h1>Model Fine-Tuning</h1>
      <p>Fine-tune pre-trained models on your custom datasets with automated pipelines.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>+40% Efficiency - Optimized fine-tuning workflows</li>
        <li>30% Faster - Accelerated training cycles</li>
        <li>Custom Datasets - Support for proprietary data</li>
      </ul>
      
      <h2>Techniques</h2>
      <ul>
        <li>Supervised Fine-Tuning (SFT)</li>
        <li>Reinforcement Learning from Human Feedback (RLHF)</li>
        <li>LoRA and QLoRA parameter-efficient methods</li>
        <li>Instruction tuning</li>
      </ul>
    `
  },
  '/products/gpu-nodes': {
    title: 'GPU Nodes | BluBridge',
    description: 'Latest NVIDIA GPUs including H100, H200, and GB200 NVL72 Blackwell architecture for AI workloads.',
    content: `
      <h1>GPU Nodes</h1>
      <p>Latest NVIDIA GPUs including H100, H200, and GB200 NVL72 Blackwell architecture for AI workloads.</p>
      
      <h2>Available GPUs</h2>
      <ul>
        <li>NVIDIA H100 - High-performance AI training and inference</li>
        <li>NVIDIA H200 - Next-generation AI capabilities</li>
        <li>NVIDIA GB200 NVL72 - Blackwell architecture for maximum performance</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>On-demand availability</li>
        <li>Bare-metal performance</li>
        <li>Scale from single GPUs to thousands of nodes</li>
        <li>High-bandwidth networking</li>
      </ul>
    `
  },
  '/products/serverless': {
    title: 'Serverless AI | BluBridge',
    description: 'Run AI workloads without infrastructure management with our serverless AI platform.',
    content: `
      <h1>Serverless AI</h1>
      <p>Run AI workloads without infrastructure management overhead.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>No Infrastructure Management - Focus on your models, not servers</li>
        <li>Auto-Scaling - Automatic scaling based on demand</li>
        <li>Pay-Per-Use - Only pay for actual compute usage</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>Instant deployment</li>
        <li>Automatic scaling</li>
        <li>Built-in monitoring</li>
        <li>API-first design</li>
      </ul>
    `
  },
  '/products/sovereign-cloud': {
    title: 'Sovereign Cloud | BluBridge',
    description: 'Deploy AI in compliant, jurisdiction-specific environments with data sovereignty guarantees.',
    content: `
      <h1>Sovereign Cloud</h1>
      <p>Deploy in compliant, jurisdiction-specific environments with data sovereignty.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>Data Sovereignty - Data stays within specified jurisdictions</li>
        <li>Compliance - Meet regulatory requirements</li>
        <li>Security - Enterprise-grade security controls</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>Jurisdiction-specific deployments</li>
        <li>Compliance certifications</li>
        <li>Air-gapped options</li>
        <li>Dedicated infrastructure</li>
      </ul>
    `
  },
  '/products/marketplace': {
    title: 'AI Marketplace | BluBridge',
    description: 'Pre-built AI models and components for rapid deployment and integration.',
    content: `
      <h1>AI Marketplace</h1>
      <p>Pre-built models and components for rapid deployment.</p>
      
      <h2>Available Models</h2>
      <ul>
        <li>Large Language Models</li>
        <li>Vision Models</li>
        <li>Speech Models</li>
        <li>Embedding Models</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>One-click deployment</li>
        <li>Pre-optimized configurations</li>
        <li>API integration</li>
        <li>Custom fine-tuning options</li>
      </ul>
    `
  },
  '/products/glomfjord': {
    title: 'Glomfjord Data Center | BluBridge',
    description: 'Arctic data center powered by 100% renewable hydroelectric energy for sustainable AI.',
    content: `
      <h1>Glomfjord Data Center</h1>
      <p>Arctic data center powered by 100% renewable hydroelectric energy.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>100% Renewable Energy - Powered by hydroelectric</li>
        <li>Natural Cooling - Arctic location provides natural cooling</li>
        <li>Low Carbon Footprint - Sustainable AI infrastructure</li>
      </ul>
      
      <h2>Location</h2>
      <p>Located in Norway with access to abundant renewable energy and natural cooling.</p>
    `
  },
  '/products/narvik': {
    title: 'Narvik Data Center | BluBridge',
    description: 'High-performance data center in Norway with renewable energy and excellent connectivity.',
    content: `
      <h1>Narvik Data Center</h1>
      <p>High-performance data center in Norway with excellent connectivity.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>Renewable Energy - Powered by sustainable sources</li>
        <li>High Connectivity - Excellent network infrastructure</li>
        <li>Strategic Location - Optimal for European customers</li>
      </ul>
    `
  },
  '/research': {
    title: 'Research | Blubridge',
    description: 'Explore Blubridge research across deep learning, model training, and AI systems engineering.',
    content: `
      <h1>Papers & Publications</h1>
      <p>Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.</p>
      
      <h2>Research Areas</h2>
      <ul>
        <li>Deep Learning</li>
        <li>Model Training</li>
        <li>AI Systems Engineering</li>
        <li>Reproducible Methods</li>
        <li>Scalable Infrastructure</li>
      </ul>
    `
  },
  '/Research/FLUX': {
    title: 'FLUX: Data Worth Training | Blubridge',
    description: 'FLUX is a preprocessing pipeline designed to break the retention-quality trade-off by maximizing token retention while enforcing rigorous quality control for LLM training.',
    content: `
      <h1>FLUX: Data Worth Training On — A Preprocessing Pipeline for Large-Scale Language Model Training</h1>
      <p>Modern large language model training is no longer limited by data availability, but by the inability of existing preprocessing pipelines to simultaneously achieve massive scale and high data quality.</p>
      
      <h2>Abstract</h2>
      <p>In this work, we introduce FLUX, a preprocessing pipeline specifically designed to break this long-standing trade-off by maximizing token retention while enforcing rigorous quality control. Models trained on FLUX-curated data consistently outperform prior methods.</p>
      
      <h2>Key Results</h2>
      <ul>
        <li>A 3B-parameter model trained on 60B tokens with FLUX achieves 32.14% MMLU accuracy, surpassing DCLM (31.98%) and FineWeb (29.88%)</li>
        <li>34.4% reduction in training compute compared to DCLM</li>
        <li>50B usable tokens from a single dump (+25% retention over DCLM)</li>
        <li>FLUX-Base yields 192B tokens, exceeding FineWeb's 170B</li>
      </ul>
      
      <h2>Pipeline Architecture</h2>
      <ul>
        <li>URL-based pre-filtering</li>
        <li>Language identification</li>
        <li>Document-level quality gating</li>
        <li>Line-level cleaning</li>
        <li>Dual-bin FastText classification</li>
      </ul>
      
      <h2>Authors</h2>
      <p>Gowtham, Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya</p>
    `
  },
  '/Research/Blu-Werp': {
    title: 'Blu-Werp Research | Blubridge',
    description: 'Blu-WERP: A Scalable Pipeline for Preprocessing Large Language Model Datasets.',
    content: `
      <h1>Blu-WERP: Web Extraction and Refinement Pipeline</h1>
      <p>A Scalable Pipeline for Preprocessing Large Language Model Datasets.</p>
      
      <h2>Abstract</h2>
      <p>Blubridge is proudly presenting the process behind Blu-WERP, our pipeline that is setting a new industry standard for scalable, high-quality LLM pretraining data.</p>
      
      <h2>Key Results</h2>
      <ul>
        <li>4.0% aggregate improvement over DCLM at 1B parameter scale</li>
        <li>9.5% aggregate improvement over FineWeb</li>
        <li>Superior performance across World Knowledge, Language Understanding, and Commonsense Reasoning benchmarks</li>
      </ul>
      
      <h2>Authors</h2>
      <p>Gowtham, Sai Rupesh, Sanjay Kumar, Saravanan, Venkata Chaithanya</p>
    `
  },
  '/about-us': {
    title: 'About Us | Blubridge',
    description: 'How Blubridge came to life, what we stand for, and the principles guiding how we build AI from first principles.',
    content: `
      <h1>Building the Next Frontier of AI</h1>
      <p>We are an AI research and engineering company with consulting and applied AI programs, developing advanced machine learning systems from first principles. Our work spans model development, systems engineering, inference optimization, and deployment architecture, with technical rigor and reproducibility treated as core requirements. Model and system capabilities are advanced through disciplined research, controlled experimentation, and engineering-driven validation, translating mature capabilities into production AI solutions.</p>
      
      <h2>Our Mission</h2>
      <p>We build AI systems for open ecosystems and enterprise environments with emphasis on open-weight models and applied AI capabilities engineered through disciplined training, evaluation rigor, and systems-aware design. Our mission is to advance AI as an engineering discipline grounded in measurable progress, reproducible methods, and technical correctness, with research and applied programs aligned to real-world operating constraints.</p>
      
      <h2>How We Build, Engineer and Validate</h2>
      <p>It's Our Hunger. It's Our Precision.</p>
      
      <h3>Our Purpose</h3>
      <p>BluBridge exists to advance AI research and translate it into deployable systems. Our efforts are application-driven and grounded in real infrastructure, data behavior, and operating constraints.</p>
      
      <h3>How we Build</h3>
      <p>We build through structured experimentation, measurable evaluation, and system-level engineering. Development follows reproducible workflows, deployment-aware design criteria, and staged productionization.</p>
      
      <h3>Innovation Through Rigor</h3>
      <p>Research is guided by technical depth, metric-based evaluation, and failure-mode analysis. Models and systems are validated for correctness, efficiency, and operating limits before broader deployment and operational use.</p>
      
      <h3>Our People</h3>
      <p>We bring together expertise across model research, systems engineering, and AI infrastructure. Work is cross-stack, with end-to-end technical responsibility across training, runtime behavior, deployment systems, and applied AI solution programs.</p>
      
      <h2>Know more about our Research</h2>
    `
  },
  '/careers': {
    title: 'Careers | Blubridge',
    description: 'Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.',
    content: `
      <h1>BluBridge Careers</h1>
      <h2>CURIOSITY WANTED</h2>
      <p>Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.</p>
      
      <h2>Open Positions</h2>
      <ul>
        <li>AI Systems Engineer - AI Research - Chennai</li>
        <li>AI & ML Engineer – C++ / Java Developer - Core ML - Chennai</li>
        <li>Branding & Communications Lead - Brand - Chennai</li>
        <li>Marketing & Growth Lead - Growth - Chennai</li>
        <li>Process & Operations Intern - Internship - Chennai</li>
        <li>Office Administration - Admin - Chennai</li>
        <li>Accountant - Finance - Chennai</li>
      </ul>
      
      <h2>Must Have Skills</h2>
      <ul>
        <li>Aptitude and Logical Reasoning</li>
        <li>Linear Algebra, Calculus, Probability & Statistics</li>
        <li>Strong Programming Foundations in C++ or Java</li>
      </ul>
      
      <h2>Contact</h2>
      <ul>
        <li>Phone: +91 8925987250</li>
        <li>Email: careers@blubridge.com</li>
        <li>LinkedIn: linkedin.com/blubridge</li>
        <li>X (Twitter): x.com/BlubridgeAI</li>
      </ul>
      
      <h2>Office Locations</h2>
      
      <h3>Chennai Office - Besant Nagar</h3>
      <p>No. E160 Tiger Varadhachari Road, Kalakshetra Colony, Besant Nagar, Chennai – 600090</p>
      
      <h3>Chennai Office - Mandavelipakkam</h3>
      <p>30, Norton Rd, Mandavelipakkam, Raja Annamalai Puram, Chennai, Tamil Nadu – 600028</p>
      
      <h3>US Office - New Jersey</h3>
      <p>2 University Plaza Drive, Suite 100, Hackensack, NJ 07601</p>
    `
  },
  '/joinourteam': {
    title: 'Join Our Team | Blubridge',
    description: 'Join the BluBridge team and help build the next frontier of AI.',
    content: `
      <h1>Join Our Team</h1>
      <p>We're looking for passionate individuals to join our team and help build the next frontier of AI.</p>
      
      <h2>Open Positions</h2>
      <ul>
        <li>AI Systems Engineer</li>
        <li>AI & ML Engineer</li>
        <li>Branding & Communications Lead</li>
        <li>Marketing & Growth Lead</li>
      </ul>
    `
  },
  '/contact': {
    title: 'Contact us | Blubridge',
    description: 'Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.',
    content: `
      <h1>Contact Blubridge</h1>
      <p>Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.</p>
      
      <h2>Office Locations</h2>
      
      <h3>India Office - Chennai</h3>
      <p>No. E160 Tiger Varadhachari Road, Kalakshetra Colony, Besant Nagar, Chennai – 600090</p>
      <p>30, Norton Rd, Mandavelipakkam, Raja Annamalai Puram, Chennai, Tamil Nadu – 600028</p>
      
      <h3>US Office - New Jersey</h3>
      <p>2 University Plaza Drive, Suite 100, Hackensack, NJ 07601</p>
      
      <h2>Contact Information</h2>
      <ul>
        <li>Email: contact@blubridge.ai</li>
        <li>Phone: +91 8925987250</li>
      </ul>
      
      <h2>Contact Form</h2>
      <p>Fill out the form to get in touch with our team for sales inquiries, partnership opportunities, or general questions.</p>
    `
  },
  '/contact/sales': {
    title: 'Contact Sales | Blubridge',
    description: 'Contact our sales team to discuss enterprise AI solutions and pricing.',
    content: `
      <h1>Contact Sales</h1>
      <p>Contact our sales team to discuss enterprise AI solutions, pricing, and custom requirements.</p>
      
      <h2>Sales Inquiries</h2>
      <p>Our sales team is ready to help you find the right AI solutions for your business needs.</p>
    `
  },
  '/contact/general-enquiry': {
    title: 'General Enquiry | Blubridge',
    description: 'Submit a general enquiry to the Blubridge team.',
    content: `
      <h1>General Enquiry</h1>
      <p>Submit your enquiry and our team will get back to you shortly.</p>
    `
  },
  '/partners': {
    title: 'Partners | Blubridge',
    description: 'Partner with Blubridge to deliver AI solutions to your customers.',
    content: `
      <h1>Partners</h1>
      <p>Partner with Blubridge to deliver AI solutions to your customers.</p>
      
      <h2>Partnership Benefits</h2>
      <ul>
        <li>Access to cutting-edge AI technology</li>
        <li>Technical support and training</li>
        <li>Co-marketing opportunities</li>
        <li>Revenue sharing programs</li>
      </ul>
    `
  },
  '/pricing': {
    title: 'Pricing | Blubridge',
    description: 'Explore Blubridge pricing for AI infrastructure, training, and deployment services.',
    content: `
      <h1>Pricing</h1>
      <p>Flexible pricing options for AI infrastructure, training, and deployment services.</p>
      
      <h2>Pricing Models</h2>
      <ul>
        <li>Pay-as-you-go - Only pay for what you use</li>
        <li>Reserved capacity - Discounted rates for committed usage</li>
        <li>Enterprise - Custom pricing for large-scale deployments</li>
      </ul>
    `
  },
  '/docs': {
    title: 'Documentation | Blubridge',
    description: 'Technical documentation for Blubridge AI platform and services.',
    content: `
      <h1>Documentation</h1>
      <p>Technical documentation for Blubridge AI platform and services.</p>
      
      <h2>Getting Started</h2>
      <ul>
        <li>Quick Start Guide</li>
        <li>API Reference</li>
        <li>SDK Documentation</li>
        <li>Tutorials</li>
      </ul>
    `
  },
  '/media-kit': {
    title: 'Media Kit | Blubridge',
    description: 'Blubridge media kit with logos, brand assets, and press materials.',
    content: `
      <h1>Media Kit</h1>
      <p>Download Blubridge logos, brand assets, and press materials.</p>
      
      <h2>Available Assets</h2>
      <ul>
        <li>Logos</li>
        <li>Brand Guidelines</li>
        <li>Press Releases</li>
        <li>Company Information</li>
      </ul>
    `
  },
  '/policies/privacy-policy': {
    title: 'Privacy Policy | Blubridge',
    description: 'Learn how Blubridge Technologies collects, uses, stores, and protects your information.',
    content: `
      <h1>Privacy Policy</h1>
      <p>Learn how Blubridge Technologies collects, uses, stores, and protects your information when you access our AI research platforms, tools, and services.</p>
      
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you create an account, submit a form, or contact us.</p>
      
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
      
      <h2>Data Security</h2>
      <p>We implement appropriate technical and organizational measures to protect your personal information.</p>
      
      <h2>Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>
      
      <h2>Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us at privacy@blubridge.ai</p>
    `
  },
  '/policies/terms-conditions': {
    title: 'Terms | Blubridge',
    description: 'Read the Terms of Use governing access to Blubridge Technologies websites, APIs, and services.',
    content: `
      <h1>Terms and Conditions</h1>
      <p>Read the Terms of Use governing access to Blubridge Technologies websites, APIs, research tools, and AI services.</p>
      
      <h2>Acceptance of Terms</h2>
      <p>By accessing or using our services, you agree to be bound by these Terms of Use.</p>
      
      <h2>Use of Services</h2>
      <p>You may use our services only for lawful purposes and in accordance with these terms.</p>
      
      <h2>Intellectual Property</h2>
      <p>All content, features, and functionality of our services are owned by Blubridge Technologies.</p>
      
      <h2>Limitation of Liability</h2>
      <p>Blubridge Technologies shall not be liable for any indirect, incidental, or consequential damages.</p>
      
      <h2>Contact Us</h2>
      <p>If you have questions about these Terms, please contact us at legal@blubridge.ai</p>
    `
  },
  '/policies/transparency-and-human-rights': {
    title: 'Transparency and Human Rights | Blubridge',
    description: 'Our commitment to transparency and human rights in AI development.',
    content: `
      <h1>Transparency and Human Rights</h1>
      <p>Our commitment to transparency and human rights in AI development and deployment.</p>
      
      <h2>Our Commitment</h2>
      <p>We are committed to developing AI systems that respect human rights and promote transparency.</p>
      
      <h2>Responsible AI</h2>
      <p>We follow responsible AI practices to ensure our technology benefits society.</p>
    `
  }
};

// Default SEO content
const defaultSeo = seoContent['/'];

// Function to get SEO content for a path
function getSeoForPath(urlPath) {
  const normalizedPath = urlPath.split('?')[0].split('#')[0];
  // Title-only overrides (keep meta description/content = current fallback behaviour)
  const titleOnlyOverrides = {
    '/Research/FLUX-Data': 'FLUX: Data Worth Training On | BluBridge',
    '/Research/FLUX-3': 'FLUX: Data Worth Training On | BluBridge',
    '/Research/FLUX-4': 'FLUX: Data Worth Training On | BluBridge',
  };
  if (titleOnlyOverrides[normalizedPath]) {
    return { ...defaultSeo, title: titleOnlyOverrides[normalizedPath] };
  }
  return seoContent[normalizedPath] || defaultSeo;
}

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build'), {
  index: false, dotfiles: 'deny'
}));

// Fallback: also serve raw public assets (images, favicons, etc.)
// This guarantees /images/* remain reachable even if a build somehow
// skipped copying the public folder.
app.use(express.static(path.join(__dirname, 'public'), {
  index: false, dotfiles: 'deny',
  maxAge: '1d'
}));

// Explicit favicon handlers with proper Content-Type + cache headers.
// This guarantees Googlebot receives an actual icon (not the index.html SPA fallback).
const faviconFiles = {
  '/favicon.ico': { file: 'favicon.ico', type: 'image/x-icon' },
  '/favicon.png': { file: 'favicon.png', type: 'image/png' },
  '/favicon-16x16.png': { file: 'favicon-16x16.png', type: 'image/png' },
  '/favicon-32x32.png': { file: 'favicon-32x32.png', type: 'image/png' },
  '/favicon-48x48.png': { file: 'favicon-48x48.png', type: 'image/png' },
  '/apple-touch-icon.png': { file: 'apple-touch-icon.png', type: 'image/png' },
  '/android-chrome-192x192.png': { file: 'android-chrome-192x192.png', type: 'image/png' },
  '/android-chrome-512x512.png': { file: 'android-chrome-512x512.png', type: 'image/png' }
};
Object.entries(faviconFiles).forEach(([route, { file, type }]) => {
  app.get(route, (req, res) => {
    const fp = path.join(__dirname, 'build', file);
    if (fs.existsSync(fp)) {
      res.setHeader('Content-Type', type);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.sendFile(fp);
    }
    res.status(404).end();
  });
});

// Handle all routes
app.get('/{*splat}', (req, res) => {
  // Check if it's a static file request
  const staticPath = securityHeaders.confinedFile(buildDir, req.path);
  if (staticPath) {
    return res.sendFile(staticPath);
  }

  // Read the index.html
  fs.readFile(indexPath, 'utf8', (err, html) => {
    if (err) {
      console.error('Error reading index.html:', err);
      console.log('[auto-rebuild] Attempting rebuild on read failure...');
      try {
        execSync('cd /app/frontend && yarn build', { stdio: 'inherit', timeout: 120000 });
        const retryHtml = fs.readFileSync(indexPath, 'utf8');
        const seo = getSeoForPath(req.path);
        let modifiedHtml = retryHtml.replace(
          /<meta name="description" content="[^"]*"/,
          `<meta name="description" content="${seo.description}"`
        );
        modifiedHtml = modifiedHtml.replace(
          /<title>[^<]*<\/title>/,
          `<title>${seo.title}</title>`
        );
        const seoHtml = `
          <div id="seo-content" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;">
            ${seo.content}
          </div>
        `;
        modifiedHtml = modifiedHtml.replace(
          '<div id="root">',
          `<div id="root">${seoHtml}`
        );
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        return res.send(modifiedHtml);
      } catch (rebuildErr) {
        return res.status(503).send('<html><body><h1>Site is rebuilding, please refresh in 30 seconds...</h1></body></html>');
      }
    }

    // Get the SEO content for this path
    const seo = getSeoForPath(req.path);

    // Replace the meta description
    let modifiedHtml = html.replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${seo.description}"`
    );

    // Replace the title
    modifiedHtml = modifiedHtml.replace(
      /<title>[^<]*<\/title>/,
      `<title>${seo.title}</title>`
    );

    // Inject SEO content into the root div (hidden from view but visible to crawlers)
    const seoHtml = `
      <div id="seo-content" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;">
        ${seo.content}
      </div>
    `;
    
    modifiedHtml = modifiedHtml.replace(
      '<div id="root">',
      `<div id="root">${seoHtml}`
    );

    // Inject live reload script before </body>
    // Do not expose an unauthenticated development polling endpoint.

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(modifiedHtml);
  });
});

app.use((error, req, res, next) => {
  console.error('Request failed:', error.name);
  if (!res.headersSent) res.status(500).send('Unable to process request');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
