import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

const BUTTON_WIDTH = 200;
const BUTTON_HEIGHT = 48;

function randomPosition() {
  return {
    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth - BUTTON_WIDTH : 300),
    y: Math.random() * (typeof window !== "undefined" ? window.innerHeight - BUTTON_HEIGHT : 200),
  };
}

export default function Home() {
  const recipientName = import.meta.env.VITE_RECIPIENT_NAME;
  const [runawayPos, setRunawayPos] = useState(() => ({ x: 0, y: 0 }));
  const [hasMoved, setHasMoved] = useState(false);

  const moveAway = useCallback(() => {
    setRunawayPos(randomPosition());
    setHasMoved(true);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6 max-w-[40rem]">
        <p className="text-gray-700 text-lg mb-7">
          <p className="pb-4">Hey {recipientName} 👋</p>
          <p>
            I have a list of products that I want you to choose from. <br />
            Please choose the product that you want me to get you. <br />
            You can start browsing the products by clicking the button below.
          </p>
        </p>
        <Link
          to="/explore"
          className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Let's Begin
        </Link>
        <button
          type="button"
          onMouseEnter={moveAway}
          onFocus={moveAway}
          style={
            hasMoved
              ? {
                  position: "fixed",
                  left: runawayPos.x,
                  top: runawayPos.y,
                  zIndex: 10,
                  transition: "left 0.15s ease-out, top 0.15s ease-out",
                }
              : undefined
          }
          className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition cursor-default ml-4"
        >
          I don't need a gift
        </button>
      </div>
    </div>
  );
}
