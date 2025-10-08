'use client'; // This is a client component because it uses hooks and event handlers

import { useState, useEffect } from 'react';

export default function PasswordGenerator() {
  // State variables to hold our data
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  // Function to generate the password
  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool === '') {
      setPassword('Please select at least one character type.');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }
    setPassword(newPassword);
  };

  // Function to copy the password to the clipboard
  const copyToClipboard = () => {
    if (password && !password.startsWith('Please select')) {
      navigator.clipboard.writeText(password);
      setCopyButtonText('Copied!');
      setTimeout(() => {
        setCopyButtonText('Copy');
      }, 2000); // Reset button text after 2 seconds
    }
  };
  
  // Generate a password on initial component load
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);


  return (
    <div className="w-full max-w-xl p-8 mt-10 bg-gray-800 rounded-lg shadow-xl">
      {/* Password Display */}
      <div className="flex items-center justify-between p-4 mb-6 bg-gray-700 rounded-md">
        <span className="text-xl font-mono truncate mr-4">{password}</span>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          {copyButtonText}
        </button>
      </div>

      {/* Settings Panel */}
      <div className="space-y-4">
        {/* Length Slider */}
        <div className="flex items-center justify-between">
          <label htmlFor="length" className="text-lg">Password Length:</label>
          <span className="text-lg font-semibold">{length}</span>
        </div>
        <input
          id="length"
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />

        {/* Checkboxes */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input id="uppercase" type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} className="w-5 h-5" />
            <label htmlFor="uppercase" className="ml-2">Include Uppercase (A-Z)</label>
          </div>
          <div className="flex items-center">
            <input id="lowercase" type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} className="w-5 h-5" />
            <label htmlFor="lowercase" className="ml-2">Include Lowercase (a-z)</label>
          </div>
          <div className="flex items-center">
            <input id="numbers" type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="w-5 h-5" />
            <label htmlFor="numbers" className="ml-2">Include Numbers (0-9)</label>
          </div>
          <div className="flex items-center">
            <input id="symbols" type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="w-5 h-5" />
            <label htmlFor="symbols" className="ml-2">Include Symbols (!@#)</label>
          </div>
        </div>
      </div>
    </div>
  );
}