// Fill previously missing metadata without changing the retained React pages.
const entries = [
  ['/products', 'Products | BluBridge', 'Full-stack AI infrastructure', 'From serverless endpoints to dedicated GPU clusters, BluBridge provides complete AI infrastructure solutions.'],
  ['/Research/BluTrain', 'BluTrain: A C++/CUDA Framework for AI Systems | BluBridge', 'BluTrain: A C++/CUDA Framework for AI Systems', 'Robust, lightweight, and architecture-general, built from first principles.'],
  ...['/Research/FLUX-Data', '/Research/FLUX-3', '/Research/FLUX-4'].map(path => [path, 'FLUX: Data Worth Training On | BluBridge', 'Introducing FLUX: Data Worth Training On', 'FLUX is a preprocessing pipeline designed to eliminate the trade-off between data quality and token retention for large language model training.']),
  ...[
    ['data-science-ai-ml-engineer', 'Data Science / AI ML Engineer'],
    ['business-development-ai-strategy', 'Business Development - AI Strategy & Partnerships'],
    ['social-media-growth-manager-ai-deep-tech', 'Social Media Growth Manager (AI / Deep Tech)'],
    ['social-media-growth-specialist-freelancer', 'Social Media Growth Specialist - Freelancer'],
  ].map(([slug, title]) => [`/careers/job/${slug}`, `${title} | BluBridge`, title, `Explore the ${title} opportunity at BluBridge. View responsibilities, requirements and application details.`]),
];
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
module.exports = Object.fromEntries(entries.map(([path, title, heading, description]) => [path, {
  title: escape(title), description: escape(description), content: `<h1>${escape(heading)}</h1><p>${escape(description)}</p>`,
}]));