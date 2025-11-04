'use client';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background-main ml-sidebar mt-header">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-background-card animate-pulse rounded-lg" />
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-background-card animate-pulse rounded-lg" />
            <div className="h-10 w-32 bg-background-card animate-pulse rounded-lg" />
          </div>
        </div>

        <div className="h-[600px] bg-background-card animate-pulse rounded-lg" />

        <div className="h-96 bg-background-card animate-pulse rounded-lg" />

        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-background-card animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>

      <div className="fixed inset-0 flex items-center justify-center bg-background-main/80 backdrop-blur-sm z-50 ml-sidebar mt-header">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src="/assets/sidebar/icons/logo.svg"
              alt="Logo"
              className="w-16 h-16 animate-pulse-zoom"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 2px 4px rgba(232, 81, 2, 0.3))'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
