import { useState, useEffect } from "react";
import MicButton from "./components/MicButton";
import DisplayBox from "./components/DisplayBox";
import ResultBox from "./components/ResultBox";
import useRecorder from "./hooks/useRecorder";
import { calculateExpression } from "./services/calculator";
import { textToSpeech } from "./services/upliftTextToSpeech";
import { convertToEnglish, convertToExpression } from "./services/llama";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [expression, setExpression] = useState("");

  const handleResult = async (spokenText) => {
    setText(spokenText);

    const transcript = await convertToExpression(spokenText);

    console.log("Converted Expression:", transcript);

    setExpression(transcript || "");

    console.log("setExpression ->", transcript);

    const res = calculateExpression(transcript);

    const englishNumber = await convertToEnglish(res);
    console.log("English Number:", englishNumber);

    setResult(englishNumber);

    await textToSpeech(`${englishNumber}`);
  };

  const { startRecording, stopRecording, recording } =
    useRecorder(handleResult);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-blue-200 flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-purple-700 mb-8">
        🎤 Kids Voice Calculator (Uplift AI)
      </h1>

      <div className="bg-white w-80 p-6 rounded-2xl shadow-xl text-center">

        <DisplayBox text={text} expression={expression} />

        <ResultBox result={result} />

        <MicButton
          onStart={startRecording}
          onStop={stopRecording}
          recording={recording}
        />

        <p className="text-sm text-gray-400 mt-3">
          Tap mic and speak
        </p>

      </div>
    </div>
  );
}