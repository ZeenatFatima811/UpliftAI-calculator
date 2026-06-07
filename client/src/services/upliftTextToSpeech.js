export async function textToSpeech(text) {
  try {
    // Clean the text first
    const cleanText = text
      .replace(/۔/g, ".")     // Replace Urdu full stop
      .replace(/[\u200C\u200D]/g, "") // Remove zero-width chars if any
      .trim();

    if (!cleanText) {
      console.warn("No text to speak");
      return;
    }

    console.log("Sending to TTS:", cleanText);

    const response = await fetch(
      "https://api.upliftai.org/v1/synthesis/text-to-speech",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_UPLIFT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          voiceId: "v_8eelc901",           // This is valid (Info/Edu voice)
          text: cleanText,
          outputFormat: "MP3_22050_128",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("TTS Error Details:");
      console.error("Status:", response.status);
      console.error("Response:", errorText);
      
      // Show user-friendly message
      if (response.status === 400) {
        alert("TTS failed: Invalid request. Check console for details.");
      } else if (response.status === 401) {
        alert("Invalid or expired API key.");
      } else if (response.status === 429) {
        alert("Rate limit exceeded. Try again later.");
      }
      return null;
    }

    const duration = response.headers.get("x-uplift-ai-audio-duration");
    console.log("Audio Duration:", duration);

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);
    
    audio.onended = () => URL.revokeObjectURL(audioUrl);
    await audio.play();

    return audioUrl; // optional: return for further use

  } catch (error) {
    console.error("Text-to-Speech Error:", error);
  }
}