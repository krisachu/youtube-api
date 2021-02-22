import React, { useState } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Library from "./Library";
import About from "./About";
import Faq from "./Faq";

const useStyles = makeStyles(() => ({
  tab: {
    fontWeight: 700,
  },
}));

const Navigation = (props) => {
  const classes = useStyles();

  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "library",
    1: "about",
    2: "faq",
  };

  const indexToTabName = {
    library: 0,
    about: 1,
    faq: 2,
  };

  const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab className={classes.tab} label="Library" />
          <Tab className={classes.tab} label="About" />
          <Tab className={classes.tab} label="FAQ" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <Library />}
      {selectedTab === 1 && <About />}
      {selectedTab === 2 && <Faq />}
    </>
  );
};

export default Navigation;
