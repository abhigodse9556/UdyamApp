import ProductForm from "@/components/forms/productForm";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { clearAllProducts, getAllProducts, Product } from "@/services/product";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ProductScreen = () => {
  const [products, setProducts] = useState([] as Product[]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );
  const renderItem = ({ item }: { item: Product }) => (
    <ThemedView
      lightColor="#f0f0f0"
      darkColor="#101010"
      style={styles.prodListItemThemedContainer}
    >
      <TouchableOpacity
        style={styles.prodListItemContainer}
        key={item.id}
        onPress={() => {
          setSelectedProduct(item);
          setIsEditMode(true);
          setShowProductForm(true);
        }}
      >
        <ThemedText
          lightColor="#000"
          darkColor="#fff"
          style={styles.prodListContentText}
        >
          {item.id}
        </ThemedText>
        <ThemedText
          lightColor="#000"
          darkColor="#fff"
          style={[styles.prodListContentText, { flex: 1 }]}
        >
          {item.name}
        </ThemedText>
        <ThemedText
          lightColor="#000"
          darkColor="#fff"
          style={styles.prodListContentText}
        >
          {item.rate}
        </ThemedText>
        <ThemedText
          lightColor="#000"
          darkColor="#fff"
          style={styles.prodListContentText}
        >
          {item.stock}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
  const fetchProducts = useCallback(async () => {
    await getAllProducts().then((data) => {
      setProducts(data || []);
    });
  }, []);

  const handleCloseForm = useCallback(
    (updated: boolean) => {
      if (updated) {
        fetchProducts();
      }
      setIsEditMode(false);
      setSelectedProduct(undefined);
      setShowProductForm(false);
    },
    [fetchProducts],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {!showProductForm ? (
          <ThemedView
            lightColor="#ffffff"
            darkColor="#000000"
            style={styles.productContainer}
          >
            <ThemedView
              lightColor="#D0D0D0"
              darkColor="#353636"
              style={styles.titleContainer}
            >
              <ThemedText type="title">Products</ThemedText>
            </ThemedView>
            <ThemedView
              lightColor="#D0D0D0"
              darkColor="#353636"
              style={styles.listContainer}
            >
              <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={false}
                showsVerticalScrollIndicator={true}
                ListHeaderComponent={() => (
                  <ThemedView
                    lightColor="#9d9d9d"
                    darkColor="#000000"
                    style={[styles.prodListItemContainerHeader]}
                  >
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={styles.prodListHeaderText}
                    >
                      ID
                    </ThemedText>
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={[styles.prodListHeaderText, { flex: 1 }]}
                    >
                      Name
                    </ThemedText>
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={styles.prodListHeaderText}
                    >
                      Rate
                    </ThemedText>
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={styles.prodListHeaderText}
                    >
                      Stock
                    </ThemedText>
                  </ThemedView>
                )}
                ListHeaderComponentStyle={styles.prodListItemContainerHeader}
                ListEmptyComponent={() => (
                  <ThemedView style={styles.noProductFoundContainer}>
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={{ fontSize: 16, fontWeight: "bold" }}
                    >
                      No products found. Please add some.
                    </ThemedText>
                    <Button
                      title="Add Product"
                      onPress={() => setShowProductForm(true)}
                      lightColor="green"
                      darkColor="green"
                    />
                  </ThemedView>
                )}
                ListFooterComponent={() => <></>}
              />
            </ThemedView>
            <ThemedView
              style={[
                styles.buttonContainer,
                { display: products.length > 0 ? "flex" : "none" },
              ]}
            >
              <Button
                title="Add Product"
                onPress={() => setShowProductForm(true)}
                lightColor="green"
                darkColor="green"
              />
              <Button
                title="Clear All Products"
                onPress={() => clearAllProducts().then(() => fetchProducts())}
                lightColor="red"
                darkColor="red"
              />
            </ThemedView>
          </ThemedView>
        ) : (
          <ProductForm
            isEditMode={isEditMode}
            onClose={(updated) => handleCloseForm(updated || false)}
            productData={selectedProduct}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    alignItems: "center",
    gap: 8,
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  listContainer: {
    flexGrow: 1,
    flexDirection: "column",
    height: 100,
  },
  noProductFoundContainer: {
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 20,
    borderRadius: 8,
  },
  prodListItemThemedContainer: {
    padding: 0,
    borderRadius: 8,
    margin: 0,
  },
  prodListItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    borderRadius: 8,
    margin: 0,
    alignItems: "center",
    borderBottomWidth: 1,
    height: 30,
  },
  prodListItemContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 0,
    marginBottom: 1,
  },
  prodListHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    width: 60,
    margin: 0,
    padding: 4,
  },
  prodListContentText: {
    fontSize: 16,
    fontWeight: "bold",
    width: 60,
    margin: 0,
    padding: 4,
  },
  buttonContainer: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexDirection: "row",
  },
});

export default ProductScreen;
