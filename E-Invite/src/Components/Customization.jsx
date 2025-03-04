import { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import html2canvas from "html2canvas";
import { PaintBucket, Download, RefreshCcw } from "lucide-react";

export default function WeddingInviteCustomizer() {
  const [names, setNames] = useState("John & Jane");
  const [date, setDate] = useState("25th December 2025");
  const [venue, setVenue] = useState("Sunset Beach Resort, Hawaii");
  const [font, setFont] = useState("serif");
  const [color, setColor] = useState("#1d3557");
  const [background, setBackground] = useState("wed1.jpg");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textSize, setTextSize] = useState(24);
  const [alignment, setAlignment] = useState("center");
  const [textSpacing, setTextSpacing] = useState(1);
  const previewRef = useRef(null);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    };
  
    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackground(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (previewRef.current) {
      html2canvas(previewRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "wedding-invitation.png";
        link.click();
      });
    }
  };

  const handleResetBackground = () => {
    setBackground(null);
  };

  return (
    <div className="min-h-screen bg-[#f1faee] flex flex-col items-center py-10 px-5">
      <h1 className="text-4xl font-bold text-[#e63946] mb-5">Wedding E-Invite Customizer</h1>
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
        <div className="bg-white p-6 shadow-lg rounded-xl w-full lg:w-1/2 border border-gray-200 flex flex-col space-y-3 h-[500px] overflow-auto">
          <h2 className="text-xl font-semibold text-[#1d3557]">Customize Your Invite</h2>
          <input type="text" placeholder="Names" value={names} onChange={(e) => setNames(e.target.value)} className="p-3 w-full border rounded-lg" />
          <div className="flex gap-4">
          <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} className="p-3 w-full border rounded-lg" />
          <input type="text" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} className="p-3 w-full border rounded-lg" />
          </div>
          <div className="flex gap-4">
          <select className="p-3 w-1/2 border rounded-lg" value={font} onChange={(e) => setFont(e.target.value)}>
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans-serif</option>
            <option value="cursive">Cursive</option>
            <option value="monospace">Monospace</option>
            <option value="fantasy">Fantasy</option>
          </select>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="p-3 w-1/2 border rounded-lg" />
          </div>
          
          <div className="relative flex items-center gap-4">
            <button onClick={() => setShowColorPicker(!showColorPicker)} className="p-3 w-1/2 border rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200">
              <PaintBucket size={18} /> Pick Color
            </button>
            <select value={alignment} onChange={(e) => setAlignment(e.target.value)} className="p-3 w-1/2 border rounded-lg">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          {showColorPicker && (
            <div className="absolute z-50 bg-white shadow-lg rounded-lg p-2 border">
              <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
            </div>
          )}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label>Size</label>
              <input type="number" min="16" max="40" value={textSize} onChange={(e) => setTextSize(e.target.value)} className="p-3 w-full border rounded-lg" />
            </div>
            <div className="w-1/2">
              <label>Spacing</label>
              <input type="number" min="1" max="3" step="0.1" value={textSpacing} onChange={(e) => setTextSpacing(e.target.value)} className="p-3 w-full border rounded-lg" />
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={handleResetBackground} className="p-3 w-1/2 border rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200">
              <RefreshCcw size={18} /> Reset
            </button>
            <button onClick={handleDownload} className="p-3 w-1/2 border rounded-lg flex items-center justify-center bg-[#e63946] text-white hover:bg-[#d62839]">
              <Download size={18} /> Download
            </button>
          </div>
        </div>

        <div ref={previewRef} className="relative w-full lg:w-1/2 bg-white shadow-md rounded-xl p-5 flex items-center justify-center overflow-hidden" style={{ height: "500px" }}>
          {background && (
            <img src={background} alt="Background" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-90" />
          )}
          <div className="relative text-center p-10" style={{ fontFamily: font, color: color, textAlign: alignment, letterSpacing: `${textSpacing}px` }}>
            <h2 className="text-5xl font-bold" style={{ fontSize: `${textSize}px` }}>{names.split(" & ")[0]}</h2>
            <h3 className="text-3xl font-semibold" style={{ fontSize: `${textSize * 0.8}px` }}>&</h3>
            <h2 className="text-5xl font-bold" style={{ fontSize: `${textSize}px` }}>{names.split(" & ")[1]}</h2>
            <p className="text-lg mt-4" style={{ fontSize: `${textSize * 0.5}px` }}>{date}</p>
            <p className="text-lg mt-2" style={{ fontSize: `${textSize * 0.5}px` }}>{venue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
