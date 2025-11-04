
'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  className?: string;
}

const defaultActions: QuickAction[] = [
  {
    id: 'new-trade',
    label: 'New Trade',
    icon: 'plus',
    variant: 'primary',
    onClick: () => console.log('New Trade'),
  },
  {
    id: 'close-all',
    label: 'Close All',
    icon: 'swap',
    variant: 'secondary',
    onClick: () => console.log('Close All'),
  },
  {
    id: 'deposit',
    label: 'Deposit',
    icon: 'wallet',
    variant: 'secondary',
    onClick: () => console.log('Deposit'),
  },
];

export const QuickActions: React.FC<QuickActionsProps> = ({
  actions = defaultActions,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {actions.map((action) => (
        <Button
          key={action.id}
          variant={action.variant}
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