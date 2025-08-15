const baseUrl = "http://localhost:3001";

export const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || `Error: ${res.status}`);
  }
  return res.json();
};

export const getItems = async (token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}/items`, {
    headers,
  });
  return handleResponse(response);
};

export const postItem = async (item, token) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  return handleResponse(response);
};

export const deleteItem = async (id, token) => {
  const response = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const addCardLike = async (id, token) => {
  const response = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const removeCardLike = async (id, token) => {
  const response = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const updateProfile = async ({ name, avatar }, token) => {
  const response = await fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
  return handleResponse(response);
};
