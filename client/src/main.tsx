import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider } from "./Context/AuthContext";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
