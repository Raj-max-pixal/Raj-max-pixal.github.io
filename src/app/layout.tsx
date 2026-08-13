import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://rajasaranya.dev"),
  title: "Raja Saranya T — Software Engineer & AI Builder",
  description:
    "Portfolio of Raja Saranya T — Software Engineer, AI Builder, and Full-Stack Developer building intelligent products, immersive experiences, and software that goes beyond the expected.",
  keywords: [
    "Raja Saranya",
    "Software Engineer",
    "AI Builder",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Python",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Raja Saranya T" }],
  creator: "Raja Saranya T",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rajasaranya.dev",
    title: "Raja Saranya T — Software Engineer & AI Builder",
    description:
      "Building intelligent products, immersive experiences, and software that goes beyond the expected.",
    siteName: "Raja Saranya T",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raja Saranya T — Software Engineer & AI Builder",
    description:
      "Building intelligent products, immersive experiences, and software that goes beyond the expected.",
    creator: "@rajasaranya",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
