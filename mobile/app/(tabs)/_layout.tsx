import React from "react";
import type { ColorValue } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { BrandHeader } from "@/components/brand-header";
import { useLanguage } from "@/i18n";
import { colors, fonts } from "@/theme";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

export default function TabsLayout() {
  const { t } = useLanguage();

  const icon =
    (active: IconName, inactive: IconName) =>
    ({ color, focused }: { color: ColorValue; focused: boolean }) => (
      <Ionicons name={focused ? active : inactive} size={21} color={color as string} />
    );

  return (
    <Tabs
      screenOptions={{
        header: () => <BrandHeader />,
        tabBarActiveTintColor: colors.glowHighlight,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.bgPanel,
          borderTopColor: colors.borderSubtle,
          borderTopWidth: 1,
          height: 62,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontFamily: fonts.bodyMedium, fontSize: 11 },
        sceneStyle: { backgroundColor: colors.bgBase },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: t.nav.home, tabBarIcon: icon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="services"
        options={{ title: t.nav.services, tabBarIcon: icon("grid", "grid-outline") }}
      />
      <Tabs.Screen
        name="team"
        options={{ title: t.nav.about, tabBarIcon: icon("people", "people-outline") }}
      />
      <Tabs.Screen
        name="contact"
        options={{ title: t.nav.contact, tabBarIcon: icon("call", "call-outline") }}
      />
    </Tabs>
  );
}
