import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router";
import router from "./router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import ContactsProvider from "./providers/ContactsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ContactsProvider>
        <RouterProvider router={router} />
      </ContactsProvider>
    </AuthProvider>
  </React.StrictMode>
);
