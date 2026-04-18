import { Customer } from "@/services/customer";
import { SalesBillItem, SalesOrder } from "@/services/salesOrder";
import { calculateSalesOrder } from "@/utils/calculate";
import React, { createContext, useEffect, useState } from "react";
export const SalesContext = createContext<{
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  salesBillItems: SalesBillItem[];
  setSalesBillItems: React.Dispatch<React.SetStateAction<SalesBillItem[]>>;
  selectedProduct: SalesBillItem;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SalesBillItem>>;
  orderData: SalesOrder;
  setOrderData: React.Dispatch<React.SetStateAction<SalesOrder>>;
} | null>(null);

const SalesProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [salesBillItems, setSalesBillItems] = useState<SalesBillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SalesBillItem>(
    {} as SalesBillItem,
  );
  const [orderData, setOrderData] = useState<SalesOrder>({} as SalesOrder);

  useEffect(() => {
    const calculatedData = calculateSalesOrder(salesBillItems);
    setOrderData(() => ({
      ...orderData,
      customerId: customer.id,
      items: salesBillItems,
      grossAmount: calculatedData.grossAmount,
      discountAmount: calculatedData.discountAmount,
      netAmount: calculatedData.netAmount,
      paidAmount: calculatedData.netAmount,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer, salesBillItems]);

  return (
    <SalesContext.Provider
      value={{
        customer,
        setCustomer,
        salesBillItems,
        setSalesBillItems,
        selectedProduct,
        setSelectedProduct,
        orderData,
        setOrderData,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
