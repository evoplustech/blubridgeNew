import React from 'react';
import { ArrowRight, BarChart3, Users, Zap } from 'lucide-react';
import { Button } from '../../components/ui/button';

const benefits = [
  { id: 'strategy', Icon: Zap, first: 'Strategy', second: 'to execution' },
  { id: 'impact', Icon: BarChart3, first: 'Real business', second: 'impact' },
  { id: 'partnership', Icon: Users, first: 'A partner', second: 'for what’s next' },
];

export const IntroActions = ({ onContact }) => <div className="aic-third-intro-actions" data-testid="aic-3-intro-actions">
  <Button type="button" onClick={onContact} className="aic-third-experts-button" data-testid="aic-3-talk-to-experts">
    Talk to Our AI Experts <ArrowRight size={18} aria-hidden="true" />
  </Button>
  <ul className="aic-third-benefits" data-testid="aic-3-benefits">
    {benefits.map(({ id, Icon, first, second }) => <li key={id} className="aic-third-benefit" data-testid={`aic-3-benefit-${id}`}>
      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
      <span>{first} <span className="aic-third-benefit-line">{second}</span></span>
    </li>)}
  </ul>
</div>;