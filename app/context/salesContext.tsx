import { Customer } from "@/services/customer";
import { SalesBillItem } from "@/services/saleorder";
import React, { createContext, useState } from "react";
export const SalesContext = createContext<{
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  salesBillItems: SalesBillItem[];
  setSalesBillItems: React.Dispatch<React.SetStateAction<SalesBillItem[]>>;
  selectedProduct: SalesBillItem;
  setSelectedProduct: React.Dispatch<React.SetStateAction<SalesBillItem>>;
} | null>(null);

const SalesProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [salesBillItems, setSalesBillItems] = useState<SalesBillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SalesBillItem>(
    {} as SalesBillItem,
  );

  // useEffect(() => {
  //   salesBillItems.map((item) => {
  //     if (item.id === selectedProduct.id) {
  //       setSelectedProduct(item);
  //     }
  //   });
  // }, [salesBillItems, selectedProduct]);

  return (
    <SalesContext.Provider
      value={{
        customer,
        setCustomer,
        salesBillItems,
        setSalesBillItems,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
