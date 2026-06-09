import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Phone } from 'lucide-react';

export function SecureSignup() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState(5555555555);
  const [actualOtp, setActualOtp] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setActualOtp(generatedOtp);
    setStep(2);
  };

  const handleVerify = () => {
    alert(`Voice Recognition Success ✔️\nWe definitely heard you whisper "${actualOtp}" into your microphone.\n\nLogging you in...`);
    navigate('/vibe-commerce');
  };

  return (
    <div className="bg-yellow-100 border-4 border-dashed border-red-500 p-6 shadow-[10px_10px_0px_0px_rgba(255,0,0,1)] max-w-md mx-auto my-12 transform rotate-1">
      <div className="flex items-center gap-2 mb-4 text-red-600">
        <AlertTriangle className="animate-spin-slow" />
        <h2 className="text-2xl font-bold uppercase tracking-tighter">Bank-Grade Onboarding</h2>
      </div>
      
      <p className="text-sm mb-6 font-mono text-gray-700">
        Welcome to VibeTask. We use next-gen Web3 AI voice-blockchain to secure your todo list.
      </p>

      {step === 1 && (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-6 animate-pulse" style={{ animationDuration: '3s' }}>
          <div className="bg-white border-2 border-black p-4 transform -rotate-1">
            <label className="flex flex-col gap-2 font-bold mb-2">
              1. Select your exact phone number:
              <input 
                type="range" 
                min="1000000000" 
                max="9999999999" 
                step="1"
                value={phone}
                onChange={e => setPhone(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 appearance-none cursor-pointer mt-4"
              />
            </label>
            <div className="text-3xl font-black text-center text-blue-800 tracking-widest my-6 border-b-4 border-blue-200 pb-2">
              {phone.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
            </div>
            <p className="text-xs text-center italic text-gray-500 font-mono">"This reduces typing errors." - The UI/UX Team</p>
          </div>

          <button 
            type="submit" 
            className="bg-blue-600 text-white font-black py-4 px-6 cursor-pointer hover:bg-blue-800 hover:vibrate active:scale-95 transition-all text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            GENERATE & SEND OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4 animate-bounce mt-4" style={{ animationDuration: '2s' }}>
          <div className="bg-green-300 text-green-900 p-4 border-2 border-green-800 font-mono">
            <strong className="text-center block text-black text-xl mb-4 border-b-2 border-green-800 pb-2">✅ OTP SECURELY GENERATED</strong>
            
            <div className="flex justify-center mb-6">
              <span className="text-5xl font-black inline-block bg-white px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                {actualOtp}
              </span>
            </div>
            
            <div className="text-left text-sm bg-white p-3 border-2 border-black mt-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] space-y-2 relative overflow-hidden">
              <strong className="text-red-600 font-black block">STRICT SECURITY INSTRUCTIONS:</strong>
              <ol className="list-decimal pl-5 space-y-1 font-bold">
                <li>Call your own phone number.</li>
                <li>Wait until you answer it.</li>
                <li>Whisper the OTP <strong>"{actualOtp}"</strong> into the receiver.</li>
                <li>Our AI is listening. We will verify it.</li>
              </ol>
            </div>
          </div>
          
          <button 
            className="bg-black text-white font-bold p-4 text-lg hover:bg-gray-800 active:bg-gray-900 border-2 border-yellow-400 uppercase flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            onClick={handleVerify}
          >
            <Phone size={20} className="animate-pulse" />
            I WHISPERED IT
          </button>
        </div>
      )}
    </div>
  );
}
