import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { Alert, Container, Spinner, Stack } from "react-bootstrap";
import Avatar from "boring-avatars";
import AuthPage from "../components/AuthPage.jsx";
import useAuth from "../hooks/useAuth.js";
import { getProfile } from "../api/user.js";
import { genderName } from "../utils/utils.js";

export default function Profile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setLoading(true);
    setErr("");
    getProfile(token)
      .then((userProfile) => setProfile(userProfile))
      .catch((error) => setErr(error))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <AuthPage>
      <Layout>
        <Container>
          <h2>User Profile</h2>
          <hr />
          {loading && (
            <Stack gap={2} direction="horizontal">
              <Spinner animation="border" variant="primary" />
              <span>Loading profile ...</span>
            </Stack>
          )}
          {err && <Alert variant="danger">{err}</Alert>}
          {profile && (
            <div>
              <Stack className="mt-4 pt-4 pb-4" gap={2}>
                <Avatar
                  size={140}
                  title={true}
                  variant="beam"
                  name={profile.fullName}
                  colors={[
                    "#92A1C6",
                    "#146A7C",
                    "#F0AB3D",
                    "#C271B4",
                    "#C20D90",
                  ]}
                />
                <h3 className="mt-2">{profile.fullName}</h3>
              </Stack>
              <Stack
                direction="horizontal"
                className="mt-4 pt-4 justify-content-between"
              >
                <div>
                  <h5>Gender</h5>
                  <p>{genderName(profile.gender)}</p>
                </div>
                <div>
                  <h5>Email Address</h5>
                  <p>{profile.emailId}</p>
                </div>
                <div>
                  <h5>Mobile Number</h5>
                  <p>{profile.mobileNumber}</p>
                </div>
              </Stack>
            </div>
          )}
        </Container>
      </Layout>
    </AuthPage>
  );
}
