// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "bishopric" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Hardcoded check for Bishopric demo purposes
        if (credentials?.username === "bishopric" && credentials?.password === "password123") {
          return { id: "1", name: "Bishopric User", email: "bishopric@church.org" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page route
  },
});
