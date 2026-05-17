import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-get-random-values";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <Stack>
          {/* Entry point */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          {/* Register screen */}
          <Stack.Screen name="register" options={{ headerShown: false }} />
          {/* Login screen */}
          <Stack.Screen name="login" options={{ headerShown: false }} />
          {/* Tabs */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* Store Register screen */}
          <Stack.Screen name="store" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </ThemeProvider>
  );
}
