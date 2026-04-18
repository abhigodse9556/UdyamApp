import { SalesBillItem, SalesOrder } from "@/services/salesOrder";

export const calculateSalesLineItem = (product: SalesBillItem) => {
  const grossAmount = product.quantity * product.soldAtRate;
  const discountAmount = (grossAmount * (product?.givenDiscPercent || 0)) / 100;
  const netAmount = grossAmount - discountAmount;
  const taxAmount = (grossAmount * (product?.taxRate || 0)) / 100;
  return {
    ...product,
    grossAmount,
    discountAmount,
    netAmount,
    taxAmount,
  } as SalesBillItem;
};

export const calculateSalesOrder = (items: SalesBillItem[]) => {
  const grossAmount = items.reduce((acc, item) => acc + item.grossAmount, 0);
  const discountAmount = items.reduce((acc, item) => {
    if (item.discountAmount) return acc + item?.discountAmount || 0;
    else return acc;
  }, 0);
  const netAmount = grossAmount - discountAmount;
  return {
    grossAmount,
    discountAmount,
    netAmount,
  } as SalesOrder;
};
