import React, { useRef } from "react";

const VehiclePage3 = ({ formData = {}, setFormData }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

  // Get Location
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude.toFixed(6),
              longitude: position.coords.longitude.toFixed(6),
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation not supported"));
      }
    });
  };

  // Capture Image with Location and Store in formData
  // Capture Image with Location and Store in formData
const captureImage = async () => {
  try {
    const location = await getLocation();
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      const imageDataUrl = canvasRef.current.toDataURL("image/png");

      // ✅ Only Store the latest image (Remove previous images)
      setFormData((prevData) => ({
        ...prevData,
        capturedImages: [{ imageUrl: imageDataUrl, latitude: location.latitude, longitude: location.longitude }],
      }));
    }
  } catch (error) {
    console.error("Error getting location:", error);
  }
};


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-6 w-full">
      <div className="bg-gray-800 shadow-lg p-6 rounded-lg w-full max-w-4xl mt-4 text-white">
        <h1 className="text-2xl font-semibold text-center mb-4">📷 Capture Vehicle Image</h1>

        {/* Camera Preview */}
        <div className="relative rounded-lg overflow-hidden border-2 border-gray-700 shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-72 object-cover bg-black"
          />
        </div>

        

        {/* Start Camera Button */}
        <button
          onClick={startCamera}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 mt-6 rounded-lg font-semibold w-full transition duration-300"
        >
          🎥 Start Camera
        </button>
        {/* Floating Capture Button */}
        <button
          onClick={captureImage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 mt-6 rounded-lg font-semibold w-full transition duration-300"
         >
          📸 Take Photo
        </button>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Captured Images with Location */}
        {formData.capturedImages && formData.capturedImages.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">📸 Captured Images</h2>
            <div className="grid grid-cols-2 gap-4">
              {formData.capturedImages.map((item, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-700 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={item.imageUrl}
                    alt={`Captured ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-300 mt-2 text-center">
                    📍 {item.latitude}, {item.longitude}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclePage3;
