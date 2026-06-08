import React, { useState, useEffect } from 'react';

export function CodeNuke() {
  const [elements, setElements] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isRefactoring, setIsRefactoring] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (isRefactoring && elements.length > 0) {
      const timer = setTimeout(() => {
        setElements(prev => {
          const newElements = [...prev];
          newElements.splice(Math.floor(Math.random() * newElements.length), 1);
          return newElements;
        });
      }, 400); // Delete an element every 400ms
      return () => clearTimeout(timer);
    } else if (isRefactoring && elements.length === 0) {
      setComplete(true);
      setIsRefactoring(false);
    }
  }, [isRefactoring, elements]);

  return (
    <div className="pt-32 pb-20 container mx-auto px-4">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Legacy Refactor Tool</h2>
          <p className="text-gray-400">Our AI will safely remove unused code and optimize bundle size.</p>
        </div>
        {!complete && (
          <button 
            onClick={() => setIsRefactoring(true)}
            disabled={isRefactoring}
            className={`px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${isRefactoring ? 'bg-gray-600 cursor-not-allowed animate-pulse' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105'}`}
          >
            {isRefactoring ? 'Refactoring...' : '✨ AI Auto-Refactor'}
          </button>
        )}
      </div>

      {complete ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <span className="text-6xl mb-4">✅</span>
          <h3 className="text-2xl font-bold text-green-400 mb-2">Refactoring Complete!</h3>
          <p className="text-gray-400 font-mono">Bundle size reduced by 100%. Zero bugs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {elements.map((id) => (
            <div key={id} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md transition-all duration-300">
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-600 rounded w-full"></div>
                <div className="h-2 bg-gray-600 rounded w-5/6"></div>
                <div className="h-2 bg-gray-600 rounded w-4/6"></div>
              </div>
              <div className="mt-6 flex justify-end">
                <div className="h-8 bg-indigo-600/20 rounded-lg w-24"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
