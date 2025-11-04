'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

interface QuickAction {
  id: string;
  label: string;
  icon: 'grid' | 'plus' | 'swap' | 'chart' | 'wallet' | 'search' | 'chevronDown' | 'settings' | 'headphones' | 'menu';
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  className?: string;
}

const defaultActions: QuickAction[] = [
  {
    id: 'new-order',
    label: 'New Order',
    icon: 'plus',
    variant: 'primary',
    onClick: () => console.log('New Order clicked'),
  },
  {
    id: 'market-watch',
    label: 'Market Watch',
    icon: 'chart',
    variant: 'secondary',
    onClick: () => console.log('Market Watch clicked'),
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: 'wallet',
    variant: 'secondary',
    onClick: () => console.log('Portfolio clicked'),
  },
  {
    id: 'analysis',
    label: 'Analysis',
    icon: 'grid',
    variant: 'ghost',
    onClick: () => console.log('Analysis clicked'),
  },
];

const QuickActions: React.FC<QuickActionsProps> = ({
  actions = defaultActions,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {actions.map((action) => (
        <Button
          key={action.id}
          variant={action.variant || 'secondary'}
          size="sm"
          onClick={action.onClick}
          className="flex items-center gap-2"
        >
          <Icon name={action.icon} size={18} />
          <span>{action.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;