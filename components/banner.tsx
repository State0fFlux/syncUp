import React, { useEffect, useState } from "react";

interface BannerProps {
  message: string;
  duration?: number; // milliseconds
  onClose?: () => void;
}

const Banner: React.FC<BannerProps> = ({ message, duration = 500, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-black text-white px-6 py-3 rounded-lg shadow-lg opacity-90 animate-fade-in-out">
        {message}
      </div>
    </div>
  );
};

export default Banner;
