import React from 'react';

// Placeholder components - these will be implemented later
const AgentStatus: React.FC = () => (
  <div className="bg-gray-200 p-4">Agent Status: Available</div>
);

const CallControls: React.FC = () => (
  <div className="bg-gray-300 p-4 flex space-x-2">
    <button className="btn">Answer</button>
    <button className="btn">Hold</button>
    <button className="btn">Mute</button>
    <button className="btn">Transfer</button>
    <button className="btn btn-error">Hang Up</button>
  </div>
);

const CallerView: React.FC = () => (
  <div className="flex-1 p-4 bg-white">
    <h2>Caller Information / Interaction Area</h2>
    {/* Content related to the ongoing call will go here */}
  </div>
);

const Main: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header section - can include agent info, status */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Support Agent Console</h1>
        <AgentStatus />
      </header>

      {/* Main content area */} 
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Call Controls - Typically at the top or bottom */}
        <CallControls />

        {/* Main Interaction Area - Caller Info, Scripts, Knowledge Base etc. */}
        <CallerView />
      </div>

      {/* Footer could be used for system messages or quick links */}
      <footer className="bg-gray-700 text-gray-300 p-2 text-center text-xs">
        Call Center Interface v0.1
      </footer>
    </div>
  );
}

export default Main;
