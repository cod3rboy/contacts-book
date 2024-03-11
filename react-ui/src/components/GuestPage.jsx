import { useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

export default function GuestPage({ children }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token && token.expiry > Date.now()) {
      navigate("/");
    }
  }, [navigate, token]);
  return <>{children}</>;
}
