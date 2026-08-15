const API_BASE_URL = "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res
    .json()
    .then((data) =>
      Promise.reject(new Error(data.message || "Erro na solicitacao")),
    );
}

function request(endpoint, options = {}) {
  return fetch(`${API_BASE_URL}${endpoint}`, options).then(checkResponse);
}

export function register({ name, email, password }) {
  return request("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
}

export function login({ email, password }) {
  return request("/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function getCurrentUser(token) {
  return request("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getItems(token) {
  return request("/items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createItem(token, item) {
  return request("/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

export function updateItem(token, itemId, item) {
  return request(`/items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

export function deleteItem(token, itemId) {
  return request(`/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function searchTmeItems(token, query) {
  return request(
    `/api/suppliers/tme/search?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((data) => data.items);
}
