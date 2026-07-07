
"use client";

import { useEffect, useState } from "react";

const GITHUB_USER = "lenin1754575412";

export default function Home() {
  const [section, setSection] = useState("inicio");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function cargarProyectos() {
    try {
      setLoading(true);
      const res = await fetch("https://api.github.com/users/" + GITHUB_USER + "/repos?sort=updated&per_page=100");
      const data = await res.json();

      if (Array.isArray(data)) {
        setProjects(data.filter((repo) => !repo.fork));
      }
    } catch (error) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarProyectos();
  }, []);

  const colors = {
    bg: "#050816",
    card: "rgba(15, 23, 42, 0.88)",
    card2: "rgba(2, 6, 23, 0.84)",
    blue: "#38bdf8",
    white: "#ffffff",
    muted: "#cbd5e1",
    line: "rgba(255,255,255,0.12)"
  };

  const styles = {
    main: {
      minHeight: "100vh",
      background: "radial-gradient(circle at top left, rgba(56,189,248,0.30), transparent 34%), radial-gradient(circle at bottom right, rgba(37,99,235,0.32), transparent 35%), linear-gradient(135deg, #050816, #020617)",
      color: colors.white,
      fontFamily: "Arial, Helvetica, sans-serif"
    },
    nav: {
      padding: "16px 7%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 20,
      flexWrap: "wrap",
      background: "rgba(5,8,22,0.94)",
      borderBottom: "1px solid " + colors.line,
      position: "sticky",
      top: 0,
      zIndex: 20
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 13
    },
    logoImg: {
      width: 58,
      height: 58,
      borderRadius: 18,
      boxShadow: "0 0 35px rgba(56,189,248,0.35)"
    },
    menu: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    },
    menuBtn: {
      padding: "10px 15px",
      borderRadius: 999,
      border: "1px solid " + colors.line,
      background: "rgba(15,23,42,0.8)",
      color: colors.white,
      fontWeight: "bold",
      cursor: "pointer"
    },
    active: {
      background: colors.blue,
      color: "#020617",
      border: "1px solid " + colors.blue
    },
    screen: {
      minHeight: "calc(100vh - 90px)",
      padding: "55px 7%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    panel: {
      width: "100%",
      maxWidth: 1200,
      background: colors.card,
      border: "1px solid " + colors.line,
      borderRadius: 34,
      padding: 42,
      boxShadow: "0 35px 110px rgba(0,0,0,0.48)"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 32,
      alignItems: "center"
    },
    tag: {
      display: "inline-block",
      padding: "10px 16px",
      borderRadius: 999,
      background: "rgba(56,189,248,0.14)",
      border: "1px solid rgba(56,189,248,0.35)",
      color: colors.blue,
      fontWeight: "bold",
      marginBottom: 18
    },
    title: {
      fontSize: "clamp(36px, 6vw, 58px)",
      lineHeight: 1.05,
      margin: "0 0 18px"
    },
    h2: {
      color: colors.blue,
      fontSize: "clamp(32px, 5vw, 42px)",
      margin: "0 0 18px"
    },
    p: {
      color: colors.muted,
      fontSize: 18,
      lineHeight: 1.7
    },
    button: {
      padding: "14px 20px",
      borderRadius: 14,
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: 16,
      marginRight: 12,
      marginTop: 12
    },
    primary: {
      background: colors.blue,
      color: "#020617",
      border: "none"
    },
    secondary: {
      background: "transparent",
      color: colors.white,
      border: "1px solid " + colors.blue
    },
    profile: {
      textAlign: "center",
      padding: 36,
      borderRadius: 30,
      background: colors.card2,
      border: "1px solid " + colors.line
    },
    bigLogo: {
      width: 180,
      height: 180,
      borderRadius: 35,
      objectFit: "contain",
      marginBottom: 20,
      boxShadow: "0 0 70px rgba(56,189,248,0.30)"
    },
    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 18,
      marginTop: 30
    },
    card: {
      padding: 24,
      borderRadius: 22,
      background: colors.card2,
      border: "1px solid " + colors.line
    },
    projectCard: {
      minHeight: 230,
      padding: 24,
      borderRadius: 23,
      background: colors.card2,
      border: "1px solid " + colors.line,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    badge: {
      display: "inline-block",
      padding: "7px 12px",
      borderRadius: 999,
      background: "rgba(56,189,248,0.12)",
      color: colors.blue,
      border: "1px solid rgba(56,189,248,0.25)",
      fontSize: 13,
      fontWeight: "bold",
      marginBottom: 12
    },
    link: {
      display: "inline-block",
      marginTop: 14,
      padding: "10px 13px",
      borderRadius: 10,
      background: colors.blue,
      color: "#020617",
      fontWeight: "bold",
      textDecoration: "none"
    }
  };

  function menuButton(name, label) {
    return (
      <button
        style={section === name ? { ...styles.menuBtn, ...styles.active } : styles.menuBtn}
        onClick={() => setSection(name)}
      >
        {label}
      </button>
    );
  }

  return (
    <main style={styles.main}>
      <nav style={styles.nav}>
        <div style={styles.brand}>
          <img src="/logo.svg" alt="Logo Lenin Johan" style={styles.logoImg} />
          <div>
            <h2 style={{ margin: 0 }}>Lenin Johan</h2>
            <span style={{ color: "#94a3b8" }}>Portafolio Web</span>
          </div>
        </div>

        <div style={styles.menu}>
          {menuButton("inicio", "Inicio")}
          {menuButton("sobre", "Sobre m?")}
          {menuButton("habilidades", "Habilidades")}
          {menuButton("proyectos", "Proyectos")}
          {menuButton("contacto", "Contacto")}
        </div>
      </nav>

      <section style={styles.screen}>
        <div style={styles.panel}>
          {section === "inicio" && (
            <div style={styles.grid}>
              <div>
                <span style={styles.tag}>Portafolio Profesional</span>
                <h1 style={styles.title}>
                  Hola, soy <span style={{ color: colors.blue }}>Lenin Johan Cojal Valle</span>
                </h1>
                <p style={styles.p}>
                  Desarrollo p?ginas web modernas, portafolios, sistemas y proyectos usando HTML, CSS, JavaScript, React, Next.js y GitHub.
                </p>
                <button style={{ ...styles.button, ...styles.primary }} onClick={() => setSection("proyectos")}>
                  Ver proyectos
                </button>
                <button style={{ ...styles.button, ...styles.secondary }} onClick={() => setSection("contacto")}>
                  Contactarme
                </button>
              </div>

              <div style={styles.profile}>
                <img src="/logo.svg" alt="Logo Lenin Johan" style={styles.bigLogo} />
                <h2 style={{ margin: 0 }}>Lenin Johan Cojal Valle</h2>
                <p style={styles.p}>Frontend Developer</p>
                <small style={{ color: "#94a3b8" }}>@{GITHUB_USER}</small>
              </div>
            </div>
          )}

          {section === "sobre" && (
            <div>
              <span style={styles.tag}>Sobre m?</span>
              <h2 style={styles.h2}>?Qui?n soy?</h2>
              <p style={styles.p}>
                Soy Lenin Johan Cojal Valle. Estoy construyendo mi portafolio profesional para mostrar mis proyectos, p?ginas web, sistemas, dise?os y trabajos realizados.
              </p>

              <div style={styles.cards}>
                <div style={styles.card}><h3>?? Desarrollo Web</h3><p style={styles.p}>Creo p?ginas modernas, limpias y adaptables a celular.</p></div>
                <div style={styles.card}><h3>?? Proyectos</h3><p style={styles.p}>Mis proyectos p?blicos de GitHub aparecen autom?ticamente.</p></div>
                <div style={styles.card}><h3>?? Objetivo</h3><p style={styles.p}>Mejorar cada d?a y crear proyectos m?s profesionales.</p></div>
              </div>
            </div>
          )}

          {section === "habilidades" && (
            <div>
              <span style={styles.tag}>Tecnolog?as</span>
              <h2 style={styles.h2}>Mis habilidades</h2>
              <p style={styles.p}>Herramientas que uso para crear mis p?ginas y sistemas web.</p>

              <div style={styles.cards}>
                {["HTML", "CSS", "JavaScript", "React", "Next.js", "GitHub", "VS Code", "Dise?o Web"].map((skill) => (
                  <div key={skill} style={{ ...styles.card, textAlign: "center", fontWeight: "bold", color: colors.blue }}>{skill}</div>
                ))}
              </div>
            </div>
          )}

          {section === "proyectos" && (
            <div>
              <span style={styles.tag}>GitHub autom?tico</span>
              <h2 style={styles.h2}>Mis proyectos</h2>
              <p style={styles.p}>Cuando subas nuevos repositorios p?blicos a GitHub, aparecer?n aqu? autom?ticamente.</p>
              <button style={{ ...styles.button, ...styles.secondary }} onClick={cargarProyectos}>Actualizar</button>

              {loading ? (
                <div style={styles.card}>Cargando proyectos desde GitHub...</div>
              ) : (
                <div style={styles.cards}>
                  {projects.length === 0 && <div style={styles.card}>No se pudieron cargar proyectos, pero la p?gina funciona sin errores.</div>}
                  {projects.map((project) => (
                    <div key={project.id} style={styles.projectCard}>
                      <div>
                        <span style={styles.badge}>{project.language || "GitHub"}</span>
                        <h3>{project.name}</h3>
                        <p style={styles.p}>{project.description || "Proyecto p?blico subido a GitHub."}</p>
                      </div>
                      <a href={project.html_url} target="_blank" rel="noreferrer" style={styles.link}>Ver c?digo</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {section === "contacto" && (
            <div>
              <span style={styles.tag}>Contacto</span>
              <h2 style={styles.h2}>Cont?ctame</h2>

              <div style={styles.cards}>
                <div style={styles.card}><b style={{ color: colors.blue }}>Nombre</b><p style={styles.p}>Lenin Johan Cojal Valle</p></div>
                <div style={styles.card}><b style={{ color: colors.blue }}>GitHub</b><p style={styles.p}>{GITHUB_USER}</p></div>
                <div style={styles.card}><b style={{ color: colors.blue }}>Correo</b><p style={styles.p}>cojalvallelenin919@gmail.com</p></div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
