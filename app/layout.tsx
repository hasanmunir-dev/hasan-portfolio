import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { Backdrop } from "@/components/backdrop";
import { CustomCursor } from "@/components/cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { NavProgress } from "@/components/nav-progress";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PERSON_ID, SITE_URL, SOCIAL_PROFILES } from "@/lib/site";
import { PERSON_DESCRIPTION, KNOWS_ABOUT } from "@/lib/data/about";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const spaceMono = localFont({
  src: [
    { path: "../assets/fonts/Space_Mono/SpaceMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Space_Mono/SpaceMono-Italic.ttf", weight: "400", style: "italic" },
    { path: "../assets/fonts/Space_Mono/SpaceMono-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/fonts/Space_Mono/SpaceMono-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hasanmunir.dev"),
  applicationName: "Hasan Munir",
  themeColor: "#030303",
  colorScheme: "dark",
  title: {
    default: "Hasan Munir - Full-Stack Engineer",
    template: "%s - Hasan Munir",
  },
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
  formatDetection: { email: false, address: false, telephone: false },
  description:
    "Hasan Munir, a Full-Stack Software Engineer from Pakistan specializing in Next.js, React, FastAPI, Node.js, Supabase, and scalable web applications.",
  keywords: [
    "Muhammad Hasan Munir",
    "Muhammad H Hasan Munir",
    "Muhammad H. Hasan Munir",
    "Muhammad Hasan M",
    "M Hasan Munir",
    "M. Hasan Munir",
    "Hasan Munir",
    "Hasan M",
    "H Munir",
    "H. Munir",
    "HM",
    "H M",
    "H.M",
    "MHM",

    "Hasan Munir Dev",
    "Dev Hasan Munir",
    "Developer Hasan Munir",
    "Muhammad Hasan Munir Dev",
    "M Hasan Munir Dev",
    "Muhammad Hasan Munir Developer",
    "Hasan Munir Developer",
    "Muhammad Hasan Munir Software Engineer",
    "Hasan Munir Software Engineer",
    "M Hasan Munir Software Engineer",

    "Software Engineer",
    "Full Stack Software Engineer",
    "Full Stack Engineer",
    "Full Stack Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "FastAPI Developer",
    "Supabase Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Python Developer",

    "Software Engineer Hasan Munir",
    "Software Engineer Muhammad Hasan Munir",
    "Software Engineer M Hasan Munir",

    "Full Stack Engineer Hasan Munir",
    "Full Stack Engineer Muhammad Hasan Munir",
    "Full Stack Software Engineer Hasan Munir",
    "Full Stack Software Engineer Muhammad Hasan Munir",

    "Full Stack Developer Hasan Munir",
    "Full Stack Developer Muhammad Hasan Munir",

    "React Developer Hasan Munir",
    "React Developer Muhammad Hasan Munir",

    "Next.js Developer Hasan Munir",
    "Next.js Developer Muhammad Hasan Munir",

    "FastAPI Developer Hasan Munir",
    "FastAPI Developer Muhammad Hasan Munir",

    "Supabase Developer Hasan Munir",
    "Supabase Developer Muhammad Hasan Munir",

    "MERN Stack Developer Hasan Munir",
    "MERN Stack Developer Muhammad Hasan Munir",

    "Node.js Developer Hasan Munir",
    "Python Developer Hasan Munir",

    "Hasan Munir Portfolio",
    "Muhammad Hasan Munir Portfolio",
    "M Hasan Munir Portfolio",
    "Software Engineer Portfolio",
    "Full Stack Portfolio",
    "Developer Portfolio",
    "React Portfolio",
    "Next.js Portfolio",
    "FastAPI Portfolio",
    "MERN Portfolio",

    "React",
    "Next.js",
    "NextJS",
    "Node.js",
    "NodeJS",
    "Express.js",
    "FastAPI",
    "Supabase",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Tailwind",
    "Shadcn UI",
    "shadcn",
    "TypeScript",
    "JavaScript",
    "Python",
    "REST API",
    "JWT Authentication",

    "React Next.js Developer",
    "Next.js FastAPI Developer",
    "MERN Stack Engineer",
    "React FastAPI Developer",
    "Supabase Next.js Developer",
    "Full Stack React Developer",
    "Full Stack Next.js Developer",
    "Modern Web Developer",

    "Hire Hasan Munir",
    "Hire Software Engineer",
    "Hire Full Stack Developer",
    "Hire React Developer",
    "Hire Next.js Developer",
    "Hire FastAPI Developer",
    "Freelance Software Engineer",
    "Remote Software Engineer",
    "Remote Full Stack Developer",
    "Professional Software Engineer",
    "Experienced Full Stack Developer",
  ],
  openGraph: {
    title: "Hasan Munir - Full-Stack Engineer",
    description:
      "Hasan Munir, a Full-Stack Software Engineer from Pakistan specializing in Next.js, React, FastAPI, Node.js, Supabase, and scalable web applications.",
    url: "https://hasanmunir.dev",
    siteName: "Hasan Munir",
    images: [
      {
        url: "/og/og.jpg",
        width: 1200,
        height: 630,
        alt: "Hasan Munir - Full-Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasan Munir - Full-Stack Engineer",
    description: "Hasan Munir, a Full-Stack Software Engineer from Pakistan specializing in Next.js, React, FastAPI, Node.js, Supabase, and scalable web applications.",
    images: ["/og/og.jpg"],
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
              "@graph": [
                {
                  "@type": "Person",
                  "@id": PERSON_ID,
                  name: "Muhammad Hasan Munir",
                  alternateName: "Hasan Munir",
                  url: `${SITE_URL}/`,
                  mainEntityOfPage: `${SITE_URL}/about`,
                  sameAs: SOCIAL_PROFILES,
                  jobTitle: "Full-Stack Software Engineer",
                  description: PERSON_DESCRIPTION,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lahore",
                    addressCountry: "PK",
                  },
                  worksFor: { "@type": "Organization", name: "TSN" },
                  knowsAbout: KNOWS_ABOUT,
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: `${SITE_URL}/`,
                  name: "Hasan Munir",
                  description: PERSON_DESCRIPTION,
                  publisher: { "@id": PERSON_ID },
                  inLanguage: "en",
                },
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
          src="https://www.googletagmanager.com/gtag/js?id=G-XJG9GJEDW2"
          strategy="lazyOnload"
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XJG9GJEDW2');
          `}
        </Script>
      </head>
      <body className="font-body bg-bg text-ink">
        <Backdrop />
        <CustomCursor />
        <NavProgress />
        <ScrollProgress />
        <Navigation />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
