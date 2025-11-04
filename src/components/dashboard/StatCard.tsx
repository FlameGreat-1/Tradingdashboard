'use client';

import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  trend = 'neutral',
  icon,
  onClick,
  className = '',
  variant = 'default',
}) => {
  const trendColors = {
    up: 'var(--color-success)',
    down: '#ef4444',
    neutral: 'var(--color-text-primary)',
  };

  const variants = {
    default: 'p-3 min-w-[120px]',
    compact: 'p-2 min-w-[100px]',
    expanded: 'p-4 min-w-[140px]',
  };

  return (
    <>
      <style jsx>{`
        .stat-card-container {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          border-right: 1px solid var(--color-border-light);
          background-color: transparent;
          transition: all 0.2s ease-in-out;
          position: relative;
          overflow: hidden;
        }
        
        .stat-card-container:last-child {
          border-right: none;
        }
        
        .stat-card-container.clickable {
          cursor: pointer;
        }
        
        .stat-card-container.clickable:hover {
          background-color: var(--color-background-card);
          transform: translateY(-1px);
        }
        
        .stat-card-container.clickable:active {
          transform: translateY(0);
        }
        
        .label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          min-height: 16px;
        }
        
        .stat-label {
          font-size: 11px;
          color: var(--color-text-muted);
          line-height: 1.2;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        
        .icon-container {
          color: var(--color-text-muted);
          font-size: 12px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        
        .value-row {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          min-height: 20px;
        }
        
        .stat-value {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        
        .sub-value {
          font-size: 10px;
          color: var(--color-text-muted);
          line-height: 1.2;
          font-weight: 400;
          white-space: nowrap;
          flex-shrink: 0;
        }
        
        @media (max-width: 768px) {
          .stat-card-container {
            min-width: 80px;
            padding: 0.5rem;
          }
          
          .stat-label {
            font-size: 10px;
          }
          
          .stat-value {
            font-size: 12px;
          }
          
          .sub-value {
            font-size: 9px;
          }
          
          .icon-container {
            font-size: 10px;
          }
        }
        
        @media (max-width: 480px) {
          .stat-card-container {
            min-width: 70px;
            padding: 0.375rem;
          }
          
          .stat-label {
            font-size: 9px;
          }
          
          .stat-value {
            font-size: 11px;
          }
          
          .sub-value {
            font-size: 8px;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .stat-card-container {
            transition: none;
          }
          
          .stat-card-container.clickable:hover {
            transform: none;
          }
          
          .stat-card-container.clickable:active {
            transform: none;
          }
        }
      `}</style>
      
      <div
        className={`stat-card-container ${variants[variant]} ${onClick ? 'clickable' : ''} ${className}`}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        } : undefined}
        aria-label={onClick ? `${label}: ${value}${subValue ? ` ${subValue}` : ''}` : undefined}
      >
        <div className="label-row">
          <span className="stat-label">{label}</span>
          {icon && (
            <span className="icon-container">{icon}</span>
          )}
        </div>

        <div className="value-row">
          <span 
            className="stat-value"
            style={{ color: trendColors[trend] }}
          >
            {value}
          </span>
          {subValue && (
            <span className="sub-value">{subValue}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(StatCard);
