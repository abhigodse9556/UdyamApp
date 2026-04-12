import generateId from "@/utils/idGenerator";
import { getItem, setItem } from "../utils/storage";
import { Customer } from "./customer";
import { Product } from "./product";

const ORDER_KEY = "sale_orders";

export interface SaleOrder {
  id: string;
  customerId: Customer["id"];
  items: SalesBillItem[];
  grossAmount: number;
  discountAmount?: number;
  netAmount: number;
  paidAmount: number;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
}

export interface SalesBillItem extends Product {
  quantity: number;
  soldAtRate: number;
  grossAmount: number;
  givenDiscPercent?: number;
  taxAmount?: number;
  discountAmount?: number;
  netAmount: number;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
}
// Save saleSaleOrder (only one)
export const saveSaleOrder = async (data: SaleOrder) => {
  const existingSaleOrders = (await getItem(ORDER_KEY)) || [];
  const id = await generateId("SALE_ORDER_ID_SEQ", "SL");
  const timestamp = new Date().toISOString();
  const newSaleOrder = {
    ...data,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const updatedSaleOrders = [...existingSaleOrders, newSaleOrder];

  await setItem(ORDER_KEY, updatedSaleOrders);
};

// Get all saleSaleOrders
export const getAllSaleOrders = async (): Promise<SaleOrder[] | null> => {
  return await getItem(ORDER_KEY);
};

export const getSaleOrderById = async (
  id: string,
): Promise<SaleOrder | null> => {
  const saleSaleOrders = await getAllSaleOrders();
  return saleSaleOrders?.find((p) => p.id === id) || null;
};

// export const getSaleOrdersByName = async (
//   name: string,
// ): Promise<SaleOrder[] | null> => {
//   const saleSaleOrders = await getAllSaleOrders();
//   return (
//     saleSaleOrders?.filter((p) =>
//       p.name.toLowerCase().includes(name.toLowerCase()),
//     ) || null
//   );
// };

// Update saleSaleOrder
export const updateSaleOrder = async (data: Partial<SaleOrder>) => {
  const saleSaleOrders = (await getAllSaleOrders()) || [];

  const updatedSaleOrders = saleSaleOrders.map((p) =>
    p.id === data.id
      ? { ...p, ...data, updatedAt: new Date().toISOString() }
      : p,
  );

  await setItem(ORDER_KEY, updatedSaleOrders);
};

export const deleteSaleOrder = async (id: string) => {
  const saleSaleOrders = (await getAllSaleOrders()) || [];

  const updatedSaleOrders = saleSaleOrders.map((p: SaleOrder) =>
    p.id === id
      ? { ...p, deleted: true, updatedAt: new Date().toISOString() }
      : p,
  );

  await setItem(ORDER_KEY, updatedSaleOrders);
};

// Clear all saleSaleOrders (optional)
export const clearAllSaleOrders = async () => {
  await setItem(ORDER_KEY, null);
  await setItem("ORDER_ID_SEQ", 0); // Reset ID sequence
};

export default {
  saveSaleOrder,
  getAllSaleOrders,
  updateSaleOrder,
  deleteSaleOrder,
  clearAllSaleOrders,
};
