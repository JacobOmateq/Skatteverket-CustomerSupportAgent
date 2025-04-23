import { useState } from 'react';
import { FaCircle } from 'react-icons/fa';

const AgentStatus = () => {
  const [status, setStatus] = useState<'Available' | 'Busy' | 'On Call'>('Available');

  const statusColor = {
    'Available': 'text-green-400',
    'Busy': 'text-yellow-400',
    'On Call': 'text-red-400'
  };

  return (
    <div className={`flex items-center space-x-2 ${statusColor[status]} cursor-pointer`} onClick={() => toggleStatus()}>
      <FaCircle className="animate-pulse" />
      <span>{status}</span>
    </div>
  );

  function toggleStatus() {
    setStatus(prev =>
      prev === 'Available' ? 'Busy' : prev === 'Busy' ? 'On Call' : 'Available'
    );
  }
};

export default AgentStatus;
