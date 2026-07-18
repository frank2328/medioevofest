import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { FirebaseAnalytics } from "./firebase-analytics";
import "./globals.css";

const displayFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Medioevofest",
  description: "Festival medieval en Cucuta, Colombia.",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/medioevofest_favicon.ico`,
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        {children}
        <FirebaseAnalytics />
      </body>
    </html>
  );
}
