import { createContext } from "react";

const AuthContext = createContext({
  token: {
    jwt: "",
    expiry: 0,
  },
  user: {
    name: "",
    email: "",
  },
  setAccessGrant: () => {},
  clearAccessGrant: () => {},
});

export default AuthContext;
