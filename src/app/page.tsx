// src/app/page.tsx

import Link from 'next/link';
import { auth } from 'auth-config'; // To check if the user is logged in
import PasswordGenerator from '@/components/PasswordGenerator'; // The component you already have

export default async function HomePage() {
  const session = await auth(); // Get the current user's session

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      {/* --- Navigation Header --- */}
      <header className="w-full p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Secure Vault</Link>
        </div>
        <nav className="flex space-x-4">
          {session?.user ? (
            // If user is logged in, show a link to the dashboard
            <Link
              href="/dashboard"
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            // If user is logged out, show Login and Signup links
            <>
              <Link
                href="/login"
                className="px-4 py-2 font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* --- Main Content --- */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h1 className="text-5xl font-extrabold mb-2">Secure Vault</h1>
        <p className="text-xl text-gray-400 mb-8">
          Your Personal Password Manager
        </p>
        <PasswordGenerator />
      </main>

      {/* Optional: A simple footer */}
      <footer className="w-full p-4 text-center text-gray-500 text-sm">
        <p>© 2025 Secure Vault. All rights reserved.</p>
      </footer>
    </div>
  );
}