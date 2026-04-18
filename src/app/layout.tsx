import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "שמור · יומן דיגיטלי",
  description: "יומן דיגיטלי אישי – 16 יכולות",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "שמור" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8B2635",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&family=Suez+One&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Cardo:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full overflow-hidden">
        <div id="app" className="h-full flex flex-col overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
