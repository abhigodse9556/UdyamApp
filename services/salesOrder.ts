import generateId from "@/utils/idGenerator";
import { getItem, setItem } from "../utils/storage";
import { Customer } from "./customer";
import { Product } from "./product";

const ORDER_KEY = "sales_orders";

export interface SalesOrder {
  id: string;
  invoiceNumber: string;
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
// Save saleSalesOrder (only one)
export const saveSalesOrder = async (data: SalesOrder) => {
  const existingSalesOrders = (await getItem(ORDER_KEY)) || [];
  const id = await generateId("SALE_ORDER_ID_SEQ", "SL");
  const invoiceNumber = await generateId("SALE_ORDER_INVOICE_NUMBER_SEQ", "SI");
  const timestamp = new Date().toISOString();
  const newSalesOrder = {
    ...data,
    id,
    invoiceNumber,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const updatedSalesOrders = [...existingSalesOrders, newSalesOrder];

  await setItem(ORDER_KEY, updatedSalesOrders);
};

// Get all saleSalesOrders
export const getAllSalesOrders = async (): Promise<SalesOrder[] | null> => {
  return await getItem(ORDER_KEY);
};

export const getSalesOrderById = async (
  id: string,
): Promise<SalesOrder | null> => {
  const saleSalesOrders = await getAllSalesOrders();
  return saleSalesOrders?.find((p) => p.id === id) || null;
};

// export const getSalesOrdersByName = async (
//   name: string,
// ): Promise<SalesOrder[] | null> => {
//   const saleSalesOrders = await getAllSalesOrders();
//   return (
//     saleSalesOrders?.filter((p) =>
//       p.name.toLowerCase().includes(name.toLowerCase()),
//     ) || null
//   );
// };

// Update saleSalesOrder
export const updateSalesOrder = async (data: Partial<SalesOrder>) => {
  const saleSalesOrders = (await getAllSalesOrders()) || [];

  const updatedSalesOrders = saleSalesOrders.map((p) =>
    p.id === data.id
      ? { ...p, ...data, updatedAt: new Date().toISOString() }
      : p,
  );

  await setItem(ORDER_KEY, updatedSalesOrders);
};

export const deleteSalesOrder = async (id: string) => {
  const saleSalesOrders = (await getAllSalesOrders()) || [];

  const updatedSalesOrders = saleSalesOrders.map((p: SalesOrder) =>
    p.id === id
      ? { ...p, deleted: true, updatedAt: new Date().toISOString() }
      : p,
  );

  await setItem(ORDER_KEY, updatedSalesOrders);
};

// Clear all saleSalesOrders (optional)
export const clearAllSalesOrders = async () => {
  await setItem(ORDER_KEY, null);
  await setItem("ORDER_ID_SEQ", 0); // Reset ID sequence
};

export default {
  saveSalesOrder,
  getAllSalesOrders,
  updateSalesOrder,
  deleteSalesOrder,
  clearAllSalesOrders,
};
