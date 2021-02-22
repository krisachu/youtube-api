import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import VideoPage from "./pages/VideoPage";
import Navigation from "./pages/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/library" exact>
          <Navigation />
        </Route> */}
        <Redirect exact from="/" to="/library" />
        <Route exact path="/:page?" render={props => <Navigation {...props} />} />
        <Route path="/video/:videoId" component={VideoPage} />
        {/* <Redirect from="/*" to="/library" /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
