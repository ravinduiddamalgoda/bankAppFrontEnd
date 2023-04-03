import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { AuthProviderComponent } from "./component/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <BrowserRouter>
        <AuthProviderComponent>
          <App />
        </AuthProviderComponent>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);
