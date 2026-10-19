import React from "react";
import { View } from "react-native";

import { Screen } from "@/components/screen";
import { CompactServiceCard, ServiceCard } from "@/components/service-card";
import { Eyebrow, GroupRule, SectionHeading } from "@/components/ui";
import { useLanguage } from "@/i18n";
import { spacing } from "@/theme";

export default function ServicesScreen() {
  const { t } = useLanguage();

  return (
    <Screen>
      <SectionHeading eyebrow={t.services.tag} title={t.services.title} description={t.services.description} />

      {t.services.categories.map((category) => (
        <View key={category.index} style={{ marginBottom: spacing.section }}>
          <GroupRule label={`${category.index} · ${category.title}`} />

          <View style={{ gap: spacing.gap }}>
            {category.items.map((item, idx) => (
              <ServiceCard key={item.title} item={item} lead={idx === 0} />
            ))}
          </View>
        </View>
      ))}

      <View>
        <Eyebrow style={{ marginBottom: 12 }}>{t.services.extraTitle}</Eyebrow>

        <View style={{ gap: spacing.gap }}>
          {t.services.extras.map((extra) => (
            <CompactServiceCard key={extra.title} item={extra} />
          ))}
        </View>
      </View>
    </Screen>
  );
}
