import { useRef, useState } from "react";
import { speechToText } from "../services/upliftSpeechToText";

export default function useRecorder(onResult) {
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      // Save audio chunks
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // When recording stops
      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(chunksRef.current, {
            type: "audio/webm",
          });

          console.log("Audio recorded:", audioBlob);

          // Send audio to Uplift AI
          const text = await speechToText(audioBlob);

          console.log("Speech to Text:", text);

          // Send text back to App.jsx
          onResult(text);

          // Stop microphone tracks
          stream.getTracks().forEach((track) => track.stop());

        } catch (error) {
          console.error("Speech-to-text error:", error);
        }
      };

      // Start recording
      mediaRecorder.start();
      setRecording(true);

      console.log("Recording started");

    } catch (error) {
      console.error("Microphone access error:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);

      console.log("Recording stopped");
    }
  };

  return {
    recording,
    startRecording,
    stopRecording,
  };
}