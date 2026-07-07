import "./globals.css";

export const metadata = {
  title: "Lenin Johan Cojal Valle | Portafolio",
  description: "Portafolio profesional de Lenin Johan Cojal Valle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
