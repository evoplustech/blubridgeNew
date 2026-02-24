const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// SEO Content for each route - EXACT visible content from each page
const seoContent = {
  '/': {
    title: 'Frontier AI Research and Enterprise Solutions | Blubridge',
    description: 'Blubridge is an independent AI research lab engineering deep learning systems from first principles and delivering enterprise-grade AI models, infrastructure, and deployment solutions.',
    content: `
      <h1>Beyond the Horizon</h1>
      <p>An Independent AI Research Lab.</p>
      
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
    title: 'AI solutions for every use case | Blubridge',
    description: 'Comprehensive AI infrastructure solutions designed to accelerate your innovation across industries.',
    content: `
      <h1>AI solutions for every use case</h1>
      <p>Comprehensive AI infrastructure solutions designed to accelerate your innovation across industries.</p>
      
      <h2>By Use Case</h2>
      
      <h3>Model Training</h3>
      <p>Train large language models and deep learning networks efficiently with our optimized GPU clusters.</p>
      <ul>
        <li>80% Lower Cost</li>
        <li>30% Faster Training</li>
        <li>99.9% Uptime</li>
      </ul>
      
      <h3>AI & ML Inference</h3>
      <p>Deploy production-ready inference endpoints with auto-scaling and low latency.</p>
      <ul>
        <li>7.2X Performance</li>
        <li>+40% Efficiency</li>
        <li>Sub-100ms Latency</li>
      </ul>
      
      <h3>AI Development</h3>
      <p>Complete development environment for building, testing, and deploying AI applications.</p>
      <ul>
        <li>80% Lower Cost</li>
        <li>30% Faster</li>
        <li>Integrated Tools</li>
      </ul>
      
      <h3>Model Fine-Tuning</h3>
      <p>Fine-tune pre-trained models on your custom datasets with automated pipelines.</p>
      <ul>
        <li>+40% Efficiency</li>
        <li>30% Faster</li>
        <li>Custom Datasets</li>
      </ul>
      
      <h2>By Industry</h2>
      <ul>
        <li>Telco - Network optimization and predictive maintenance</li>
        <li>Software & Technology - AI-powered development tools</li>
        <li>Finance & Insurance - Risk analysis and fraud detection</li>
        <li>Manufacturing - Quality control and automation</li>
        <li>Education - Personalized learning platforms</li>
        <li>Government - Secure and sovereign AI solutions</li>
        <li>Legal - Document analysis and research</li>
        <li>Healthcare - Medical imaging and diagnostics</li>
      </ul>
      
      <h2>Let's build your AI solution</h2>
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
      </ul>
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
      <p>44 Center Grove Rd, Randolph, New Jersey – 07869</p>
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
      <p>44 Center Grove Rd, Randolph, New Jersey – 07869</p>
      
      <h2>Contact Information</h2>
      <ul>
        <li>Email: contact@blubridge.ai</li>
        <li>Phone: +91 8925987250</li>
      </ul>
      
      <h2>Contact Form</h2>
      <p>Fill out the form to get in touch with our team for sales inquiries, partnership opportunities, or general questions.</p>
    `
  },
  '/policies/privacy-policy': {
    title: 'Privacy Policy | Blubridge',
    description: 'Learn how Blubridge Technologies collects, uses, stores, and protects your information when you access our AI research platforms, tools, and services.',
    content: `
      <h1>Privacy Policy</h1>
      <p>Learn how Blubridge Technologies collects, uses, stores, and protects your information when you access our AI research platforms, tools, and services.</p>
    `
  },
  '/policies/terms-conditions': {
    title: 'Terms | Blubridge',
    description: 'Read the Terms of Use governing access to Blubridge Technologies websites, APIs, research tools, and AI services.',
    content: `
      <h1>Terms and Conditions</h1>
      <p>Read the Terms of Use governing access to Blubridge Technologies websites, APIs, research tools, and AI services.</p>
    `
  },
  '/products/training': {
    title: 'AI Training Solutions | Blubridge',
    description: 'Enterprise AI training infrastructure with 80% lower costs and 30% faster training times using latest NVIDIA GPUs.',
    content: `
      <h1>Model Training</h1>
      <p>Train large language models and deep learning networks efficiently with our optimized GPU clusters.</p>
      <ul>
        <li>80% Lower Cost</li>
        <li>30% Faster Training</li>
        <li>99.9% Uptime</li>
      </ul>
    `
  },
  '/products/inference': {
    title: 'AI Inference Solutions | Blubridge',
    description: 'High-performance AI inference with 7.2X performance improvement and 40% better efficiency.',
    content: `
      <h1>AI & ML Inference</h1>
      <p>Deploy production-ready inference endpoints with auto-scaling and low latency.</p>
      <ul>
        <li>7.2X Performance</li>
        <li>+40% Efficiency</li>
        <li>Sub-100ms Latency</li>
      </ul>
    `
  },
  '/products/fine-tuning': {
    title: 'AI Fine-Tuning Solutions | Blubridge',
    description: 'Customized AI model fine-tuning with 40% efficiency improvement and 30% faster results.',
    content: `
      <h1>Model Fine-Tuning</h1>
      <p>Fine-tune pre-trained models on your custom datasets with automated pipelines.</p>
      <ul>
        <li>+40% Efficiency</li>
        <li>30% Faster</li>
        <li>Custom Datasets</li>
      </ul>
    `
  },
  '/products/gpu-nodes': {
    title: 'GPU Nodes | Blubridge',
    description: 'Latest NVIDIA GPUs including H100, H200, and GB200 NVL72 Blackwell architecture for AI workloads.',
    content: `
      <h1>GPU Nodes</h1>
      <p>Latest NVIDIA GPUs including H100, H200, and GB200 NVL72 Blackwell architecture for AI workloads.</p>
      <ul>
        <li>NVIDIA H100</li>
        <li>NVIDIA H200</li>
        <li>NVIDIA GB200 NVL72</li>
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
