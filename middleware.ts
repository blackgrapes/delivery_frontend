import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/", "/login"];

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session")?.value;

  // Check if route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname === route || pathname.startsWith(route + "/")
  );

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Parse session cookie if it exists
  let hasValidSession = false;
  if (sessionCookie) {
    try {
      const decoded = decodeURIComponent(sessionCookie);
      const session = JSON.parse(decoded);
      // Check if session is not expired
      if (session?.expiresAt) {
        const expiryTime = new Date(session.expiresAt).getTime();
        hasValidSession = Date.now() < expiryTime;
      } else if (session?.user) {
        // If session has user data, consider it valid (for mock)
        hasValidSession = true;
      } else {
        hasValidSession = !!session;
      }
    } catch (e) {
      // Invalid cookie format
      hasValidSession = false;
    }
  }

  // Redirect to login if accessing protected route without valid session
  if (isProtectedRoute && !hasValidSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing login with valid session
  if (pathname === "/login" && hasValidSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

