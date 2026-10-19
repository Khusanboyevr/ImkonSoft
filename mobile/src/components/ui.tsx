import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors, ctaGradient, fonts, radius } from "@/theme";

/* ---------- type ---------- */

export function Display({
  children,
  size = 26,
  style,
}: {
  children: React.ReactNode;
  size?: number;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      style={[
        { fontFamily: fonts.display, fontSize: size, lineHeight: size * 1.25, color: colors.textPrimary },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function Body({
  children,
  size = 13,
  muted = false,
  style,
}: {
  children: React.ReactNode;
  size?: number;
  muted?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.body,
          fontSize: size,
          lineHeight: size * 1.6,
          color: muted ? colors.textMuted : colors.textSecondary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

/** The small gold all-caps label that opens every section on the site. */
export function Eyebrow({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.eyebrow, style]}>{children}</Text>;
}

/* ---------- surfaces ---------- */

export function Card({
  children,
  style,
  accent = false,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  accent?: boolean;
}) {
  return (
    <View style={[styles.card, accent && styles.cardAccent, style]}>{children}</View>
  );
}

/**
 * Soft out-of-focus colour blob behind a section, like .imk-section-glow.
 * React Native has no CSS blur, so the falloff is faked with concentric rings —
 * a single translucent circle leaves a visible hard edge.
 */
const GLOW_RINGS = [1, 0.82, 0.64, 0.46, 0.28];

export function Glow({
  tone = "amber",
  size = 320,
  top,
  left,
  right,
}: {
  tone?: "amber" | "cool";
  size?: number;
  top?: number;
  left?: number;
  right?: number;
}) {
  const color = tone === "amber" ? colors.glowOuter : colors.accentCool;

  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", top, left, right, width: size, height: size }}
    >
      {GLOW_RINGS.map((scale) => {
        const ringSize = size * scale;

        return (
          <View
            key={scale}
            style={{
              position: "absolute",
              top: (size - ringSize) / 2,
              left: (size - ringSize) / 2,
              width: ringSize,
              height: ringSize,
              borderRadius: ringSize / 2,
              backgroundColor: color,
              opacity: 0.035,
            }}
          />
        );
      })}
    </View>
  );
}

/* ---------- section heading ---------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <View style={[{ marginBottom: 22 }, centered && { alignItems: "center" }]}>
      {eyebrow ? <Eyebrow style={centered && { textAlign: "center" }}>{eyebrow}</Eyebrow> : null}
      <Display size={24} style={[{ marginTop: 6 }, centered && { textAlign: "center" }]}>
        {title}
      </Display>
      {description ? (
        <Body style={[{ marginTop: 8 }, centered && { textAlign: "center" }]}>{description}</Body>
      ) : null}
    </View>
  );
}

/** Gold rule with a label, used to separate the service and team groups. */
export function GroupRule({ label }: { label: string }) {
  return (
    <View style={styles.groupRule}>
      <Eyebrow>{label}</Eyebrow>
      <View style={styles.groupRuleLine} />
    </View>
  );
}

/* ---------- buttons ---------- */

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  style,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const inactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      style={({ pressed }) => [
        { borderRadius: radius.pill, overflow: "hidden", opacity: inactive ? 0.6 : 1 },
        pressed && !inactive && { transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      <LinearGradient colors={[...ctaGradient]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.primaryBtn}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.ctaText} />
        ) : (
          <Text style={styles.primaryBtnText}>{label}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

export function GhostButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.ghostBtn, pressed && { opacity: 0.75 }, style]}
    >
      <Text style={styles.ghostBtnText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: colors.glowHighlight,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.borderCard,
    borderRadius: radius.lg,
    padding: 18,
  },
  cardAccent: {
    borderColor: colors.borderTint,
    backgroundColor: colors.bgPanel,
  },
  groupRule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  groupRuleLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderCard,
  },
  primaryBtn: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    fontFamily: fonts.bodySemi,
    fontSize: 14,
    color: colors.ctaText,
  },
  ghostBtn: {
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderTint,
    backgroundColor: colors.bgPanel,
    alignItems: "center",
  },
  ghostBtnText: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    color: colors.textPrimary,
  },
});
