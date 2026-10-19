import React, { useState } from "react";
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from "react-native";

import { Body, Card } from "@/components/ui";
import { useLanguage } from "@/i18n";
import { colors, fonts, radius } from "@/theme";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Service {
  title: string;
  description: string;
  details: string;
  style?: string;
}

/**
 * The site shows these in a bento grid; a phone is one column, so the hierarchy
 * moves into the card itself — accent cards get the gold rail and heavier title.
 */
export function ServiceCard({ item, lead = false }: { item: Service; lead?: boolean }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const accent = lead || item.style === "amber";

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };

  return (
    <Card accent={accent} style={styles.card}>
      {accent ? <View style={styles.rail} /> : null}

      <Text style={[styles.title, accent && styles.titleAccent]}>{item.title}</Text>
      <Body style={{ marginTop: 6 }}>{item.description}</Body>

      {open ? (
        <View style={styles.details}>
          <Body size={12.5}>{item.details}</Body>
        </View>
      ) : null}

      <Pressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={({ pressed }) => [styles.toggle, pressed && { opacity: 0.7 }]}
      >
        <Text style={styles.toggleIcon}>{open ? "×" : "+"}</Text>
        <Text style={styles.toggleText}>{open ? t.services.close : t.services.readMore}</Text>
      </Pressable>
    </Card>
  );
}

/** Compact row for the supplementary services, which carry an emoji instead of artwork. */
export function CompactServiceCard({
  item,
}: {
  item: { emoji: string; title: string; description: string; details: string };
}) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };

  return (
    <Pressable onPress={toggle} accessibilityRole="button" accessibilityState={{ expanded: open }}>
      <Card style={styles.compact}>
        <View style={styles.compactRow}>
          <View style={styles.emojiWrap}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Body size={12.5} style={{ marginTop: 3 }}>
              {item.description}
            </Body>
          </View>
          <Text style={styles.toggleIcon}>{open ? "×" : "+"}</Text>
        </View>

        {open ? (
          <View style={styles.details}>
            <Body size={12.5}>{item.details}</Body>
          </View>
        ) : null}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { overflow: "hidden" },
  rail: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.glowMid,
  },
  title: { fontFamily: fonts.display, fontSize: 16.5, color: colors.textPrimary },
  titleAccent: { fontSize: 19, color: colors.glowHighlight },
  details: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  toggle: {
    marginTop: 14,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderTint,
  },
  toggleIcon: { fontFamily: fonts.bodyMedium, fontSize: 16, color: colors.glowHighlight },
  toggleText: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.textPrimary },
  compact: { padding: 15 },
  compactRow: { flexDirection: "row", alignItems: "center", gap: 13 },
  emojiWrap: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    backgroundColor: colors.accentAmberDim,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 19 },
});
