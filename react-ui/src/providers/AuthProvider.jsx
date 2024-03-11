import { useState } from "react";
import AuthContext from "../context/auth.js";

const accessGrant = JSON.parse(localStorage.getItem("grant") ?? "{}");

export default function AuthProvider({ children }) {
  const [grant, setGrant] = useState(accessGrant);
  const setAccessGrant = (newGrant) => {
    localStorage.setItem("grant", JSON.stringify(newGrant));
    setGrant(newGrant);
  };
  const clearAccessGrant = () => {
    localStorage.removeItem("grant");
    setGrant({});
  };
  return (
    <AuthContext.Provider
      value={{ ...grant, setAccessGrant, clearAccessGrant }}
    >
      {children}
    </AuthContext.Provider>
  );
}
