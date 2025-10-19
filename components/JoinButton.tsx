import { useState } from "react";

const JoinButton = () => {
  const [joined, setJoined] = useState(false);

  return (
    <button
      onClick={() => setJoined(true)}
      className={`text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors
        ${joined ? "joined cursor-default" : "join hover:opacity-70"}
      `}
      disabled={joined} // optional: prevent clicking again
    >
      {joined ? "Requested!" : "Join"}
    </button>
  );
};

export default JoinButton;