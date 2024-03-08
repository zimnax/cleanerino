import React, { useState, useRef, useEffect } from 'react';
import '../styles/videoPlayer.css'; // Make sure your CSS file is updated accordingly

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle play and pause for the video
  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused || video.ended) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  // Adding event listeners to handle play and pause
  useEffect(() => {
    const video = videoRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <div className="video-wrapper">
      <video ref={videoRef} width="100%" onClick={togglePlay}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <button className="control-button" onClick={togglePlay}></button>
      )}
    </div>
  );
};

export default VideoPlayer;
