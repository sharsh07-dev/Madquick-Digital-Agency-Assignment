// src/app/login/page.tsx
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <LoginForm />
    </div>
  );
}