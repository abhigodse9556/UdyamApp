import { trimObjectStrings } from "@/utils/generic";
import generateId from "@/utils/idGenerator";
import { getItem, setItem } from "../utils/storage";

const CUSTOMER_KEY = "customer";

export const CUSTOMER_TYPES = ["walkin", "loyalty", "referral"] as const;

export type CustomerType = (typeof CUSTOMER_TYPES)[number];

export const CUSTOMER_TYPE_OPTIONS = CUSTOMER_TYPES.map((type) => ({
  label: type.charAt(0).toUpperCase() + type.slice(1),
  value: type,
}));

type Operator = "eq" | "includes" | "gt" | "lt" | "gte" | "lte";

type FilterCondition<T> = {
  field: keyof T;
  operator: Operator;
  value: any;
};

type Query<T> = {
  AND?: FilterCondition<T>[];
  OR?: FilterCondition<T>[];
};

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  customerDiscount?: number;
  customerType?: CustomerType;
  referralSource?: string;
  isReferee?: boolean;
  referralHistory?: {
    referredCustomers: string[]; // List of referred customer IDs
    referralCount: number; // Total number of referrals made
  };
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
  balance?: number;
}

// Save product (only one)
export const saveCustomer = async (data: Customer) => {
  const existingCustomers = (await getItem(CUSTOMER_KEY)) || [];

  const id = await generateId("CUSTOMER_ID_SEQ", "C");

  const timestamp = new Date().toISOString();
  const newCustomer = {
    ...data,
    customerType: data.customerType || "walkin",
    isReferee: data.isReferee || false,
    deleted: data.deleted || false,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  const cleanedData = trimObjectStrings(newCustomer);
  const updatedCustomers = [...existingCustomers, cleanedData];
  await setItem(CUSTOMER_KEY, updatedCustomers);
};

// Get all products
export const getAllCustomers = async (
  query?: Query<Customer>,
): Promise<Customer[] | null> => {
  const customers = ((await getItem(CUSTOMER_KEY)) as Customer[]) || [];

  if (!query) return customers.length ? customers : null;

  const applyCondition = (
    customer: Customer,
    condition: FilterCondition<Customer>,
  ) => {
    const fieldValue = customer[condition.field];

    // 🚨 Handle undefined safely
    if (fieldValue === undefined || fieldValue === null) {
      return false;
    }

    switch (condition.operator) {
      case "eq":
        return fieldValue === condition.value;

      case "includes":
        return String(fieldValue)
          .toLowerCase()
          .includes(String(condition.value).toLowerCase());

      case "gt":
        return typeof fieldValue === "number" && fieldValue > condition.value;

      case "lt":
        return typeof fieldValue === "number" && fieldValue < condition.value;

      case "gte":
        return typeof fieldValue === "number" && fieldValue >= condition.value;

      case "lte":
        return typeof fieldValue === "number" && fieldValue <= condition.value;

      default:
        return false;
    }
  };

  return customers.filter((customer) => {
    const andPass =
      !query.AND ||
      query.AND.every((condition) => applyCondition(customer, condition));

    const orPass =
      !query.OR ||
      query.OR.some((condition) => applyCondition(customer, condition));

    return andPass && orPass;
  });
};

export const getCustomerById = async (id: string): Promise<Customer | null> => {
  const products = await getAllCustomers();
  return products?.find((c) => c.id === id && !c.deleted) || null;
};

export const getCustomersByName = async (
  name: string,
): Promise<Customer[] | []> => {
  const products = await getAllCustomers();
  return (
    products?.filter(
      (c) => c.name.toLowerCase().includes(name.toLowerCase()) && !c.deleted,
    ) || []
  );
};

// Update product
export const updateCustomer = async (data: Partial<Customer>) => {
  const products = (await getAllCustomers()) || [];
  const cleanedData = trimObjectStrings(data);
  const updatedCustomers = products.map((c) =>
    c.id === cleanedData.id
      ? { ...c, ...cleanedData, updatedAt: new Date().toISOString() }
      : c,
  );

  await setItem(CUSTOMER_KEY, updatedCustomers);
};

export const deleteCustomer = async (id: string) => {
  const products = (await getAllCustomers()) || [];

  const updatedCustomers = products.map((c: Customer) =>
    c.id === id
      ? { ...c, deleted: true, updatedAt: new Date().toISOString() }
      : c,
  );

  await setItem(CUSTOMER_KEY, updatedCustomers);
};

// Clear all products (optional)
export const clearAllCustomers = async () => {
  await setItem(CUSTOMER_KEY, null);
  await setItem("CUSTOMER_ID_SEQ", 0); // Reset ID sequence
};

export default {
  saveCustomer,
  getAllCustomers,
  getCustomersByName,
  updateCustomer,
  deleteCustomer,
  clearAllCustomers,
};
