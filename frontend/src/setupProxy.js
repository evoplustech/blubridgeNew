const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');

// Meta descriptions for each route
const metaDescriptions = {
  '/': 'Blubridge is an independent AI research lab engineering deep learning systems from first principles and delivering enterprise-grade AI models, infrastructure, and deployment solutions.',
  '/solutions': 'Research-driven AI model customization and deployment engineering solutions for enterprise systems, from domain training to production-grade infrastructure.',
  '/research': 'Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.',
  '/about-us': 'How Blubridge came to life, what we stand for, and the principles guiding how we build AI from first principles.',
  '/careers': 'Join us to build the next frontier of AI. Bring your rigor, ownership, and engineering depth to solve hard, real-world problems.',
  '/contact': 'Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.'
};

// Page titles for each route
const pageTitles = {
  '/': 'Frontier AI Research and Enterprise Solutions | Blubridge',
  '/solutions': 'Applied AI Solutions - For your Use Case | Blubridge',
  '/research': 'Research | Blubridge',
  '/about-us': 'About Us | Blubridge',
  '/careers': 'Careers | Blubridge',
  '/contact': 'Contact us | Blubridge'
};

module.exports = function(app) {
  // Middleware to inject meta descriptions
  app.use((req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(body) {
      // Only modify HTML responses
      if (typeof body === 'string' && body.includes('<!doctype html>')) {
        const urlPath = req.path.split('?')[0].split('#')[0];
        const metaDesc = metaDescriptions[urlPath] || metaDescriptions['/'];
        const pageTitle = pageTitles[urlPath] || pageTitles['/'];
        
        // Replace meta description
        body = body.replace(
          /<meta name="description" content="[^"]*"/,
          `<meta name="description" content="${metaDesc}"`
        );
        
        // Replace title
        body = body.replace(
          /<title>[^<]*<\/title>/,
          `<title>${pageTitle}</title>`
        );
      }
      
      return originalSend.call(this, body);
    };
    
    next();
  });
};
