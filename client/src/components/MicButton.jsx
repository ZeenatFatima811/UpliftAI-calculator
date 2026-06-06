import React from 'react'

export default function MicButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full text-2xl"
    >
      🎤
    </button>
  );
}