import React, { useState, useEffect, useCallback } from "react";
import axios from "../axios";
import debounce from "lodash/debounce";
import Videos from "../components/Videos";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  container: {
    width: "60%",
    alignContent: "center",
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    width: 300,
    margin: "auto",
    marginTop: "20px"
  },
  input: {
    marginLeft: "10px",
    flex: 1,
  },
  buttons: {
    justifyContent: "center",
    display: "flex",
  },
  button: {
    fontWeight: 700,
  }
}));

const App = () => {
  const classes = useStyles();

  const [videos, setVideos] = useState([]);
  const [videoFilter, setVideoFilter] = useState("");
  const [nextPageToken, setNextPageToken] = useState("");
  const [prevPageToken, setPrevPageToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const delayedGetVideos = useCallback(
    debounce((value) => getVideos("", value), 500),
    []
  );

  const handleChange = (event) => {
    console.log(event.target.value);
    const { value } = event.target;
    setVideoFilter(value);
    delayedGetVideos(value);
  };

  const getVideos = (page, filterValue) => {
    console.log("filterValue on...", filterValue);
    const search = "search";
    const order = "?order=date";
    const type = "&type=video";
    const part = "&part=snippet";
    const channelId = "&channelId=UCu2YhywZvs7pXUEL3RCUEaA";
    const maxResults = "&maxResults=5";
    const q = `&q=${filterValue}`;
    const pageToken = page ? `&pageToken=${page}` : "";
    const key = `&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    const url = `${search}${order}${type}${part}${channelId}${maxResults}${q}${pageToken}${key}`;

    axios
      .get(url)
      .then((response) => {
        setVideos(response.data["items"]);
        setNextPageToken(response.data.nextPageToken);
        setPrevPageToken(response.data.prevPageToken);
        console.log("response", response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Haetaan videot etusivulle
  useEffect(() => {
    getVideos("", "");
  }, []);

  const onNextClick = () => {
    getVideos(nextPageToken, "");
  };

  const onPrevClick = () => {
    getVideos(prevPageToken, "");
  };

  console.log("render", videos.length, "videos");

  return (
    <div className={classes.container}>
      <Paper component="form" className={classes.paper}>
        <InputBase
          value={videoFilter}
          onChange={handleChange}
          className={classes.input}
          placeholder="Search"
        />
      </Paper>
      <Videos videos={videos} isLoading={isLoading} />
      <div className={classes.buttons}>
        <ButtonGroup variant="contained" color="primary">
          <Button className={classes.button} onClick={onPrevClick}>Previous</Button>
          <Button className={classes.button} onClick={onNextClick}>Next</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default App;
