// Job data with full details from Naukri listings
export const jobsData = [
  {
    id: 'ai-systems-engineer',
    slug: 'ai-systems-engineer',
    title: 'AI Systems Engineer',
    department: 'Engineering',
    team: 'AI Research',
    location: 'Besant Nagar, Chennai',
    experience: '0 Years',
    salary: '₹3-6 Lacs P.A.',
    vacancies: 5,
    batch: '2026',
    education: "Bachelor's / Diploma in EEE, ECE, EIE or related field",
    employmentType: 'Full Time, Permanent',
    postedDate: '1 day ago',
    naukriLink: 'https://blubridge.com/hiring/ai-se-reg-form/',
    description: 'Design, build, and operate interconnects for AI compute workload servers. This role focuses on systems architecture for high-performance AI infrastructure.',
    responsibilities: [
      'Design, build, and operate interconnects for AI compute workload servers',
      'Design and manage networking topology for large-scale AI systems',
      'Build and apply Roofline Modeling for AI workload performance analysis',
      'Design and evaluate processor-level system configurations for AI compute',
      'Execute and manage training workloads end-to-end',
      'Execute and manage inference workloads end-to-end',
      'Design and implement cooling and heat mitigation strategies for high-density AI servers'
    ],
    softwareStack: [
      'Build and manage Linux-based Operating Systems (Ubuntu Server, RHEL)',
      'Install and manage NVIDIA GPU drivers and CUDA drivers',
      'Operate AI compute runtimes (CUDA Runtime, cuDNN, NCCL)',
      'Build and manage training frameworks and execution pipelines (PyTorch)',
      'Implement parallelism strategies for AI workloads and distributed execution',
      'Operate monitoring and observability systems (GPU and system metrics)'
    ],
    systemsResponsibilities: {
      cpu: [
        'Design CPU-centric architectures and PCIe lane allocation for AI compute',
        'Configure memory channels, NUMA layouts, and bandwidth distribution'
      ],
      gpu: [
        'Optimize CUDA cores and Tensor Cores for AI workloads',
        'Manage GPU memory and bandwidth behavior'
      ],
      motherboard: [
        'Design PLX topology, oversubscription, and latency paths',
        'Validate SXM and PCIe GPU form factors',
        'Map and validate PCIe lane topology across multi-GPU systems'
      ],
      memory: [
        'Define host RAM requirements per GPU workload',
        'Optimize RAM-to-GPU ratios for training runs'
      ],
      storage: [
        'Design OS storage layouts',
        'Manage training dataset shards',
        'Manage cold dataset storage'
      ]
    },
    requirements: [
      'Fresher from EEE, ECE, VLSI, Computer Engineering, or related core engineering disciplines (Batch 2026)',
      'Strong passion for hardware, system architecture, and low-level computing systems'
    ],
    addedAdvantage: [
      'Solid fundamentals in computer architecture, operating systems, and digital systems',
      'Comfortable operating in Linux-based environments',
      'Ability to build, configure, and validate systems end-to-end',
      'Strong interest in hardware-software interaction under real workloads',
      'Strong analytical thinking, problem-solving ability, and execution discipline',
      'Hands-on exposure through labs, academic projects, self-built systems, or independent experimentation'
    ],
    whyJoin: [
      'Opportunity to build high computing systems end-to-end across hardware, software, and infrastructure layers',
      'Direct exposure to real compute infrastructure, not simulated or abstract environments',
      'Work closely with high-performance servers, GPUs, interconnects, and storage systems',
      'Environment focused on depth, execution, and technical ownership',
      'Ideal for engineers who want to understand how large-scale AI systems actually run',
      'Long-term scope to grow into systems architecture, performance engineering, and infrastructure leadership roles'
    ],
    skills: ['Ubuntu', 'High Performance Computing', 'Computer Architecture', 'System Design', 'Parallel Computing', 'CUDA', 'Operating Systems', 'PyTorch', 'NVIDIA', 'Linux', 'cuDNN', 'System Architecture', 'Deep Learning Systems', 'HPC', 'Distributed Computing']
  },
  {
    id: 'ai-ml-engineer',
    slug: 'ai-ml-engineer-cpp-java',
    title: 'AI & ML Engineer – C++ / Java Developer',
    department: 'Engineering',
    team: 'Core ML',
    location: 'Mandaveli, Chennai',
    experience: '0 Years',
    salary: '₹5-7 Lacs P.A.',
    vacancies: 15,
    batch: '2025',
    education: "Bachelor's or Master's in Computer Science, AI, Data Science, ML, Mathematics, or Statistics",
    employmentType: 'Full Time, Permanent',
    postedDate: '4 days ago',
    naukriLink: 'https://blubridge.com/hiring/ai-and-ml-registration-form/',
    description: 'Design and develop compiler frameworks that optimize AI model execution. Build end-to-end AI pipelines including graph optimizations, memory scheduling, and compute distribution.',
    responsibilities: [
      'Design and develop compiler frameworks that optimize AI model execution at the kernel, graph, and operator levels',
      'Architect scalable transformer-based infrastructures for distributed multi-node training and efficient inference',
      'Build end-to-end AI pipelines including graph optimizations, memory scheduling, and compute distribution',
      'Collaborate with research teams to translate mathematical models into optimized execution graphs and intermediate representations (IRs)',
      'Implement custom kernels, quantization strategies, and low-level performance optimizations in C/C++ and CUDA',
      'Analyze and tune runtime performance bottlenecks focusing on parallelization, vectorization, and memory management',
      'Develop domain-specific compiler passes for tensor operations, automatic differentiation, and operator fusion',
      'Conduct systematic experiments to explore scaling laws, precision formats, and architectural optimizations'
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
      'Deep understanding of computer architecture, operating systems, data structures, and memory management'
    ],
    whyJoin: [
      'A dynamic and innovative work environment with a AI research-driven team',
      'Mentorship, learning, and growth opportunities in AI infrastructure and systems research',
      'Competitive compensation with performance-based advancement and technical ownership',
      'Opportunity to work on compiler-level AI framework design and large-scale foundation model optimization',
      'Access to multi-node GPU clusters and next-gen compute environments for experimentation'
    ],
    skills: ['Java', 'C++', 'Artificial Intelligence', 'Machine Learning', 'TensorFlow', 'C', 'NLP', 'Neural Networks', 'Deep Learning', 'PyTorch', 'Data Science', 'Pattern Recognition', 'Python']
  },
  {
    id: 'branding-communications-lead',
    slug: 'branding-communications-lead',
    title: 'Branding & Communications Lead',
    department: 'Marketing',
    team: 'Brand',
    location: 'Chennai',
    experience: '0 Years',
    salary: '₹2.5-5.5 Lacs P.A.',
    vacancies: 5,
    batch: '2026',
    education: 'Mass Communication / Journalism / Media / Visual Communication or related fields',
    employmentType: 'Full Time, Permanent',
    postedDate: '1 day ago',
    naukriLink: 'https://blubridge.com/hiring/brandcomm-registration-form/',
    description: 'Strengthen BluBridge\'s brand presence, external communication, and outreach across global AI and technology ecosystems. Focus on brand communication, media, storytelling, and content coordination.',
    responsibilities: [
      'Support the execution of branding and communication strategies to improve BluBridge\'s visibility across AI, technology, and startup ecosystems',
      'Maintain consistent brand messaging across websites, communication materials, media content, and outreach assets',
      'Create and manage branding and communication content related to AI research, consulting services, innovations, and company initiatives',
      'Prepare communication assets such as company profiles, research summaries, newsletters, emailers, press-style updates, and official announcements',
      'Manage brand-focused digital presence, including social media content coordination, publishing schedules, and engagement tracking',
      'Assist in planning and executing brand awareness initiatives, online outreach, and community engagement activities',
      'Support communication-led outreach through email, LinkedIn, and professional platforms',
      'Track outreach activity, engagement, and communication status using basic tracking and reporting',
      'Monitor industry trends, competitor communication patterns, and emerging narratives in AI and technology',
      'Work closely with internal research, consulting, and leadership teams to ensure accurate and aligned external communication'
    ],
    requirements: [
      'Batch - 2026 (Bachelor\'s or Master\'s degree in Mass Communication, Journalism, Media Studies, Visual Communication, Communications, PR, or related fields)',
      'Strong interest in brand-building, media, communication, and storytelling',
      'Clear written and verbal communication skills',
      'Ability to structure information and present it clearly across different formats',
      'Creative mindset with attention to accuracy and consistency',
      'Curious to learn and ability to understand and communicate AI research and technical work in accessible language'
    ],
    addedAdvantage: [
      'Exposure to branding, communications, content creation, or media-related work',
      'Familiarity with LinkedIn content, professional outreach, or email communication',
      'Prior internship, coursework, or certification in Branding, Media, Communications, or PR',
      'Ability to connect technical or research-heavy topics with business and public communication',
      'Basic familiarity with design, content tools, or publishing platforms'
    ],
    whyJoin: [
      'Opportunity to be part of BluBridge\'s early branding and communications team',
      'Hands-on exposure to AI research, consulting narratives, and global-facing communication',
      'Practical learning across branding, media, communication, and business-facing functions',
      'Direct interaction with research and leadership teams',
      'Research-driven, execution-focused, and fast-growing work environment',
      'Strong foundation for long-term careers in Branding, Communications, Media, or Business-facing roles'
    ],
    skills: ['Media', 'Branding', 'Mass Media', 'Journalism', 'PR', 'Public Relations', 'Campaigns', 'Marketing', 'Brand Communication']
  },
  {
    id: 'marketing-growth-lead',
    slug: 'marketing-growth-lead',
    title: 'Marketing & Growth Lead',
    department: 'Marketing',
    team: 'Growth',
    location: 'Chennai',
    experience: '0 Years',
    salary: '₹3-5 Lacs P.A.',
    vacancies: 7,
    batch: '2025, 2026',
    education: 'Any Bachelor\'s degree',
    employmentType: 'Full Time, Permanent',
    postedDate: '2 days ago',
    naukriLink: 'https://blubridge.com/hiring/marketing-growth-registration-form/',
    description: 'Take full ownership of BluBridge\'s marketing and growth execution. Drive visibility, inbound traction, and market presence through disciplined execution across organic growth, paid campaigns, PPC, and digital channels.',
    responsibilities: [
      'Own and execute BluBridge\'s entire marketing function, covering organic growth, paid campaigns, PPC, and digital visibility',
      'Drive search visibility and inbound discovery through structured optimization and sustained execution',
      'Build and maintain BluBridge\'s presence across relevant digital and professional platforms with consistency and discipline',
      'Plan, run, and optimize paid marketing initiatives with clear accountability for spend and outcomes',
      'Own BluBridge\'s online presence across websites, landing pages, and digital assets',
      'Coordinate content required for marketing execution while maintaining consistency with BluBridge\'s positioning',
      'Track performance across traffic, reach, leads, conversions, and ROI using structured metrics',
      'Identify inefficiencies, gaps, and opportunities across marketing activities and take corrective action',
      'Support lead generation and funnel movement in coordination with internal teams',
      'Work directly with leadership to align marketing execution with organizational priorities'
    ],
    requirements: [
      'Any Bachelor\'s degree; only candidates from the 2025 or 2026 graduating batch will be considered',
      'Strong ownership mindset with the ability to execute assigned responsibilities with discipline',
      'Structured and analytical thinking with strong attention to detail',
      'Ability to manage multiple tasks in parallel and close them systematically',
      'Comfort operating in a fast-paced, execution-driven environment',
      'Willingness to learn, experiment, and improve based on feedback and results'
    ],
    addedAdvantage: [
      'Exposure to or strong interest in organic growth and digital marketing execution',
      'Basic understanding of paid campaigns, PPC, or performance marketing concepts',
      'Familiarity with online platforms, analytics tools, or marketing dashboards',
      'Prior academic projects, internships, or self-initiated work related to marketing, growth, or digital platforms'
    ],
    whyJoin: [
      'Opportunity to be part of BluBridge\'s initial marketing and growth team',
      'Hands-on responsibility to design, stabilize, and scale marketing systems from the ground up',
      'Direct working relationship with leadership on priorities, execution quality, and measurable outcomes',
      'Structured real-world exposure to marketing execution within a research-driven AI organization',
      'Opportunity to grow into a senior marketing or growth ownership role based on performance'
    ],
    skills: ['Marketing', 'Brand', 'Google Ads', 'PPC', 'Sales', 'SMO', 'Digital Marketing', 'SEM', 'Branding', 'SEO', 'LinkedIn Ads']
  },
  {
    id: 'process-operations-intern',
    slug: 'process-operations-intern',
    title: 'Process & Operations Intern',
    department: 'Operations',
    team: 'Internship',
    location: 'Chennai',
    experience: '0-1 Years',
    salary: '₹15,000/month',
    duration: '3 months',
    vacancies: 12,
    batch: '2026',
    education: 'MBA (Operations / Business Analytics / Systems) or BBA / BBM (Operations)',
    employmentType: 'Internship',
    postedDate: '2 days ago',
    naukriLink: 'https://blubridge.com/hiring/process-operation-registration-form/',
    description: 'Support the organization-wide process setup initiative. Observe real operations, design enforceable workflows, and standardise how work is executed across departments.',
    responsibilities: [
      'Observe, analyse, and document end-to-end operational processes across security, housekeeping, IT, infrastructure, administration, HR, accounts, and employee lifecycle',
      'Design and standardise process flows, workflows, and SOPs based on real on-ground execution',
      'Map As-Is and define To-Be operational workflows with clear ownership, approvals, controls, and escalation paths',
      'Develop enforceable operational artefacts including process flow diagrams, SOPs, checklists, control points, and RACI mappings',
      'Identify operational gaps, inefficiencies, risks, and cross-department dependency issues',
      'Work closely with leadership and department owners to validate and lock processes',
      'Drive closure of assigned operational areas with documentation discipline and version control'
    ],
    requirements: [
      'Educational Background: 2026 Batch - MBA (Operations / Business Analytics / Systems) or BBA / BBM (Operations)',
      'Strong logical thinking, structured reasoning, and systems-level understanding',
      'Ability to think end-to-end across multiple departments',
      'High attention to detail and execution discipline',
      'Ability to work independently in a fast-paced, execution-driven environment'
    ],
    addedAdvantage: [
      'Exposure to process mapping, operations, audits, or workflow documentation',
      'Familiarity with Excel, Draw.io, Visio, or structured documentation tools',
      'Prior internship or project work in operations, administration, or systems'
    ],
    whyJoin: [
      'Ownership-driven exposure to organisation-wide operations setup in an early stage AI research company',
      'Hands-on responsibility to design, implement, and stabilise operational systems',
      'Direct working relationship with leadership on process architecture, governance, and execution frameworks',
      'Structured real-world learning in operations management, process design, and execution discipline',
      'Clear opportunity to convert into a full-time management / operations role based on performance'
    ],
    skills: ['Process Flow', 'Operations', 'Process Management', 'Workflow', 'JIRA', 'MBA', 'Excel', 'SOP', 'Operations Management']
  },
  {
    id: 'office-administration',
    slug: 'office-administration',
    title: 'Office Administration – Male',
    department: 'Operations',
    team: 'Admin',
    location: 'Besant Nagar, Chennai',
    experience: '0-3 Years',
    salary: '₹3-5 Lacs P.A.',
    vacancies: 3,
    batch: '2023, 2024, 2025',
    education: 'Bachelor\'s degree in any discipline',
    employmentType: 'Full Time, Permanent',
    postedDate: '3 weeks ago',
    naukriLink: 'https://blubridge.com/hiring/administration-executive-registration-form/',
    description: 'Manage and coordinate daily office activities and administrative operations. Handle vendor relationships, security management, and office utilities.',
    responsibilities: [
      'Manage and coordinate daily office activities and administrative operations',
      'Maintain office supplies, equipment inventory, and manage procurement processes',
      'Oversee vendor relationships, including food services, cab services, office supplies, and other necessary vendors',
      'Handle security management, ensuring safety protocols and standards are maintained',
      'Manage office utilities including electricity, internet, landline, and related service providers',
      'Oversee incoming and outgoing communications including emails, postal correspondence, and phone calls',
      'Schedule meetings, appointments, and manage office event coordination effectively',
      'Maintain accurate records of office expenditures, budgets, and vendor interactions',
      'Ensure the cleanliness, organization, and proper maintenance of office premises and facilities',
      'Prepare regular reports on office operations and administrative activities',
      'Coordinate closely with various departments to support smooth office operations'
    ],
    requirements: [
      'Bachelor\'s degree in any discipline',
      'Proven organizational and time management skills',
      'Excellent verbal and written communication abilities',
      'Proficiency with Microsoft Office Suite (Word, Excel, PowerPoint, Outlook)',
      'Strong interpersonal skills and the ability to handle tasks proactively',
      'Ability to multitask, prioritize tasks, and manage time efficiently'
    ],
    addedAdvantage: [
      'Previous administrative or office management experience (not mandatory but advantageous)',
      'Experience managing vendor relationships and facility services'
    ],
    whyJoin: [
      'Opportunity to contribute significantly to the smooth operations of an innovative, early-stage AI research organization',
      'A supportive, collaborative, and intellectually stimulating work environment',
      'Professional growth opportunities in administrative management and operational efficiency'
    ],
    skills: ['Administration', 'Communication Skills', 'Office Management', 'Management Skills', 'Petty Cash Management', 'Office Administration', 'Facility Administration', 'MS Office', 'Data Entry']
  },
  {
    id: 'accountant',
    slug: 'accountant',
    title: 'Accountant (Male)',
    department: 'Finance',
    team: 'Accounting',
    location: 'Mandavelipakkam, Chennai',
    experience: '0-3 Years',
    salary: '₹2.5-5 Lacs P.A.',
    vacancies: 3,
    batch: '2023, 2024, 2025',
    education: 'B.Com / M.Com (Commerce background)',
    employmentType: 'Full Time, Permanent',
    postedDate: '3 weeks ago',
    naukriLink: 'https://blubridge.com/hiring/accountant-registration/',
    description: 'Detail-oriented accounting role with hands-on exposure to financial accounting, statutory compliance, and audit coordination within a fast-paced, research-driven organization.',
    responsibilities: [
      'Summarize financial status and transaction reports, including bookkeeping, profit and loss statements',
      'Ensure compliance with all legal requirements to avoid legal challenges',
      'Coordinate and manage requirements for statutory and other audits',
      'Proficiency in Tally software',
      'Reconcile accounts payable and receivable',
      'Knowledge about BRS (Bank Reconciliation Statement)',
      'Filing and processing monthly PF and ESIC',
      'Payment of monthly TDS',
      'Compute taxes and prepare tax returns',
      'Basic knowledge of GST requirements',
      'Collect invoices from different departments and vendors',
      'Process payments for approved invoices',
      'Calculate Salary TDS and other TDS deductions',
      'Prepare and process monthly salary calculations',
      'Handle petty cash on a day-to-day basis'
    ],
    requirements: [
      'Education: B.Com / M.Com (Commerce background)',
      'Candidates who have completed CMA Inter, CA Inter, or have articleship experience will have an added advantage',
      'Excellent communication and interpersonal skills',
      'Proficiency in Tally or any ERP software, and MS Excel',
      'Basic understanding of taxation and statutory filings'
    ],
    addedAdvantage: [
      'CMA Inter or CA Inter completed',
      'Articleship experience',
      'Experience with ERP software'
    ],
    whyJoin: [
      'Hands-on exposure to financial accounting in a research-driven AI organization',
      'Work with statutory compliance and audit coordination',
      'Professional growth opportunities in finance and accounting'
    ],
    skills: ['Accounting', 'TDS Return', 'Auditing', 'Excel', 'TDS', 'Invoice Processing', 'Tally ERP', 'Petty Cash', 'GST', 'Accounts Receivable', 'Journal Entries', 'Bank Reconciliation', 'Accounts Payable', 'PF', 'ESI', 'Book Keeping']
  },
  {
    id: 'senior-administration-officer',
    slug: 'senior-administration-officer',
    title: 'Senior Administration Officer',
    department: 'Operations',
    team: 'Admin',
    location: 'Besant Nagar, Chennai',
    experience: '2-4 Years',
    salary: '₹2.5-6 Lacs P.A.',
    vacancies: 2,
    education: 'Bachelor\'s degree in any discipline',
    employmentType: 'Full Time, Permanent',
    postedDate: '3+ weeks ago',
    naukriLink: 'https://blubridge.com/hiring/administration-registration-form/',
    description: 'Oversee and manage end-to-end administrative operations of the company, ensuring seamless coordination across all departments.',
    responsibilities: [
      'Oversee and manage end-to-end administrative operations of the company',
      'Supervise and coordinate complete support staff – front office, administrative operations, housekeeping, and security teams',
      'Handle facilities management, including workspace maintenance, office infrastructure, seating layouts, and repair coordination',
      'Manage vendor lifecycle – sourcing, negotiation, onboarding, billing, renewals, and periodic performance evaluation',
      'Maintain procurement processes, including purchase requests, quotations, purchase orders, and vendor payments tracking',
      'Oversee inventory, asset, and stationery management',
      'Ensure cleanliness, hygiene, and safety standards are maintained across all office and research areas',
      'Manage utility and service operations – electricity, air-conditioning, internet, telephony, and water supply',
      'Coordinate transportation, courier, and logistics arrangements',
      'Oversee front-office operations, visitor management, and guest hospitality',
      'Manage security operations, gate-entry protocols, CCTV oversight, and liaison with building management',
      'Handle administrative budgets, petty cash, and cost reconciliation; prepare monthly MIS reports',
      'Support statutory and compliance documentation, including vendor agreements, AMC renewals, insurance, and facility audit records',
      'Plan and execute internal meetings, training sessions, events, and celebrations',
      'Liaise with HR and IT teams for employee onboarding logistics, ID cards, seating, and resource allocation'
    ],
    requirements: [
      'Bachelor\'s degree in any discipline',
      'Minimum 2–4 years of experience in office administration, facility coordination, or general operations',
      'Proven ability to manage multiple vendors and negotiate effectively',
      'Excellent organizational, communication, and reporting skills',
      'Proficiency with Microsoft Office Suite (Word, Excel, PowerPoint, Outlook)',
      'Strong interpersonal skills and the ability to handle tasks proactively',
      'Ability to multitask, prioritize tasks, and manage time efficiently'
    ],
    addedAdvantage: [
      'Previous administrative or office management experience',
      'Experience managing vendor relationships and facility services'
    ],
    whyJoin: [
      'Opportunity to contribute significantly to the smooth operations of an innovative, early-stage AI research organization',
      'A supportive, collaborative, and intellectually stimulating work environment',
      'Professional growth opportunities in administrative management and operational efficiency'
    ],
    skills: ['Admin', 'Communication', 'Office Administration', 'Office Management', 'Vendor Relations', 'Facility Administration', 'Data Entry', 'MS Office', 'Administrative Skills', 'Interpersonal Skills']
  }
];

export const getJobBySlug = (slug) => {
  return jobsData.find(job => job.slug === slug);
};

export const getAllJobs = () => {
  return jobsData;
};
