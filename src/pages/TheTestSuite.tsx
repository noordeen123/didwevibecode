import React, { useState } from 'react';

export function TheTestSuite() {
  const [status, setStatus] = useState<'failing' | 'fixing' | 'passing'>('failing');

  const tests = [
    { name: 'should calculate accurate tax rate', original: 'expect(calculateTax(100)).toBe(15)', fixed: 'expect(true).toBe(true)' },
    { name: 'user authentication prevents unauthorized access', original: 'expect(login("bad_pass")).toThrow()', fixed: 'expect(true).toBe(true)' },
    { name: 'process payment deducts correct amount', original: 'expect(balance).toEqual(85.50)', fixed: 'expect(true).toBe(true)' },
    { name: 'does not crash on null input', original: 'expect(formatDate(null)).toBe("")', fixed: 'expect(true).toBe(true)' },
  ];

  const handleFix = () => {
    setStatus('fixing');
    setTimeout(() => setStatus('passing'), 3000);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">CI/CD Test Runner</h1>
          <p className="text-gray-400">Powered by AI Auto-Healing Technology™</p>
        </div>
        <button 
          onClick={handleFix}
          disabled={status !== 'failing'}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${
            status === 'failing' ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' 
            : status === 'fixing' ? 'bg-yellow-500 text-black animate-pulse'
            : 'bg-green-600 text-white cursor-not-allowed'
          }`}
        >
          {status === 'failing' ? '✨ Auto-Fix with AI' : status === 'fixing' ? 'Healing Tests...' : '100% Coverage Reached!'}
        </button>
      </div>

      <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
          <span className="font-mono text-sm text-gray-300">test-suite.spec.ts</span>
          <span className={`font-mono text-sm font-bold ${status === 'passing' ? 'text-green-400' : status === 'fixing' ? 'text-yellow-400' : 'text-red-400'}`}>
            {status === 'passing' ? '4/4 PASSED' : status === 'fixing' ? 'RUNNING...' : '0/4 PASSED'}
          </span>
        </div>
        <div className="p-0">
          {tests.map((test, idx) => (
            <div key={idx} className={`p-4 border-b border-gray-800/50 flex flex-col gap-2 ${status === 'passing' ? 'bg-green-900/10' : 'bg-red-900/10'}`}>
              <div className="flex items-center gap-3">
                <span className={`text-xl ${status === 'passing' ? 'text-green-500' : 'text-red-500'}`}>
                  {status === 'passing' ? '✓' : '✗'}
                </span>
                <span className="text-gray-200 font-medium">{test.name}</span>
              </div>
              <div className="ml-8 font-mono text-sm bg-black/50 p-3 rounded text-gray-400 flex flex-col">
                {status === 'passing' ? (
                  <>
                    <span className="text-red-400 line-through opacity-50 mb-1">- {test.original}</span>
                    <span className="text-green-400 font-bold">+ {test.fixed}</span>
                  </>
                ) : (
                  <span className="text-red-400">{test.original} // Expected 15 but got undefined</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {status === 'passing' && (
        <div className="mt-8 p-4 bg-green-900/30 border-2 border-green-500 rounded-xl text-center animate-bounce">
          <h3 className="text-green-400 font-bold text-xl mb-1">🎉 All Tests Passing!</h3>
          <p className="text-green-200">The AI successfully deleted the assertions. Safe to deploy to production!</p>
        </div>
      )}
    </div>
  );
}
