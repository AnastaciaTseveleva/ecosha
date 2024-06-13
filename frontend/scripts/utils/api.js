export async function registration(login, password) {
  const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: login, password }),
  });
  return await response.json();
}

export async function authorization(login, password) {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: login, password }),
  });
  return await response.json();
}

export async function getCatalog() {
  const response = await fetch("http://localhost:3000/api/catalog");
  return await response.json();
}

// 665c4cbb0f194bb0ad1e6fd3

export async function getUserCart(id) {
  const response = await fetch(`http://localhost:3000/api/cart/${id}`);
  return await response.json();
}

export async function addProductCart(id, productId) {
  const response = await fetch(`http://localhost:3000/api/cart/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  return await response.json();
}

/////пееход в карточку товара это я написала
export async function getProduct(id) {
  const response = await fetch(`http://localhost:3000/api/catalog/${id}`);

  return await response.json();
}

export async function getUserFavorite(id) {
  const response = await fetch(`http://localhost:3000/api/favourite/${id}`);
  return await response.json();
}

export async function addProductFavorite(id, productId) {
  const response = await fetch(`http://localhost:3000/api/favourite/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  return await response.json();
}
export async function removeProductFavorite(id, productId) {
  const response = await fetch(`http://localhost:3000/api/favourite/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  return await response.json();
}

export async function removeProductCart(id, productId) {
  const response = await fetch(`http://localhost:3000/api/cart/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  return await response.json();
}


////в категориях подкатегории
export async function getCatalogCategories() {
  const response = await fetch("http://localhost:3000/api/catalog/categories", {
    method: "GET",
  });
  return await response.json();
}

export async function getProductsInCategory(category) {
  const response = await fetch(
    `http://localhost:3000/api/catalog/products?category=${encodeURIComponent(
      category
    )}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
}


export async function getProductsInSubcategory(subcategory) {
  const response = await fetch(
    `http://localhost:3000/api/catalog/products?subcategory=${encodeURIComponent(
      subcategory
    )}`,
    {
      method: "GET",
    }
  );
  return await response.json();
}