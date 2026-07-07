"use client";

import { useEffect, useMemo, useState } from "react";

const GITHUB_USER = "lenin1754575412";

export default function Home() {
  const [section, setSection] = useState("inicio");
  const [projects, setProjects] = useState([]);
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

      const repos = data
        .filter((repo) => !repo.fork)
        .map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "Proyecto subido a GitHub.",
          url: repo.html_url,
          web: repo.homepage,
          language: repo.language || "GitHub",
          updated: repo.updated_at,
        }));

      setProjects(repos);
    } catch (error) {
      console.log("Error cargando proyectos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarProyectos();
  }, []);

  const totalPages = Math.max(1, Math.ceil(projects.length / perPage));

  const visibleProjects = useMemo(() => {
    const start = (projectPage - 1) * perPage;
    return projects.slice(start, start + perPage);
  }, [projects, projectPage]);

  function cambiarSeccion(nombre) {
    setSection(nombre);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #050816;
          color: white;
          font-family: Arial, Helvetica, sans-serif;
        }

        main {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(56, 189, 248, 0.25), transparent 35%),
            radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.25), transparent 35%),
            #050816;
        }

        .navbar {
          width: 100%;
          padding: 18px 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(5, 8, 22, 0.92);
          backdrop-filter: blur(14px);
          position: sticky;
          top: 0;
          z-index: 20;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logoCircle {
          width: 45px;
          height: 45px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #38bdf8, #2563eb);
          font-weight: 900;
          color: white;
          box-shadow: 0 0 35px rgba(56,189,248,0.35);
        }

        .logoText h2 {
          margin: 0;
          font-size: 20px;
        }

        .logoText span {
          color: #94a3b8;
          font-size: 13px;
        }

        .menu {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .menu button {
          padding: 10px 15px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(15,23,42,0.7);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.25s;
        }

        .menu button:hover,
        .menu button.active {
          background: #38bdf8;
          color: #020617;
          border-color: #38bdf8;
        }

        .screen {
          min-height: calc(100vh - 82px);
          padding: 55px 7%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .panel {
          width: 100%;
          max-width: 1200px;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 34px;
          padding: 40px;
          box-shadow: 0 30px 100px rgba(0,0,0,0.45);
          animation: aparecer 0.35s ease;
        }

        @keyframes aparecer {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .heroGrid {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 40px;
          align-items: center;
        }

        .tag {
          display: inline-block;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(56,189,248,0.14);
          border: 1px solid rgba(56,189,248,0.35);
          color: #38bdf8;
          font-weight: bold;
          margin-bottom: 18px;
        }

        h1 {
          font-size: 58px;
          line-height: 1.05;
          margin: 0 0 18px;
        }

        h1 b,
        h2 {
          color: #38bdf8;
        }

        h2 {
          font-size: 42px;
          margin: 0 0 18px;
        }

        p {
          color: #dbeafe;
          font-size: 18px;
          line-height: 1.7;
        }

        .buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .btnPrimary,
        .btnSecondary {
          padding: 14px 20px;
          border-radius: 14px;
          font-weight: bold;
          cursor: pointer;
          font-size: 16px;
          transition: 0.25s;
        }

        .btnPrimary {
          border: none;
          background: #38bdf8;
          color: #020617;
        }

        .btnSecondary {
          background: transparent;
          color: white;
          border: 1px solid #38bdf8;
        }

        .btnPrimary:hover,
        .btnSecondary:hover {
          transform: translateY(-3px);
        }

        .profileCard {
          text-align: center;
          padding: 35px;
          border-radius: 28px;
          background: rgba(2, 6, 23, 0.75);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .avatar {
          width: 135px;
          height: 135px;
          border-radius: 50%;
          margin: 0 auto 22px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #38bdf8, #2563eb);
          font-size: 44px;
          font-weight: 900;
          box-shadow: 0 0 60px rgba(56,189,248,0.35);
        }

        .profileCard h3 {
          font-size: 25px;
          margin: 0;
        }

        .profileCard small {
          color: #94a3b8;
        }

        .infoGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 30px;
        }

        .miniCard {
          padding: 22px;
          border-radius: 20px;
          background: rgba(2, 6, 23, 0.72);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .miniCard h3 {
          margin: 0 0 10px;
          color: white;
        }

        .skills {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 30px;
        }

        .skill {
          padding: 20px;
          border-radius: 18px;
          background: rgba(2, 6, 23, 0.72);
          border: 1px solid rgba(56,189,248,0.25);
          text-align: center;
          font-weight: bold;
          transition: 0.25s;
        }

        .skill:hover {
          transform: translateY(-6px);
          border-color: #38bdf8;
        }

        .projectsHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .projectsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .projectCard {
          min-height: 230px;
          padding: 24px;
          border-radius: 22px;
          background: rgba(2, 6, 23, 0.75);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: 0.25s;
        }

        .projectCard:hover {
          transform: translateY(-7px);
          border-color: #38bdf8;
          box-shadow: 0 18px 55px rgba(56,189,248,0.12);
        }

        .badge {
          display: inline-block;
          width: fit-content;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(56,189,248,0.12);
          color: #38bdf8;
          border: 1px solid rgba(56,189,248,0.25);
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .projectCard h3 {
          margin: 0 0 10px;
          font-size: 21px;
          word-break: break-word;
        }

        .projectCard p {
          margin: 0;
          color: #cbd5e1;
          font-size: 15px;
        }

        .projectButtons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .projectButtons a {
          text-decoration: none;
          padding: 10px 13px;
          border-radius: 10px;
          font-weight: bold;
          font-size: 14px;
        }

        .codeBtn {
          background: #38bdf8;
          color: #020617;
        }

        .webBtn {
          border: 1px solid #38bdf8;
          color: white;
        }

        .pager {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 14px;
          margin-top: 25px;
        }

        .pager button {
          padding: 10px 15px;
          border-radius: 12px;
          border: 1px solid #38bdf8;
          background: transparent;
          color: white;
          cursor: pointer;
          font-weight: bold;
        }

        .pager button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .contactBox {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 30px;
        }

        .contactItem {
          padding: 24px;
          border-radius: 20px;
          background: rgba(2, 6, 23, 0.72);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .contactItem b {
          color: #38bdf8;
        }

        .loading {
          padding: 28px;
          border-radius: 18px;
          background: rgba(2, 6, 23, 0.72);
          border: 1px solid rgba(56,189,248,0.25);
          color: #dbeafe;
        }

        @media (max-width: 950px) {
          .heroGrid,
          .infoGrid,
          .contactBox {
            grid-template-columns: 1fr;
          }

          .projectsGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .skills {
            grid-template-columns: repeat(2, 1fr);
          }

          h1 {
            font-size: 42px;
          }
        }

        @media (max-width: 650px) {
          .navbar {
            flex-direction: column;
            gap: 15px;
          }

          .screen {
            padding: 30px 4%;
          }

          .panel {
            padding: 25px;
            border-radius: 24px;
          }

          .projectsGrid,
          .skills {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 34px;
          }

          h2 {
            font-size: 32px;
          }
        }
      `}</style>

      <main>
        <nav className="navbar">
          <div className="logo">
            <div className="logoCircle">LJ</div>
            <div className="logoText">
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
                  <span className="tag">Portafolio Personal</span>
                  <h1>Hola, soy <b>Lenin Johan Cojal Valle</b></h1>
                  <p>
                    Desarrollo páginas web modernas, portafolios, sistemas y proyectos
                    con HTML, CSS, JavaScript, React, Next.js y GitHub.
                  </p>

                  <div className="buttons">
                    <button className="btnPrimary" onClick={() => cambiarSeccion("proyectos")}>
                      Ver mis proyectos
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
                  <small>GitHub: {GITHUB_USER}</small>
                </div>
              </div>
            )}

            {section === "sobre" && (
              <div>
                <span className="tag">Sobre mí</span>
                <h2>¿Quién soy?</h2>
                <p>
                  Soy Lenin Johan Cojal Valle. Estoy creando mi portafolio personal
                  para mostrar mis trabajos, proyectos web, sistemas y diseños.
                </p>

                <div className="infoGrid">
                  <div className="miniCard">
                    <h3>Desarrollo Web</h3>
                    <p>Creo páginas modernas con diseño limpio y responsive.</p>
                  </div>
                  <div className="miniCard">
                    <h3>Proyectos</h3>
                    <p>Mis repositorios de GitHub se cargan automáticamente.</p>
                  </div>
                  <div className="miniCard">
                    <h3>Objetivo</h3>
                    <p>Seguir mejorando y crear proyectos más profesionales.</p>
                  </div>
                </div>
              </div>
            )}

            {section === "habilidades" && (
              <div>
                <span className="tag">Tecnologías</span>
                <h2>Mis habilidades</h2>
                <p>Estas son las herramientas y tecnologías que uso en mis proyectos.</p>

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
                      Aquí aparecen tus repositorios públicos. Cuando subas más proyectos,
                      aparecerán aquí automáticamente.
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
                            <a className="codeBtn" href={project.url} target="_blank">
                              Ver código
                            </a>

                            {project.web && (
                              <a className="webBtn" href={project.web} target="_blank">
                                Ver página
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pager">
                      <button
                        disabled={projectPage === 1}
                        onClick={() => setProjectPage(projectPage - 1)}
                      >
                        Anterior
                      </button>

                      <span>Página {projectPage} de {totalPages}</span>

                      <button
                        disabled={projectPage === totalPages}
                        onClick={() => setProjectPage(projectPage + 1)}
                      >
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

                <div className="contactBox">
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
    </>
  );
}
