export async function createContact(token, details) {
  try {
    if (token.expiry < Date.now()) {
      throw new Error("login expired! please refresh the page to login again.");
    }

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/contacts/`;
    const opts = {
      method: "POST",
      body: JSON.stringify(details),
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

export async function getContact(token, id) {
  try {
    if (token.expiry < Date.now()) {
      throw new Error("login expired! please refresh the page to login again.");
    }

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/contacts/${id}/`;
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

export async function getContactList(token) {
  try {
    if (token.expiry < Date.now()) {
      throw new Error("login expired! please refresh the page to login again.");
    }

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/contacts/`;
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

export async function updateContact(token, id, patch) {
  try {
    if (token.expiry < Date.now()) {
      throw new Error("login expired! please refresh the page to login again.");
    }

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/contacts/${id}/`;
    const opts = {
      method: "PATCH",
      body: JSON.stringify(patch),
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

export async function deleteContact(token, id) {
  try {
    if (token.expiry < Date.now()) {
      throw new Error("login expired! please refresh the page to login again.");
    }

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/contacts/${id}/`;
    const opts = {
      method: "DELETE",
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
