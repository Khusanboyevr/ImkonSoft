import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Body } from "@/components/ui";
import { TEAM_IMAGES } from "@/data/team-images";
import { useLanguage } from "@/i18n";
import { colors, ctaGradient, fonts, radius } from "@/theme";
import type { TeamMember } from "@shared/team";

/**
 * Card artwork is 3:4 and already carries the name and role, so the caption
 * below repeats it in the UI language and adds the stats.
 */
export function TeamCard({ member, badge }: { member: TeamMember; badge?: string }) {
  const { lang } = useLanguage();
  const source = TEAM_IMAGES[member.slug];

  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        {source ? (
          <Image
            source={source}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={`${member.name} — ${member.role[lang]}`}
          />
        ) : (
          <View style={[styles.image, styles.imageFallback]}>
            <Text style={styles.fallbackLetter}>{member.name.charAt(0)}</Text>
          </View>
        )}
        {/* The artwork fades to near-white at the bottom; this carries it into the caption. */}
        <LinearGradient
          colors={["transparent", "rgba(11,34,45,0.5)", "rgba(15,42,54,0.92)", colors.bgCard]}
          locations={[0.5, 0.78, 0.94, 1]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </View>

      <View style={styles.caption}>
        {badge ? (
          <LinearGradient
            colors={[...ctaGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.badge}
          >
            <Text style={styles.badgeText}>{badge}</Text>
          </LinearGradient>
        ) : null}

        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.role}>{member.role[lang]}</Text>

        <View style={styles.stats}>
          <Body size={11.5} muted>
            {member.experience[lang]}
          </Body>
          {member.output ? (
            <>
              <View style={styles.dot} />
              <Body size={11.5} muted>
                {member.output[lang]}
              </Body>
            </>
          ) : null}
        </View>

        {member.tools ? (
          <View style={styles.tools}>
            {member.tools.map((tool) => (
              <View key={tool} style={styles.tool}>
                <Text style={styles.toolText}>{tool}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.borderCard,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  imageWrap: { aspectRatio: 3 / 4, width: "100%" },
  image: { width: "100%", height: "100%" },
  imageFallback: { backgroundColor: colors.bgPanel, alignItems: "center", justifyContent: "center" },
  fallbackLetter: { fontFamily: fonts.display, fontSize: 56, color: colors.glowHighlight },
  caption: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginBottom: 8,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.ctaText,
  },
  name: { fontFamily: fonts.display, fontSize: 19, color: colors.textPrimary },
  role: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 0.7,
    textTransform: "uppercase",
    color: colors.glowHighlight,
    marginTop: 3,
  },
  stats: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 9 },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: colors.textMuted },
  tools: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 },
  tool: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.accentAmberDim,
    borderWidth: 1,
    borderColor: colors.borderTint,
  },
  toolText: { fontFamily: fonts.bodyMedium, fontSize: 10.5, color: colors.glowHighlight },
});
