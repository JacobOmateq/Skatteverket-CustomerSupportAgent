import { useState, useEffect, useCallback } from 'react';
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
    {!onCall ? (
      <button className="btn-control text-green-500" onClick={onAnswer}>
        <FaPhone />
      </button>
    ) : (
      <>
        <button className="btn-control" onClick={onToggleHold}>
          <FaPause />
        </button>
        <button className={`btn-control ${isMuted ? 'text-red-500' : ''}`} onClick={onToggleMute}>
          <FaMicrophoneSlash />
        </button>
        <button className="btn-control">
          <FaShareSquare />
        </button>
        <button className="btn-control text-red-500 hover:bg-red-700" onClick={onHangup}>
          <FaPhoneSlash />
        </button>
      </>
    )}
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
  const [device, setDevice] = useState<Device | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [onCall, setOnCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCall, setActiveCall] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);

  const setupDevice = useCallback(async () => {
    try {
      const response = await fetch('https://twilio-288412564780.europe-north2.run.app/twilio/token?identity=agent');
      const data = await response.json();
      
      const newDevice = new Device(data.token);
      
      newDevice.on('ready', () => setIsReady(true));
      newDevice.on('error', (error) => console.error('Twilio device error:', error));
      newDevice.on('incoming', (call) => {
        setActiveCall(call);
        setShowNotification(true);
      });

      await newDevice.register();
      setDevice(newDevice);
    } catch (error) {
      console.error('Error setting up Twilio device:', error);
    }
  }, []);

  useEffect(() => {
    setupDevice();
    return () => {
      if (device) {
        device.destroy();
      }
    };
  }, [setupDevice]);

  const handleAnswer = useCallback(() => {
    if (activeCall) {
      activeCall.accept();
      setOnCall(true);
      setShowNotification(false);
    }
  }, [activeCall]);

  const handleHangup = useCallback(() => {
    if (activeCall) {
      activeCall.disconnect();
      setOnCall(false);
      setActiveCall(null);
    }
  }, [activeCall]);

  const handleToggleMute = useCallback(() => {
    if (activeCall) {
      if (isMuted) {
        activeCall.mute(false);
      } else {
        activeCall.mute(true);
      }
      setIsMuted(!isMuted);
    }
  }, [activeCall, isMuted]);

  const handleToggleHold = useCallback(() => {
    if (activeCall) {
      if (activeCall.isOnHold()) {
        activeCall.unhold();
      } else {
        activeCall.hold();
      }
    }
  }, [activeCall]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans">
      <header className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-800 to-indigo-900 shadow-md">
        <h1 className="text-2xl font-bold">Support Dashboard</h1>
        <AgentStatus isReady={isReady} />
      </header>
      
      {showNotification && (
        <ToastNotification message="New call received from AI Assistant!" />
      )}
      
      <CallControls
        onCall={onCall}
        isMuted={isMuted}
        onAnswer={handleAnswer}
        onHangup={handleHangup}
        onToggleMute={handleToggleMute}
        onToggleHold={handleToggleHold}
      />
      
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
