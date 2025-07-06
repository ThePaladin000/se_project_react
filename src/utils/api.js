const baseUrl = "http://localhost:3001/items";

export const getItems = async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
};

export const postItem = async (item) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data;
};

export const deleteItem = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
