import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://rajasaranya.dev"),
  title: "Rajasaranya.T — Software Engineer & AI Builder",
  description:
    "Portfolio of Rajasaranya.T — Software Engineer, AI Builder, and Full-Stack Developer. Building intelligent products, AI systems, and software that goes beyond the expected. Exploring CloudSecOps.",
  keywords: [
    "Rajasaranya",
    "Raja Saranya",
    "Software Engineer",
    "AI Builder",
    "Full Stack Developer",
    "CloudSecOps",
    "Next.js",
    "React",
    "Python",
    "Machine Learning",
    "Portfolio",
    "Chennai",
    "India",
  ],
  authors: [{ name: "Rajasaranya.T" }],
  creator: "Rajasaranya.T",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rajasaranya.dev",
    title: "Rajasaranya.T — Software Engineer & AI Builder",
    description:
      "Building intelligent products, immersive experiences, and software that goes beyond the expected. Exploring CloudSecOps.",
    siteName: "Rajasaranya.T",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajasaranya.T — Software Engineer & AI Builder",
    description:
      "Building intelligent products, immersive experiences, and software that goes beyond the expected.",
    creator: "@rajasaranya",
  },
  robots: { index: true, follow: true },
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
        {/* Inter — body */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Outfit — display/numbers */}
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&display=swap"
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
