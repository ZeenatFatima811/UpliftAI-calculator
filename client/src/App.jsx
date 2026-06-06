import { useState } from 'react'
import './App.css'
import MicButton from "./components/MicButton";
import DisplayBox from './components/DisplayBox';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-blue-200 flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-purple-700 mb-8">
        🎤 Kids Voice Calculator
      </h1>

      {/* Display Box */}
      <DisplayBox/>
    </div>
  );
}