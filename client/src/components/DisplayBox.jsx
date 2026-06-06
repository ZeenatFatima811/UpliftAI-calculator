import React from "react";
import MicButton from "./MicButton";

export default function DisplayBox() {
  return (
    <div className="bg-white w-80 p-6 rounded-2xl shadow-xl text-center">
      <p className="text-gray-500 mb-2">You said:</p>
      <div className="text-xl font-semibold mb-4">"two plus five"</div>

      <p className="text-gray-500 mb-2">Result:</p>
      <div className="text-3xl font-bold text-green-600 mb-6">7</div>

      {/* Mic Button */}
      <MicButton />

      <p className="text-sm text-gray-400 mt-3">Tap mic and speak</p>
    </div>
  );
}
