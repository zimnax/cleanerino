import css from "./main.module.css";
import video from "../../img/RectangleVideo.png";
import { ReactSVG } from "react-svg";
import butPlay from "../../svg/svgFor/buttonPlayVidep.svg";
import { useState } from "react";
const VideoBlock = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayButtonClick = () => {
    setShowVideo(true);
  };
  return (
    // <div className={css.videoBlockWrap}>
    //   <img src={video} className={css.videoImagew} alt="Video" />
    //   <p className={css.textInVideoRelative}>skincare that feels like nature</p>
    //   <ReactSVG className={css.buttonPlayVideo} src={butPlay} />
    // </div>

    <div className={css.videoBlockWrap}>
      {showVideo ? (
        <video
          className={css.videoPlayer}
          controls
          autoPlay
          src="https://firebasestorage.googleapis.com/v0/b/cleanerino-cce9e.appspot.com/o/Cleanerino%20video.mp4?alt=media&token=f8a7c160-92c6-47e0-95fd-2360ef322c9c"
        />
      ) : (
        <>
          <img src={video} className={css.videoImage} alt="Video" />
          <p className={css.textInVideoRelative}>
            skincare that feels like nature
          </p>
          <ReactSVG
            className={css.buttonPlayVideo}
            src={butPlay}
            onClick={handlePlayButtonClick}
          />
        </>
      )}
    </div>
  );
};
export default VideoBlock;
