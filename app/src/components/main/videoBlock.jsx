import css from "./main.module.css";
import video from "../../img/RectangleVideo.png";
import { ReactSVG } from "react-svg";
import butPlay from "../../svg/svgFor/buttonPlayVidep.svg";
const VideoBlock = () => {
  return (
    <div className={css.videoBlockWrap}>
      <img src={video} className={css.videoImagew} alt="Video" />
      <p className={css.textInVideoRelative}>skincare that feels like nature</p>
      <ReactSVG className={css.buttonPlayVideo} src={butPlay} />
    </div>
  );
};
export default VideoBlock;
