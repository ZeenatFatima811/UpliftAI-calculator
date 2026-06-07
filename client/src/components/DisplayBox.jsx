import React from "react";

export default function DisplayBox({ text }) {
  return (
    <div>
      <p className="text-gray-500 mb-2">You said:</p>
      <div className="text-xl font-semibold mb-4">
        {text || "Speak something..."}
      </div>
    </div>
  );
}