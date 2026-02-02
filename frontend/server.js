const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Meta descriptions for each route
const metaDescriptions = {
  '/': 'Blubridge is an independent AI research lab engineering deep learning systems from first principles and delivering enterprise-grade AI models, infrastructure, and deployment solutions.',
  '/solutions': 'Research-driven AI model customization and deployment engineering solutions for enterprise systems, from domain training to production-grade infrastructure.',
  '/research': 'Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.',
  '/about-us': 'How Blubridge came to life, what we stand for, and the principles guiding how we build AI from first principles.',
  '/careers': 'Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.',
  '/contact': 'Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.',
  '/policies/privacy-policy': 'Learn how Blubridge Technologies collects, uses, stores, and protects your information when you access our AI research platforms, tools, and services.',
  '/policies/terms-conditions': 'Read the Terms of Use governing access to Blubridge Technologies websites, APIs, research tools, and AI services.'
};

// Page titles for each route
const pageTitles = {
  '/': 'Frontier AI Research and Enterprise Solutions | Blubridge',
  '/solutions': 'Applied AI Solutions - For your Use Case | Blubridge',
  '/research': 'Research | Blubridge',
  '/about-us': 'About Us | Blubridge',
  '/careers': 'Careers | Blubridge',
  '/contact': 'Contact us | Blubridge',
  '/policies/privacy-policy': 'Privacy Policy | Blubridge',
  '/policies/terms-conditions': 'Terms | Blubridge'
};

// Default meta description
const defaultMeta = metaDescriptions['/'];
const defaultTitle = pageTitles['/'];

// Read the index.html template
const indexPath = path.join(__dirname, 'build', 'index.html');

// Function to get meta description for a path
function getMetaForPath(urlPath) {
  // Normalize the path
  const normalizedPath = urlPath.split('?')[0].split('#')[0];
  
  // Check for exact match first
  if (metaDescriptions[normalizedPath]) {
    return {
      description: metaDescriptions[normalizedPath],
      title: pageTitles[normalizedPath] || defaultTitle
    };
  }
  
  // Return default
  return {
    description: defaultMeta,
    title: defaultTitle
  };
}

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build'), {
  index: false // Don't serve index.html automatically
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

    // Get the meta for this path
    const meta = getMetaForPath(req.path);

    // Replace the meta description
    let modifiedHtml = html.replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${meta.description}"`
    );

    // Replace the title
    modifiedHtml = modifiedHtml.replace(
      /<title>[^<]*<\/title>/,
      `<title>${meta.title}</title>`
    );

    res.send(modifiedHtml);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
