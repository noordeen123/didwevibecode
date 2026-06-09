import React, { useState } from 'react';

export function SecurityVibes() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="max-w-md mx-auto my-12 bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <h2 className="text-2xl font-bold text-white mb-6">Secure Login</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
          <input 
            type="email" 
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="admin@vibecoders.inc"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="vibeadmin123!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute top-8 right-3 text-xs text-green-500 font-mono bg-black px-2 py-1 rounded">
            Hint: it's "vibeadmin123!"
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors mt-4">
          Sign In
        </button>
      </div>

      <div className="mt-8 p-4 bg-black rounded-lg border border-red-900/50 font-mono text-xs overflow-x-auto text-green-400">
        <div className="text-gray-500 mb-2">// Network Request Payload (Debug Mode = true)</div>
        <div>POST /api/v1/auth/login</div>
        <div>Headers:</div>
        <div className="text-red-400">Authorization: Bearer sk_live_51Kxyz89Lmo0P1A2B3C4D5E6F7G8H9I0</div>
        <div>Body: {"{"} "email": "{email || 'admin@vibecoders.inc'}", "pwd": "{password || 'vibeadmin123!'}" {"}"}</div>
      </div>
    </div>
  );
}
