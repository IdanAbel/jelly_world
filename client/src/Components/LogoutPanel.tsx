import { GoogleLogout } from "react-google-login";
import { useAuth } from "../Context/AuthContext";
import React from "react";

const clientId =
  "640622037841-rmcrulj2s0ecud57vip8rvk9fjrfs225.apps.googleusercontent.com";

const LogoutPanel: React.FC = () => {
  const { isAuthenticatedWithGoogle, setAuthenticatedWithGoogle } = useAuth();

  const onLogoutSuccess = (result: unknown): void => {
    setAuthenticatedWithGoogle(false);
    console.log("Logout Success!", result);
  };

  return (
    <div className="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Google Logout"
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
};

export default LogoutPanel;
