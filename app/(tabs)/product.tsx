import ProductForm from "@/components/forms/productForm";
import Button from "@/components/ui/button";
import { getAllProducts, Product } from "@/services/product";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProductScreen = () => {
  const [products, setProducts] = useState([] as Product[]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.prodListItemContainer}
      key={item.id}
      onPress={() => {
        setSelectedProduct(item);
        setIsEditMode(true);
        setShowProductForm(true);
      }}
    >
      {/* <Text style={styles.prodListContentText}>{item.id}</Text> */}
      <Text style={[styles.prodListContentText, { flex: 1 }]}>{item.name}</Text>
      <Text style={styles.prodListContentText}>{item.rate}</Text>
      <Text style={styles.prodListContentText}>{item.stock}</Text>
    </TouchableOpacity>
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
      setShowProductForm(false);
    },
    [fetchProducts],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <View style={{ flex: 1 }}>
      {!showProductForm ? (
        <View style={styles.productContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Products</Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              stickyHeaderIndices={[0]}
              stickyHeaderHiddenOnScroll={true}
              showsVerticalScrollIndicator={true}
              ListHeaderComponent={() => (
                <View
                  style={[
                    styles.prodListItemContainer,
                    styles.prodListItemContainerHeader,
                  ]}
                >
                  {/* <Text style={styles.prodListHeaderText}>ID</Text> */}
                  <Text style={[styles.prodListHeaderText, { flex: 1 }]}>
                    Name
                  </Text>
                  <Text style={styles.prodListHeaderText}>Rate</Text>
                  <Text style={styles.prodListHeaderText}>Stock</Text>
                </View>
              )}
              ListHeaderComponentStyle={styles.prodListItemContainerHeader}
              ListEmptyComponent={() => (
                <View style={styles.noProductFoundContainer}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    No products found. Please add some.
                  </Text>
                  <Button
                    title="Add Product"
                    onPress={() => setShowProductForm(true)}
                    color="green"
                  />
                </View>
              )}
              ListFooterComponent={() => <></>}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Add Product"
              onPress={() => setShowProductForm(true)}
              color="green"
            />
          </View>
        </View>
      ) : (
        <ProductForm
          isEditMode={isEditMode}
          onClose={(updated) => handleCloseForm(updated || false)}
          productData={selectedProduct}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexGrow: 1,
    paddingTop: 40,
  },
  titleContainer: {
    backgroundColor: "#3b05fe",
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
    backgroundColor: "#f0f0f0",
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
  prodListItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    margin: 0,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  prodListItemContainerHeader: {
    backgroundColor: "#d0d0d0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 0,
  },
  prodListHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
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
  },
});

export default ProductScreen;
