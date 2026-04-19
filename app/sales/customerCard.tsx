import ReferralModal from "@/components/common/referralModal";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Input from "@/components/ui/input";
import ModalDrawer from "@/components/ui/modalDrawer";
import { Customer, getCustomerById, updateCustomer } from "@/services/customer";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SalesContext } from "../context/salesContext";

type CustomerCardProps = {
  customer: Customer;
  onPress: () => void | undefined;
};
const CustomerCard = (props: CustomerCardProps) => {
  const { customer, onPress } = props;
  const salesContextValue = useContext(SalesContext);
  if (!salesContextValue) {
    throw new Error("SalesContext not found. Wrap with SalesProvider.");
  }
  const { setCustomer } = salesContextValue;
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [isReferralModalVisible, setIsReferralModalVisible] = useState(false);
  const [address, setAddress] = useState(customer?.address ?? "");
  const [referral, setReferral] = useState<Customer | undefined>(undefined);
  const saveCustomerAddress = async () => {
    await updateCustomer({ ...customer, address }).then(() => {
      setAddress(customer?.address ?? "");
      setCustomer({ ...customer, address });
    });
    setIsAddressModalVisible(false);
  };

  const saveCustomerReferral = async (referral: Customer) => {
    await updateCustomer({ ...customer, referralSource: referral.id }).then(
      () => {
        setCustomer({
          ...customer,
          referralSource: referral.id,
          customerType: "referral",
        });
      },
    );
    setIsReferralModalVisible(false);
  };

  useEffect(() => {
    if (customer?.referralSource) {
      const fetchReferral = async () => {
        await getCustomerById(customer?.referralSource as string).then((res) =>
          setReferral(res as Customer),
        );
      };
      fetchReferral();
    }
  }, [customer?.referralSource]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[styles.container]}>
        <ThemedView
          lightColor="#f0f4f7"
          darkColor="#282a2d"
          style={[
            styles.custContainer,
            customer?.name
              ? {}
              : {
                  minWidth: 350,
                },
          ]}
        >
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <ThemedView
              lightColor="#a1b6de"
              darkColor="#32476a"
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
                padding: 4,
                width: 50,
                height: 50,
              }}
            >
              {customer?.name ? (
                <IconSymbol
                  name="person-outline"
                  type="Ionicons"
                  size={28}
                  lightColor="#32476a"
                  darkColor="#a1b6de"
                />
              ) : (
                <IconSymbol
                  name="person-add-alt"
                  type="MaterialIcons"
                  size={28}
                  lightColor="#32476a"
                  darkColor="#a1b6de"
                />
              )}
            </ThemedView>
          </View>
          <View
            style={
              customer?.name
                ? { gap: 8 }
                : {
                    gap: 8,
                    alignItems: "center",
                    justifyContent: "center",
                  }
            }
          >
            <TouchableOpacity
              onPress={() => onPress()}
              style={
                customer?.name
                  ? { display: "none" }
                  : {
                      alignItems: "center",
                      justifyContent: "center",
                    }
              }
            >
              <ThemedText
                lightColor="#0f001f"
                darkColor="#0a7ea4"
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Add Customer Details
              </ThemedText>
            </TouchableOpacity>
            <ThemedText
              lightColor="#0f001f"
              darkColor="#e2e2e6"
              type="title"
              style={customer?.name ? undefined : { display: "none" }}
            >
              {customer?.name?.toUpperCase()}
            </ThemedText>
            <ThemedText
              lightColor="#0f001f"
              darkColor="#c2c6d4"
              type="defaultSemiBold"
              style={customer?.email ? undefined : { display: "none" }}
            >
              {customer?.email}
            </ThemedText>
            <ThemedText
              lightColor="#0f001f"
              darkColor="#c2c6d4"
              type="defaultSemiBold"
              style={customer?.phone ? undefined : { display: "none" }}
            >
              +91 {customer?.phone}
            </ThemedText>
          </View>
        </ThemedView>
        <ThemedView
          lightColor="#f0f4f7"
          darkColor="#282a2d"
          style={[
            styles.custContainer,
            customer?.name ? {} : { display: "none" },
          ]}
        >
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <ThemedView
              lightColor="#a1b6de"
              darkColor="#32476a"
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
                padding: 4,
                width: 50,
                height: 50,
              }}
            >
              {customer?.address ? (
                <IconSymbol
                  name="location-outline"
                  type="Ionicons"
                  size={28}
                  lightColor="#32476a"
                  darkColor="#a1b6de"
                />
              ) : (
                <IconSymbol
                  name="not-listed-location"
                  type="MaterialIcons"
                  size={28}
                  lightColor="#32476a"
                  darkColor="#a1b6de"
                />
              )}
            </ThemedView>
          </View>
          <View
            style={
              customer?.name
                ? { gap: 8 }
                : {
                    gap: 8,
                    alignItems: "center",
                    justifyContent: "center",
                  }
            }
          >
            <ThemedText
              lightColor="#0f001f"
              darkColor="#e2e2e6"
              type="subtitle"
            >
              Shipping Address
            </ThemedText>
            <ThemedText
              lightColor="#0f001f"
              darkColor="#c2c6d4"
              type="defaultSemiBold"
              style={
                customer?.address ? { maxWidth: 215 } : { display: "none" }
              }
            >
              {customer?.address}
            </ThemedText>

            <TouchableOpacity
              onPress={() => setIsAddressModalVisible(true)}
              style={
                customer?.address
                  ? { display: "none" }
                  : {
                      alignItems: "center",
                      justifyContent: "center",
                    }
              }
            >
              <ThemedText
                lightColor="#0f001f"
                darkColor="#0a7ea4"
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Add Customer Address
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
        <ThemedView
          lightColor="#f0f4f7"
          darkColor="#282a2d"
          style={[
            styles.custContainer,
            customer?.name ? {} : { display: "none" },
          ]}
        >
          <View style={{ alignItems: "center", justifyContent: "flex-start" }}>
            <ThemedView
              lightColor="#a1b6de"
              darkColor="#32476a"
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 14,
                padding: 4,
                width: 50,
                height: 50,
              }}
            >
              <IconSymbol
                name="person-circle-exclamation"
                type="FontAwesome6"
                size={28}
                lightColor="#32476a"
                darkColor="#a1b6de"
              />
            </ThemedView>
          </View>
          <View
            style={
              customer?.name
                ? { gap: 8 }
                : {
                    gap: 8,
                    alignItems: "center",
                    justifyContent: "center",
                  }
            }
          >
            <ThemedText
              lightColor="#0f001f"
              darkColor="#e2e2e6"
              type="subtitle"
            >
              Refered By
            </ThemedText>
            <ThemedText
              lightColor="#0f001f"
              darkColor="#c2c6d4"
              type="subtitle"
              style={referral?.name ? { maxWidth: 215 } : { display: "none" }}
            >
              {referral?.name}
            </ThemedText>
            <ThemedText
              lightColor="#0f001f"
              darkColor="#c2c6d4"
              type="defaultSemiBold"
              style={referral?.email ? { maxWidth: 215 } : { display: "none" }}
            >
              {referral?.email}
            </ThemedText>
            <ThemedText
              lightColor="#0f001f"
              darkColor="#c2c6d4"
              type="defaultSemiBold"
              style={referral?.phone ? { maxWidth: 215 } : { display: "none" }}
            >
              +91 {referral?.phone}
            </ThemedText>
            <TouchableOpacity
              onPress={() => setIsReferralModalVisible(true)}
              style={
                customer?.referralSource
                  ? { display: "none" }
                  : {
                      alignItems: "center",
                      justifyContent: "center",
                    }
              }
            >
              <ThemedText
                lightColor="#0f001f"
                darkColor="#0a7ea4"
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Add Referral
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
        <ModalDrawer
          isVisible={isAddressModalVisible}
          onClose={() => setIsAddressModalVisible(false)}
          style={styles.addressModalContainer}
        >
          <ThemedView
            lightColor="#f0f4f7"
            darkColor="#282a2d"
            style={styles.modalContentContainer}
          >
            <Input
              label="Address"
              value={address}
              multiline
              numberOfLines={5}
              onChangeText={setAddress}
            />
            <View style={styles.modalBtncontainer}>
              <Button
                title="Cancel"
                onPress={() => setIsAddressModalVisible(false)}
                style={{ width: 75 }}
                darkColor="red"
                lightColor="red"
              />
              <Button
                title="Save"
                onPress={() => saveCustomerAddress()}
                style={{ width: 75 }}
                darkColor="#0a7ea4"
                lightColor="#0a7ea4"
              />
            </View>
          </ThemedView>
        </ModalDrawer>
        <ReferralModal
          showModal={isReferralModalVisible}
          onClose={(referral) => saveCustomerReferral(referral as Customer)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    gap: 20,
  },
  custContainer: {
    flexDirection: "row",
    gap: 20,
    padding: 20,
    borderRadius: 8,
    width: 320,
  },
  addressModalContainer: {
    padding: 20,
    justifyContent: "center",
  },
  modalContentContainer: {
    padding: 20,
    borderRadius: 18,
    justifyContent: "center",
    gap: 20,
  },
  modalBtncontainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-end",
  },
});

export default CustomerCard;
