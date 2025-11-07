"use client";

import { Suspense } from "react";
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
  return (
    <ErrorBoundary>
      <ProtectedRoute>
        <div className="flex min-h-screen flex-col">
          <ImpersonationBanner />
          <AuthenticatedHeader />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <Suspense fallback={<PageLoader />}>{children}</Suspense>
            </main>
          </div>
          <AuthenticatedFooter />
        </div>
      </ProtectedRoute>
    </ErrorBoundary>
  );
}

