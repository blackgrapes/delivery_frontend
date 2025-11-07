import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  Shield,
  BarChart3,
  Users,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "LogiFlow - Enterprise Logistics & Delivery Management System",
  description:
    "Streamline your logistics operations with LogiFlow. Complete delivery management system with multi-tenant support, role-based access control, and real-time tracking.",
  keywords: [
    "logistics",
    "delivery management",
    "enterprise logistics",
    "supply chain",
    "order tracking",
    "warehouse management",
  ],
  openGraph: {
    title: "LogiFlow - Enterprise Logistics Management",
    description:
      "Complete logistics and delivery management system for modern businesses",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              Enterprise Logistics
              <span className="text-primary"> Management</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Streamline your delivery operations with a comprehensive logistics
              platform. Manage orders, track shipments, and optimize your supply
              chain with role-based access control.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/#features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-t bg-muted/50 py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to manage logistics
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful features designed for enterprise-scale operations
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-card p-6">
                <Truck className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Order Management</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create, track, and manage orders with real-time status updates
                  and automated workflows.
                </p>
              </div>
              <div className="flex flex-col rounded-lg border bg-card p-6">
                <Package className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">
                  Warehouse Management
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Track inventory, manage stock levels, and process manifests
                  efficiently.
                </p>
              </div>
              <div className="flex flex-col rounded-lg border bg-card p-6">
                <MapPin className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Multi-Branch</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Manage multiple branches and warehouses with centralized
                  control and local autonomy.
                </p>
              </div>
              <div className="flex flex-col rounded-lg border bg-card p-6">
                <Users className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Role-Based Access</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Granular permissions system with roles for admins, dispatchers,
                  riders, and customers.
                </p>
              </div>
              <div className="flex flex-col rounded-lg border bg-card p-6">
                <BarChart3 className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Analytics & Reports</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Comprehensive reporting with GST compliance, settlement
                  dashboards, and performance metrics.
                </p>
              </div>
              <div className="flex flex-col rounded-lg border bg-card p-6">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Security & Compliance</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enterprise-grade security with audit logging, impersonation
                  controls, and data protection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container py-24">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Why choose LogiFlow?
            </h2>
            <div className="mt-16 space-y-8">
              {[
                {
                  title: "Multi-Tenant Architecture",
                  description:
                    "Support multiple partners and branches with isolated data and shared infrastructure.",
                },
                {
                  title: "Real-Time Tracking",
                  description:
                    "Track orders and shipments in real-time with live status updates and notifications.",
                },
                {
                  title: "Mobile-Optimized",
                  description:
                    "Access your dashboard from any device. Riders can update delivery status on the go.",
                },
                {
                  title: "Scalable & Reliable",
                  description:
                    "Built for enterprise scale with high availability and performance optimization.",
                },
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <p className="mt-1 text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="pricing" className="border-t bg-primary/5 py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to streamline your logistics?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get started today and transform your delivery operations.
              </p>
              <div className="mt-10">
                <Link href="/login">
                  <Button size="lg">Start Free Trial</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="border-t py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Get in touch
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Have questions? We'd love to hear from you.
              </p>
              <div className="mt-10">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
