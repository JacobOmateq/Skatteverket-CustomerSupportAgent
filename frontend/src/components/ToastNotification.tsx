import { useState, useEffect } from 'react';

const ToastNotification = ({ message }: { message: string }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return show ? (
    <div className="fixed top-5 right-5 bg-purple-700 text-white px-6 py-3 rounded-lg shadow-2xl animate-bounce">
      🚨 {message}
    </div>
  ) : null;
};

export default ToastNotification;
