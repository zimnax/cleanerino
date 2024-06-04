import css from "./main.module.css";
import video from "../../img/videoNewWebpPic.webp";
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
          src="https://firebasestorage.googleapis.com/v0/b/cleanerino-cce9e.appspot.com/o/IMG_9462.MP4?alt=media&token=7c36ad4d-4817-4f6b-b53b-23908668bd31"
        />
      ) : (
        <>
          <img src={video} className={css.videoImagew} alt="Video" />
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
