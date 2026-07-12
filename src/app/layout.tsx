import type { Metadata } from "next";
import { FirebaseAnalytics } from "./firebase-analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medioevofest",
  description: "Festival medieval en Cucuta, Colombia.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        {children}
        <FirebaseAnalytics />
      </body>
    </html>
  );
}
