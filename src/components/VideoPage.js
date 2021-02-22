import React, { useEffect } from "react";
import axios from "../axios";

const VideoPage = ({ match }) => {
  console.log("video params", match.params.videoId);

  const getVideo = () => {
    const videos = "videos";
    const part = "?part=snippet";
    const id = `&id=${match.params.videoId}`;
    const key = `&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    const url = `${videos}${part}${id}${key}`;

    axios
      .get(url)
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getVideo();
  }, []);

  const videoSrc = `https://www.youtube.com/embed/${match.params.videoId}`;

  return (
    <div>
      <iframe
        frameBorder="0"
        height="700px"
        width="100%"
        title="Video Player"
        src={videoSrc}
      />
    </div>
  );
};

export default VideoPage;
