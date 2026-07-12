import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Белазица — архива",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk">
      <body>{children}</body>
    </html>
  );
}
