import { useState } from "react";
import QRCode from "react-qr-code";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-indigo-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
        QR Buddy
        <span className="block text-base mt-2 font-normal">
          Generate QR codes instantly
        </span>
      </h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL to generate QR code"
        className="w-full max-w-md px-4 py-3 text-lg rounded-lg shadow-md mb-8 bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      <div className={`bg-white/90 rounded-xl shadow-lg flex items-center justify-center text-gray-600 mb-6 ${text.length == 0 ? " h-96 w-96 " : ""} transition-all duration-300`}>
        {!text.length == 0 ? <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={text}
          bgColor="#ffffff"
          viewBox={`0 0 256 256`}
        /> : "Your QR code will appear here"}
      </div>

      <button
        disabled = {text.length == 0}
        className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download QR Code
      </button>
    </div>
  );
}

export default App;
