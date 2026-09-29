// app/login/page.tsx
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm px-4">
        <LoginForm />
      </div>
    </main>
  );
}
