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

## Building for the stores

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview   # installable APK
eas build --platform all --profile production    # store builds
```

Bundle IDs are already set in `app.json`: `uz.revengroup.app` on both platforms.
An iOS build needs an Apple Developer account; Android does not until you
publish to Play.
