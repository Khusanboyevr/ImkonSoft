import React from "react";
import { View } from "react-native";

import { Screen } from "@/components/screen";
import { TeamCard } from "@/components/team-card";
import { GroupRule, SectionHeading } from "@/components/ui";
import { useLanguage } from "@/i18n";
import { spacing } from "@/theme";
import { TEAM, type Department } from "@shared/team";

/** CEO first, then the two founders — the pyramid flattens to a column on a phone. */
const LEADERSHIP_ORDER = ["center", "left", "right"] as const;

export default function TeamScreen() {
  const { lang, t } = useLanguage();

  const leaders = LEADERSHIP_ORDER.map((position) =>
    TEAM.find((member) => member.leadership?.position === position)
  ).filter((member): member is NonNullable<typeof member> => Boolean(member));

  const groups: { department: Department; label: string }[] = [
    { department: "tech", label: t.team.groupTech },
    { department: "media", label: t.team.groupMedia },
  ];

  return (
    <Screen>
      <SectionHeading eyebrow={t.team.tag} title={t.team.title} description={t.team.description} />

      {leaders.length > 0 ? (
        <View style={{ marginBottom: spacing.section }}>
          <GroupRule label={t.team.groupLeadership} />

          <View style={{ gap: spacing.gap }}>
            {leaders.map((member) => (
              <TeamCard key={member.slug} member={member} badge={member.leadership!.title[lang]} />
            ))}
          </View>
        </View>
      ) : null}

      {groups.map(({ department, label }) => {
        const members = TEAM.filter((member) => member.department === department);
        if (members.length === 0) return null;

        return (
          <View key={department} style={{ marginBottom: spacing.section }}>
            <GroupRule label={label} />

            <View style={{ gap: spacing.gap }}>
              {members.map((member) => (
                <TeamCard key={member.slug} member={member} />
              ))}
            </View>
          </View>
        );
      })}
    </Screen>
  );
}
