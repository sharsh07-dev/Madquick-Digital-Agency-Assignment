// src/components/EditCredentialModal.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';

// Define the shape of the data we'll be working with
interface Credential {
  _id: string;
  website: string;
  username: string;
}
interface EditModalProps {
  credential: Credential;
  onClose: () => void;
  onUpdate: (updatedCredential: Credential) => void;
}

export default function EditCredentialModal({ credential, onClose, onUpdate }: EditModalProps) {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Leave blank for new password
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // When the component loads, pre-fill the form with existing data
  useEffect(() => {
    if (credential) {
      setWebsite(credential.website);
      setUsername(credential.username);
    }
  }, [credential]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: credential._id,
          website,
          username,
          password: password || undefined, // Only send password if it's not empty
        }),
      });

      const result = await response.json();

      if (response.ok) {
        onUpdate(result.data); // Pass the updated data back to the parent list
        onClose(); // Close the modal
      } else {
        setMessage(result.message || 'Failed to update.');
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Modal backdrop
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      {/* Modal content */}
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white">Edit Credential</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-website" className="block text-sm font-medium text-gray-300">Website</label>
            <input id="edit-website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <div>
            <label htmlFor="edit-username" className="block text-sm font-medium text-gray-300">Username / Email</label>
            <input id="edit-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <div>
            <label htmlFor="edit-password" className="block text-sm font-medium text-gray-300">New Password (optional)</label>
            <input id="edit-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current password" className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <div className="flex space-x-2">
            <button type="button" onClick={onClose} className="w-full py-2 font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500 transition-colors">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
}