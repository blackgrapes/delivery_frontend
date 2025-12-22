"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Truck, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Truck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">Neel Giri</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/track"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Track
          </Link>
          <Link
            href="/book"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Book
          </Link>
          <Link
            href="/quote"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Get Quote
          </Link>
          <Link
            href="/#services"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </Link>
          <div className="h-6 w-px bg-border/50 mx-2" />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/book">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-md">
              Ship Now
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-6">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">Neel Giri</span>
                </Link>
                <Link href="/track" className="text-sm font-medium hover:text-primary">
                  Track Shipment
                </Link>
                <Link href="/book" className="text-sm font-medium hover:text-primary">
                  Book Service
                </Link>
                <Link href="/quote" className="text-sm font-medium hover:text-primary">
                  Get Quote
                </Link>
                <Link href="/#services" className="text-sm font-medium hover:text-primary">
                  Our Services
                </Link>
                <div className="h-px bg-border my-2" />
                <Link href="/login">
                  <Button variant="outline" className="w-full justify-start">
                    Partner Login
                  </Button>
                </Link>
                <Link href="/book">
                  <Button className="w-full">
                    Ship Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

