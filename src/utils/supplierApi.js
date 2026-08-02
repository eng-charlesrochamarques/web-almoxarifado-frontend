import { searchDemoSupplierItems } from "./demoSupplierApi";

const ACTIVE_SUPPLIER = "demo";

export function searchSupplierItems(query) {
  if (ACTIVE_SUPPLIER === "demo") {
    return searchDemoSupplierItems(query);
  }

  throw new Error("Fornecedor nao configurado.");
}
