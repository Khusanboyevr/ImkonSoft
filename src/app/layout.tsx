import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Layout, FixedPlugin, LogoIntro } from "@/components";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reven Group - Zamonaviy IT Xizmatlari va Dasturiy Yechimlar",
  description:
    "Reven Group - Sizning biznesingiz uchun innovatsion va ishonchli dasturiy ta'minot yechimlari, IT-konsalting va raqamli transformatsiya xizmatlari.",
  icons: {
    icon: "/image/logo.svg",
  },
  openGraph: {
    images: ["/image/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-site="YOUR_DOMAIN_HERE"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        ></script>
      </head>
      <body className={`${fraunces.variable} ${inter.variable} font-body`}>
        <LogoIntro />
        <Layout>
          {children}
          <FixedPlugin />
        </Layout>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </body>
    </html>
  );
}
