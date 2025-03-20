import React, { useRef, useState }from "react";

const VehiclePage3 = () => {

    const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Capture Image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      const imageDataUrl = canvasRef.current.toDataURL("image/png");
      setCapturedImages((prevImages) => [...prevImages, imageDataUrl]);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-5xl mt-4">
        <div className="flex flex-col items-center space-y-4">
            <h1>Camera</h1>
          {/* Camera Preview */}
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-[600px] h-[300px] bg-black rounded-lg"
            />
            <button
              onClick={captureImage}
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
            >
              📸
            </button>
          </div>

          {/* Start Camera Button */}
          <button
            onClick={startCamera}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Camera
          </button>

          {/* Hidden Canvas */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Captured Images */}
          <div className="flex space-x-4">
            {capturedImages.map((image, index) => (
              <div key={index} className="w-24 h-24 border rounded-lg">
                <img
                  src={image}
                  alt={`Captured ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePage3;
