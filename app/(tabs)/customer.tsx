import CustomerForm from "@/components/forms/customerForm";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import {
  clearAllCustomers,
  Customer,
  getAllCustomers,
} from "@/services/customer";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const CustomerScreen = () => {
  const [customers, setCustomers] = useState([] as Customer[]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);
  const renderItem = ({ item }: { item: Customer }) => (
    <TouchableOpacity
      style={styles.custListItemContainer}
      key={item.id}
      onPress={() => {
        setSelectedCustomer(item);
        setIsEditMode(true);
        setShowCustomerForm(true);
      }}
    >
      <ThemedText
        lightColor="#000"
        darkColor="#fff"
        style={[styles.custListContentText, { width: 60 }]}
      >
        {item.id}
      </ThemedText>
      <ThemedText
        lightColor="#000"
        darkColor="#fff"
        style={[styles.custListContentText, { flex: 1 }]}
      >
        {item.name}
      </ThemedText>
      <ThemedText
        lightColor="#000"
        darkColor="#fff"
        style={styles.custListContentText}
      >
        {item.phone}
      </ThemedText>
      <ThemedText
        lightColor="#000"
        darkColor="#fff"
        style={styles.custListContentText}
      >
        {item.address}
      </ThemedText>
    </TouchableOpacity>
  );
  const fetchCustomers = useCallback(async () => {
    await getAllCustomers({
      AND: [{ field: "deleted", operator: "eq", value: false }],
    }).then((data) => {
      setCustomers(data || []);
    });
  }, []);

  const handleCloseForm = useCallback(
    (updated: boolean) => {
      if (updated) {
        fetchCustomers();
      }
      setIsEditMode(false);
      setSelectedCustomer(undefined);
      setShowCustomerForm(false);
    },
    [fetchCustomers],
  );

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {!showCustomerForm ? (
          <ThemedView
            lightColor="#ffffff"
            darkColor="#000000"
            style={styles.customerContainer}
          >
            <ThemedView
              lightColor="#ffffff"
              darkColor="#000000"
              style={styles.titleContainer}
            >
              <ThemedText
                lightColor="#000"
                darkColor="#fff"
                style={styles.title}
              >
                Customers
              </ThemedText>
            </ThemedView>
            <ThemedView
              lightColor="#ffffff"
              darkColor="#000000"
              style={styles.listContainer}
            >
              <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={false}
                showsVerticalScrollIndicator={true}
                ListHeaderComponent={() => (
                  <ThemedView
                    lightColor="#ffffff"
                    darkColor="#000000"
                    style={[
                      styles.custListItemContainer,
                      styles.custListItemContainerHeader,
                    ]}
                  >
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={[styles.custListHeaderText, { width: 60 }]}
                    >
                      ID
                    </ThemedText>
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={[styles.custListHeaderText, { flex: 1 }]}
                    >
                      Name
                    </ThemedText>
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={styles.custListHeaderText}
                    >
                      Phone
                    </ThemedText>
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={styles.custListHeaderText}
                    >
                      Address
                    </ThemedText>
                  </ThemedView>
                )}
                ListHeaderComponentStyle={styles.custListItemContainerHeader}
                ListEmptyComponent={() => (
                  <ThemedView
                    lightColor="#ffffff"
                    darkColor="#000000"
                    style={styles.noCustomerFoundContainer}
                  >
                    <ThemedText
                      lightColor="#000"
                      darkColor="#fff"
                      style={{ fontSize: 16, fontWeight: "bold" }}
                    >
                      No customers found. Please add some.
                    </ThemedText>
                    <Button
                      title="Add Customer"
                      onPress={() => setShowCustomerForm(true)}
                      lightColor="green"
                      darkColor="green"
                    />
                  </ThemedView>
                )}
                ListFooterComponent={() => <></>}
              />
            </ThemedView>
            <ThemedView
              lightColor="#ffffff"
              darkColor="#000000"
              style={[
                styles.buttonContainer,
                { display: customers.length > 0 ? "flex" : "none" },
              ]}
            >
              <Button
                title="Add Customer"
                onPress={() => setShowCustomerForm(true)}
                lightColor="green"
                darkColor="green"
              />
              <Button
                title="Clear All Customers"
                onPress={() => clearAllCustomers().then(() => fetchCustomers())}
                lightColor="red"
                darkColor="red"
              />
            </ThemedView>
          </ThemedView>
        ) : (
          <CustomerForm
            isEditMode={isEditMode}
            onClose={(updated) => handleCloseForm(updated || false)}
            customerData={selectedCustomer}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  customerContainer: {
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
  },
  listContainer: {
    flexGrow: 1,
    flexDirection: "column",
    height: 100,
  },
  noCustomerFoundContainer: {
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 20,
    borderRadius: 8,
  },
  custListItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    borderRadius: 8,
    margin: 0,
    alignItems: "center",
    borderBottomWidth: 1,
    height: 30,
  },
  custListItemContainerHeader: {
    borderBottomWidth: 1,
    padding: 0,
  },
  custListHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    width: 100,
    margin: 0,
    padding: 4,
  },
  custListContentText: {
    fontSize: 16,
    fontWeight: "bold",
    width: 100,
    margin: 0,
    padding: 4,
    textOverflow: "wrap",
  },
  buttonContainer: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexDirection: "row",
  },
});

export default CustomerScreen;
