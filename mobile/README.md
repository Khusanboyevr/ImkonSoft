# Reven Group — mobile app

The iOS/Android companion to the website in the repository root. Same content,
same palette, same two languages; the layout is rebuilt for one column and a
bottom tab bar instead of a scrolling landing page.

## Running it

```bash
npm install --prefix mobile
npm start --prefix mobile
```

Scan the QR code with **Expo Go** on a phone, or press `a` / `i` / `w` in the
terminal for an Android emulator, an iOS simulator, or the browser.

## How it shares the site's content

Every string and the team roster come from the website's own data files — there
is no second copy to keep in sync:

| Shared file | Used for |
| --- | --- |
| `../src/data/translations.ts` | All UZ/RU copy, imported as `@shared/translations` |
| `../src/data/team.ts` | The roster, groups and leadership, imported as `@shared/team` |

Metro reaches outside the project through `watchFolders` in `metro.config.js`,
and TypeScript resolves the same paths through `tsconfig.json`.

Two things are **not** shared, because native builds need local files:

- **Card artwork.** `assets/team/` holds JPEGs compressed from
  `../public/image/team/` (9.2 MB of PNG down to 0.6 MB). `src/data/team-images.ts`
  maps each slug to its bundled file. Add a new member there as well as in the
  shared roster.
- **Colours and fonts.** `src/theme.ts` mirrors the CSS custom properties in
  `../src/app/globals.css`. Change the brand palette in both.

## Screens

| Route | Tab | Content |
| --- | --- | --- |
| `app/(tabs)/index.tsx` | Asosiy | Hero, about, stats, how a project runs, closing CTA |
| `app/(tabs)/services.tsx` | Xizmatlar | The three service categories plus the extras, each expandable |
| `app/(tabs)/team.tsx` | Biz haqimizda | Leadership first, then the IT and Media groups |
| `app/(tabs)/contact.tsx` | Aloqa | Tap-to-call/mail, socials, the enquiry form, FAQ |

Language is chosen in the header and remembered with AsyncStorage, the same way
the site remembers it in `localStorage`.

## The contact form

The form posts to `/api/contact` on the website, which is where the Telegram bot
credentials live. The app ships no secret of its own — anything bundled into an
APK or IPA can be read straight back out.

Point it somewhere else with `EXPO_PUBLIC_API_BASE_URL`; see `.env.example`.

## Getting it onto phones

Expo Go (above) only works while a computer on the same network is serving the
project. For a real, installable app, build it with EAS. Bundle IDs are already
set in `app.json` (`uz.revengroup.app`), and the profiles below live in
`eas.json`.

```bash
npm install -g eas-cli
eas login            # a free Expo account
eas build --platform android --profile preview
```

That returns a download link for an **APK** — send it to anyone, they install it
directly, no store involved. Android warns about installing outside Play; the
user allows it once.

For the stores:

```bash
eas build --platform android --profile production   # .aab for Google Play
eas build --platform ios --profile production       # .ipa for App Store
```

| Target | What you need | Cost |
| --- | --- | --- |
| APK, shared directly | Expo account | free |
| Google Play | Google Play Developer account | $25 once |
| App Store / TestFlight | Apple Developer Program | $99/year |

iOS has no equivalent of the shared APK — outside the App Store, the only route
is TestFlight, which still needs the Apple account.

Updating later: JS-only changes can ship over the air with `eas update`, without
a new build or store review. Anything that touches native code or `app.json`
needs a fresh build.
