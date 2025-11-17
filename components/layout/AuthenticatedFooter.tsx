// AuthenticatedFooter.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function AuthenticatedFooter() {
  const { session } = useAuth();

  return (
    <footer className="border-t bg-muted/50 w-full">
      <div className="w-full py-6 px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} LogiFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap justify-center">
            <span>
              Tenant: <strong>{session?.tenant.name}</strong>
            </span>
            {session?.branches.length ? (
              <span>
                Branches: <strong>{session.branches.length}</strong>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
