import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Screen } from "@/components/screen";
import { Body, Card, Display, GroupRule, PrimaryButton, SectionHeading } from "@/components/ui";
import { API_BASE_URL, CONTACT } from "@/config";
import { useLanguage } from "@/i18n";
import { colors, fonts, radius, spacing } from "@/theme";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactScreen() {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0;

  const open = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  const submit = async () => {
    if (!canSubmit || status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), message: message.trim() }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || t.contact.generalError);
      }

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setStatus("sent");
      setName("");
      setPhone("");
      setMessage("");
    } catch (err) {
      // A thrown TypeError here is fetch failing to reach the host at all.
      setError(err instanceof TypeError ? t.contact.networkError : (err as Error).message);
      setStatus("error");
    }
  };

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <Screen>
        <SectionHeading
          eyebrow={t.contact.tag}
          title={`${t.contact.title} ${t.contact.titleHighlight}`}
          description={t.contact.description}
        />

        {/* Direct channels */}
        <View style={{ gap: 10 }}>
          <ContactRow
            icon="call-outline"
            label={t.contact.phone}
            value={CONTACT.phone}
            onPress={() => open(`tel:${CONTACT.phoneDial}`)}
          />
          <ContactRow
            icon="mail-outline"
            label={t.contact.email}
            value={CONTACT.email}
            onPress={() => open(`mailto:${CONTACT.email}`)}
          />
          <ContactRow icon="location-outline" label={t.contact.address} value={t.contact.addressValue} />
        </View>

        <View style={styles.socials}>
          <SocialButton icon="paper-plane-outline" onPress={() => open(CONTACT.telegram)} label="Telegram" />
          <SocialButton icon="logo-instagram" onPress={() => open(CONTACT.instagram)} label="Instagram" />
          <SocialButton icon="logo-linkedin" onPress={() => open(CONTACT.linkedin)} label="LinkedIn" />
        </View>

        {/* Form */}
        <View style={{ marginTop: spacing.section }}>
          <GroupRule label={t.contact.formTitle} />

          {status === "sent" ? (
            <Card accent style={{ alignItems: "center" }}>
              <View style={styles.successMark}>
                <Ionicons name="checkmark" size={26} color={colors.ctaText} />
              </View>
              <Display size={19} style={{ marginTop: 12, textAlign: "center" }}>
                {t.contact.successTitle}
              </Display>
              <Body style={{ marginTop: 6, textAlign: "center" }}>{t.contact.successDesc}</Body>
            </Card>
          ) : (
            <Card>
              <Field
                label={t.contact.nameLabel}
                placeholder={t.contact.namePlaceholder}
                value={name}
                onChangeText={setName}
              />
              <Field
                label={t.contact.phoneLabel}
                placeholder={t.contact.phonePlaceholder}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Field
                label={t.contact.messageLabel}
                placeholder={t.contact.messagePlaceholder}
                value={message}
                onChangeText={setMessage}
                multiline
              />

              {status === "error" ? (
                <Text style={styles.error}>{error}</Text>
              ) : null}

              <PrimaryButton
                label={status === "sending" ? t.contact.submittingBtn : t.contact.submitBtn}
                onPress={submit}
                loading={status === "sending"}
                disabled={!canSubmit}
                style={{ marginTop: 16 }}
              />
            </Card>
          )}
        </View>

        {/* FAQ */}
        <View style={{ marginTop: spacing.section }}>
          <SectionHeading eyebrow={t.faq.tag} title={t.faq.title} description={t.faq.description} />

          <View style={{ gap: 10 }}>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </View>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

function ContactRow({
  icon,
  label,
  value,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
  onPress?: () => void;
}) {
  const content = (
    <Card style={styles.row}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={18} color={colors.glowHighlight} />
      </View>
      <View style={{ flex: 1 }}>
        <Body size={11} muted>
          {label}
        </Body>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      {onPress ? <Ionicons name="chevron-forward" size={16} color={colors.textMuted} /> : null}
    </Card>
  );

  if (!onPress) return content;

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      {({ pressed }) => <View style={pressed && { opacity: 0.75 }}>{content}</View>}
    </Pressable>
  );
}

function SocialButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.social, pressed && { opacity: 0.7 }]}
    >
      <Ionicons name={icon} size={19} color={colors.glowHighlight} />
    </Pressable>
  );
}

function Field({
  label,
  ...input
}: { label: string } & React.ComponentProps<typeof TextInput>) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginBottom: 14 }}>
      <Body size={11.5} muted style={{ marginBottom: 6 }}>
        {label}
      </Body>
      <TextInput
        placeholderTextColor={colors.textMuted}
        {...input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.input, input.multiline && styles.inputMultiline, focused && styles.inputFocused]}
      />
    </View>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((v) => !v);
  };

  return (
    <Pressable onPress={toggle} accessibilityRole="button" accessibilityState={{ expanded: open }}>
      <Card>
        <View style={styles.faqHead}>
          <Text style={styles.faqQuestion}>{question}</Text>
          <Ionicons
            name={open ? "remove" : "add"}
            size={18}
            color={colors.glowHighlight}
            style={{ marginLeft: 10 }}
          />
        </View>
        {open ? <Body size={12.5} style={{ marginTop: 10 }}>{answer}</Body> : null}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 13, padding: 14 },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.accentAmberDim,
    alignItems: "center",
    justifyContent: "center",
  },
  rowValue: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.textPrimary, marginTop: 2 },
  socials: { flexDirection: "row", gap: 10, marginTop: 14 },
  social: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderTint,
    backgroundColor: colors.bgPanel,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: colors.bgBase,
    borderWidth: 1,
    borderColor: colors.borderCard,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textPrimary,
  },
  inputMultiline: { height: 104, textAlignVertical: "top" },
  inputFocused: { borderColor: colors.glowMid },
  error: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: "#ff8f7a", marginTop: 4 },
  successMark: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.glowMid,
    alignItems: "center",
    justifyContent: "center",
  },
  faqHead: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  faqQuestion: { flex: 1, fontFamily: fonts.display, fontSize: 15, color: colors.textPrimary, lineHeight: 21 },
});
