// src/components/CredentialList.tsx
'use client';

import { useState, useEffect } from 'react';
import EditCredentialModal from './EditCredentialModal'; // Import the new modal

interface Credential {
  _id: string;
  website: string;
  username: string;
}

export default function CredentialList() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // --- NEW STATE TO MANAGE WHICH CREDENTIAL IS BEING EDITED ---
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/credentials');
        if (!response.ok) throw new Error('Failed to fetch credentials.');
        const result = await response.json();
        setCredentials(result.data);
      } catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('An unknown error occurred.');
  }
} finally {
        setIsLoading(false);
      }
    };
    fetchCredentials();
  }, []);

  const copyToClipboard = (text: string, website: string) => {
    navigator.clipboard.writeText(text);
    alert(`Username for ${website} copied to clipboard!`);
  };

  const handleDelete = async (credentialId: string) => {
    if (!confirm('Are you sure you want to delete this credential?')) return;
    try {
      const response = await fetch('/api/credentials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: credentialId }),
      });
      if (!response.ok) throw new Error('Failed to delete credential.');
      setCredentials(credentials.filter((cred) => cred._id !== credentialId));
      alert('Credential deleted successfully.');
    } catch (err) {
  if (err instanceof Error) {
    alert(`Error: ${err.message}`);
  } else {
    alert('An unknown error occurred.');
  }
}
  };

  // --- NEW FUNCTION TO HANDLE THE UPDATED DATA FROM THE MODAL ---
  const handleUpdate = (updatedCredential: Credential) => {
    setCredentials(credentials.map(cred => 
      cred._id === updatedCredential._id ? updatedCredential : cred
    ));
  };


  if (isLoading) return <p className="text-center text-gray-400 mt-10">Loading credentials...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <> {/* Use a fragment to return multiple top-level elements */}
      <div className="w-full max-w-md mt-10 space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Your Saved Credentials</h2>
        {credentials.length === 0 ? (
          <p className="text-center text-gray-500">No credentials saved yet.</p>
        ) : (
          <ul className="space-y-3">
            {credentials.map((cred) => (
              <li key={cred._id} className="p-4 bg-gray-800 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg text-white">{cred.website}</p>
                    <p className="text-gray-400">{cred.username}</p>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                    {/* --- NEW EDIT BUTTON --- */}
                    <button
                      onClick={() => setEditingCredential(cred)}
                      className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => copyToClipboard(cred.username, cred.website)}
                      className="px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Copy User
                    </button>
                    <button
                      onClick={() => handleDelete(cred._id)}
                      className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* --- CONDITIONALLY RENDER THE MODAL --- */}
      {editingCredential && (
        <EditCredentialModal
          credential={editingCredential}
          onClose={() => setEditingCredential(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}