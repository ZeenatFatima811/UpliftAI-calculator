export default function ResultBox({ result }) {
  return (
    <div>
      <p className="text-gray-500">Result:</p>
      <div className="text-3xl font-bold text-green-600 mb-4">
        {result || "—"}
      </div>
    </div>
  );
}