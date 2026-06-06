import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, DM_Sans, Space_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hasan-munir-portfolio.vercel.app"),
  title: {
    default: "Hasan Munir — Full-Stack Engineer",
    template: "%s — Hasan Munir",
  },
  description:
    "Full-Stack Software Engineer building production-grade systems with Next.js, React, Node.js, and FastAPI. Based in Pakistan.",
  keywords: [
    "Muhammad Hasan Munir",
    "Full Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "FastAPI",
    "MERN Stack",
    "Software Engineer Portfolio",
  ],
  openGraph: {
    title: "Hasan Munir — Full-Stack Engineer",
    description:
      "Full-Stack Software Engineer building production-grade systems with Next.js, React, Node.js, and FastAPI.",
    url: "https://hasan-munir-portfolio.vercel.app",
    siteName: "Hasan Munir",
    images: [
      {
        url: "https://hasan-munir-portfolio.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Hasan Munir – Full-Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Munir — Full-Stack Engineer",
    description: "Full-Stack Engineer. Next.js · React · Node · FastAPI.",
    images: ["https://hasan-munir-portfolio.vercel.app/og.png"],
  },
  authors: [{ name: "Muhammad Hasan Munir" }],
  creator: "Muhammad Hasan Munir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Hasan Munir",
              url: "https://hasan-munir-portfolio.vercel.app/",
              sameAs: [
                "https://github.com/hasanm4-6",
                "https://www.linkedin.com/in/muhammad-hasan-munir-b9a50b394/",
              ],
              jobTitle: "Full-Stack Software Engineer",
              knowsAbout: [
                "MERN Stack",
                "Next.js",
                "FastAPI",
                "Node.js",
                "MongoDB",
                "System Design",
              ],
            }),
          }}
        />
        {/* 
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K8XQQEBG2R"></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-K8XQQEBG2R');`}
        </script> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K8XQQEBG2R"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K8XQQEBG2R');
          `}
        </Script>
        <meta
          name="google-site-verification"
          content="-Wf8bv6qh5OoGIRwEC8N3n77_9Y_oeWkIEjipzVjhBw"
        />
      </head>
      <body className="font-body bg-bg text-ink">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
