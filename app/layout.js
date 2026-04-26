import localFont from "next/font/local";
import "./globals.css";

const siteUrl = "https://faraazzz31.github.io";
const siteTitle = "Faraaz Ahmed | Software Engineer";
const siteDescription =
  "Hi, I'm Faraaz, a software engineer working across full-stack apps, data pipelines, and ML systems, with an HBSc in CS/Stats from UofT and an MS in CS at Georgia Tech.";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Faraaz Ahmed Portfolio",
  title: {
    default: siteTitle,
    template: "%s | Faraaz Ahmed",
  },
  description: siteDescription,
  keywords: [
    "Faraaz Ahmed",
    "software engineer",
    "full-stack engineer",
    "data engineering",
    "machine learning",
    "University of Toronto",
    "Georgia Tech",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Faraaz Ahmed", url: siteUrl }],
  creator: "Faraaz Ahmed",
  publisher: "Faraaz Ahmed",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Faraaz Ahmed",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Faraaz Ahmed portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport = {
  themeColor: "#151713",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
