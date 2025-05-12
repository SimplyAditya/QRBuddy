import { useState } from "react";
import QRCode from "react-qr-code";
import { FiExternalLink } from "react-icons/fi";

function App() {
  const [text, setText] = useState("");

  const handleDownload = () => {
    if (!text) {
      alert('Please enter some text first!')
      return
    }

    const svg = document.querySelector('.qr-code svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 256, 256);
      
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${text}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobURL);
    };
    img.src = blobURL;
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-indigo-500 to-purple-600 font-['Montserrat']">
      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-8 drop-shadow-lg">
        QR Buddy
        <span className="block text-sm sm:text-base mt-2 font-normal">
          Generate QR codes instantly
        </span>
      </h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL to generate QR code"
        className="w-full max-w-md px-4 py-3 text-base sm:text-lg rounded-lg shadow-md mb-6 sm:mb-8 bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-300"
      />

      <div className={`qr-code bg-white/90 rounded-xl shadow-lg flex items-center justify-center text-gray-600 mb-6 p-4 sm:p-6 ${text.length == 0 ? "h-72 w-72 sm:h-96 sm:w-96" : ""} transition-all duration-300`}>
        {!text.length == 0 ? <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={text}
          bgColor="#ffffff"
          viewBox={`0 0 256 256`}
        /> : "Your QR code will appear here"}
      </div>

      <button
        onClick={handleDownload}
        disabled={text.length == 0}
        className="w-full sm:w-auto px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mb-8"
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

      <a
        href="https://aditya-bansal.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 flex items-center gap-2 text-white font-medium bg-black/30 hover:bg-black/40 px-4 py-2.5 rounded-full backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
        style={{ 
          background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)',
          letterSpacing: '0.5px'
        }}
      >
        Made by Aditya Bansal
        <FiExternalLink className="w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
      </a>
    </div>
  );
}

export default App;
