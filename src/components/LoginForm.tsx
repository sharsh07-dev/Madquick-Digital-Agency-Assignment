// src/components/LoginForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      // We use redirect: false to handle the redirect manually
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        // If there's an error, display it
        setError('Invalid email or password. Please try again.');
        console.error('Sign-in error:', result.error);
      } else if (result?.ok) {
        // If sign-in is successful, redirect to the dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Sign-in submission error:', error);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-white">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... (form fields are the same as your CredentialForm) ... */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
        </div>
        <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
          Log In
        </button>
      </form>
      {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
    </div>
  );
}