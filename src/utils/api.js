const baseUrl = "http://localhost:3001";

const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || `Error: ${res.status}`);
  }
  return res.json();
};

export const request = (url, options) => {
  console.log("Making API request to:", url, "with options:", options);
  return fetch(url, options)
    .then((response) => {
      console.log("API response status:", response.status, response.statusText);
      return handleResponse(response);
    })
    .then((data) => {
      console.log("API response data:", data);
      return data;
    });
};

export const getItems = async (token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return request(`${baseUrl}/items`, {
    headers,
  });
};

export const postItem = async (item, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
};

export const deleteItem = async (id, token) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const addCardLike = async (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = async (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async ({ name, avatar }, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};
