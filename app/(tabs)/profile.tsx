import { StyleSheet, Text, View } from "react-native";

import RegistrationForm from "@/components/forms/registrationForm";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { clearShopOwner, getShopOwner } from "@/services/shopOwner";
import { useCallback, useEffect, useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    shopName: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchShopOwner = useCallback(async () => {
    const owner = await getShopOwner();
    setFormData({
      id: owner?.id || "",
      name: owner?.name || "",
      shopName: owner?.shopName || "",
      phone: owner?.phone || "",
      address: owner?.address || "",
    });
  }, []);
  useEffect(() => {
    fetchShopOwner();
  }, [fetchShopOwner]);
  return (
    <>
      {!isEditing ? (
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
          headerImage={
            <View>
              <IconSymbol
                size={230}
                name="shopping-store"
                type="Fontisto"
                style={styles.headerImage1}
              />
              <IconSymbol
                size={100}
                name="walking"
                type="FontAwesome5"
                style={styles.headerImage2}
              />
            </View>
          }
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText
              type="title"
              style={{
                fontFamily: Fonts.rounded,
              }}
            >
              {formData.shopName}
            </ThemedText>
          </ThemedView>
          <View style={styles.infoContainer}>
            <View
              style={[
                styles.infoLineContainer,
                { backgroundColor: "#4e4e4e61", padding: 10, borderRadius: 8 },
              ]}
            >
              <Text style={styles.infoLineTitle}>Shop Code:</Text>
              <Text style={styles.infoLineValue}>{formData.id}</Text>
            </View>
            <View style={styles.infoLineContainer}>
              <Text style={styles.infoLineTitle}>Owner:</Text>
              <Text style={styles.infoLineValue}>{formData.name}</Text>
            </View>
            <View style={styles.infoLineContainer}>
              <Text style={styles.infoLineTitle}>Phone:</Text>
              <Text style={styles.infoLineValue}>{formData.phone}</Text>
            </View>
            <View style={styles.infoLineContainer}>
              <Text style={styles.infoLineTitle}>Address:</Text>
              <Text style={styles.infoLineValue}>{formData.address}</Text>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <Button
              title="Edit Profile"
              onPress={() => {
                setIsEditing(true);
              }}
            />
            <Button
              title="Logout"
              onPress={() => {
                clearShopOwner();
              }}
              color="red"
            />
          </View>
        </ParallaxScrollView>
      ) : (
        <View style={styles.editContainer}>
          <View
            style={[
              styles.infoLineContainer,
              {
                backgroundColor: "#2b44ff",
                padding: 10,
                borderRadius: 0,
                justifyContent: "center",
              },
            ]}
          >
            <Text style={[styles.infoLineValue, { color: "white" }]}>
              Edit Profile Info
            </Text>
          </View>
          <RegistrationForm
            registeredData={formData}
            isEditMode={true}
            onClose={(updated) => {
              setIsEditing(false);
              if (updated) {
                fetchShopOwner();
              }
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerImage1: {
    color: "#6a6a6a",
    right: 10,
    position: "absolute",
  },
  headerImage2: {
    color: "#6a6a6a",
    top: 150,
    left: 35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  infoContainer: {
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
  },
  infoLineContainer: {
    marginBottom: 10,
    flexDirection: "row",
    gap: 8,
  },
  infoLineTitle: {
    fontWeight: "semibold",
    fontSize: 16,
  },
  infoLineValue: {
    fontWeight: "bold",
    fontSize: 16,
  },
  btnContainer: {
    paddingHorizontal: 16,
    gap: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  editContainer: {
    flex: 1,
    paddingTop: 50,
    gap: 2,
  },
});

export default Profile;
