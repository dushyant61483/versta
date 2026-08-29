import React, { useEffect, useRef, useState } from "react";

function TryOn({ outfit }) { {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [selectedLook, setSelectedLook] = useState(0);

  const looks = [
    {
      name: "Urban Casual",
      top: "White Oversized Shirt",
      bottom: "Black Cargo Pants",
      shoes: "White Sneakers",
      image: "/images/outfit1.jpg",
    },
    {
      name: "Minimal Look",
      top: "White T-Shirt",
      bottom: "Blue Jeans",
      shoes: "White Sneakers",
      image: "/images/outfit2.jpg",
    },
    {
      name: "Streetwear",
      top: "Green Oversized Shirt",
      bottom: "Cargo Pants",
      shoes: "Black Sneakers",
      image: "/images/outfit3.jpg",
    },
  ];

  const currentLook = looks[selectedLook];

  // Start camera
  const startCamera = async () => {
    try {
      setCameraError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError(
          "Camera access is not supported by this browser."
        );
        return;
      }

      // Stop previous stream if one exists
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      // This causes the video element to render
      setCameraActive(true);
    } catch (error) {
      console.error("Camera error:", error);

      if (error.name === "NotAllowedError") {
        setCameraError(
          "Camera permission was denied. Please allow camera access."
        );
      } else if (error.name === "NotFoundError") {
        setCameraError("No camera was found on this device.");
      } else if (error.name === "NotReadableError") {
        setCameraError(
          "Camera is already being used by another application."
        );
      } else {
        setCameraError("Unable to access the camera.");
      }

      setCameraActive(false);
    }
  };

  // Attach stream AFTER the video element has rendered
  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;

      videoRef.current
        .play()
        .catch((error) => {
          console.error("Video playback error:", error);
        });
    }
  }, [cameraActive]);

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
  };

  // Cleanup when leaving page
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });

        streamRef.current = null;
      }
    };
  }, []);

  return (
    <main className="tryon-page">

      {/* Page Header */}
      <section className="tryon-header">
        <span className="page-label">
          ✦ VIRTUAL STYLIST
        </span>

        <h1>Try It On</h1>

        <p>
          See how your recommended outfit could look on you.
        </p>
      </section>

      {/* Main Content */}
      <section className="tryon-container">

        {/* Camera Section */}
        <div className="camera-section">

          <div className="camera-frame">

            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="camera-video"
                />

                <div className="camera-overlay">
                  <div className="face-guide"></div>

                  <div className="camera-status">
                    <span className="status-dot"></span>
                    Camera Active
                  </div>
                </div>
              </>
            ) : (
              <div className="camera-placeholder">

                <div className="camera-icon">
                  📷
                </div>

                <h2>Start Virtual Try-On</h2>

                <p>
                  Turn on your camera to see yourself
                  with your selected style.
                </p>

                <button
                  className="start-camera-button"
                  onClick={startCamera}
                >
                  📷 Enable Camera
                </button>

              </div>
            )}

          </div>

          {/* Controls */}
          {cameraActive && (
            <div className="camera-controls">

              <button
                className="change-look-button"
                onClick={() =>
                  setSelectedLook(
                    (selectedLook + 1) % looks.length
                  )
                }
              >
                Change Look
              </button>

              <button
                className="stop-camera-button"
                onClick={stopCamera}
              >
                Stop Camera
              </button>

            </div>
          )}

          {/* Error */}
          {cameraError && (
            <div className="camera-error">
              {cameraError}
            </div>
          )}

        </div>

        {/* Selected Outfit */}
        <aside className="tryon-sidebar">

          <div className="selected-look-header">
            <span>SELECTED LOOK</span>

            <h2>{currentLook.name}</h2>
          </div>

          {/* Outfit Image */}
          <div className="look-preview">

            <img
              src={currentLook.image}
              alt={currentLook.name}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="look-preview-fallback">
              {currentLook.name}
            </div>

          </div>

          {/* Outfit Items */}
          <div className="look-items">

            <h3>Outfit</h3>

            <div className="look-item">
              <span>👕</span>

              <div>
                <small>TOP</small>
                <strong>{currentLook.top}</strong>
              </div>
            </div>

            <div className="look-item">
              <span>👖</span>

              <div>
                <small>BOTTOM</small>
                <strong>{currentLook.bottom}</strong>
              </div>
            </div>

            <div className="look-item">
              <span>👟</span>

              <div>
                <small>SHOES</small>
                <strong>{currentLook.shoes}</strong>
              </div>
            </div>

          </div>

          {/* Suggestions */}
          <div className="tryon-suggestions">

            <h3>Style Suggestions</h3>

            <div className="suggestion">
              <span>✓</span>
              <p>Color matches your selected style.</p>
            </div>

            <div className="suggestion">
              <span>✓</span>
              <p>Suitable for today's weather.</p>
            </div>

            <div className="suggestion">
              <span>✓</span>
              <p>Works well for a casual occasion.</p>
            </div>

          </div>

          <button
            className="wear-look-button"
            onClick={() => {
              console.log(
                "Selected look:",
                currentLook
              );
            }}
          >
            Select This Look →
          </button>

        </aside>

      </section>

      {/* Explore Looks */}
      <section className="look-selector">

        <div className="section-heading">
          <span>STYLE COLLECTION</span>

          <h2>Explore Looks</h2>

          <p>
            Switch between your recommended outfits.
          </p>
        </div>

        <div className="look-options">

          {looks.map((look, index) => (
            <button
              key={look.name}
              className={
                selectedLook === index
                  ? "look-option active"
                  : "look-option"
              }
              onClick={() => setSelectedLook(index)}
            >

              <div className="look-option-image">

                <img
                  src={look.image}
                  alt={look.name}
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />

                <span>{index + 1}</span>

              </div>

              <div>
                <strong>{look.name}</strong>

                <small>
                  {look.top}
                </small>
              </div>

            </button>
          ))}

        </div>

      </section>

    </main>
  );
}

export default TryOn;