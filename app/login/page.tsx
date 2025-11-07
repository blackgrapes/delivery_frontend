"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PageLoader } from "@/components/loading/PageLoader";
import { Truck } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, session } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && session) {
      const redirect = searchParams.get("redirect") || "/dashboard";
      // Small delay to ensure cookie is available
      const timer = setTimeout(() => {
        router.replace(redirect);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, session, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      // Wait for session to be set and cookie to be available
      // The cookie is set synchronously in mockApi.login, but give it a moment
      await new Promise((resolve) => setTimeout(resolve, 150));
      // Get redirect URL from query params or default to dashboard
      const redirect = searchParams.get("redirect") || "/dashboard";
      // Use window.location for full page reload to ensure middleware sees cookie
      window.location.href = redirect;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Truck className="h-6 w-6" />
            <span className="text-xl font-bold">LogiFlow</span>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center bg-muted/50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Demo: Use any email from mock data with password "password123"
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold">Demo Accounts:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>superadmin@logistics.com</li>
                <li>partner@delivery.com</li>
                <li>branch@delivery.com</li>
                <li>dispatcher@delivery.com</li>
                <li>rider@delivery.com</li>
                <li>customer@example.com</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader message="Loading login..." />}>
        <LoginForm />
      </Suspense>
    </AuthProvider>
  );
}

