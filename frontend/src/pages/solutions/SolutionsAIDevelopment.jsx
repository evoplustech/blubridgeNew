import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Check, Code, Layers, Workflow } from 'lucide-react';

const SolutionsAIDevelopment = () => {
  return (
    <div className="min-h-screen bg-[#0A1F3D]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#0A1F3D] via-[#0B2543] to-[#0A1F3D]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-1/2 w-[400px] h-[400px] bg-[#0066FF] rounded-full filter blur-[130px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-[#0066FF]/20 rounded-full text-[#0066FF] text-sm font-semibold mb-6 uppercase">AI Development Solutions</div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Complete environment for building production AI systems
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl">
              From experimentation to production deployment, BluBrg provides integrated tools, frameworks, and infrastructure for the entire AI development lifecycle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products/training">
                <Button className="bg-white text-[#0A1F3D] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                  Explore Development Platform
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  View Documentation →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Development Workflow */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">AI Development Workflow</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Accelerate every stage from initial prototyping through production deployment.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                phase: 'Experimentation',
                description: 'Rapid prototyping with Jupyter notebooks, managed datasets, and pre-configured environments.',
                tools: ['JupyterLab', 'VS Code Remote', 'Shared filesystems', 'Sample datasets']
              },
              {
                phase: 'Training',
                description: 'Scale experiments to production training runs with distributed frameworks and auto-scaling clusters.',
                tools: ['PyTorch DDP', 'DeepSpeed', 'Ray', 'MLflow tracking']
              },
              {
                phase: 'Evaluation',
                description: 'Test model performance with validation pipelines, A/B testing, and benchmarking suites.',
                tools: ['Model evaluation', 'A/B testing', 'Performance profiling', 'Cost analysis']
              },
              {
                phase: 'Deployment',
                description: 'Deploy to production with one-click endpoints, version control, and monitoring.',
                tools: ['API deployment', 'Auto-scaling', 'Monitoring', 'Rollback support']
              }
            ].map((stage, i) => (
              <Card key={i} className="bg-white/5 border-white/10 relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-6 h-0.5 bg-[#0066FF]/30 -translate-y-1/2" />
                )}
                <CardContent className="p-6 relative">
                  <div className="text-[#0066FF] font-bold text-4xl mb-2 opacity-30">0{i + 1}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{stage.phase}</h3>
                  <p className="text-white/70 text-sm mb-4">{stage.description}</p>
                  <div className="space-y-1">
                    {stage.tools.map((tool, j) => (
                      <div key={j} className="text-white/60 text-xs">• {tool}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Components */}
      <section className="py-24 bg-[#0A1F3D]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Development Infrastructure</h2>
              <p className="text-white/70 text-lg mb-8">
                BluBrg provides all the infrastructure components AI teams need without managing complexity.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: <Code className="w-8 h-8" />,
                    title: 'Development Environments',
                    description: 'Pre-configured notebooks with popular frameworks, libraries, and tools. Connect via browser or SSH with persistent storage.'
                  },
                  {
                    icon: <Layers className="w-8 h-8" />,
                    title: 'Data Pipeline Tools',
                    description: 'Managed data preprocessing, feature engineering, and ETL pipelines that scale automatically with your workload.'
                  },
                  {
                    icon: <Workflow className="w-8 h-8" />,
                    title: 'Experiment Tracking',
                    description: 'Built-in MLflow integration tracks experiments, parameters, metrics, and artifacts automatically.'
                  }
                ].map((component, i) => (
                  <Card key={i} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="text-[#0066FF]">{component.icon}</div>
                        <h3 className="text-xl font-bold text-white">{component.title}</h3>
                      </div>
                      <p className="text-white/70 text-sm">{component.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Supported Frameworks & Tools</h3>
                  <div className="space-y-6">
                    {[
                      {
                        category: 'Deep Learning',
                        items: ['PyTorch 2.0+', 'TensorFlow 2.x', 'JAX', 'Hugging Face Transformers', 'LangChain']
                      },
                      {
                        category: 'Data Science',
                        items: ['Pandas', 'NumPy', 'Scikit-learn', 'Polars', 'DuckDB']
                      },
                      {
                        category: 'MLOps',
                        items: ['MLflow', 'Weights & Biases', 'Ray', 'DVC', 'Kubeflow']
                      },
                      {
                        category: 'Deployment',
                        items: ['FastAPI', 'TorchServe', 'Triton', 'BentoML', 'Gradio']
                      }
                    ].map((group, i) => (
                      <div key={i}>
                        <div className="text-[#0066FF] font-semibold mb-3">{group.category}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {group.items.map((item, j) => (
                            <div key={j} className="flex items-center space-x-2 text-white/70 text-sm">
                              <Check className="w-4 h-4 text-[#0066FF]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Collaboration */}
      <section className="py-24 bg-[#0D2847]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Built for Team Collaboration</h2>
            <p className="text-white/70 text-center mb-12">
              Enable your entire AI team to work efficiently with shared resources and collaboration tools.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  feature: 'Shared Workspaces',
                  description: 'Teams access common datasets, models, and experiments. Share notebooks and results seamlessly across the organization.'
                },
                {
                  feature: 'Resource Management',
                  description: 'Fair-share GPU scheduling ensures equitable access. Set quotas and priorities by team or project.'
                },
                {
                  feature: 'Version Control Integration',
                  description: 'Native Git integration with automatic experiment versioning. Track code, data, and model versions together.'
                },
                {
                  feature: 'Access Controls',
                  description: 'Role-based permissions for datasets, models, and compute resources. Audit logs for compliance.'
                }
              ].map((item, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-white font-semibold mb-3">{item.feature}</h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0066FF] to-[#0052CC]">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Accelerate your AI development
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get started with a fully configured development environment in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-[#0066FF] hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                Request Access
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsAIDevelopment;