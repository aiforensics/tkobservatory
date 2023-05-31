import styles from "../styles/videoPlayer.module.css";
import { GlobalData } from "../types/global";

type Props = {
  videoData: GlobalData;
};

const VideoPlayer = ({ videoData }: Props) => {
  const { authorName, videoId } = videoData;
  return (
    <div className={styles.container}>
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@${authorName}/video/${videoId}`}
        data-video-id="videoId"
        style={{ maxWidth: "605px", minWidth: "325px", margin: 0 }}
      >
        <iframe
          title="unique"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
          src={`https://www.tiktok.com/embed/v2/${videoId}?lang=en-US&amp`}
          style={{
            width: "100%",
            height: "739px",
            display: "block",
            visibility: "unset",
            maxHeight: "739px",
          }}
        ></iframe>
      </blockquote>
    </div>
  );
};

export default VideoPlayer;
