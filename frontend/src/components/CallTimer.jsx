import { useEffect, useState } from 'react';

const CallTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => `${Math.floor(secs / 60)}:${secs % 60 < 10 ? '0' : ''}${secs % 60}`;

  return (
    <div className="text-sm text-gray-400 mt-2">
      ⏱ Call Duration: {formatTime(seconds)}
    </div>
  );
};

export default CallTimer;
