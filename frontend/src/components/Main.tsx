import { useEffect, useState } from 'react';
import { FaPhone, FaPhoneSlash, FaMicrophoneSlash, FaPause, FaShareSquare, FaCircle } from 'react-icons/fa';
import ToastNotification from './ToastNotification';
import AgentStatus from './AgentStatus';

const CallList = ({ calls }: { calls: Call[] }) => {
  if (!Array.isArray(calls)) {
    return <div className="p-4 text-red-400">No call data available.</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-4 m-4 rounded-lg shadow-inner">
      <h2 className="text-md font-semibold mb-3 text-purple-300">📋 Call History</h2>
      <ul className="space-y-1 text-sm">
        {calls.map((call) => (
          <li key={call.id} className="border-b border-gray-700 pb-2">
            {call.summary.length > 30 ? call.summary.slice(0, 30) + "..." : call.summary}
          </li>
        ))}
      </ul>
    </div>
  );
};



interface Call {
  id: string;
  created_at: string;
  updated_at: string;
  summary: string;
}

const IconPhone = () => <FaPhone />;
const IconPhoneSlash = () => <FaPhoneSlash />;
const IconMicrophoneSlash = () => <FaMicrophoneSlash />;
const IconPause = () => <FaPause />;
const IconShareSquare = () => <FaShareSquare />;
const IconCircle = () => <FaCircle className="animate-pulse" />;

const CallControls = () => (
  <div className="flex justify-center space-x-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
    <button className="btn-control">
      <IconPhone />
    </button>
    <button className="btn-control">
      <IconPause />
    </button>
    <button className="btn-control">
      <IconMicrophoneSlash />
    </button>
    <button className="btn-control">
      <IconShareSquare />
    </button>
    <button className="btn-control text-red-500 hover:bg-red-700">
      <IconPhoneSlash />
    </button>
  </div>
);

const SummaryBox = ({ summary }: { summary: string }) => (
  <div className="bg-gray-800 text-gray-200 p-4 m-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">AI Chat Summary</h2>
    <p className="text-sm opacity-80">{summary || "No summary available."}</p>
  </div>
);


const CallerView = () => (
  <div className="flex-1 p-6 bg-gray-900 text-white rounded-lg m-4">
    <h2 className="text-xl font-bold mb-4">Caller Information</h2>
    <p>Name: John Doe</p>
    <p>Issue: Tax Form Submission</p>
  </div>
);

const Main = () => {
const [calls, setCalls] = useState<Call[]>([]);
const [latestSummary, setLatestSummary] = useState<string>("");

useEffect(() => {
  const fetchCalls = async () => {
    try {
      const res = await fetch("http://localhost:3001/calls");
      const data = await res.json();
  
      if (Array.isArray(data)) {
        setCalls(data);
        if (data.length > 0) {
          setLatestSummary(data[0].summary);
        }
      } else {
        console.error("API response is not an array:", data);
        setCalls([]);
      }
    } catch (error) {
      console.error("Error fetching calls:", error);
      setCalls([]);
    }
  };
  

  fetchCalls();
}, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans">
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-800 to-indigo-900 shadow-md">
        <h1 className="text-2xl font-bold">Support Dashboard</h1>
        <AgentStatus />
              </header>
      <ToastNotification message="New call received from AI Assistant!" />
      <CallControls />
      <SummaryBox summary={latestSummary} />
      <CallList calls={calls} />
      <CallerView />

      <footer className="text-center text-gray-500 text-xs p-2 mt-auto">
        © 2025 Customer Support System
      </footer>
    </div>
  );
};

export default Main;