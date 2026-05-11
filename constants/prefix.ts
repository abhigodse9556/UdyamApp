export const ORDER_PREFIX = "ORD";
export const ORDER_ITEM_PREFIX = "OIT";
export const CUSTOMER_PREFIX = "CST";
export const PRODUCT_PREFIX = "PRD";
export const SALES_INVOICE_PREFIX = "SL";
export const PURCHASE_INVOICE_PREFIX = "PU";
export const PAYMENT_PREFIX = "PAY";

export type PrefixType =
  | typeof ORDER_PREFIX
  | typeof ORDER_ITEM_PREFIX
  | typeof CUSTOMER_PREFIX
  | typeof PRODUCT_PREFIX
  | typeof SALES_INVOICE_PREFIX
  | typeof PURCHASE_INVOICE_PREFIX
  | typeof PAYMENT_PREFIX;
