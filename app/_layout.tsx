import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Stack } from "expo-router";

import { useColorScheme } from "react-native";

import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import { DataProvider } from "@/components/DataProvider";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme as any}>
      <DataProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="admin" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </DataProvider>
    </TamaguiProvider>
  );
}
