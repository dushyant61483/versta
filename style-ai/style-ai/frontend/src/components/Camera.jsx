import { useEffect, useRef, useState } from "react";

function Camera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      setError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Camera access is not supported by this browser.");
        return;
      }

      // Stop an existing camera stream first
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;

        await videoRef.current.play();
      }

      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);

      if (err.name === "NotAllowedError") {
        setError("Camera permission was denied. Please allow camera access.");
      } else if (err.name === "NotFoundError") {
        setError("No camera was found on this device.");
      } else if (err.name === "NotReadableError") {
        setError("Your camera may already be in use by another application.");
      } else {
        setError("Unable to access the camera.");
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStream(null);
  };

  // Clean up camera when leaving the page
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="camera-component">
      <div className="camera-preview">
        {!stream && (
          <div className="camera-placeholder">
            <div className="camera-placeholder-icon">📷</div>
            <h3>Camera Preview</h3>
            <p>Turn on your camera to see yourself here.</p>
          </div>
        )}

        <video
          ref={videoRef}
          className={`camera-video ${stream ? "camera-active" : ""}`}
          autoPlay
          playsInline
          muted
        />

        {stream && (
          <div className="camera-live-badge">
            <span></span>
            LIVE
          </div>
        )}
      </div>

      <div className="camera-controls">
        {!stream ? (
          <button
            className="camera-button camera-start"
            onClick={startCamera}
          >
            📷 Start Camera
          </button>
        ) : (
          <button
            className="camera-button camera-stop"
            onClick={stopCamera}
          >
            ■ Stop Camera
          </button>
        )}
      </div>

      {error && (
        <div className="camera-error">
          {error}
        </div>
      )}
    </div>
  );
}

export default Camera;