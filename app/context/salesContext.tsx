import { Customer } from "@/services/customer";
import { SalesBillItem, SalesOrder } from "@/services/salesOrder";
import { calculateSalesOrder } from "@/utils/calculate";
import React, { createContext, useMemo, useState } from "react";
export const SalesContext = createContext<{
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  salesBillItems: SalesBillItem[];
  setSalesBillItems: React.Dispatch<React.SetStateAction<SalesBillItem[]>>;
  selectedProduct: SalesBillItem;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SalesBillItem>>;
  orderData: SalesOrder;
} | null>(null);

const SalesProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [salesBillItems, setSalesBillItems] = useState<SalesBillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SalesBillItem>(
    {} as SalesBillItem,
  );

  const orderData = useMemo(() => {
    const calculatedData = calculateSalesOrder(salesBillItems);
    return {
      id: "",
      invoiceNumber: "",
      customerId: customer.id,
      items: salesBillItems,
      grossAmount: calculatedData.grossAmount,
      discountAmount: calculatedData.discountAmount,
      netAmount: calculatedData.netAmount,
      paidAmount: calculatedData.netAmount,
    };
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
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
