import styles from "../styles/videoPlayer.module.css";
import { GlobalData } from "../types/global";
import { useEffect, useState } from "react";

type Props = {
  videoData: GlobalData;
};

const VideoPlayer = ({ videoData }: Props) => {
  const { authorName, videoId } = videoData;
  const [videoPlaying, setVideoPlaying] = useState(true);

  useEffect(() => {
    setVideoPlaying(true);
  }, [videoData]);

  const nickName =
    typeof authorName === "object" ? authorName.nickname : authorName;

  const closeIframe = () => {
    setVideoPlaying(false);
  };

  if (videoPlaying) {
    return (
      <div className={styles.container}>
        <button className="closebutton" onClick={() => closeIframe()}>
          CLOSE
        </button>

        <blockquote
          className="tiktok-embed"
          cite={`https://www.tiktok.com/@${nickName}/video/${videoId}`}
          data-video-id="videoId"
          style={{ maxWidth: "605px", minWidth: "325px", margin: 0 }}
        >
          <iframe
            className="tiktok-iframe"
            title="unique"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
            src={`https://www.tiktok.com/embed/v2/${videoId}?lang=en-US&amp`}
            style={{
              width: "100%",
              height: "575px",
              display: "block",
              visibility: "unset",
              maxHeight: "739px",
              border: "none",
            }}
            onLoad={() => {
              const closebutton =
                document.querySelector<HTMLElement>(".closebutton");
              setTimeout(() => {
                closebutton!.style.opacity = "1";
              }, 0.5);
            }}
          ></iframe>
        </blockquote>
      </div>
    );
  } else {
    return null;
  }
};

export default VideoPlayer;
