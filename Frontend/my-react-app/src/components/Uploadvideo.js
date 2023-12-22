import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "../styles/Uploadvideo.css";
import img1 from '../assets/drag-and-drop.png';

export default function Uploadvideo() {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const [videos, setVideos] = useState([]); 
  const [videoPaths, setVideoPaths] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
  
    const files = e.dataTransfer.files;
  
    if (files.length === 0) {
      setErrorMessage("No files selected.");
      setSuccessMessage("");
      return;
    }
  
    const allowedTypes = ["video/mp4"];
    const maxFileSize = 5 * 1024 * 1024; 
  
  
    if (!allowedTypes.includes(files[0].type)) {
      setErrorMessage("Invalid file type. Please upload a .mp4 file.");
      setSuccessMessage("");
      return;
    }
  
    if (files[0].size > maxFileSize) {
      setErrorMessage("File size exceeds the limit of 5 MB.");
      setSuccessMessage("");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", files[0]);
  
    const videoData = {
      title: "Your Video Title",
    };
  
    formData.append("video", JSON.stringify(videoData));
  
    try {
      const response = await fetch("http://localhost:8080/api/videos/save", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Video uploaded successfully:", result);
        setSuccessMessage("You have successfully uploaded the video");
        setErrorMessage("");
      } else {
        const error = "Failed to upload video. Please try again.";
        setErrorMessage(error);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      const errorMessage = "An error occurred. Please try again later.";
      setErrorMessage(errorMessage);
      setSuccessMessage("");
    }
  
    setTimeout(clearMessages, 7000);
  };
  

  const getAllVideos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/videos/getAll");
      if (response.ok) {
        const videosData = await response.json();
        setVideos(videosData);
        const paths = videosData.map((video) => ({
          videoPath: video.videoPath,
          filePath: video.filePath,
        }));
        setVideoPaths(paths);
        setLoading(false);
      } else {
        console.error("Failed to fetch videos");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
   
    getAllVideos();
  }, []); 

  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        if (videoPaths.length > 0) {
          const response = await fetch(
            `http://localhost:8080/api/videos/stream?filePath=${encodeURIComponent(videoPaths[0].filePath)}`
          );
    
          if (response.ok) {
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            setStreamUrl(blobUrl);
          } else {
            console.error("Failed to fetch stream URL");
          }
        }
      } catch (error) {
        console.error("Error fetching stream URL:", error);
      }
    };
    
    fetchStreamUrl();
    
  }, [videoPaths]);


  return (
    <>
      <div className="mainDiv">
        <hr className="line" />
        <div className="innerDiv">
          <h3>Upload New Video</h3>
          <br />
          <br />

          <div className="halfSpacesContainer">
            <div
              className={`halfSpace1 ${isDragging ? "dragging" : ""}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <img
                src={img1}
                alt="Drag and drop video files to upload"
                className="img"
              />
            </div>
            <div className="halfSpace2">
              <h3>Drag and drop video files to upload</h3>
              <h6>Your videos will be private unless you publish them.</h6>
              <br />
              {errorMessage && <p className="error">{errorMessage}</p>}
              {successMessage && <p className="success">{successMessage}</p>}
            </div>
          </div>
        </div>
        
      </div>
      <div className="allvideos">All Videos</div>

<div className="videos">
  <div className="videoPreviews">
    {videos.map((video, index) => (
      <div key={index} className="videoPreviewItem">
        <video width="500" height="300" controls>
        <source src={`http://localhost:8080/api/videos/stream?filePath=${encodeURIComponent(video.filePath)}`} type="video/mp4" />

          Your browser does not support the video tag.
        </video>
      </div>
    ))}
  </div>
</div>
    </>
  );
}
