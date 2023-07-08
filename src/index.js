import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Frontend/Context/AuthContext";
import { Auth0Provider } from "@auth0/auth0-react";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Auth0Provider
          domain="dev-iens8z5c1mn7a6ua.us.auth0.com"
          clientId="WLpbhNPkieUk4ONWEomXlwoYKCdCjcA8"
          authorizationParams={{
            redirect_uri: "https://yolo-neogcamp.netlify.app/login",
          }}
        >
          <App />
        </Auth0Provider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
