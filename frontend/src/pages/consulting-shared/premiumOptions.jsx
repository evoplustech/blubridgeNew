import React from 'react';
import { Lightbulb, Cpu, Sparkles, Database, Rocket, Handshake, MoreHorizontal } from 'lucide-react';
import { countries } from '../ai-consulting/countryData';
import { CountryFlag } from '../ai-consulting/CountryFlag';
import { SERVICE_TYPES } from './consultingContact';

// Country options for the premium dropdown (value = country name, as saved by the consulting-1/2 forms).
export const COUNTRY_NAME_OPTIONS = countries.map(c => ({ value: c.name, label: c.name, leading: <CountryFlag code={c.code} name={c.name} /> }));

const SERVICE_META = {
  'AI Strategy & Roadmap': [Lightbulb, 'Strategy, roadmaps and architecture reviews'],
  'Custom Model Development': [Cpu, 'Purpose-built models trained on your data'],
  'Generative AI & LLM Solutions': [Sparkles, 'Assistants, enterprise search and RAG'],
  'Data & ML Engineering': [Database, 'Pipelines, feature stores and ML platforms'],
  'AI Infrastructure & Deployment': [Rocket, 'Ship and scale models in production'],
  Partnership: [Handshake, 'Collaborate with BluBridge on joint work'],
  Other: [MoreHorizontal, 'Tell us what you have in mind'],
};

export const SERVICE_OPTIONS = SERVICE_TYPES.map(label => {
  const [Icon, description] = SERVICE_META[label] || [MoreHorizontal, ''];
  return { value: label, label, description, leading: <span className="c3-icon-tile"><Icon strokeWidth={1.9} /></span> };
});
