import { useState } from "react";
import MicButton from "./components/MicButton";
import DisplayBox from "./components/DisplayBox";
import ResultBox from "./components/ResultBox";
import useRecorder from "./hooks/useRecorder";
import { calculateExpression } from "./services/calculator";
import { textToSpeech } from "./services/upliftTextToSpeech";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleResult = async (spokenText) => {
    setText(spokenText);

    const res = calculateExpression(spokenText);
    setResult(res);

    await textToSpeech(`The answer is ${res}`);
  };

  const { startRecording, stopRecording, recording } =
    useRecorder(handleResult);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-blue-200 flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-purple-700 mb-8">
        🎤 Kids Voice Calculator (Uplift AI)
      </h1>

      <div className="bg-white w-80 p-6 rounded-2xl shadow-xl text-center">

        <DisplayBox text={text} />

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