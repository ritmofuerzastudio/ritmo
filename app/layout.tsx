import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ritmo y Fuerza Studio | Clases de Baile y Kickboxing",
    template: "%s | Ritmo y Fuerza Studio",
  },
  description:
    "Clases profesionales de baile y kickboxing en un ambiente acogedor. ¡Transforma tu cuerpo y mente con nuestros instructores certificados!",
  keywords: [
    "clases de baile",
    "kickboxing",
    "fitness",
    "academia de baile",
    "ritmo y fuerza",
    "baile salsa",
    "baile bachata",
    "defensa personal",
  ],
  authors: [{ name: "Ritmo y Fuerza Studio" }],
  openGraph: {
    title: "Ritmo y Fuerza Studio | Clases de Baile y Kickboxing",
    description:
      "Clases profesionales de baile y kickboxing en un ambiente acogedor. ¡Reserva tu clase gratis hoy!",
    url: "https://ritmoyfuerza.com",
    siteName: "Ritmo y Fuerza Studio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ritmo y Fuerza Studio - Clases de baile y kickboxing",
      },
    ],
    locale: "es_Mx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritmo y Fuerza Studio | Clases de Baile y Kickboxing",
    description:
      "Clases profesionales de baile y kickboxing en un ambiente acogedor. ¡Reserva tu clase gratis hoy!",
    images: ["/images/twitter-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://ritmoyfuerza.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F5CF82" />

        {/* Preconexión y precarga de recursos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/images/hero-bg.jpg" />

        {/* Favicons */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-gray-900`}
      >
        {/* Header global podría ir aquí */}

        <main className="min-h-screen">
          {children}
          <WhatsAppButton />
        </main>

        {/* Footer global podría ir aquí */}

        {/* Schema markup para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DanceSchool",
              name: "Ritmo y Fuerza Studio",
              description:
                "Academia de baile y kickboxing con instructores certificados",
              url: "https://ritmoyfuerza.com",
              logo: "https://ritmoyfuerza.com/images/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Principal 123",
                addressLocality: "Ciudad",
                addressCountry: "ES",
              },
              telephone: "+1234567890",
              openingHours: "Mo-Fr 07:00-22:00, Sa 09:00-18:00",
              priceRange: "$$",
              sameAs: [
                "https://www.facebook.com/ritmoyfuerza",
                "https://www.instagram.com/ritmoyfuerza",
                "https://www.youtube.com/ritmoyfuerza",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
