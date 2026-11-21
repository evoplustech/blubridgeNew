// Job data synced with live blubridge.com careers listings - Updated June 2026
export const jobsData = [
  {
    id: 'data-science-ai-ml-engineer',
    slug: 'data-science-ai-ml-engineer',
    title: 'Data Science / AI ML Engineer',
    department: 'Research & Development',
    team: 'Core ML',
    location: 'Chennai (Mandaveli) On-site',
    experience: '0-1 Years',
    salary: '6-10 Lacs P.A. + ESOPs Eligibility',
    vacancies: 12,
    batch: '2025, 2026',
    education: 'Any Graduate',
    employmentType: 'Full Time',
    description: 'We are hiring Data Science / AI & ML Engineers (Freshers) to work on compiler frameworks, transformer-based infrastructures, and end-to-end AI pipelines. You will collaborate with research teams to translate mathematical models into optimized execution graphs, implement custom kernels and low-level performance optimizations, and contribute to the development of deep learning frameworks and execution runtimes powering large-scale model training.',
    responsibilities: [
      'Design and develop compiler frameworks that optimize AI model execution at the kernel, graph, and operator levels',
      'Architect scalable transformer-based infrastructures for distributed multi-node training and efficient inference',
      'Build end-to-end AI pipelines including graph optimizations, memory scheduling, and compute distribution',
      'Collaborate with research teams to translate mathematical models into optimized execution graphs and intermediate representations (IRs)',
      'Implement custom kernels, quantization strategies, and low-level performance optimizations in C/C++ and CUDA',
      'Analyze and tune runtime performance bottlenecks focusing on parallelization, vectorization, and memory management',
      'Develop domain-specific compiler passes for tensor operations, automatic differentiation, and operator fusion',
      'Conduct systematic experiments to explore scaling laws, precision formats, and architectural optimizations for improved computational efficiency',
      'Contribute to the development and optimization of deep learning frameworks and execution runtimes, focusing on tensor computation graphs, distributed training pipelines, and execution scheduling',
      'Work on data and training infrastructure including dataset preparation pipelines, tokenization strategies, preprocessing workflows, and evaluation systems for large-scale model training',
      'Participate in model efficiency research including quantization techniques, sparsity methods, precision formats, and inference optimization for large-scale neural networks'
    ],
    requirements: [
      'Strong proficiency in C, C++ or Java, with good command over pointers, memory management, performance optimization, and systems-level programming',
      'Solid foundation in Mathematics - calculus, probability, statistics, and linear algebra',
      'Strong logical reasoning, problem-solving ability, high intelligence (IQ), and an analytical mindset',
      'Ability to operate effectively in a research-driven, high-intensity environment with cross-functional collaboration'
    ],
    addedAdvantage: [
      'Experience or strong interest in compiler construction, runtime systems, and code generation',
      'Proficiency or willingness to learn CUDA and Rust for high-performance and systems-level development',
      'Understanding of computer architecture, operating systems, parallel computing, and memory hierarchy',
      'Familiarity with deep learning frameworks, transformer architectures, or distributed training systems'
    ],
    whyJoin: [
      'A research-driven engineering environment focused on building AI systems and advancing foundational machine learning capabilities',
      'Opportunity to contribute to the development of foundation models and the infrastructure required for large-scale training and inference',
      'Hands-on exposure to core layers of the AI stack including model architectures, data pipelines, deep learning frameworks, compilers, and runtime systems',
      'Access to high-performance compute infrastructure and multi-node GPU clusters for large-scale experimentation and systems research',
      'Mentorship and close collaboration with engineering and research teams working on the development of a GPT-scale dense foundation model',
      'Employee Stock Ownership Plan (ESOP) eligibility upon confirmation, health insurance, personal accident and life insurance, generous parental leave, accommodation/transportation allowance, and complimentary lunch and dinner'
    ],
    skills: ['AI', 'Machine Learning', 'Data Science', 'Python', 'Tensorflow', 'Java', 'C++', 'Artificial Intelligence', 'Neural Networks', 'Deep Learning', 'Pytorch', 'CUDA']
  },
  {
    id: 'hr-executive-talent-people-operations',
    slug: 'hr-executive-talent-people-operations',
    title: 'HR Executive - Talent & People Operations',
    department: 'Human Resources',
    team: 'People & Talent',
    location: 'Chennai On-site',
    experience: '0-4 Years',
    salary: '4-7 Lacs P.A. + Incentives up to 50K',
    vacancies: 8,
    batch: '2024, 2025, 2026',
    education: "Bachelor's or Master's in Human Resources, Business Administration or related fields",
    employmentType: 'Full Time, Permanent',
    description: 'We are building a next-generation AI research and technology company focused on developing foundational AI systems. As part of the People & Talent team, you will work closely with leadership to build the company\'s talent ecosystem - designing and executing strategies to identify, attract, and retain high-quality talent across research, engineering, and business teams. The role combines talent acquisition, HR operations, and people programs that support a high-performance research-driven culture.',
    responsibilities: [
      'Design and execute talent acquisition strategies aligned with company growth',
      'Source candidates across platforms such as LinkedIn, Naukri, Monster, and other professional networks',
      'Identify and engage talent from universities, research communities, and niche technical ecosystems',
      'Design and implement HR policies, processes, and operational workflows',
      'Manage employee lifecycle operations including onboarding, documentation, and compliance',
      'Improve operational efficiency through structured HR systems and processes',
      'Develop programs that support employee engagement and long-term retention',
      'Help build a high-performance culture aligned with research and engineering excellence',
      'Work closely with leadership to understand talent needs across teams',
      'Support initiatives related to organizational growth, hiring strategy, and workforce planning'
    ],
    requirements: [
      "Bachelor's or Master's degree in Human Resources, Business Administration, or related fields",
      'Strong organizational skills and attention to detail',
      'Strong communication, coordination, and relationship-building skills',
      'Interest in talent strategy, recruitment, and organizational development',
      'Ability to identify and engage high-quality candidates from niche talent pools',
      'Strong ownership mindset and ability to execute initiatives independently',
      'Curiosity about how high-performance teams are built and managed'
    ],
    addedAdvantage: [
      'Internship or exposure to recruitment coordination or HR operations',
      'Familiarity with talent sourcing platforms and recruitment workflows',
      'Interest in technology organizations and hiring technical talent'
    ],
    whyJoin: [
      'Opportunity to help build the talent foundation of a deep-technology AI organization',
      'Work closely with leadership, researchers, and engineering teams',
      'Gain exposure to talent strategy, recruiting systems, and organizational design',
      'Contribute to building a high-performance research and engineering culture',
      'Competitive salary package with performance-linked incentives',
      'Health insurance, personal accident and life insurance, generous parental leave, accommodation/transportation allowance, and complimentary lunch and dinner'
    ],
    skills: ['Talent Acquisition', 'Recruitment', 'Hiring', 'Talent Sourcing', 'Screening', 'Corporate HR', 'Strategic HR', 'Talent Development', 'Retention', 'Talent Engagement', 'Compliance', 'Labour Laws', 'Payroll', 'Human Resource Management']
  }
];

export const getJobBySlug = (slug) => {
  return jobsData.find(job => job.slug === slug);
};

export const getAllJobs = () => {
  return jobsData;
};
