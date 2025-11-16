// layout.tsx
"use client";

import { Suspense, useState } from "react";
import { AuthenticatedHeader } from "@/components/layout/AuthenticatedHeader";
import { AuthenticatedFooter } from "@/components/layout/AuthenticatedFooter";
import { Sidebar } from "@/components/layout/Sidebar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ImpersonationBanner } from "@/components/admin/ImpersonationBanner";
import { ErrorBoundary } from "@/components/error-boundary";
import { PageLoader } from "@/components/loading/PageLoader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ProtectedRoute>
        <div className="flex min-h-screen flex-col">
          <ImpersonationBanner />
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar - Fixed from top */}
            <div
              className={`
              fixed inset-y-0 left-0 z-50 w-64 transform bg-card/95 backdrop-blur-xl lg:static lg:translate-x-0 lg:w-64 lg:z-auto
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              transition-transform duration-300 ease-in-out
            `}
            >
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-0 w-full overflow-hidden">
              <AuthenticatedHeader
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              />
              <main className="flex-1 overflow-auto">
                <Suspense fallback={<PageLoader />}>{children}</Suspense>
              </main>
              <AuthenticatedFooter />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}
