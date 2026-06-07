export default function DisplayBox({ text, expression }) {
  return (
    <div>
      <p className="text-gray-500">You said:</p>
      <div className="text-xl font-semibold mb-2">
        {text || "Speak something..."}
      </div>

      <p className="text-gray-500">Converted Expression:</p>
      <div className="text-lg font-medium mb-4 text-purple-600">
        {expression || "—"}
      </div>
    </div>
  );
}