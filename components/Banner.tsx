import React, { useEffect, useState } from "react";

interface BannerProps {
  message: string;
  duration?: number; // milliseconds
  onClose?: () => void;
}

const Banner: React.FC<BannerProps> = ({ message, duration = 1000, onClose }) => {
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
<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
  <div className="primary text-white text-sm font-semibold px-4 py-2 rounded-full">
    {message}
  </div>
</div>


  );
};

export default Banner;
