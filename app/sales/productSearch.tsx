import SearchList from "@/components/common/searchList";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { getProductsByName, Product } from "@/services/product";
import { SalesBillItem } from "@/services/salesOrder";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SalesContext } from "../context/salesContext";

type ProductSearchProps = {
  setShowProductSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  isProductReplacement?: boolean;
};
const ProductSearch = (props: ProductSearchProps) => {
  const { setShowProductSearchModal, isProductReplacement = false } = props;
  const salesContextValue = useContext(SalesContext);
  if (!salesContextValue) {
    throw new Error("SalesContext not found. Wrap with SalesProvider.");
  }
  const { setSalesBillItems, selectedProduct, setSelectedProduct } =
    salesContextValue;
  const qtyInputRef = useRef<TextInput | null>(null);

  const [oldProduct, setOldProduct] = useState<SalesBillItem | null>(null);

  const selectPoduct = (prod: Product) => {
    const addedProduct = {
      ...prod,
      quantity: 1,
      soldAtRate: prod.rate || prod.mrp || 0,
      grossAmount: prod.rate || prod.mrp || 0,
      netAmount: prod.rate || prod.mrp || 0,
      taxAmount: 0,
      discountAmount:
        prod.rate * (prod.allowDiscount ? prod.discount || 0 : 0) * 0.01,
      givenDiscPercent: prod.allowDiscount ? prod.discount : 0,
    };
    setSelectedProduct(addedProduct);
    setTimeout(() => {
      qtyInputRef.current?.focus();
    }, 100);
  };

  const addToBill = (item: SalesBillItem) => {
    setSalesBillItems((prevItems) => {
      // 👉 Replacement case
      if (isProductReplacement && oldProduct) {
        const index = prevItems.findIndex((i) => i.id === oldProduct.id);

        if (index !== -1) {
          const updated = [...prevItems];
          updated[index] = item; // replace at same position
          return updated;
        }
      }

      // 👉 If item already exists → update it
      const existsIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existsIndex !== -1) {
        const updated = [...prevItems];
        updated[existsIndex] = item;
        return updated;
      }

      // 👉 Otherwise → add new
      return [...prevItems, item];
    });

    setShowProductSearchModal(false);
  };

  useEffect(() => {
    if (isProductReplacement) {
      setOldProduct(selectedProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemedView
      lightColor="#f5f8f6"
      darkColor="#000000"
      style={{
        height: "90%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <View
        style={{
          padding: 10,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <SearchList
          placeholder="Search product..."
          onSearch={getProductsByName}
          getLabel={(p) =>
            `${p.name} - ${p.description ? `${p.description} - ` : ""}₹${p.rate} - ${p.stock ? p.stock : 0} in stock`
          }
          onSelect={(item) => {
            selectPoduct(item);
          }}
        />
        {selectedProduct.name && (
          <View style={{ marginTop: 10, flex: 1 }}>
            <ThemedText
              type="subtitle"
              lightColor="rgb(8, 142, 130)"
              darkColor="rgb(114, 189, 183)"
            >
              {selectedProduct.name}
            </ThemedText>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              style={{ marginTop: 10 }}
            >
              <Input
                inputRef={qtyInputRef}
                label="Quantity"
                value={selectedProduct.quantity?.toString()}
                onChangeText={(text) => {
                  const qty = parseInt(text) || 0;
                  const updatedProduct = {
                    ...selectedProduct,
                    quantity: qty,
                    grossAmount: qty * selectedProduct.soldAtRate,
                    netAmount: qty * selectedProduct.soldAtRate,
                    discountAmount:
                      qty *
                      selectedProduct.soldAtRate *
                      (selectedProduct.givenDiscPercent || 0) *
                      0.01,
                    taxAmount:
                      qty *
                      selectedProduct.soldAtRate *
                      (selectedProduct.taxRate || 0) *
                      0.01,
                  };
                  setSelectedProduct(updatedProduct);
                }}
                keyboardType="numeric"
              />
              <Input
                label="Sold at Rate"
                value={`₹${selectedProduct.soldAtRate}`}
              />
              <Input
                label="Gross Amount"
                value={`₹${selectedProduct.grossAmount?.toFixed(2)}`}
                readOnly
              />
              <Input
                label="Net Amount"
                value={`₹${selectedProduct.netAmount?.toFixed(2)}`}
                readOnly
              />
              <Input
                label="Tax Amount"
                value={`₹${selectedProduct.taxRate?.toFixed(2) || 0}%`}
                readOnly
              />
              <Input
                label="Given Discount"
                value={` ${selectedProduct.givenDiscPercent || 0}%`}
              />
              <Input
                label="Discount"
                value={`₹${selectedProduct.discountAmount?.toFixed(2) || 0}`}
                readOnly
              />
            </KeyboardAwareScrollView>
          </View>
        )}
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            title="Add to Bill"
            onPress={() => {
              addToBill(selectedProduct);
              setSelectedProduct({} as SalesBillItem);
            }}
            disabled={!selectedProduct.name}
          />
          <Button
            title="Cancel"
            onPress={() => {
              setShowProductSearchModal(false);
              setSelectedProduct({} as SalesBillItem);
            }}
            lightColor="red"
          />
        </View>
      </View>
    </ThemedView>
  );
};

export default ProductSearch;
