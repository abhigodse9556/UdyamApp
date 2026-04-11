import generateId from "@/utils/idGenerator";
import { getItem, setItem } from "../utils/storage";

const PRODUCT_KEY = "product";

export interface Product {
  id: string;
  name: string;
  rate: number;
  costPrice?: number;
  mrp?: number;
  discount?: number;
  stock?: number;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
  category?: string;
  subCategory?: string;
  brand?: string;
  color?: string;
  size?: string;
  material?: string;
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  alwaysSellOnMrp?: boolean;
  allowDiscount?: boolean;
}

// Save product (only one)
export const saveProduct = async (data: Product) => {
  const existingProducts = (await getItem(PRODUCT_KEY)) || [];
  const id = await generateId("PRODUCT_ID_SEQ", "P");
  const timestamp = new Date().toISOString();
  const newProduct = {
    ...data,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const updatedProducts = [...existingProducts, newProduct];

  await setItem(PRODUCT_KEY, updatedProducts);
};

// Get all products
export const getAllProducts = async (): Promise<Product[] | null> => {
  return await getItem(PRODUCT_KEY);
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const products = await getAllProducts();
  return products?.find((p) => p.id === id) || null;
};

export const getProductsByName = async (
  name: string,
): Promise<Product[] | null> => {
  const products = await getAllProducts();
  return (
    products?.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    ) || null
  );
};

// Update product
export const updateProduct = async (data: Partial<Product>) => {
  const products = (await getAllProducts()) || [];

  const updatedProducts = products.map((p) =>
    p.id === data.id
      ? { ...p, ...data, updatedAt: new Date().toISOString() }
      : p,
  );

  await setItem(PRODUCT_KEY, updatedProducts);
};

export const deleteProduct = async (id: string) => {
  const products = (await getAllProducts()) || [];

  const updatedProducts = products.map((p: Product) =>
    p.id === id
      ? { ...p, deleted: true, updatedAt: new Date().toISOString() }
      : p,
  );

  await setItem(PRODUCT_KEY, updatedProducts);
};

// Clear all products (optional)
export const clearAllProducts = async () => {
  await setItem(PRODUCT_KEY, null);
  await setItem("PRODUCT_ID_SEQ", 0); // Reset ID sequence
};

export default {
  saveProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  clearAllProducts,
};
