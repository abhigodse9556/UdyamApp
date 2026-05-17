import { StyleSheet } from "react-native";

import RegistrationForm from "@/components/forms/registrationForm";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import PaperButton from "@/components/ui/paperButton";
import { Fonts } from "@/constants/theme";
import { graphqlRequest } from "@/services/graphql/client";
import { LOGOUT_USER } from "@/services/graphql/user";
import { getShopOwner } from "@/services/shopOwner";
import { clearTokens, getRefreshToken } from "@/services/token.service";
import { router } from "expo-router";
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

  const handleLogout = async () => {
    try {
      const refreshToken = await getRefreshToken();

      if (refreshToken) {
        await graphqlRequest(LOGOUT_USER, { refreshToken });
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      // ALWAYS clear local auth
      await clearTokens();

      router.replace("/login");
    }
  };

  useEffect(() => {
    fetchShopOwner();
  }, [fetchShopOwner]);
  return (
    <>
      {!isEditing ? (
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
          headerImage={
            <ThemedView>
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
            </ThemedView>
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
          <ThemedView style={styles.infoContainer}>
            <ThemedView
              style={[
                styles.infoLineContainer,
                { backgroundColor: "#4e4e4e61", padding: 10, borderRadius: 8 },
              ]}
            >
              <ThemedText style={styles.infoLineTitle}>Shop Code:</ThemedText>
              <ThemedText style={styles.infoLineValue}>
                {formData.id}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoLineContainer}>
              <ThemedText style={styles.infoLineTitle}>Owner:</ThemedText>
              <ThemedText style={styles.infoLineValue}>
                {formData.name}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoLineContainer}>
              <ThemedText style={styles.infoLineTitle}>Phone:</ThemedText>
              <ThemedText style={styles.infoLineValue}>
                {formData.phone}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.infoLineContainer}>
              <ThemedText style={styles.infoLineTitle}>Address:</ThemedText>
              <ThemedText style={styles.infoLineValue}>
                {formData.address}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.btnContainer}>
            <PaperButton
              title="Edit Profile"
              onPress={() => {
                setIsEditing(true);
              }}
              mode="contained"
            />
            <PaperButton
              title="Logout"
              onPress={() => {
                handleLogout();
              }}
              mode="contained"
            />
          </ThemedView>
        </ParallaxScrollView>
      ) : (
        <ThemedView style={styles.editContainer}>
          <ThemedView
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
            <ThemedText style={[styles.infoLineValue, { color: "white" }]}>
              Edit Profile Info
            </ThemedText>
          </ThemedView>
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
        </ThemedView>
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
