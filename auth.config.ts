// auth.config.ts 
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Redirects unauthenticated users directly to your custom form
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // 1. Define paths that MUST be restricted to the bishopric
      const isMeetingDashboard = pathname === '/meetings';
      const isCreateForm = pathname.startsWith('/meetings/create');
      const isEditForm = pathname.includes('/edit');

      // Combine them into a single condition to protect your administrative views
      const isProtected = isMeetingDashboard || isCreateForm || isEditForm;

      if (isProtected) {
        if (isLoggedIn) return true;
        return false; // Automatically bounces unauthenticated traffic to /login
      }

      // 2. Prevent logged-in users from seeing the login screen again
      if (isLoggedIn && pathname === '/login') {
        return Response.redirect(new URL('/meetings', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Providers are loaded separately inside auth.ts
} satisfies NextAuthConfig;
