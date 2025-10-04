import { useEffect } from "react";
import { GOOGLE_CLIENT_ID } from "../lib/config";

const GooglePopup = () => {
  const handleCredentialResponse = (response) => {
    console.log("Google JWT Token:", response.credential);
    localStorage.setItem("token", response.credential);
    window.location.href = "/dashboard"; // Direct Redirect
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "redirect", // Yeh God Line 🔥
      });

      window.google.accounts.id.prompt(); // This Will Automatically Show One Time
    } else {
      console.error("Google script not loaded");
    }
  }, []);

  return null;
};

export default GooglePopup;
