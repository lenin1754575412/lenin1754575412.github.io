"use client";

import { useState } from "react";

const GITHUB_USER = "lenin1754575412";

const menuItems = [
  ["inicio", "Inicio"],
  ["servicios", "Servicios"],
  ["habilidades", "Habilidades"],
  ["proyectos", "Proyectos"],
  ["contacto", "Contacto"],
];

const servicios = [
  {
    icon: "WEB",
    title: "Páginas Web",
    text: "Páginas modernas, rápidas y adaptadas a celulares, tablets y computadoras.",
  },
  {
    icon: "SYS",
    title: "Sistemas Web",
    text: "Sistemas para ventas, productos, clientes, inventario y administración.",
  },
  {
    icon: "POR",
    title: "Portafolios",
    text: "Portafolios profesionales para mostrar proyectos, experiencia y contacto.",
  },
  {
    icon: "UI",
    title: "Diseño Responsive",
    text: "Interfaces modernas que se ajustan correctamente a cualquier pantalla.",
  },
  {
    icon: "FIX",
    title: "Corrección de errores",
    text: "Solución de errores en Next.js, React, HTML, CSS, JavaScript y Vercel.",
  },
  {
    icon: "SUP",
    title: "Soporte",
    text: "Configuración de proyectos, GitHub, VS Code, Node.js y despliegues.",
  },
];

const habilidades = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "GitHub",
  "Vercel",
  "VS Code",
];

const fallbackProjects = [
  {
    id: 1,
    name: "Portafolio Personal",
    description: "Portafolio profesional desarrollado con Next.js.",
    html_url:
      "https://github.com/lenin1754575412/lenin1754575412.github.io",
    language: "Next.js",
  },
];

const waveBars = [
  58, 82, 67, 42, 75, 89, 53, 35, 68, 91,
  77, 49, 86, 61, 39, 73, 88, 55, 32, 69,
];

export default function Home() {
  const [section, setSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);

  const [projects, setProjects] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(false);

  async function loadProjects() {
    if (projects || loadingProjects) return;

    setLoadingProjects(true);

    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`
      );

      if (!response.ok) {
        throw new Error("No se pudieron cargar los proyectos");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Respuesta inválida");
      }

      const cleanProjects = data
        .filter((project) => !project.fork)
        .map((project) => ({
          id: project.id,
          name: project.name,
          description:
            project.description || "Proyecto publicado en GitHub.",
          html_url: project.html_url,
          language: project.language || "GitHub",
        }));

      setProjects(
        cleanProjects.length ? cleanProjects : fallbackProjects
      );
    } catch (error) {
      setProjects(fallbackProjects);
    } finally {
      setLoadingProjects(false);
    }
  }

  function changeSection(nextSection) {
    setSection(nextSection);
    setMenuOpen(false);

    if (nextSection === "proyectos") {
      loadProjects();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="site">
      <header className="header">
        <div className="brand">
          <img
            src="/logo.svg"
            alt="Logo de Lenin Johan"
            width="58"
            height="58"
          />

          <div className="brandText">
            <strong>Lenin Johan</strong>
            <span>Portafolio · Podcast</span>
          </div>
        </div>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          {menuItems.map(([id, label]) => (
            <button
              key={id}
              className={section === id ? "active" : ""}
              onClick={() => changeSection(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {section === "inicio" && (
          <section className="hero">
            <div className="heroCopy">
              <div className="badge">
                <span />
                Nuevo episodio disponible
              </div>

              <h1>
                El podcast de mis{" "}
                <span className="gradientText">sistemas.</span>
              </h1>

              <p className="heroDescription">
                Soy <strong>Lenin Johan Cojal Valle</strong>. Aquí presento
                mis servicios y proyectos: páginas web, sistemas,
                portafolios y trabajos desarrollados con Next.js, React,
                GitHub y Vercel.
              </p>

              <div className="heroButtons">
                <button
                  className="primaryButton"
                  onClick={() => changeSection("proyectos")}
                >
                  <span>▶</span>
                  Ver proyectos
                </button>

                <button
                  className="secondaryButton"
                  onClick={() => changeSection("contacto")}
                >
                  Contactarme
                </button>
              </div>
            </div>

            <div className="player">
              <div className="orbArea">
                <div className="orbGlow" />
                <div className="orb">
                  <div className="orbInner" />
                </div>
              </div>

              <div className="playerTitle">
                <h2>Lenin Johan Show</h2>
                <p>Render visual · Frontend Developer</p>
              </div>

              <div className="episode">
                <div className="episodeTop">
                  <strong>Temporada 01 · Proyectos y código</strong>

                  <span className="live">
                    <i />
                    EN VIVO
                  </span>
                </div>

                <div className="wave">
                  {waveBars.map((height, index) => (
                    <i
                      key={index}
                      style={{
                        "--bar-height": `${height}%`,
                        "--delay": `${index * 0.035}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="stats">
                <div>
                  <strong>12+</strong>
                  <span>Proyectos</span>
                </div>

                <div>
                  <strong>Next</strong>
                  <span>Framework</span>
                </div>

                <div>
                  <strong>Vercel</strong>
                  <span>Publicado</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {section === "servicios" && (
          <section className="contentSection">
            <div className="sectionHeader">
              <span className="miniTitle">SERVICIOS</span>

              <h2>
                Lo que puedo <span>crear.</span>
              </h2>

              <p>
                Desarrollo interfaces modernas, sistemas y páginas
                optimizadas para cualquier dispositivo.
              </p>
            </div>

            <div className="cardsGrid">
              {servicios.map((service) => (
                <article className="infoCard" key={service.title}>
                  <div className="cardIcon">{service.icon}</div>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {section === "habilidades" && (
          <section className="contentSection">
            <div className="sectionHeader">
              <span className="miniTitle">TECNOLOGÍAS</span>

              <h2>
                Mis <span>habilidades.</span>
              </h2>

              <p>
                Herramientas utilizadas para crear experiencias web
                modernas, rápidas y responsive.
              </p>
            </div>

            <div className="skillsGrid">
              {habilidades.map((skill, index) => (
                <article className="skillCard" key={skill}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{skill}</strong>
                </article>
              ))}
            </div>
          </section>
        )}

        {section === "proyectos" && (
          <section className="contentSection">
            <div className="sectionHeader">
              <span className="miniTitle">PROYECTOS</span>

              <h2>
                Proyectos de <span>GitHub.</span>
              </h2>

              <p>
                Los proyectos se cargan solamente cuando visitas esta
                sección para que la página inicial abra más rápido.
              </p>
            </div>

            {loadingProjects && (
              <div className="loading">
                <span />
                Cargando proyectos...
              </div>
            )}

            {!loadingProjects && projects && (
              <div className="projectsGrid">
                {projects.map((project) => (
                  <article className="projectCard" key={project.id}>
                    <div className="projectTop">
                      <div className="projectNumber">{"</>"}</div>

                      <span className="language">
                        {project.language}
                      </span>
                    </div>

                    <h3>{project.name}</h3>

                    <p>{project.description}</p>

                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver en GitHub
                      <span>↗</span>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {section === "contacto" && (
          <section className="contentSection contactSection">
            <div className="sectionHeader">
              <span className="miniTitle">CONTACTO</span>

              <h2>
                Hablemos de tu <span>proyecto.</span>
              </h2>

              <p>
                ¿Tienes una idea para una página, sistema o portafolio?
                Puedes contactarme directamente.
              </p>
            </div>

            <div className="contactGrid">
              <article className="contactCard">
                <span>NOMBRE</span>
                <strong>Lenin Johan Cojal Valle</strong>
              </article>

              <article className="contactCard">
                <span>GITHUB</span>
                <strong>@{GITHUB_USER}</strong>
              </article>

              <article className="contactCard">
                <span>CORREO</span>
                <strong className="email">
                  cojalvallelenin919@gmail.com
                </strong>
              </article>
            </div>

            <a
              className="mailButton"
              href="mailto:cojalvallelenin919@gmail.com"
            >
              Enviar correo
            </a>
          </section>
        )}
      </main>

      <footer className="footer">
        <strong>Lenin Johan Cojal Valle</strong>
        <span>© 2026 · Todos los derechos reservados</span>
      </footer>
    </div>
  );
}
