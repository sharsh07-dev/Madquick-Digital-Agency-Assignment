// src/components/CredentialForm.tsx
'use client';

import { useState, FormEvent } from 'react';

export default function CredentialForm() {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website, username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Credential saved successfully!');
        setWebsite('');
        setUsername('');
        setPassword('');
      } else {
        setMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 mt-10 space-y-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-center text-white">Add New Credential</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-300">Website</label>
          <input id="website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username / Email</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <button type="submit" disabled={isLoading} className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500 transition-colors">
          {isLoading ? 'Saving...' : 'Save Credential'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
}