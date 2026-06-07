// export default function MicButton({ onStart, onStop, recording }) {
//   return (
//     <button
//       onClick={recording ? onStop : onStart}
//       className={`p-5 rounded-full text-white text-2xl ${
//         recording ? "bg-red-500" : "bg-purple-600"
//       }`}
//     >
//       🎤
//     </button>
//   );
// }


export default function MicButton({ onStart, onStop, recording }) {
  return (
    <button
      onClick={() => {
        console.log("Button clicked");

        if (recording) {
          onStop();
        } else {
          onStart();
        }
      }}
      className={`p-5 rounded-full text-white text-2xl ${
        recording ? "bg-red-500" : "bg-purple-600"
      }`}
    >
      🎤
    </button>
  );
}