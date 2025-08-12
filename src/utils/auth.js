const baseUrl = "http://localhost:3001";

export const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || `Error: ${res.status}`);
  }
  return res.json();
};

export const signup = async ({ name, avatar, email, password }) => {
  const response = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return handleResponse(response);
};

export const signin = async ({ email, password }) => {
  const response = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const checkToken = async (token) => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};
