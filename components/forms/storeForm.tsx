import { graphqlRequest } from "@/services/graphql/client";
import {
  CREATE_STORE,
  CreateStoreResponse,
  Store,
} from "@/services/graphql/store";
import { getUserId, saveStoreDetails } from "@/services/token.service";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "react-native-paper";
import PaperButton from "../ui/paperButton";
import PaperInput from "../ui/paperInput";

type StoreFormProps = {
  userId?: string;
  onClose?: (updated: boolean) => void;
};

const StoreForm = (props: StoreFormProps) => {
  const { userId, onClose } = props;
  const [formData, setFormData] = useState({
    userId: userId || "",
    storeName: "",
    storeShortName: "",
    contactPersonName: "",
    businessEmail: "",
    businessWhatsapp: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    gstin: "",
    licence: "",
  } as Store);

  const handleStoreSave = async () => {
    try {
      await graphqlRequest<CreateStoreResponse>(CREATE_STORE, formData).then(
        async (response) => {
          await saveStoreDetails(response?.createStore);
          router.replace("/(tabs)");
        },
      );
    } catch (error) {
      console.error("Error saving store details:", error);
    }
    onClose?.(true);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const userIdFromStorage = await getUserId();
      if (userIdFromStorage) {
        setFormData({ ...formData, userId: userIdFromStorage });
      }
    };
    if (!userId && !formData.userId) {
      fetchUserId();
    }
  }, [formData, userId]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={160}
      keyboardOpeningTime={10}
    >
      {userId && <Text>User ID: {userId}</Text>}
      <PaperInput
        label="Store Name"
        placeholder="Enter your store name"
        value={formData.storeName}
        onChangeText={(text) => setFormData({ ...formData, storeName: text })}
        autoCapitalize="words"
      />
      <PaperInput
        label="Store Display Name"
        placeholder="Enter your store display name"
        value={formData.storeShortName}
        onChangeText={(text) =>
          setFormData({ ...formData, storeShortName: text })
        }
        autoCapitalize="words"
      />
      <Text variant="titleMedium" style={{ marginVertical: 10 }}>
        Contact Details
      </Text>
      <PaperInput
        label="Contact Person Name"
        placeholder="Enter your contact person name"
        value={formData.contactPersonName}
        onChangeText={(text) =>
          setFormData({ ...formData, contactPersonName: text })
        }
        autoCapitalize="words"
        textContentType="name"
      />
      <PaperInput
        label="Contact Email"
        placeholder="Enter your contact person email"
        value={formData.businessEmail}
        onChangeText={(text) =>
          setFormData({ ...formData, businessEmail: text })
        }
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View
        style={{
          flexDirection: "row",
          //   justifyContent: "space-between",
          gap: 10,
        }}
      >
        <PaperInput
          label="Contact Phone"
          style={{ flex: 1 }}
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />
        <PaperInput
          label="Business Whatsapp"
          style={{ flex: 1 }}
          value={formData.businessWhatsapp}
          onChangeText={(text) =>
            setFormData({ ...formData, businessWhatsapp: text })
          }
          keyboardType="phone-pad"
        />
      </View>
      <Text variant="titleMedium" style={{ marginVertical: 10 }}>
        Store Address
      </Text>
      <PaperInput
        label="Address Line 1"
        value={formData.addressLine1}
        onChangeText={(text) =>
          setFormData({ ...formData, addressLine1: text })
        }
      />
      <PaperInput
        label="Address Line 2"
        value={formData.addressLine2}
        onChangeText={(text) =>
          setFormData({ ...formData, addressLine2: text })
        }
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <PaperInput
          label="City"
          style={{ flex: 1 }}
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
          autoCapitalize="words"
        />
        <PaperInput
          label="State"
          style={{ flex: 1 }}
          value={formData.state}
          onChangeText={(text) => setFormData({ ...formData, state: text })}
          autoCapitalize="words"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <PaperInput
          label="Country"
          value={formData.country}
          editable={false}
          style={{ flex: 1 }}
        />
        <PaperInput
          label="Pincode"
          style={{ flex: 1 }}
          maxLength={6}
          keyboardType="number-pad"
          value={formData.pincode}
          onChangeText={(text) => setFormData({ ...formData, pincode: text })}
        />
      </View>

      <Text variant="titleMedium" style={{ marginVertical: 10 }}>
        Business Details
      </Text>

      <PaperInput
        label="GST Number"
        value={formData.gstin}
        onChangeText={(text) => setFormData({ ...formData, gstin: text })}
      />
      <PaperInput
        label="Business Licence"
        value={formData.licence}
        onChangeText={(text) => setFormData({ ...formData, licence: text })}
      />

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <PaperButton
          title="Cancel"
          mode="outlined"
          onPress={() => router.replace("/register")}
        />
        <PaperButton
          title="Save"
          mode="contained"
          onPress={() => handleStoreSave()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default StoreForm;
