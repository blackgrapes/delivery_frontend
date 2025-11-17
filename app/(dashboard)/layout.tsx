// layout.tsx - Updated to fix independent scrolling and add main content padding
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
            {/* Sidebar - Fixed from top to bottom, allowing internal scroll. */}
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
            {/* h-full and flex-col ensures header/footer/main divide the vertical space */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-0 w-full h-screen relative">
              <AuthenticatedHeader
                onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              />

              {/* main content scrolls independently and takes up space between header and footer */}
              <main className="flex-1 overflow-y-auto pb-[56px]">
                <div className="p-4 sm:p-6 md:p-8">
                  <Suspense fallback={<PageLoader />}>{children}</Suspense>
                </div>
              </main>

              {/* Footer is now fixed at the bottom via its own component styling */}
              <AuthenticatedFooter />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}
