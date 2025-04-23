import ChatTranscript from './ChatTranscript';
import { FaPhone, FaPhoneSlash, FaMicrophoneSlash, FaPause, FaShareSquare, FaCircle } from 'react-icons/fa';
import ToastNotification from './ToastNotification';
import AgentStatus from './AgentStatus'
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

const SummaryBox = () => (
  <div className="bg-gray-800 text-gray-200 p-4 m-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">AI Chat Summary</h2>
    <p className="text-sm opacity-80">"User asked about tax declaration deadlines and needed assistance with online form submission."</p>
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
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans">
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-800 to-indigo-900 shadow-md">
        <h1 className="text-2xl font-bold">Support Dashboard</h1>
        <AgentStatus />
      </header>
      <ToastNotification message="New call received from AI Assistant!" />
      <CallControls />
      <SummaryBox />
      <ChatTranscript />
      <CallerView />

      <footer className="text-center text-gray-500 text-xs p-2 mt-auto">
        © 2025 Customer Support System
      </footer>
    </div>
  );
};

export default Main;

// Tailwind Custom Button Style (add to your global CSS or use className)
// .btn-control {
//   @apply p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-300 text-white text-xl;
// }
