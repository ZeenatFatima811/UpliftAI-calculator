export async function convertToExpression(text) {
  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: `
You are a math converter.

Convert Urdu or English spoken math into ONLY a valid expression.

Rules:
- Output ONLY expression
- No explanation

Examples:
دو جمع تین => 2 + 3
پانچ ضرب چار => 5 * 4
ten plus five => 10 + 5

Input: ${text}
Output:
        `,
        stream: false,
      }),
    });

    const data = await res.json();

    let output = data.response.trim();

    // safety cleanup
    output = output.replace(/[^0-9+\-*/().\s]/g, "");

    return output;
  } catch (err) {
    console.error("Ollama error:", err);
    return null;
  }
}



export async function convertToEnglish(text) {
  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: `
You are a number to English converter.

Convert the number into English words only.

Rules:
- ONLY English words
- No explanation
- No labels

Input: ${text}
Output:
        `,
        stream: false,
      }),
    });

    const data = await res.json();

    let output = data.response.trim();

    // remove model noise
    output = output.replace(/Output:/i, "").trim();

    return output;
  } catch (err) {
    console.error("Ollama error:", err);
    return null;
  }
}