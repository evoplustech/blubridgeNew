const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');

// Meta descriptions for each route
const metaDescriptions = {
  '/': 'BluBridge is a frontier AI research company building full-stack AI technologies from first principles and delivering tailored AI systems for enterprises across industries.',
  '/solutions': 'Research-driven AI model customization and deployment engineering solutions for enterprise systems, from domain training to production-grade infrastructure.',
  '/research': 'Explore Blubridge research across deep learning, model training, and AI systems engineering, focused on reproducible methods and scalable infrastructure.',
  '/about-us': 'BluBridge develops core AI technologies from first principles, advancing frontier AI research and translating it into tailored AI systems across industries.',
  '/careers': 'Learn about careers at BluBridge in AI research, engineering and business, and the teams building core AI technologies and tailored AI systems.',
  '/contact': 'Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.'
};

// Page titles for each route
const pageTitles = {
  '/': 'Frontier AI Research & Tailored AI Systems | Blubridge',
  '/solutions': 'Applied AI Solutions - For your Use Case | Blubridge',
  '/research': 'Research | Blubridge',
  '/about-us': 'About BluBridge | Frontier AI Research from First Principles',
  '/careers': 'Careers at BluBridge | Research, Engineering & Business',
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
