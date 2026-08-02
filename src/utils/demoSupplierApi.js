const DEMO_API_BASE_URL = "https://dummyjson.com/products/search";

function normalizeDemoProduct(product) {
  return {
    id: `demo-${product.id}`,
    imageUrl: product.thumbnail || "",
    supplier: "Demo API",
    manufacturer: product.brand || "Fabricante nao informado",
    manufacturerPartNumber: product.sku || `SKU-${product.id}`,
    description: product.title,
    availability: product.stock ?? 0,
    unitPrice: product.price,
    currency: "USD",
  };
}

export function searchDemoSupplierItems(query) {
  return fetch(`${DEMO_API_BASE_URL}?q=${encodeURIComponent(query)}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Falha ao consultar API publica.");
      }

      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data.products)) {
        throw new Error("Resposta invalida da API publica.");
      }

      return data.products.map(normalizeDemoProduct);
    });
}
