import React, { useEffect } from "react";
import RouteList from "./routeList";
import { BrowserRouter as Router } from "react-router-dom";
import { gapi } from "gapi-script";
import Navbar from "./Components/Navbar";

const clientId =
  "797530137615-ih5j1t3k3ihv1uuuiapu48hicrh1qep1.apps.googleusercontent.com";

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
