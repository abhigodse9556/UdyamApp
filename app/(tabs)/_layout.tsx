import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="home"
              type="MaterialIcons"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: "Sales",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="finance"
              type="MaterialCommunityIcons"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="product"
              type="AntDesign"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="customer"
        options={{
          title: "Customers",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={24}
              name="users-gear"
              type="FontAwesome6"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="user" type="Entypo" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
