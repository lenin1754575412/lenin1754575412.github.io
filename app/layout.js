import "./globals.css";

export const metadata = {
  title: "Lenin Johan Cojal Valle | Portafolio",
  description:
    "Portafolio profesional estilo podcast de Lenin Johan Cojal Valle. Desarrollo web con Next.js, React, GitHub y Vercel.",
  keywords: [
    "Lenin Johan Cojal Valle",
    "portafolio",
    "desarrollador web",
    "Next.js",
    "React",
    "frontend"
  ],
  authors: [{ name: "Lenin Johan Cojal Valle" }],
  openGraph: {
    title: "Lenin Johan Cojal Valle | Portafolio",
    description:
      "Desarrollo web con Next.js, React, GitHub y Vercel. Páginas web, sistemas y portafolios profesionales.",
    type: "website"
  }
};

export const viewport = {
  themeColor: "#070313"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
