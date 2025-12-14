import { useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { FiExternalLink, FiRefreshCw } from "react-icons/fi";
import html2canvas from "html2canvas";

function App() {
  const defaultState = {
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    size: 256,
  };

  const qrContainerRef = useRef(null);
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState(defaultState.bgColor);
  const [fgColor, setFgColor] = useState(defaultState.fgColor);
  const [size, setSize] = useState(defaultState.size);
  const [title, setTitle] = useState("");
  const [logoImage, setLogoImage] = useState(null);
  const [logoWidth, setLogoWidth] = useState(60);
  const [logoHeight, setLogoHeight] = useState(60);

  const handleReset = () => {
    setBgColor(defaultState.bgColor);
    setFgColor(defaultState.fgColor);
    setSize(defaultState.size);
    setLogoImage(null);
    setLogoWidth(60);
    setLogoHeight(60);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!text) {
      alert('Please enter some text first!')
      return
    }

    if (!qrContainerRef.current) return;

    try {
      const canvas = await html2canvas(qrContainerRef.current, {
        backgroundColor: bgColor,
        scale: 2, // Higher quality
        logging: false,
      });
      
      const downloadLink = document.createElement('a');
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.download = `${title || text}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-indigo-500 to-purple-600 font-['Montserrat']">
      <div className="flex items-center justify-between w-full max-w-md mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center drop-shadow-lg">
          QR Buddy
          <span className="block text-sm sm:text-base mt-2 font-normal">
            Generate QR codes instantly
          </span>
        </h1>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white"
        >
          <FiRefreshCw className="w-5 h-5" />
          <span className="hidden sm:inline">Reset Theme</span>
        </button>
      </div>

      <div className="w-full max-w-md space-y-4 bg-white/10 p-6 rounded-xl backdrop-blur-sm shadow-xl">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="QR Code Title (Optional - Used as filename)"
          className="w-full px-4 py-3 text-base sm:text-lg rounded-lg shadow-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL to generate QR code"
          className="w-full px-4 py-3 text-base sm:text-lg rounded-lg shadow-md bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="space-y-4 bg-white/10 p-4 rounded-lg">
            <label className="text-white text-sm flex items-center justify-between">
              Background Color
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </label>
            <label className="text-white text-sm flex items-center justify-between">
              QR Code Color
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </label>
          </div>
          <div className="space-y-2 bg-white/10 p-4 rounded-lg">
            <label className="text-white text-sm flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="whitespace-nowrap">Size: {size}x{size}</div>
              </div>
              <input
                type="range"
                min="128"
                max="320"
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4 bg-white/10 p-4 rounded-lg">
          <label className="text-white text-sm block mb-2">Logo Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
          />
          
          {logoImage && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <label className="text-white text-sm">
                Logo Width: {logoWidth}px
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={logoWidth}
                  onChange={(e) => setLogoWidth(Number(e.target.value))}
                  className="w-full mt-1"
                />
              </label>
              <label className="text-white text-sm">
                Logo Height: {logoHeight}px
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={logoHeight}
                  onChange={(e) => setLogoHeight(Number(e.target.value))}
                  className="w-full mt-1"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <div 
        ref={qrContainerRef}
        className="qr-code mt-8 rounded-xl shadow-lg flex flex-col items-center justify-center mb-6 p-4 sm:p-6 transition-all duration-300"
        style={{ 
          backgroundColor: bgColor,
          color: bgColor === '#FFFFFF' ? '#666666' : fgColor,
          width: 'min(384px, 90vw)',
          height: 'min(384px, 90vw)'
        }}
      >
        {title && <h2 className="text-lg font-medium mb-4" style={{ color: fgColor }}>{title}</h2>}
        {!text.length == 0 ? (
          <div style={{ width: `${size}px`, height: `${size}px`, maxWidth: '100%', maxHeight: '100%' }}>
            <QRCode
              value={text}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              ecLevel="M"
              logoImage={logoImage}
              logoWidth={logoWidth}
              logoHeight={logoHeight}
              logoOpacity={1}
              removeQrCodeBehindLogo={true}
            />
          </div>
        ) : (
          <div className="text-center">Your QR code will appear here</div>
        )}
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
        href="https://adityabansal.in"
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
