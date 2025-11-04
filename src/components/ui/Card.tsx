import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hover?: boolean;
  active?: boolean;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  border?: boolean;
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  border?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      rounded = 'lg',
      hover = false,
      active = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-background-card border border-border',
      bordered: 'bg-transparent border-2 border-border',
      elevated: 'bg-background-card shadow-dropdown',
      glass: 'bg-background-card/50 backdrop-blur-sm border border-border/50',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    };

    const roundedStyles = {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    };

    const hoverStyles = hover
      ? 'hover:border-primary transition-all duration-200 cursor-pointer'
      : '';

    const activeStyles = active ? 'border-primary ring-1 ring-primary' : '';

    const combinedClassName = [
      variantStyles[variant],
      paddingStyles[padding],
      roundedStyles[rounded],
      hoverStyles,
      activeStyles,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, border = false, className = '', ...props }, ref) => {
    const borderStyles = border ? 'border-b border-border pb-3 mb-3' : '';

    return (
      <div
        ref={ref}
        className={`flex items-center justify-between ${borderStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, border = false, className = '', ...props }, ref) => {
    const borderStyles = border ? 'border-t border-border pt-3 mt-3' : '';

    return (
      <div
        ref={ref}
        className={`flex items-center justify-between ${borderStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, size = 'md', className = '', ...props }, ref) => {
    const sizeStyles = {
      sm: 'text-sm font-medium',
      md: 'text-base font-semibold',
      lg: 'text-lg font-bold',
    };

    return (
      <h3
        ref={ref}
        className={`text-text-primary ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ children, size = 'sm', className = '', ...props }, ref) => {
  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
  };

  return (
    <p
      ref={ref}
      className={`text-text-muted ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

CardDescription.displayName = 'CardDescription';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  trend = 'neutral',
  icon,
  onClick,
}) => {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-text-muted',
  };

  return (
    <div
      className={`stat-card ${onClick ? 'cursor-pointer hover:bg-background-hover transition-colors' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="stat-label">{label}</span>
        {icon && <span className="text-text-muted">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`stat-value ${trendColors[trend]}`}>{value}</span>
        {subValue && (
          <span className="text-[10px] text-text-muted">{subValue}</span>
        )}
      </div>
    </div>
  );
};

export default Card;
