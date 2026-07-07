"use client";

import { useEffect, useMemo, useState } from "react";

const GITHUB_USER = "lenin1754575412";

const fallbackProjects = [
  {
    id: "local-1",
    name: "Portafolio Personal",
    description: "Mi portafolio profesional creado con Next.js, React y GitHub.",
    url: "https://github.com/lenin1754575412/lenin1754575412.github.io",
    web: "",
    language: "Next.js",
  },
  {
    id: "local-2",
    name: "Página de Motos",
    description: "Proyecto web moderno enfocado en motos, diseño visual y secciones informativas.",
    url: "https://github.com/lenin1754575412",
    web: "",
    language: "Web",
  },
  {
    id: "local-3",
    name: "Sistema de Ventas",
    description: "Sistema pensado para ferretería, ropa y electrodomésticos.",
    url: "https://github.com/lenin1754575412",
    web: "",
    language: "Sistema",
  },
];

export default function Home() {
  const [section, setSection] = useState("inicio");
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [projectPage, setProjectPage] = useState(1);

  const perPage = 6;

  async function cargarProyectos() {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`
      );

      const data = await res.json();

      if (!Array.isArray(data)) {
        setProjects(fallbackProjects);
        return;
      }

      const repos = data
        .filter((repo) => !repo.fork)
        .map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "Proyecto público subido a GitHub.",
          url: repo.html_url,
          web: repo.homepage || "",
          language: repo.language || "GitHub",
        }));

      setProjects(repos.length > 0 ? repos : fallbackProjects);
    } catch (error) {
      console.log("Error cargando proyectos:", error);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarProyectos();

    const timer = setInterval(() => {
      cargarProyectos();
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const totalPages = Math.max(1, Math.ceil(projects.length / perPage));

  const visibleProjects = useMemo(() => {
    const start = (projectPage - 1) * perPage;
    return projects.slice(start, start + perPage);
  }, [projects, projectPage]);

  function cambiarSeccion(nombre) {
    setSection(nombre);
    setProjectPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      <nav className="navbar">
        <div className="brand">
          <div className="brandIcon">LJ</div>
          <div>
            <h2>Lenin Johan</h2>
            <span>Portafolio Web</span>
          </div>
        </div>

        <div className="menu">
          <button onClick={() => cambiarSeccion("inicio")} className={section === "inicio" ? "active" : ""}>Inicio</button>
          <button onClick={() => cambiarSeccion("sobre")} className={section === "sobre" ? "active" : ""}>Sobre mí</button>
          <button onClick={() => cambiarSeccion("habilidades")} className={section === "habilidades" ? "active" : ""}>Habilidades</button>
          <button onClick={() => cambiarSeccion("proyectos")} className={section === "proyectos" ? "active" : ""}>Proyectos</button>
          <button onClick={() => cambiarSeccion("contacto")} className={section === "contacto" ? "active" : ""}>Contacto</button>
        </div>
      </nav>

      <section className="screen">
        <div className="panel">
          {section === "inicio" && (
            <div className="heroGrid">
              <div>
                <span className="tag">Portafolio Profesional</span>
                <h1>Hola, soy <b>Lenin Johan Cojal Valle</b></h1>
                <p>
                  Desarrollo páginas web modernas, portafolios, sistemas y proyectos
                  usando HTML, CSS, JavaScript, React, Next.js y GitHub.
                </p>

                <div className="heroStats">
                  <div>
                    <b>{projects.length}+</b>
                    <span>Proyectos</span>
                  </div>
                  <div>
                    <b>Web</b>
                    <span>Diseño moderno</span>
                  </div>
                  <div>
                    <b>GitHub</b>
                    <span>Automático</span>
                  </div>
                </div>

                <div className="buttons">
                  <button className="btnPrimary" onClick={() => cambiarSeccion("proyectos")}>
                    Ver proyectos
                  </button>
                  <button className="btnSecondary" onClick={() => cambiarSeccion("contacto")}>
                    Contactarme
                  </button>
                </div>
              </div>

              <div className="profileCard">
                <div className="avatar">LJ</div>
                <h3>Lenin Johan Cojal Valle</h3>
                <p>Frontend Developer</p>
                <small>@{GITHUB_USER}</small>
              </div>
            </div>
          )}

          {section === "sobre" && (
            <div>
              <span className="tag">Sobre mí</span>
              <h2>¿Quién soy?</h2>
              <p>
                Soy Lenin Johan Cojal Valle. Estoy construyendo mi portafolio
                profesional para mostrar mis proyectos, páginas web, sistemas,
                diseños y trabajos realizados.
              </p>

              <div className="infoGrid">
                <div className="miniCard">
                  <h3>💻 Desarrollo Web</h3>
                  <p>Creo páginas modernas, limpias y adaptables a celular.</p>
                </div>

                <div className="miniCard">
                  <h3>🚀 Proyectos</h3>
                  <p>Mis proyectos públicos de GitHub aparecen automáticamente.</p>
                </div>

                <div className="miniCard">
                  <h3>🎯 Objetivo</h3>
                  <p>Mejorar cada día y crear proyectos más profesionales.</p>
                </div>
              </div>
            </div>
          )}

          {section === "habilidades" && (
            <div>
              <span className="tag">Tecnologías</span>
              <h2>Mis habilidades</h2>
              <p>Herramientas que uso para crear mis páginas y sistemas web.</p>

              <div className="skills">
                <div className="skill">HTML</div>
                <div className="skill">CSS</div>
                <div className="skill">JavaScript</div>
                <div className="skill">React</div>
                <div className="skill">Next.js</div>
                <div className="skill">GitHub</div>
                <div className="skill">VS Code</div>
                <div className="skill">Diseño Web</div>
              </div>
            </div>
          )}

          {section === "proyectos" && (
            <div>
              <div className="projectsHeader">
                <div>
                  <span className="tag">GitHub automático</span>
                  <h2>Mis proyectos</h2>
                  <p>
                    Cuando subas nuevos repositorios públicos a GitHub, aparecerán aquí
                    automáticamente al actualizar la página.
                  </p>
                </div>

                <button className="btnSecondary" onClick={cargarProyectos}>
                  Actualizar
                </button>
              </div>

              {loading ? (
                <div className="loading">Cargando proyectos desde GitHub...</div>
              ) : (
                <>
                  <div className="projectsGrid">
                    {visibleProjects.map((project) => (
                      <div className="projectCard" key={project.id}>
                        <div>
                          <span className="badge">{project.language}</span>
                          <h3>{project.name}</h3>
                          <p>{project.description}</p>
                        </div>

                        <div className="projectButtons">
                          <a href={project.url} target="_blank" rel="noreferrer" className="codeBtn">
                            Ver código
                          </a>

                          {project.web && (
                            <a href={project.web} target="_blank" rel="noreferrer" className="webBtn">
                              Ver página
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pager">
                    <button disabled={projectPage === 1} onClick={() => setProjectPage(projectPage - 1)}>
                      Anterior
                    </button>

                    <span>Página {projectPage} de {totalPages}</span>

                    <button disabled={projectPage === totalPages} onClick={() => setProjectPage(projectPage + 1)}>
                      Siguiente
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {section === "contacto" && (
            <div>
              <span className="tag">Contacto</span>
              <h2>Contáctame</h2>
              <p>Estos son mis datos principales para mi portafolio.</p>

              <div className="contactGrid">
                <div className="contactItem">
                  <b>Nombre</b>
                  <p>Lenin Johan Cojal Valle</p>
                </div>

                <div className="contactItem">
                  <b>GitHub</b>
                  <p>{GITHUB_USER}</p>
                </div>

                <div className="contactItem">
                  <b>Correo</b>
                  <p>cojalvallelenin919@gmail.com</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
