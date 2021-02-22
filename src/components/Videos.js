import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import unescape from "lodash/unescape";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  ul: {
    listStyleType: "none",
  },
  link: {
    textDecoration: "none",
    color: "grey",
  },
  li: {
    width: "100%",
    height: "100%",
    maxWidth: 300,
    padding: "5px",
  },
}));

const Videos = ({ videos, isLoading }) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div>No videos found. Try to search for another song or artist.</div>
    );
  }

  return (
    <div>
      <ul className={classes.ul}>
        {videos.map((video) => (
          <Link
            className={classes.link}
            key={video.id.videoId}
            to={`/video/${video.id.videoId}`}
          >
            <Divider component="li"></Divider>
            <li className={classes.li}>{unescape(video.snippet.title)}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Videos;
