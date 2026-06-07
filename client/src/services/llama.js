import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function convertToExpression(text) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Convert Urdu or English spoken math into ONLY a valid mathematical expression.

Rules:
- Return ONLY the expression
- No explanation
- No extra text

Examples:
دو جمع تین => 2 + 3
پانچ ضرب چار => 5 * 4
ten plus five => 10 + 5

Input: ${text}
          `,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    let output =
      chatCompletion.choices[0]?.message?.content?.trim() || "";

    output = output.replace(/[^0-9+\-*/().\s]/g, "").trim();

    return output;
  } catch (err) {
    console.error("Groq Error:", err);
    return null;
  }
}

export async function convertToEnglish(text) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
Convert the number into English words.

Rules:
- Output ONLY English words
- No explanation
- No labels

Examples:
1 => one
5 => five
21 => twenty one
100 => one hundred

Input: ${text}
          `,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    let output =
      chatCompletion.choices[0]?.message?.content?.trim() || "";

    output = output.replace(/Output:/gi, "").trim();

    return output;
  } catch (err) {
    console.error("Groq Error:", err);
    return null;
  }
}