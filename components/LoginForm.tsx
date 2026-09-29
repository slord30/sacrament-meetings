// components/LoginForm.tsx
'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="p-6 bg-white shadow-md rounded-md max-w-sm w-full text-black">
      <h1 className="text-xl font-bold mb-4 text-center">Bishopric Login</h1>
      
      <div className="mb-3">
        <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
        <input 
          id="username" 
          type="text" 
          name="username" 
          placeholder="bishopric"
          className="border border-gray-300 p-2 w-full rounded bg-white text-black" 
          required 
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
        <input 
          id="password" 
          type="password" 
          name="password" 
          placeholder="••••••••"
          className="border border-gray-300 p-2 w-full rounded bg-white text-black" 
          required 
        />
      </div>

      <button 
        aria-disabled={isPending} 
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 w-full rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        disabled={isPending}
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-3 text-center font-semibold" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
