import { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import AuthPage from "../components/AuthPage.jsx";
import Layout from "../components/Layout.jsx";
import useAuth from "../hooks/useAuth.js";
import { logout } from "../api/auth.js";

export default function Logout() {
  const { token, clearAccessGrant } = useAuth();
  const [loading, setLoading] = useState(false);
  const [logoutErr, setLogoutErr] = useState("");
  useEffect(() => {
    setLoading(true);
    setLogoutErr("");
    logout(token)
      .then(() => {
        clearAccessGrant();
      })
      .catch((error) => {
        setLogoutErr(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [clearAccessGrant, token]);
  return (
    <AuthPage>
      <Layout>
        <Container>
          {logoutErr && <Alert variant="danger">{logoutErr}</Alert>}
          {loading && (
            <div>
              <Spinner animation="border" variant="primary" />
              Logging out...
            </div>
          )}
        </Container>
      </Layout>
    </AuthPage>
  );
}
