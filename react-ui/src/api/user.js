export async function getProfile(token) {
  try {
    if (token.expiry < Date.now()) {
      throw new Error("login expired! please refresh the page to login again.");
    }

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/user/profile/`;
    const opts = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token.jwt}`,
        "content-type": "application/json",
      }),
    };

    const res = await fetch(endpoint, opts);
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

export async function register(account) {
  try {
    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/user/register/`;
    const opts = {
      method: "POST",
      body: JSON.stringify(account),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };

    const res = await fetch(endpoint, opts);
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
