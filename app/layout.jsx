export const metadata = {
  title: "Lenin Johan Cojal Valle | Portafolio",
  description: "Portafolio personal de Lenin Johan Cojal Valle. Proyectos web, diseño, programación y trabajos realizados.",
  keywords: ["Lenin Johan Cojal Valle", "portafolio", "programación", "diseño web", "GitHub Pages"],
  authors: [{ name: "Lenin Johan Cojal Valle" }]
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
