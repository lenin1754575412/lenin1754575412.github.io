import "./globals.css";

export const metadata = {
  title: "Lenin Johan Cojal Valle | Portafolio",
  description:
    "Portafolio profesional de Lenin Johan Cojal Valle. Desarrollo web, sistemas, Next.js, React, GitHub y Vercel.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050914",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>

      <body>{children}</body>
    </html>
  );
}
