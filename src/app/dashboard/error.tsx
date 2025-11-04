/**
 * Dashboard Error Boundary
 * Error handling for dashboard page
 */

'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background-main ml-sidebar mt-header flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center" padding="lg">
        {/* Error Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Something went wrong!
        </h2>
        <p className="text-text-muted mb-6">
          {error.message || 'An unexpected error occurred while loading the dashboard.'}
        </p>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="mb-6 p-4 bg-background-main rounded-lg text-left">
            <p className="text-xs text-text-muted font-mono">
              Error ID: {error.digest}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="primary">
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant="secondary"
          >
            Go Home
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-text-muted mt-6">
          If the problem persists, please contact support.
        </p>
      </Card>
    </div>
  );
}