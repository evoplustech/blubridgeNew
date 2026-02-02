// craco.config.js
const path = require("path");
require("dotenv").config();

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

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === "true",
  enableVisualEdits: process.env.REACT_APP_ENABLE_VISUAL_EDITS === "true",
  enableHealthCheck: process.env.ENABLE_HEALTH_CHECK === "true",
};

// Conditionally load visual editing modules only if enabled
let babelMetadataPlugin;
let setupDevServer;

if (config.enableVisualEdits) {
  babelMetadataPlugin = require("./plugins/visual-edits/babel-metadata-plugin");
  setupDevServer = require("./plugins/visual-edits/dev-server-setup");
}

// Conditionally load health check modules only if enabled
let WebpackHealthPlugin;
let setupHealthEndpoints;
let healthPluginInstance;

if (config.enableHealthCheck) {
  WebpackHealthPlugin = require("./plugins/health-check/webpack-health-plugin");
  setupHealthEndpoints = require("./plugins/health-check/health-endpoints");
  healthPluginInstance = new WebpackHealthPlugin();
}

const webpackConfig = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {

      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        // Remove hot reload related plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name === 'HotModuleReplacementPlugin');
        });

        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /.*/, // Ignore all files
        };
      } else {
        // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
          ],
        };
      }

      // Add health check plugin to webpack if enabled
      if (config.enableHealthCheck && healthPluginInstance) {
        webpackConfig.plugins.push(healthPluginInstance);
      }

      return webpackConfig;
    },
  },
};

// Only add babel plugin if visual editing is enabled
if (config.enableVisualEdits) {
  webpackConfig.babel = {
    plugins: [babelMetadataPlugin],
  };
}

// Setup dev server with visual edits and/or health check
if (config.enableVisualEdits || config.enableHealthCheck) {
  webpackConfig.devServer = (devServerConfig) => {
    // Apply visual edits dev server setup if enabled
    if (config.enableVisualEdits && setupDevServer) {
      devServerConfig = setupDevServer(devServerConfig);
    }

    // Add health check endpoints if enabled
    if (config.enableHealthCheck && setupHealthEndpoints && healthPluginInstance) {
      const originalSetupMiddlewares = devServerConfig.setupMiddlewares;

      devServerConfig.setupMiddlewares = (middlewares, devServer) => {
        // Call original setup if exists
        if (originalSetupMiddlewares) {
          middlewares = originalSetupMiddlewares(middlewares, devServer);
        }

        // Setup health endpoints
        setupHealthEndpoints(devServer, healthPluginInstance);

        return middlewares;
      };
    }

    return devServerConfig;
  };
}

// Always add devServer configuration for meta injection
const existingDevServer = webpackConfig.devServer;
webpackConfig.devServer = (devServerConfig) => {
  // Apply existing devServer config if it exists
  if (existingDevServer) {
    devServerConfig = existingDevServer(devServerConfig);
  }

  // Store original setupMiddlewares
  const originalSetupMiddlewares = devServerConfig.setupMiddlewares;

  devServerConfig.setupMiddlewares = (middlewares, devServer) => {
    // Add meta injection middleware at the beginning
    devServer.app.use((req, res, next) => {
      // Store the original send function
      const originalSend = res.send.bind(res);
      
      res.send = function(body) {
        // Only process HTML that contains our app
        if (typeof body === 'string' && body.includes('<!doctype html>') && body.includes('<div id="root">')) {
          const urlPath = req.path.split('?')[0].split('#')[0];
          const metaDesc = metaDescriptions[urlPath] || metaDescriptions['/'];
          const pageTitle = pageTitles[urlPath] || pageTitles['/'];
          
          // Replace meta description
          body = body.replace(
            /<meta name="description" content="[^"]*"\s*\/?>/,
            `<meta name="description" content="${metaDesc}" />`
          );
          
          // Replace title
          body = body.replace(
            /<title>[^<]*<\/title>/,
            `<title>${pageTitle}</title>`
          );
        }
        
        return originalSend(body);
      };
      
      next();
    });

    // Call original setup if exists
    if (originalSetupMiddlewares) {
      return originalSetupMiddlewares(middlewares, devServer);
    }

    return middlewares;
  };

  return devServerConfig;
};

module.exports = webpackConfig;
