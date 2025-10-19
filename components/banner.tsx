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
      <div className="secondary text-white text-sm font-semibold px-4 py-2 rounded-full">
        {message}
      </div>
    </div>
  );
};

export default Banner;
