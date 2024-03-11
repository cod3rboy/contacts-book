export async function login(emailId, password) {
  const loginEndpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
  const opts = {
    method: "POST",
    body: JSON.stringify({ emailId, password }),
    headers: new Headers({ "content-type": "application/json" }),
  };

  try {
    const res = await fetch(loginEndpoint, opts);
    const body = await res.json();
    if (res.status === 200) {
      return body;
    } else {
      throw new Error(body.msg);
    }
  } catch (err) {
    throw err.message;
  }
}

export async function logout(token = {}) {
  try {
    if (!token.jwt || !token.expiry || token.expiry < Date.now()) {
      return "";
    }

    const logoutEndpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/logout`;
    const opts = {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token.jwt}`,
        "content-type": "application/json",
      }),
    };

    const res = await fetch(logoutEndpoint, opts);
    const body = await res.json();
    if (res.status === 200) {
      return "";
    } else {
      throw new Error(body.msg);
    }
  } catch (err) {
    throw err.message;
  }
}
