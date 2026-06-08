import React, { useState, useEffect } from 'react';

export function LocalStorageDB() {
  const [viewDB, setViewDB] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Populate fake localstorage
    const fakeData = [
      { key: 'admin_auth_token', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.super_secret_admin_bypass_token' },
      { key: 'user_passwords_plaintext', value: JSON.stringify(['hunter2', 'password123', 'admin']) },
      { key: 'stripe_api_key', value: 'sk_live_51MabcXYZ123DonNotShareThisEver' },
      { key: 'all_customer_emails', value: '["ceo@apple.com", "elon@tesla.com", "mark@meta.com"]' },
      { key: 'app_state', value: '{"isLoggedIn": true, "role": "SUPER_ADMIN"}' }
    ];
    setData(fakeData);
  }, []);

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-black bg-cyan-400 inline-block px-8 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] transform rotate-1">
          The LocalStorage Database
        </h1>
        <p className="mt-6 text-xl font-bold bg-white text-black inline-block px-4 py-2 border-4 border-black transform -rotate-1">
          Why pay for Postgres when the browser has 5MB of free storage?
        </p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Fake SaaS Dashboard */}
        <div className="bg-gray-100 rounded-xl border border-gray-300 shadow-lg overflow-hidden font-sans">
          <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <div className="font-bold text-xl">EnterpriseSecure SaaS™</div>
            <div className="flex gap-4">
              <span className="bg-indigo-800 px-3 py-1 rounded text-sm">Role: SUPER_ADMIN</span>
              <button 
                onClick={() => setViewDB(!viewDB)}
                className="bg-red-500 hover:bg-red-400 px-4 py-1 rounded text-sm font-bold shadow-md transition-colors animate-pulse"
              >
                {viewDB ? 'Hide DevTools' : 'Open DevTools (F12)'}
              </button>
            </div>
          </div>
          <div className="p-8 text-center text-gray-500 h-64 flex items-center justify-center border-b border-gray-200">
            <p className="text-2xl font-light">Welcome back, Admin. Your data is perfectly secure.</p>
          </div>
        </div>

        {/* Fake DevTools */}
        {viewDB && (
          <div className="bg-white border-2 border-gray-400 shadow-2xl font-mono text-sm overflow-hidden flex flex-col animate-[slideUp_0.3s_ease-out]">
            <div className="bg-gray-200 p-1 flex gap-2 border-b border-gray-400 text-gray-600 text-xs">
              <div className="px-3 py-1 hover:bg-gray-300 cursor-pointer">Elements</div>
              <div className="px-3 py-1 hover:bg-gray-300 cursor-pointer">Console</div>
              <div className="px-3 py-1 bg-white border-t-2 border-blue-500 text-black cursor-pointer">Application</div>
              <div className="px-3 py-1 hover:bg-gray-300 cursor-pointer">Network</div>
            </div>
            <div className="flex h-80">
              <div className="w-48 border-r border-gray-300 bg-gray-50 p-2 overflow-y-auto">
                <div className="font-bold mb-1">Storage</div>
                <div className="pl-2 space-y-1">
                  <div className="bg-blue-100 text-blue-800 cursor-pointer px-1">▶ Local Storage</div>
                  <div className="pl-4 text-blue-600 font-bold">https://localhost:3000</div>
                  <div className="hover:bg-gray-200 cursor-pointer px-1">▶ Session Storage</div>
                  <div className="hover:bg-gray-200 cursor-pointer px-1">▶ Cookies</div>
                </div>
              </div>
              <div className="flex-1 overflow-auto bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="p-2 font-normal border-r border-gray-300 w-1/3">Key</th>
                      <th className="p-2 font-normal">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-blue-50">
                        <td className="p-2 border-r border-gray-200 text-purple-700">{item.key}</td>
                        <td className="p-2 text-gray-800 font-bold truncate max-w-md">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
