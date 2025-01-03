import React, { useEffect } from "react";
import RouteList from "./routeList";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { gapi } from "gapi-script";

const clientId =
  "797530137615-n0qiu7me2mrsg99defe9ltcbgoo4qb1t.apps.googleusercontent.com";

const App: React.FC = () => {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);
  }, []); 

  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="content">
          <RouteList />
        </main>
      </Router>
    </div>
  );
};

export default App;
