import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouteList from "./routeList";
import Navbar from "./Components/Navbar";

const App: React.FC = () => {
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
