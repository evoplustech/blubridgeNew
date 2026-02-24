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
      <h1>Building Frontier AI Intelligence capabilities tailored for you</h1>
      <h2>OUR FRONTIER AI EXPERTISE</h2>
      <p>Blubridge is an independent AI research lab engineering deep learning systems from first principles and delivering enterprise-grade AI models, infrastructure, and deployment solutions.</p>
      <h3>Custom Model Training</h3>
      <p>Build AI models trained specifically for your data, domain, and use case with full control over architecture and training.</p>
      <h3>Fine-Tuning & Adaptation</h3>
      <p>Adapt foundation models to your specific needs through advanced fine-tuning techniques and domain specialization.</p>
      <h3>Deployment Engineering</h3>
      <p>Production-grade deployment solutions with optimized inference, scaling, and monitoring for enterprise environments.</p>
    `
  },
  '/solutions': {
    title: 'Applied AI Solutions - For your Use Case | Blubridge',
    description: 'Research-driven AI model customization and deployment engineering solutions for enterprise systems, from domain training to production-grade infrastructure.',
    content: `
      <h1>Applied AI Solutions - For your Use Case</h1>
      <p>Research-driven AI model customization and deployment engineering solutions for enterprise systems, from domain training to production-grade infrastructure.</p>
      <h2>Custom Model Training</h2>
      <p>Build AI models trained specifically for your data, domain, and use case.</p>
      <h2>Fine-Tuning & Adaptation</h2>
      <p>Adapt foundation models to your specific needs through advanced fine-tuning.</p>
      <h2>Deployment Engineering</h2>
      <p>Production-grade deployment solutions with optimized inference and scaling.</p>
    `
  },
  '/research': {
    title: 'Research | Blubridge',
    description: 'Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.',
    content: `
      <h1>Papers & Publications</h1>
      <p>Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.</p>
      <h2>Research Areas</h2>
      <p>Deep Learning, Model Training, AI Systems Engineering, Reproducible Methods, Scalable Infrastructure</p>
    `
  },
  '/about-us': {
    title: 'About Us | Blubridge',
    description: 'How Blubridge came to life, what we stand for, and the principles guiding how we build AI from first principles.',
    content: `
      <h1>About Blubridge</h1>
      <p>How Blubridge came to life, what we stand for, and the principles guiding how we build AI from first principles.</p>
      <h2>Our Mission</h2>
      <p>Engineering deep learning systems from first principles for real-world applications.</p>
      <h2>Our Values</h2>
      <p>Rigor, Ownership, Engineering Excellence</p>
    `
  },
  '/careers': {
    title: 'Careers | Blubridge',
    description: 'Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.',
    content: `
      <h1>Careers at Blubridge</h1>
      <p>Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.</p>
      <h2>Join our Deep Learning Research Team</h2>
      <p>We are looking for talented engineers and researchers to join our team.</p>
      <h2>Open Positions</h2>
      <p>Deep Learning Engineer, ML Infrastructure Engineer, Research Scientist</p>
    `
  },
  '/contact': {
    title: 'Contact us | Blubridge',
    description: 'Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.',
    content: `
      <h1>Contact Blubridge</h1>
      <p>Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.</p>
      <h2>Get in Touch</h2>
      <p>Email: contact@blubridge.ai</p>
      <h2>Office Locations</h2>
      <p>Chennai, India | New Jersey, USA</p>
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
