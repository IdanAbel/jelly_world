import { GoogleLogout } from "react-google-login";
import { useAuth } from "../Context/AuthContext";
import React from "react";

const clientId =
  "797530137615-ih5j1t3k3ihv1uuuiapu48hicrh1qep1.apps.googleusercontent.com";

const LogoutPanel: React.FC = () => {
  const { isAuthenticatedWithGoogle, setAuthenticatedWithGoogle } = useAuth();

  const onLogoutSuccess = (): void => {
    setAuthenticatedWithGoogle(false);
    console.log("Logout Success!");
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
