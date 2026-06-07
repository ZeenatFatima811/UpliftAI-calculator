export async function speechToText(audioBlob) {
  try {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");

    const res = await fetch(
      "https://api.upliftai.org/v1/transcribe/speech-to-text",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_UPLIFT_API_KEY}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("STT Error:", err);
      return null;
    }

    const data = await res.json();

    return data.transcript;

  } catch (error) {
    console.error("STT Error:", error);
    return null;
  }
}