const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// SEO Content for each route - this will be injected into the HTML for crawlers
const seoContent = {
  '/': {
    title: 'Frontier AI Research and Enterprise Solutions | Blubridge',
    description: 'Blubridge is an independent AI research lab engineering deep learning systems from first principles and delivering enterprise-grade AI models, infrastructure, and deployment solutions.',
    content: `
      <h1>Beyond the Horizon - An Independent AI Research Lab</h1>
      <p>Blubridge is an independent AI research lab engineering deep learning systems from first principles and delivering enterprise-grade AI models, infrastructure, and deployment solutions.</p>
      
      <h2>OUR FRONTIER AI EXPERTISE</h2>
      <p>BluBridge is an early-stage AI research company focused on advancing probabilistic and predictive modeling—building next-generation Artificial Intelligence from the ground up. We are assembling a team of passionate, driven researchers and engineers committed to pushing the boundaries of machine learning.</p>
      
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
      
      <h2>BluBridge's Infrastructure</h2>
      
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
      
      <h2>Use Cases</h2>
      <ul>
        <li>Training - 80% Lower Cost, 30% Faster</li>
        <li>Inference - 7.2X Performance, +40% Efficiency</li>
        <li>Fine-Tuning - +40% Efficiency, 30% Faster</li>
        <li>AI Development - 80% Lower Cost, 30% Faster</li>
      </ul>
      
      <h2>Frequently Asked Questions</h2>
      
      <h3>What makes BluBridge different from other cloud providers?</h3>
      <p>BluBridge is purpose-built for AI from the ground up. Unlike general-purpose cloud providers, our infrastructure is optimized specifically for AI workloads with latest NVIDIA GPUs, high-bandwidth networking, and 100% renewable energy. We offer up to 80% cost savings and zero rate limits.</p>
      
      <h3>What GPU options are available?</h3>
      <p>We offer the latest NVIDIA GPUs including H100, H200, and the new GB200 NVL72 Blackwell architecture. All GPUs are available on-demand with bare-metal performance and can scale from single GPUs to thousands of nodes.</p>
      
      <h3>How does BluBridge ensure sustainability?</h3>
      <p>All our data centers are powered by 100% renewable hydroelectric energy in Norway. Our Arctic location provides natural cooling advantages, significantly reducing our environmental footprint compared to traditional data centers.</p>
      
      <h3>What support is available for enterprise customers?</h3>
      <p>Enterprise customers receive dedicated support including 24/7 technical assistance, dedicated account management, custom SLAs, and access to our AI solutions architects for architecture review and optimization.</p>
      
      <h3>Can I try BluBridge before committing?</h3>
      <p>Yes! We offer free trials and proof-of-concept deployments. Contact our sales team to discuss your specific requirements and get started with a customized evaluation plan.</p>
      
      <h2>Work with BluBridge</h2>
      <p>We're always on the lookout for passionate, creative minds who want to push the boundaries of AI. Whether you're a researcher, engineer, or innovator—if you thrive in fast-paced, high-impact environments, we'd love to hear from you.</p>
      
      <h2>Contact Us</h2>
      <p>Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.</p>
    `
  },
  '/solutions': {
    title: 'Applied AI Solutions - For your Use Case | Blubridge',
    description: 'Research-driven AI model customization and deployment engineering solutions for enterprise systems, from domain training to production-grade infrastructure.',
    content: `
      <h1>Applied AI Solutions - For your Use Case</h1>
      <p>Research-driven AI model customization and deployment engineering solutions for enterprise systems, from domain training to production-grade infrastructure.</p>
      
      <h2>Model Customization</h2>
      <p>Build AI models trained specifically for your data, domain, and use case with full control over architecture and training.</p>
      
      <h3>Custom Pre-Training</h3>
      <p>We build foundational LLMs optimized for vertical use cases, multilingual requirements, or niche domains.</p>
      <ul>
        <li>Full-stack training infrastructure: Distributed compute, efficient data pipelines, robust checkpointing</li>
        <li>Architecture experimentation: Attention variants, MoE structures, positional encodings</li>
        <li>Tokenization tuning: Domain-aware tokenizer construction for improved performance on specialized corpora</li>
        <li>Evaluation and benchmarking</li>
      </ul>
      
      <h3>Specialized Model Capabilities</h3>
      <p>We enhance base models with domain-specific reasoning, tool usage, and multi-turn dialogue capabilities.</p>
      <ul>
        <li>Supervised fine-tuning (SFT): Instruction tuning on curated, domain-specific datasets</li>
        <li>Reinforcement Learning from Human Feedback (RLHF)</li>
        <li>Tool-augmented training: Enabling web search, API calls, and retrieval integration within model responses</li>
        <li>Function calling and schema adherence: Structuring outputs for downstream system integrations</li>
      </ul>
      
      <h3>Inference and Deployment Optimization</h3>
      <p>We ensure models perform reliably in production, optimizing for throughput, latency, and operational costs.</p>
      <ul>
        <li>Quantization: INT8, INT4, and hybrid strategies with minimal accuracy loss</li>
        <li>Batching and scheduling strategies: Continuous batching, speculative decoding</li>
        <li>Containerized serving: Kubernetes-native deployments with health checks, autoscaling, and metrics</li>
        <li>Multi-backend support: vLLM, TensorRT-LLM, TGI, custom CUDA kernels</li>
      </ul>
      
      <h2>Value Realization</h2>
      <p>From use-case validation to engineering prototypes, we help translate AI experimentation into measurable technical outcomes.</p>
      
      <h3>Proof of Value</h3>
      <p>Rapid technical validation through systematic benchmarking, comparative studies, and structured pilot programs.</p>
      <ul>
        <li>Scoped feasibility assessments</li>
        <li>Benchmark construction and evaluation</li>
        <li>Failure mode analysis</li>
        <li>Decision frameworks for model selection</li>
      </ul>
      
      <h3>Custom Training</h3>
      <p>Tailored training pipelines with domain-specific data curation, annotation, and iterative improvement cycles.</p>
      <ul>
        <li>Data curation and labeling strategy</li>
        <li>Active learning integration</li>
        <li>Training diagnostics</li>
        <li>Versioned dataset and model management</li>
      </ul>
      
      <h3>Deployment Engineering</h3>
      <p>Infrastructure-as-code implementations with integrated monitoring, rollback capabilities, and compliance tooling.</p>
      <ul>
        <li>Production-grade deployment pipelines</li>
        <li>Observability stack integration</li>
        <li>Canary and staged rollouts</li>
        <li>Cost management and resource optimization</li>
      </ul>
      
      <h2>Deployment</h2>
      <p>Engineering-led deployment architectures across cloud, private, and controlled infrastructure environments.</p>
      
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
      
      <h2>Contact Us</h2>
      <p>Ready to bring AI solutions to your enterprise? Contact our team to discuss your requirements.</p>
    `
  },
  '/research': {
    title: 'Research | Blubridge',
    description: 'Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.',
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
        <li>Scaling Laws</li>
        <li>Human Work Optimization</li>
        <li>Multimodal Agents</li>
        <li>Reinforcement Learning</li>
      </ul>
      
      <h2>Our Approach</h2>
      <p>We focus on engineering deep learning systems from first principles, with emphasis on reproducibility, efficiency, and real-world applicability.</p>
      
      <h2>Data Research</h2>
      <p>We help you design & build custom datasets for your bespoke requirement.</p>
      <ul>
        <li>Efficient Data Pipeline</li>
        <li>Multimodal & Multilinguistic Dataset</li>
        <li>Synthetic data generation</li>
        <li>Domain Specific Dataset curation</li>
      </ul>
      
      <h2>Pre-training Research</h2>
      <p>We are building a series of pre-trained models uniquely suited for different work loads.</p>
      <ul>
        <li>Natural Language Processing</li>
        <li>Speech Recognition & Generation</li>
        <li>Sequence Models & Visual Models</li>
        <li>Recommender Systems</li>
      </ul>
      
      <h2>Contact</h2>
      <p>Interested in collaborating on research? Contact our team at research@blubridge.ai</p>
    `
  },
  '/about-us': {
    title: 'About Us | Blubridge',
    description: 'How Blubridge came to life, what we stand for, and the principles guiding how we build AI from first principles.',
    content: `
      <h1>About Blubridge</h1>
      <p>How Blubridge came to life, what we stand for, and the principles guiding how we build AI from first principles.</p>
      
      <h2>Who We Are</h2>
      <p>BluBridge is an early-stage AI research company focused on advancing probabilistic and predictive modeling—building next-generation Artificial Intelligence from the ground up. We are assembling a team of passionate, driven researchers and engineers committed to pushing the boundaries of machine learning.</p>
      
      <h2>What We Aim To Do</h2>
      <p>Our immediate goal is to develop a state-of-the-art 70-billion-parameter (dense) Large Language Model, establishing a strong foundation for future innovations in AI systems, its applications, and research.</p>
      
      <h2>Our Mission</h2>
      <p>Engineering deep learning systems from first principles for real-world applications.</p>
      
      <h2>Our Values</h2>
      <ul>
        <li>Rigor - We prioritize technical excellence and scientific integrity in everything we build</li>
        <li>Ownership - We take responsibility for our work from conception to deployment</li>
        <li>Engineering Excellence - We build systems that are reliable, scalable, and maintainable</li>
      </ul>
      
      <h2>Our Team</h2>
      <p>We are a team of researchers and engineers passionate about building AI systems that work in the real world. Our team combines expertise in deep learning, systems engineering, and product development.</p>
      
      <h2>Locations</h2>
      <ul>
        <li>Chennai, India</li>
        <li>New Jersey, USA</li>
      </ul>
      
      <h2>Join Us</h2>
      <p>We're always looking for talented individuals to join our team. If you're passionate about AI and want to work on challenging problems, we'd love to hear from you.</p>
    `
  },
  '/careers': {
    title: 'Careers | Blubridge',
    description: 'Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.',
    content: `
      <h1>Careers at Blubridge</h1>
      <p>Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.</p>
      
      <h2>BluBridge Careers - CURIOSITY WANTED</h2>
      <p>We're looking for people who are passionate about AI and want to push the boundaries of what's possible.</p>
      
      <h2>Join our Deep Learning Research Team</h2>
      <p>We are looking for talented engineers and researchers to join our team and help build the next generation of AI systems.</p>
      
      <h2>Why Join BluBridge?</h2>
      <ul>
        <li>Work on cutting-edge AI research and engineering</li>
        <li>Collaborate with world-class researchers and engineers</li>
        <li>Build systems that have real-world impact</li>
        <li>Competitive compensation and benefits</li>
        <li>Flexible work environment</li>
      </ul>
      
      <h2>Open Positions</h2>
      <ul>
        <li>Deep Learning Engineer</li>
        <li>ML Infrastructure Engineer</li>
        <li>Research Scientist</li>
        <li>AI Systems Engineer</li>
        <li>Data Engineer</li>
      </ul>
      
      <h2>What We Look For</h2>
      <ul>
        <li>Strong technical foundation in machine learning and deep learning</li>
        <li>Experience with modern ML frameworks (PyTorch, JAX)</li>
        <li>Passion for building robust, scalable systems</li>
        <li>Excellent problem-solving and communication skills</li>
        <li>Self-motivated with a strong sense of ownership</li>
      </ul>
      
      <h2>Our Culture</h2>
      <p>We believe in fostering an environment where curiosity thrives, ideas are challenged constructively, and everyone has the opportunity to make meaningful contributions.</p>
      
      <h2>Application Process</h2>
      <ol>
        <li>Submit your application with resume and cover letter</li>
        <li>Initial screening call</li>
        <li>Technical interview</li>
        <li>On-site or virtual interviews with the team</li>
        <li>Offer</li>
      </ol>
      
      <h2>Apply Now</h2>
      <p>Ready to join us? Submit your application and let's build the future of AI together.</p>
    `
  },
  '/contact': {
    title: 'Contact us | Blubridge',
    description: 'Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.',
    content: `
      <h1>Contact Blubridge</h1>
      <p>Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.</p>
      
      <h2>Get in Touch</h2>
      <p>We'd love to hear from you. Whether you're interested in our solutions, have questions about our research, or want to explore partnership opportunities, reach out to us.</p>
      
      <h2>Contact Information</h2>
      <ul>
        <li>Email: contact@blubridge.ai</li>
        <li>Sales: sales@blubridge.ai</li>
        <li>Research: research@blubridge.ai</li>
        <li>Careers: careers@blubridge.ai</li>
      </ul>
      
      <h2>Office Locations</h2>
      
      <h3>India Office</h3>
      <p>Chennai, Tamil Nadu, India</p>
      
      <h3>US Office</h3>
      <p>New Jersey, United States</p>
      
      <h2>Sales Inquiry</h2>
      <p>Interested in our AI solutions for your enterprise? Contact our sales team to discuss your requirements and get a customized proposal.</p>
      
      <h2>Partnership Opportunities</h2>
      <p>We're always open to exploring partnerships with organizations that share our vision for advancing AI technology.</p>
      
      <h2>Media Inquiries</h2>
      <p>For press and media inquiries, please contact our communications team.</p>
      
      <h2>Support</h2>
      <p>Existing customers can reach our support team for technical assistance and account-related queries.</p>
    `
  },
  '/policies/privacy-policy': {
    title: 'Privacy Policy | Blubridge',
    description: 'Learn how Blubridge Technologies collects, uses, stores, and protects your information when you access our AI research platforms, tools, and services.',
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
    description: 'Read the Terms of Use governing access to Blubridge Technologies websites, APIs, research tools, and AI services.',
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
  '/products/training': {
    title: 'AI Training Solutions | Blubridge',
    description: 'Enterprise AI training infrastructure with 80% lower costs and 30% faster training times using latest NVIDIA GPUs.',
    content: `
      <h1>AI Training Solutions</h1>
      <p>Enterprise AI training infrastructure with 80% lower costs and 30% faster training times using latest NVIDIA GPUs.</p>
      
      <h2>Training Infrastructure</h2>
      <p>Purpose-built infrastructure for training large-scale AI models with optimal performance and cost efficiency.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>80% Lower Cost compared to traditional cloud providers</li>
        <li>30% Faster training times with optimized infrastructure</li>
        <li>Latest NVIDIA GPUs including H100, H200, and GB200</li>
        <li>100% Renewable Energy powered data centers</li>
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
  '/products/inference': {
    title: 'AI Inference Solutions | Blubridge',
    description: 'High-performance AI inference with 7.2X performance improvement and 40% better efficiency.',
    content: `
      <h1>AI Inference Solutions</h1>
      <p>High-performance AI inference with 7.2X performance improvement and 40% better efficiency.</p>
      
      <h2>Inference Infrastructure</h2>
      <p>Optimized infrastructure for deploying AI models at scale with low latency and high throughput.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>7.2X Performance improvement</li>
        <li>+40% Efficiency gains</li>
        <li>Low-latency serving</li>
        <li>Scalable deployment</li>
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
  '/products/fine-tuning': {
    title: 'AI Fine-Tuning Solutions | Blubridge',
    description: 'Customized AI model fine-tuning with 40% efficiency improvement and 30% faster results.',
    content: `
      <h1>AI Fine-Tuning Solutions</h1>
      <p>Customized AI model fine-tuning with 40% efficiency improvement and 30% faster results.</p>
      
      <h2>Fine-Tuning Services</h2>
      <p>Adapt foundation models to your specific needs through advanced fine-tuning techniques and domain specialization.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>+40% Efficiency improvement</li>
        <li>30% Faster fine-tuning</li>
        <li>Domain-specific adaptation</li>
        <li>Quality optimization</li>
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
  '/products/gpu-nodes': {
    title: 'GPU Nodes | Blubridge',
    description: 'Latest NVIDIA GPUs including H100, H200, and GB200 NVL72 Blackwell architecture for AI workloads.',
    content: `
      <h1>GPU Nodes</h1>
      <p>Latest NVIDIA GPUs including H100, H200, and GB200 NVL72 Blackwell architecture for AI workloads.</p>
      
      <h2>Available GPUs</h2>
      <ul>
        <li>NVIDIA H100 - High-performance AI training and inference</li>
        <li>NVIDIA H200 - Next-generation capabilities</li>
        <li>NVIDIA GB200 NVL72 - Blackwell architecture for maximum performance</li>
      </ul>
      
      <h2>Features</h2>
      <ul>
        <li>On-demand availability</li>
        <li>Bare-metal performance</li>
        <li>Scale from single GPUs to thousands of nodes</li>
        <li>High-bandwidth networking</li>
      </ul>
      
      <h2>Use Cases</h2>
      <ul>
        <li>Large Language Model training</li>
        <li>Computer vision models</li>
        <li>Reinforcement learning</li>
        <li>Scientific computing</li>
      </ul>
    `
  }
};

// Default SEO content
const defaultSeo = seoContent['/'];

// Read the index.html template
const indexPath = path.join(__dirname, 'build', 'index.html');

// Function to get SEO content for a path
function getSeoForPath(urlPath) {
  const normalizedPath = urlPath.split('?')[0].split('#')[0];
  return seoContent[normalizedPath] || defaultSeo;
}

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build'), {
  index: false
}));

// Handle all routes
app.get('/{*splat}', (req, res) => {
  // Check if it's a static file request
  const staticPath = path.join(__dirname, 'build', req.path);
  if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
    return res.sendFile(staticPath);
  }

  // Read the index.html
  fs.readFile(indexPath, 'utf8', (err, html) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Server error');
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

    res.send(modifiedHtml);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
