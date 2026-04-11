import CustomerForm from "@/components/forms/customerForm";
import Button from "@/components/ui/button";
import {
  clearAllCustomers,
  Customer,
  getAllCustomers,
} from "@/services/customer";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
      {/* <Text style={styles.custListContentText}>{item.id}</Text> */}
      <Text style={[styles.custListContentText, { flex: 1 }]}>{item.name}</Text>
      <Text style={styles.custListContentText}>{item.phone}</Text>
      <Text style={styles.custListContentText}>{item.address}</Text>
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
    <View style={{ flex: 1 }}>
      {!showCustomerForm ? (
        <View style={styles.customerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Customers</Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={customers}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              stickyHeaderIndices={[0]}
              stickyHeaderHiddenOnScroll={true}
              showsVerticalScrollIndicator={true}
              ListHeaderComponent={() => (
                <View
                  style={[
                    styles.custListItemContainer,
                    styles.custListItemContainerHeader,
                  ]}
                >
                  {/* <Text style={styles.custListHeaderText}>ID</Text> */}
                  <Text style={[styles.custListHeaderText, { flex: 1 }]}>
                    Name
                  </Text>
                  <Text style={styles.custListHeaderText}>Phone</Text>
                  <Text style={styles.custListHeaderText}>Address</Text>
                </View>
              )}
              ListHeaderComponentStyle={styles.custListItemContainerHeader}
              ListEmptyComponent={() => (
                <View style={styles.noCustomerFoundContainer}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    No customers found. Please add some.
                  </Text>
                  <Button
                    title="Add Customer"
                    onPress={() => setShowCustomerForm(true)}
                    color="green"
                  />
                </View>
              )}
              ListFooterComponent={() => <></>}
            />
          </View>
          <View
            style={[
              styles.buttonContainer,
              { display: customers.length > 0 ? "flex" : "none" },
            ]}
          >
            <Button
              title="Add Customer"
              onPress={() => setShowCustomerForm(true)}
              color="green"
            />
            <Button
              title="Clear All Customers"
              onPress={() => clearAllCustomers().then(() => fetchCustomers())}
              color="red"
            />
          </View>
        </View>
      ) : (
        <CustomerForm
          isEditMode={isEditMode}
          onClose={(updated) => handleCloseForm(updated || false)}
          customerData={selectedCustomer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  customerContainer: {
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
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    margin: 0,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 30,
  },
  custListItemContainerHeader: {
    backgroundColor: "#d0d0d0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 0,
  },
  custListHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    width: 120,
    margin: 0,
    padding: 4,
  },
  custListContentText: {
    fontSize: 16,
    fontWeight: "bold",
    width: 120,
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
