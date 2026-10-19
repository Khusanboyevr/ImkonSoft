import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Screen } from "@/components/screen";
import { Body, Card, Display, Eyebrow, GhostButton, PrimaryButton, SectionHeading } from "@/components/ui";
import { useLanguage } from "@/i18n";
import { colors, fonts, radius, spacing } from "@/theme";

export default function HomeScreen() {
  const { t } = useLanguage();
  const router = useRouter();

  const heroStats = [t.hero.stat1, t.hero.stat2, t.hero.stat3];

  const about = [
    { title: t.about.feature1Title, description: t.about.feature1Desc },
    { title: t.about.feature2Title, description: t.about.feature2Desc },
    { title: t.about.feature3Title, description: t.about.feature3Desc },
  ];

  const stats = [
    { value: t.stats.stat1Title, label: t.stats.stat1Desc },
    { value: t.stats.stat2Title, label: t.stats.stat2Desc },
    { value: t.stats.stat3Title, label: t.stats.stat3Desc },
    { value: t.stats.stat4Title, label: t.stats.stat4Desc },
  ];

  const steps = [
    { title: t.eventContent.step1Title, description: t.eventContent.step1Desc },
    { title: t.eventContent.step2Title, description: t.eventContent.step2Desc },
    { title: t.eventContent.step3Title, description: t.eventContent.step3Desc },
    { title: t.eventContent.step4Title, description: t.eventContent.step4Desc },
  ];

  return (
    <Screen>
      {/* Hero */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{t.hero.badge}</Text>
      </View>

      <Display size={32} style={{ marginTop: 16 }}>
        {t.hero.title}{" "}
        <Text style={{ color: colors.glowHighlight }}>{t.hero.titleHighlight}</Text>
      </Display>

      <Body size={14} style={{ marginTop: 12 }}>
        {t.hero.description}
      </Body>

      <View style={styles.heroActions}>
        <PrimaryButton label={t.hero.getStarted} onPress={() => router.push("/contact")} />
        <GhostButton label={t.hero.learnMore} onPress={() => router.push("/services")} />
      </View>

      <Body size={12} muted style={{ marginTop: 18 }}>
        {t.hero.trust}
      </Body>

      <View style={styles.heroStats}>
        {heroStats.map((label) => (
          <View key={label} style={styles.heroStat}>
            <View style={styles.tick} />
            <Body size={12}>{label}</Body>
          </View>
        ))}
      </View>

      {/* About */}
      <View style={styles.section}>
        <SectionHeading eyebrow={t.about.tag} title={t.about.title} description={t.about.description} />

        <View style={{ gap: spacing.gap }}>
          {about.map((feature) => (
            <Card key={feature.title}>
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Body style={{ marginTop: 6 }}>{feature.description}</Body>
            </Card>
          ))}
        </View>

        <GhostButton
          label={t.about.teamLink}
          onPress={() => router.push("/team")}
          style={{ marginTop: 18, alignSelf: "flex-start" }}
        />
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <SectionHeading eyebrow={t.stats.tag} title={t.stats.title} description={t.stats.description} />

        <View style={styles.statGrid}>
          {stats.map((stat) => (
            <Card key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Body size={12} muted style={{ marginTop: 4 }}>
                {stat.label}
              </Body>
            </Card>
          ))}
        </View>
      </View>

      {/* Workflow */}
      <View style={styles.section}>
        <SectionHeading
          eyebrow={t.eventContent.tag}
          title={t.eventContent.title}
          description={t.eventContent.description}
        />

        <View style={{ gap: spacing.gap }}>
          {steps.map((step, idx) => (
            <View key={step.title} style={styles.step}>
              <View style={styles.stepIndex}>
                <Text style={styles.stepIndexText}>{idx + 1}</Text>
              </View>
              {idx < steps.length - 1 ? <View style={styles.stepLine} /> : null}
              <View style={styles.stepBody}>
                <Text style={styles.cardTitle}>{step.title}</Text>
                <Body size={12.5} style={{ marginTop: 4 }}>
                  {step.description}
                </Body>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Closing CTA */}
      <Card accent style={[styles.section, styles.cta]}>
        <Eyebrow>{t.clients.tag}</Eyebrow>
        <Display size={21} style={{ marginTop: 8, textAlign: "center" }}>
          {t.footer.ctaTitle}
        </Display>
        <Body style={{ marginTop: 8, textAlign: "center" }}>{t.footer.ctaDesc}</Body>
        <PrimaryButton
          label={t.footer.ctaBtn}
          onPress={() => router.push("/contact")}
          style={{ marginTop: 16, alignSelf: "center" }}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderTint,
    backgroundColor: colors.bgPanel,
  },
  badgeText: {
    fontFamily: fonts.bodySemi,
    fontSize: 10.5,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: colors.glowHighlight,
  },
  heroActions: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 22 },
  heroStats: { marginTop: 14, gap: 8 },
  heroStat: { flexDirection: "row", alignItems: "center", gap: 9 },
  tick: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.glowMid },
  section: { marginTop: spacing.section },
  cardTitle: { fontFamily: fonts.display, fontSize: 16.5, color: colors.textPrimary },
  statGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.gap },
  statCard: { flexBasis: "47%", flexGrow: 1 },
  statValue: { fontFamily: fonts.display, fontSize: 28, color: colors.glowHighlight },
  step: { flexDirection: "row", gap: 14 },
  stepIndex: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.borderTint,
    backgroundColor: colors.bgPanel,
    alignItems: "center",
    justifyContent: "center",
  },
  stepIndexText: { fontFamily: fonts.bodyBold, fontSize: 13, color: colors.glowHighlight },
  stepLine: {
    position: "absolute",
    left: 17,
    top: 34,
    bottom: -spacing.gap,
    width: 1,
    backgroundColor: colors.borderSubtle,
  },
  stepBody: { flex: 1, paddingBottom: 4 },
  cta: { alignItems: "center" },
});
