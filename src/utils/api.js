const baseUrl = "http://localhost:3001/items";

export const handleResponse = async (res) => {
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return res.json();
};

export const getItems = async () => {
  const response = await fetch(baseUrl);
  return handleResponse(response);
};

export const postItem = async (item) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return handleResponse(response);
};

export const deleteItem = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
