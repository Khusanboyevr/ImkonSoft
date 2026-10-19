import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Glow } from "@/components/ui";
import { colors, spacing } from "@/theme";

/** Scrolling page body with the section glows the site draws behind each block. */
export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <Glow tone="amber" size={380} top={-140} left={-150} />
      <Glow tone="cool" size={320} top={420} right={-140} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgBase },
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: 24,
    paddingBottom: 48,
  },
});
