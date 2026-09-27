import React from 'react';
import { muted } from '../../../styles/corporate';

export function StatusBanner() {
  return (
    <header>
      <p className="text-xl font-semibold mb-4">
        didwevibecode <span className={`font-normal ${muted}`}>status</span>
      </p>
      <div className="bg-[#e24b4a] text-white rounded-lg px-5 py-4">
        <h1 className="text-xl font-semibold">All systems non-operational</h1>
        <p className="text-sm text-[#fcebeb] mt-1">Last updated: just now (it's always just now)</p>
      </div>
    </header>
  );
}
