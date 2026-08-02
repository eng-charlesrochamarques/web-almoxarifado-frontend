const TME_PROXY_BASE_URL = "/api/suppliers/tme/search";

function normalizeTmeProduct(product) {
  return {
    id: `tme-${product.symbol || product.manufacturerPartNumber}`,
    imageUrl: product.imageUrl || "",
    supplier: "TME",
    manufacturer: product.manufacturer || "",
    manufacturerPartNumber:
      product.manufacturerPartNumber || product.symbol || "",
    description: product.description || "",
    availability: product.availability ?? 0,
    unitPrice: product.unitPrice ?? 0,
    currency: product.currency || "EUR",
  };
}

export function searchTmeSupplierItems(query) {
  return fetch(`${TME_PROXY_BASE_URL}?query=${encodeURIComponent(query)}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Falha ao consultar TME pelo servidor.");
      }

      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data.items)) {
        throw new Error("Resposta invalida do servidor TME.");
      }

      return data.items.map(normalizeTmeProduct);
    });
}
