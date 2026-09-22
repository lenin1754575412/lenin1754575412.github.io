"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";

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
    number: "01",
    icon: "◈",
    title: "Páginas Web",
    text: "Webs modernas, rápidas y completamente adaptadas para celular, tablet y computadora.",
  },
  {
    number: "02",
    icon: "⌘",
    title: "Sistemas Web",
    text: "Sistemas para ventas, clientes, productos, inventario, administración y más.",
  },
  {
    number: "03",
    icon: "◇",
    title: "Portafolios",
    text: "Portafolios profesionales para mostrar proyectos, experiencia y trabajos realizados.",
  },
  {
    number: "04",
    icon: "✦",
    title: "Diseño Responsive",
    text: "Interfaces que se adaptan correctamente a todas las resoluciones y dispositivos.",
  },
  {
    number: "05",
    icon: "</>",
    title: "Desarrollo",
    text: "Proyectos desarrollados con React, Next.js, JavaScript, HTML y CSS.",
  },
  {
    number: "06",
    icon: "⚡",
    title: "Optimización",
    text: "Mejoras de rendimiento, velocidad, diseño, carga y experiencia de usuario.",
  },
];

const skills = [
  { name: "HTML", level: 94 },
  { name: "CSS", level: 92 },
  { name: "JavaScript", level: 88 },
  { name: "React", level: 86 },
  { name: "Next.js", level: 90 },
  { name: "GitHub", level: 85 },
  { name: "Vercel", level: 88 },
  { name: "Responsive UI", level: 93 },
];

const fallbackProjects = [
  {
    id: 1,
    name: "Portafolio Personal",
    description: "Portafolio profesional desarrollado con Next.js.",
    html_url:
      "https://github.com/lenin1754575412/lenin1754575412.github.io",
    homepage:
      "https://lenin1754575412.github.io",
    language: "Next.js",
  },
];

const waveBars = [
  48, 78, 60, 90, 54, 73, 40, 86, 63, 95,
  47, 71, 88, 52, 76, 43, 91, 66, 82, 56,
];

export default function Home() {
  const rootRef = useRef(null);

  const [section, setSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);

  const [projects, setProjects] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // ==========================================================
  // ANIMACIONES DE FONDO
  // ==========================================================

  useEffect(() => {
    if (!rootRef.current) return;

    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const isMobile = window.innerWidth <= 760;

    if (!isMobile) {
      anime({
        targets: ".anime-dot",
        translateY: () => anime.random(-40, 40),
        translateX: () => anime.random(-25, 25),
        scale: () => anime.random(8, 14) / 10,
        opacity: [0.2, 0.75],
        delay: anime.stagger(180),
        duration: () => anime.random(3500, 6500),
        direction: "alternate",
        easing: "easeInOutSine",
        loop: true,
      });

      anime({
        targets: ".anime-ring-one",
        rotate: 360,
        duration: 18000,
        easing: "linear",
        loop: true,
      });

      anime({
        targets: ".anime-ring-two",
        rotate: -360,
        duration: 24000,
        easing: "linear",
        loop: true,
      });
    }

    return () => {
      anime.remove(".anime-dot");
      anime.remove(".anime-ring-one");
      anime.remove(".anime-ring-two");
    };
  }, []);

  // ==========================================================
  // ANIMACIÓN AL CAMBIAR DE SECCIÓN
  // PROYECTOS NO SE ANIMA NI SE MODIFICA
  // ==========================================================

  useEffect(() => {
    if (section === "proyectos") return;

    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const elements = document.querySelectorAll(
      `[data-current="${section}"] .anime-reveal`
    );

    anime.remove(elements);

    anime({
      targets: elements,
      opacity: [0, 1],
      translateY: [28, 0],
      scale: [0.985, 1],
      delay: anime.stagger(80),
      duration: 650,
      easing: "easeOutExpo",
    });
  }, [section]);

  // ==========================================================
  // HABILIDADES
  // ==========================================================

  useEffect(() => {
    if (section !== "habilidades") return;

    const timeout = setTimeout(() => {
      anime({
        targets: ".skillFill",
        width: (el) => el.dataset.level + "%",
        duration: 1100,
        delay: anime.stagger(100),
        easing: "easeOutExpo",
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [section]);

  // ==========================================================
  // CARGAR PROYECTOS
  // ==========================================================

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
          homepage: project.homepage || "",
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
    <div ref={rootRef} className="site">
      {/* FONDO ANIMADO */}

      <div className="ambient" aria-hidden="true">
        <div className="ambientGlow glowOne" />
        <div className="ambientGlow glowTwo" />

        <span className="anime-dot dot1" />
        <span className="anime-dot dot2" />
        <span className="anime-dot dot3" />
        <span className="anime-dot dot4" />
        <span className="anime-dot dot5" />
      </div>

      {/* HEADER */}

      <header className="header">
        <button
          className="brand"
          onClick={() => changeSection("inicio")}
        >
          <div className="logoWrap">
            <img
              src="/logo.svg"
              alt="Lenin Johan"
              width="55"
              height="55"
            />

            <span className="onlineDot" />
          </div>

          <div className="brandText">
            <strong>Lenin Johan</strong>
            <span>Portafolio · Podcast</span>
          </div>
        </button>

        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
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
        {/* ====================================================
            INICIO
        ==================================================== */}

        {section === "inicio" && (
          <section
            className="homeHero"
            data-current="inicio"
          >
            <div className="heroGrid">
              <div className="heroContent">
                <div className="statusBadge anime-reveal">
                  <span className="pulseDot" />
                  Disponible para nuevos proyectos
                </div>

                <div className="heroEyebrow anime-reveal">
                  PORTAFOLIO DIGITAL / 2026
                </div>

                <h1 className="anime-reveal">
                  Creo experiencias
                  <span> digitales</span>
                  <br />
                  que se sienten
                  <em> vivas.</em>
                </h1>

                <p className="heroDescription anime-reveal">
                  Soy <strong>Lenin Johan Cojal Valle</strong>.
                  Desarrollo páginas web, sistemas y experiencias
                  interactivas usando Next.js, React, GitHub y
                  Vercel.
                </p>

                <div className="heroActions anime-reveal">
                  <button
                    className="mainButton"
                    onClick={() => changeSection("proyectos")}
                  >
                    <span className="playIcon">▶</span>

                    <span>
                      Ver proyectos
                      <small>Mis últimos trabajos</small>
                    </span>

                    <b>↗</b>
                  </button>

                  <button
                    className="outlineButton"
                    onClick={() => changeSection("contacto")}
                  >
                    Contactarme
                  </button>
                </div>

                <div className="miniStats anime-reveal">
                  <div>
                    <strong>12+</strong>
                    <span>Proyectos</span>
                  </div>

                  <i />

                  <div>
                    <strong>Next.js</strong>
                    <span>Framework</span>
                  </div>

                  <i />

                  <div>
                    <strong>100%</strong>
                    <span>Responsive</span>
                  </div>
                </div>
              </div>

              <div className="visualSide anime-reveal">
                <div className="visualCard">
                  <div className="visualTop">
                    <span>
                      <i />
                      LIVE SYSTEM
                    </span>

                    <small>01 / 06</small>
                  </div>

                  <div className="orbStage">
                    <div className="anime-ring-one orbitRing ringOne" />
                    <div className="anime-ring-two orbitRing ringTwo" />

                    <div className="orbGlow" />

                    <div className="mainOrb">
                      <div className="orbInside" />
                    </div>

                    <div className="orbitDot orbitDotOne" />
                    <div className="orbitDot orbitDotTwo" />
                  </div>

                  <div className="showInfo">
                    <div>
                      <small>NOW PLAYING</small>

                      <h2>Lenin Johan Show</h2>

                      <p>Frontend · Design · Development</p>
                    </div>

                    <button>▶</button>
                  </div>

                  <div className="audioPanel">
                    <div className="audioHeader">
                      <strong>
                        Temporada 01 · Proyectos y código
                      </strong>

                      <span>
                        <i />
                        EN VIVO
                      </span>
                    </div>

                    <div className="wave">
                      {waveBars.map((height, index) => (
                        <b
                          key={index}
                          style={{
                            "--bar-height": `${height}%`,
                            "--delay": `${index * 0.04}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ====================================================
            SERVICIOS
        ==================================================== */}

        {section === "servicios" && (
          <section
            className="animatedSection"
            data-current="servicios"
          >
            <div className="sectionTop anime-reveal">
              <span className="sectionNumber">01</span>

              <div>
                <span className="miniTitle">SERVICIOS</span>

                <h2>
                  Diseño, código y
                  <span> creatividad.</span>
                </h2>

                <p>
                  Desarrollo experiencias digitales modernas con
                  atención al diseño, rendimiento y adaptación a
                  dispositivos móviles.
                </p>
              </div>
            </div>

            <div className="servicesGrid">
              {servicios.map((service) => (
                <article
                  className="serviceCard anime-reveal"
                  key={service.title}
                >
                  <div className="serviceTop">
                    <span className="serviceNumber">
                      {service.number}
                    </span>

                    <div className="serviceIcon">
                      {service.icon}
                    </div>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>

                  <div className="serviceLine" />
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ====================================================
            HABILIDADES
        ==================================================== */}

        {section === "habilidades" && (
          <section
            className="animatedSection"
            data-current="habilidades"
          >
            <div className="sectionTop anime-reveal">
              <span className="sectionNumber">02</span>

              <div>
                <span className="miniTitle">STACK</span>

                <h2>
                  Herramientas que
                  <span> utilizo.</span>
                </h2>

                <p>
                  Tecnologías que utilizo para construir interfaces,
                  sistemas y proyectos web.
                </p>
              </div>
            </div>

            <div className="skillsArea">
              <div className="skillsList">
                {skills.map((skill, index) => (
                  <article
                    className="skillItem anime-reveal"
                    key={skill.name}
                  >
                    <div className="skillInfo">
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <strong>{skill.name}</strong>

                      <em>{skill.level}%</em>
                    </div>

                    <div className="skillTrack">
                      <div
                        className="skillFill"
                        data-level={skill.level}
                      />
                    </div>
                  </article>
                ))}
              </div>

              <div className="techPanel anime-reveal">
                <div className="terminalTop">
                  <span />
                  <span />
                  <span />

                  <p>portfolio.js</p>
                </div>

                <div className="terminalCode">
                  <p>
                    <span>const</span> developer = {"{"}
                  </p>

                  <p>
                    &nbsp;&nbsp;name:
                    <em> "Lenin Johan"</em>,
                  </p>

                  <p>
                    &nbsp;&nbsp;frontend:
                    <em> true</em>,
                  </p>

                  <p>
                    &nbsp;&nbsp;responsive:
                    <em> true</em>,
                  </p>

                  <p>
                    &nbsp;&nbsp;creative:
                    <em> true</em>
                  </p>

                  <p>{"};"}</p>

                  <div className="terminalCursor">
                    _
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ====================================================
            PROYECTOS
            SE MANTIENE SIN ANIMACIONES Y CON LOS DOS BOTONES
        ==================================================== */}

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
                  <article
                    className="projectCard"
                    key={project.id}
                  >
                    <div className="projectTop">
                      <div className="projectNumber">
                        {"</>"}
                      </div>

                      <span className="language">
                        {project.language}
                      </span>
                    </div>

                    <h3>{project.name}</h3>

                    <p>{project.description}</p>

                    <div className="projectActions">
                      <a
                        className="projectButton codeButton"
                        href={project.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{"</>"}</span>
                        Ver código
                      </a>

                      {project.homepage && (
                        <a
                          className="projectButton pageButton"
                          href={project.homepage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>↗</span>
                          Ver página
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ====================================================
            CONTACTO
        ==================================================== */}

        {section === "contacto" && (
          <section
            className="contactNew"
            data-current="contacto"
          >
            <div className="contactGlow" />

            <div className="contactContent">
              <div className="anime-reveal">
                <span className="miniTitle">
                  CONTACTO / 04
                </span>

                <h2>
                  ¿Tienes una idea?
                  <br />
                  <span>Hagámosla realidad.</span>
                </h2>

                <p>
                  Si necesitas una página web, sistema, portafolio o
                  quieres mejorar un proyecto existente, puedes
                  contactarme directamente.
                </p>
              </div>

              <div className="contactActions anime-reveal">
                <a
                  className="bigMail"
                  href="mailto:cojalvallelenin919@gmail.com"
                >
                  <div>
                    <small>ENVIAR MENSAJE</small>
                    <strong>
                      cojalvallelenin919@gmail.com
                    </strong>
                  </div>

                  <span>↗</span>
                </a>

                <div className="contactMiniGrid">
                  <div>
                    <small>NOMBRE</small>
                    <strong>
                      Lenin Johan Cojal Valle
                    </strong>
                  </div>

                  <div>
                    <small>GITHUB</small>
                    <strong>
                      @{GITHUB_USER}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <strong>Lenin Johan Cojal Valle</strong>

        <span>
          Diseño · Desarrollo · Creatividad
        </span>

        <small>
          © 2026 · Todos los derechos reservados
        </small>
      </footer>
    </div>
  );
}
