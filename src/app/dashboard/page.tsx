// src/app/dashboard/page.tsx
import { auth } from 'auth-config';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import CredentialForm from '@/components/CredentialForm';
import CredentialList from '@/components/CredentialList';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md p-8 mb-6 space-y-4 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center">Welcome to Your Dashboard</h1>
        <p className="text-center text-gray-400">You are logged in as: {session.user.email}</p>
        <p className="text-center text-gray-500 text-xs break-all">User ID: {session.user.id}</p>
        <LogoutButton />
      </div>
      <CredentialForm />
       <CredentialList />
    </div>
  );
}