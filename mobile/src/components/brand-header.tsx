import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { useLanguage } from "@/i18n";
import { colors, ctaGradient, fonts, radius } from "@/theme";
import type { Language } from "@shared/translations";

const LANGS: { code: Language; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
];

/** Fixed brand bar with the language switch — the app's answer to the site navbar. */
export function BrandHeader() {
  const insets = useSafeAreaInsets();
  const { lang, setLang } = useLanguage();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 10 }]}>
      <View style={styles.row}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.word}>
          Reven<Text style={styles.wordAccent}> Group</Text>
        </Text>
      </View>

      <View style={styles.switch}>
        {LANGS.map(({ code, label }) => {
          const active = lang === code;

          return (
            <Pressable
              key={code}
              onPress={() => setLang(code)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={styles.langBtn}
            >
              {active ? (
                <LinearGradient
                  colors={[...ctaGradient]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.langFill}
                >
                  <Text style={[styles.langText, { color: colors.ctaText }]}>{label}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.langFill}>
                  <Text style={[styles.langText, { color: colors.textSecondary }]}>{label}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.bgBase,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 9 },
  logo: { width: 28, height: 28 },
  word: { fontFamily: fonts.display, fontSize: 18, color: colors.textPrimary },
  wordAccent: { color: colors.glowHighlight },
  switch: {
    flexDirection: "row",
    padding: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.bgPanel,
    borderWidth: 1,
    borderColor: colors.borderCard,
  },
  langBtn: { borderRadius: radius.pill, overflow: "hidden" },
  langFill: { paddingHorizontal: 12, paddingVertical: 5 },
  langText: { fontFamily: fonts.bodyBold, fontSize: 11 },
});
