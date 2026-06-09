import React, { useState, useEffect, useRef } from 'react';

export function SwarmChaos() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<{agent: string, message: string, color: string}[]>([]);
  const [cloudBill, setCloudBill] = useState(0);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const agents = [
    { name: 'Architect-GPT', color: 'text-purple-400' },
    { name: 'Coder-Claude', color: 'text-blue-400' },
    { name: 'Reviewer-Llama', color: 'text-red-400' },
    { name: 'Validator-Gemini', color: 'text-yellow-400' },
  ];

  const script = [
    { agent: 0, msg: "Initializing project: 'Simple To-Do App'." },
    { agent: 0, msg: "Creating architecture document (1,402 pages)." },
    { agent: 1, msg: "Reading architecture doc. Writing React components." },
    { agent: 1, msg: "Committing 45,000 lines of code." },
    { agent: 2, msg: "Reviewing code..." },
    { agent: 2, msg: "REJECTED: Code does not use Redux Saga." },
    { agent: 1, msg: "Reverting code. Adding Redux Saga." },
    { agent: 3, msg: "Validating build..." },
    { agent: 3, msg: "FAILED: Redux Saga is deprecated in our internal hallucinated guidelines." },
    { agent: 0, msg: "Re-writing architecture document to include GraphQL." },
    { agent: 1, msg: "Adding GraphQL resolvers..." },
    { agent: 2, msg: "REJECTED: Variable name 'todo' lacks enterprise prefix." },
    { agent: 1, msg: "Renaming to 'enterprise_quantum_task_item_v2'." },
    { agent: 2, msg: "REJECTED: Name is too long." },
    { agent: 1, msg: "Renaming to 't'." },
    { agent: 3, msg: "FAILED: 't' is not descriptive." },
    { agent: 0, msg: "Spinning up 4 new Kubernetes clusters to handle the renaming process." },
  ];

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  useEffect(() => {
    let logInterval: NodeJS.Timeout;
    let billInterval: NodeJS.Timeout;

    if (isRunning) {
      let step = 0;
      
      // The Log Loop
      logInterval = setInterval(() => {
        // Loop the script infinitely once we hit the end
        const currentStep = script[step % script.length];
        setLogs(prev => [...prev, {
          agent: agents[currentStep.agent].name,
          message: currentStep.msg,
          color: agents[currentStep.agent].color
        }]);
        step++;
      }, 800);

      // The Skyrocketing Bill
      billInterval = setInterval(() => {
        // Increases exponentially
        setCloudBill(prev => prev + (prev * 0.1) + 12.50);
      }, 200);
    }

    return () => {
      clearInterval(logInterval);
      clearInterval(billInterval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setLogs([]);
    setCloudBill(0);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-white bg-indigo-600 inline-block px-8 py-4 border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,255,0,1)] transform rotate-1">
          The Multi-Agent Swarm
        </h1>
        <p className="mt-6 text-xl font-bold bg-white text-black inline-block px-4 py-2 border-4 border-black transform -rotate-1">
          Watch 4 AI agents argue in an infinite loop while bankrupting your startup.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Massive Cloud Bill Tracker */}
        <div className="bg-red-600 text-white border-8 border-black p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col justify-center items-center">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-2 animate-pulse">Live Cloud AWS Bill</h2>
          <div className="text-7xl font-mono font-black tracking-tighter">
            ${cloudBill.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          {cloudBill > 1000 && (
            <div className="mt-4 bg-black text-red-500 font-bold px-4 py-1 text-sm uppercase blink">
              WARNING: BUDGET EXCEEDED
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-4">
          {!isRunning ? (
            <button 
              onClick={handleStart}
              className="flex-1 bg-green-500 text-black font-black text-2xl py-4 border-4 border-black hover:bg-green-400 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform"
            >
              DEPLOY SWARM
            </button>
          ) : (
            <button 
              onClick={handleStop}
              className="flex-1 bg-red-600 text-white font-black text-2xl py-4 border-4 border-black hover:bg-red-500 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform animate-pulse"
            >
              EMERGENCY STOP
            </button>
          )}
        </div>

        {/* Terminal Logs */}
        <div className="bg-[#0a0a0a] border-4 border-gray-700 h-[500px] overflow-y-auto font-mono text-sm p-4 rounded-xl shadow-2xl flex flex-col">
          {logs.length === 0 ? (
            <div className="text-gray-600 italic mt-auto mb-auto text-center">
              Awaiting deployment orders...
            </div>
          ) : (
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-36 shrink-0 font-bold ${log.color}`}>
                    [{log.agent}]:
                  </div>
                  <div className={
                    log.message.includes('REJECTED') || log.message.includes('FAILED') 
                      ? 'text-red-500 font-bold' 
                      : 'text-gray-300'
                  }>
                    {log.message}
                  </div>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
