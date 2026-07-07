
"use client";

import { useEffect, useMemo, useState } from "react";

const GITHUB_USER = "lenin1754575412";

const fallbackProjects = [
  {
    id: "local-1",
    name: "Portafolio Personal",
    description: "Mi portafolio profesional creado con Next.js, React, GitHub y Vercel.",
    html_url: "https://github.com/lenin1754575412/lenin1754575412.github.io",
    language: "Next.js"
  },
  {
    id: "local-2",
    name: "P?gina de Motos",
    description: "Proyecto web moderno de motos con secciones informativas.",
    html_url: "https://github.com/lenin1754575412",
    language: "Web"
  },
  {
    id: "local-3",
    name: "Sistema de Ventas",
    description: "Sistema para ferreter?a, ropa y electrodom?sticos.",
    html_url: "https://github.com/lenin1754575412",
    language: "Sistema"
  }
];

export default function Home() {
  const [section, setSection] = useState("inicio");
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const perPage = 6;

  async function cargarProyectos() {
    try {
      setLoading(true);

      const res = await fetch("https://api.github.com/users/" + GITHUB_USER + "/repos?sort=updated&per_page=100");
      const data = await res.json();

      if (Array.isArray(data)) {
        const repos = data.filter((repo) => !repo.fork);
        setProjects(repos.length ? repos : fallbackProjects);
      } else {
        setProjects(fallbackProjects);
      }
    } catch (error) {
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarProyectos();
  }, []);

  const totalPages = Math.max(1, Math.ceil(projects.length / perPage));

  const visibleProjects = useMemo(() => {
    const start = (page - 1) * perPage;
    return projects.slice(start, start + perPage);
  }, [projects, page]);

  function cambiarSeccion(nombre) {
    setSection(nombre);
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const css = [
    "* { box-sizing: border-box; }",
    "html { scroll-behavior: smooth; }",
    "body { margin: 0; background: #050816; color: white; font-family: Arial, Helvetica, sans-serif; overflow-x: hidden; }",
    "button, a { font-family: inherit; }",
    ".site { min-height: 100vh; position: relative; overflow: hidden; background: radial-gradient(circle at top left, rgba(56,189,248,0.28), transparent 34%), radial-gradient(circle at bottom right, rgba(37,99,235,0.30), transparent 35%), linear-gradient(135deg, #050816, #020617); }",
    ".orb { position: fixed; border-radius: 50%; filter: blur(18px); opacity: 0.55; pointer-events: none; animation: floatOrb 9s ease-in-out infinite alternate; }",
    ".orb1 { width: 260px; height: 260px; background: rgba(56,189,248,0.22); top: 12%; left: 4%; }",
    ".orb2 { width: 300px; height: 300px; background: rgba(37,99,235,0.20); right: 6%; bottom: 8%; animation-delay: 1.5s; }",
    ".orb3 { width: 190px; height: 190px; background: rgba(14,165,233,0.18); right: 32%; top: 18%; animation-delay: 2.5s; }",
    "@keyframes floatOrb { from { transform: translateY(0) scale(1); } to { transform: translateY(-35px) scale(1.08); } }",
    ".codeBg { position: fixed; inset: 0; pointer-events: none; overflow: hidden; opacity: 0.16; }",
    ".codeBg span { position: absolute; color: #38bdf8; font-weight: 900; animation: fallCode 12s linear infinite; }",
    ".codeBg span:nth-child(1) { left: 8%; animation-delay: 0s; font-size: 38px; }",
    ".codeBg span:nth-child(2) { left: 23%; animation-delay: 2s; font-size: 28px; }",
    ".codeBg span:nth-child(3) { left: 51%; animation-delay: 4s; font-size: 34px; }",
    ".codeBg span:nth-child(4) { left: 74%; animation-delay: 1s; font-size: 30px; }",
    ".codeBg span:nth-child(5) { left: 90%; animation-delay: 5s; font-size: 40px; }",
    "@keyframes fallCode { from { top: -10%; transform: rotate(0deg); } to { top: 110%; transform: rotate(360deg); } }",
    ".navbar { width: 100%; padding: 16px 7%; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; background: rgba(5,8,22,0.78); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,0.12); position: sticky; top: 0; z-index: 20; }",
    ".brand { display: flex; align-items: center; gap: 13px; }",
    ".brand img { width: 58px; height: 58px; border-radius: 18px; box-shadow: 0 0 35px rgba(56,189,248,0.35); animation: logoPulse 2.7s ease-in-out infinite; }",
    "@keyframes logoPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }",
    ".brand h2 { margin: 0; font-size: 22px; }",
    ".brand span { color: #94a3b8; font-size: 13px; }",
    ".menu { display: flex; gap: 10px; flex-wrap: wrap; }",
    ".menu button { padding: 10px 15px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); background: rgba(15,23,42,0.72); color: white; font-weight: bold; cursor: pointer; transition: 0.25s; }",
    ".menu button:hover, .menu button.active { background: #38bdf8; color: #020617; border-color: #38bdf8; transform: translateY(-2px); box-shadow: 0 12px 30px rgba(56,189,248,0.18); }",
    ".screen { min-height: calc(100vh - 90px); padding: 55px 7%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; }",
    ".panel { width: 100%; max-width: 1220px; background: rgba(15,23,42,0.78); border: 1px solid rgba(255,255,255,0.12); border-radius: 34px; padding: 42px; box-shadow: 0 35px 110px rgba(0,0,0,0.48); position: relative; overflow: hidden; }",
    ".panel::before { content: ''; position: absolute; inset: -2px; background: linear-gradient(120deg, transparent, rgba(56,189,248,0.18), transparent); transform: translateX(-100%); animation: shine 5s ease-in-out infinite; pointer-events: none; }",
    "@keyframes shine { 0% { transform: translateX(-100%); } 45%,100% { transform: translateX(120%); } }",
    ".content { position: relative; z-index: 2; animation: aparecer 0.45s ease both; }",
    "@keyframes aparecer { from { opacity: 0; transform: translateY(18px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }",
    ".heroGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 34px; align-items: center; }",
    ".tag { display: inline-block; padding: 10px 16px; border-radius: 999px; background: rgba(56,189,248,0.14); border: 1px solid rgba(56,189,248,0.35); color: #38bdf8; font-weight: bold; margin-bottom: 18px; }",
    "h1 { font-size: clamp(36px, 6vw, 62px); line-height: 1.05; margin: 0 0 18px; letter-spacing: -1px; }",
    ".gradientText { background: linear-gradient(90deg, #38bdf8, #ffffff, #2563eb); -webkit-background-clip: text; color: transparent; background-size: 200%; animation: gradientMove 4s ease-in-out infinite; }",
    "@keyframes gradientMove { 0%,100% { background-position: 0%; } 50% { background-position: 100%; } }",
    "h2 { color: #38bdf8; font-size: clamp(32px, 5vw, 44px); margin: 0 0 18px; }",
    "p { color: #cbd5e1; font-size: 18px; line-height: 1.7; }",
    ".buttons { display: flex; flex-wrap: wrap; gap: 13px; margin-top: 26px; }",
    ".btn { padding: 14px 20px; border-radius: 14px; font-weight: bold; cursor: pointer; font-size: 16px; transition: 0.25s; }",
    ".btnPrimary { background: #38bdf8; color: #020617; border: none; }",
    ".btnSecondary { background: transparent; color: white; border: 1px solid #38bdf8; }",
    ".btn:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(56,189,248,0.18); }",
    ".profile { text-align: center; padding: 36px; border-radius: 30px; background: rgba(2,6,23,0.82); border: 1px solid rgba(255,255,255,0.12); position: relative; }",
    ".profile::before { content: ''; position: absolute; inset: -2px; border-radius: 32px; background: conic-gradient(from 0deg, transparent, #38bdf8, transparent, #2563eb, transparent); z-index: -1; animation: rotateRing 7s linear infinite; }",
    "@keyframes rotateRing { to { transform: rotate(360deg); } }",
    ".profile img { width: 185px; height: 185px; object-fit: contain; border-radius: 35px; margin-bottom: 20px; animation: floatLogo 4s ease-in-out infinite; }",
    "@keyframes floatLogo { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }",
    ".stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px; margin-top: 25px; }",
    ".stat { padding: 16px; border-radius: 18px; background: rgba(2,6,23,0.80); border: 1px solid rgba(255,255,255,0.12); }",
    ".stat b { display: block; color: #38bdf8; font-size: 23px; }",
    ".stat span { color: #94a3b8; font-size: 14px; }",
    ".cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(235px, 1fr)); gap: 18px; margin-top: 30px; }",
    ".card { padding: 24px; border-radius: 22px; background: rgba(2,6,23,0.82); border: 1px solid rgba(255,255,255,0.12); transition: 0.25s; }",
    ".card:hover { transform: translateY(-8px); border-color: #38bdf8; box-shadow: 0 22px 55px rgba(56,189,248,0.14); }",
    ".skill { text-align: center; color: #38bdf8; font-weight: 900; font-size: 18px; }",
    ".projectCard { min-height: 238px; display: flex; flex-direction: column; justify-content: space-between; }",
    ".badge { display: inline-block; width: fit-content; padding: 7px 12px; border-radius: 999px; background: rgba(56,189,248,0.12); color: #38bdf8; border: 1px solid rgba(56,189,248,0.25); font-size: 13px; font-weight: bold; margin-bottom: 12px; }",
    ".projectCard h3 { margin: 0 0 10px; word-break: break-word; }",
    ".link { display: inline-block; margin-top: 16px; padding: 10px 13px; border-radius: 10px; background: #38bdf8; color: #020617; font-weight: bold; text-decoration: none; width: fit-content; }",
    ".pager { display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 24px; flex-wrap: wrap; }",
    ".pager button { padding: 10px 15px; border-radius: 12px; border: 1px solid #38bdf8; background: transparent; color: white; cursor: pointer; font-weight: bold; }",
    ".pager button:disabled { opacity: 0.4; cursor: not-allowed; }",
    "@media (max-width: 650px) { .navbar { justify-content: center; } .panel { padding: 25px; border-radius: 24px; } .screen { padding: 30px 4%; } }"
  ].join("\n");

  function menuButton(nombre, texto) {
    return (
      <button
        type="button"
        className={section === nombre ? "active" : ""}
        onClick={() => cambiarSeccion(nombre)}
      >
        {texto}
      </button>
    );
  }

  return (
    <>
      <style>{css}</style>

      <main className="site">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>

        <div className="codeBg">
          <span>{"</>"}</span>
          <span>{"{}"}</span>
          <span>{"JS"}</span>
          <span>{"<>"}</span>
          <span>{"01"}</span>
        </div>

        <nav className="navbar">
          <div className="brand">
            <img src="/logo.svg" alt="Logo Lenin Johan" />
            <div>
              <h2>Lenin Johan</h2>
              <span>Portafolio Web</span>
            </div>
          </div>

          <div className="menu">
            {menuButton("inicio", "Inicio")}
            {menuButton("sobre", "Sobre m?")}
            {menuButton("habilidades", "Habilidades")}
            {menuButton("proyectos", "Proyectos")}
            {menuButton("contacto", "Contacto")}
          </div>
        </nav>

        <section className="screen">
          <div className="panel">
            <div className="content" key={section}>
              {section === "inicio" && (
                <div className="heroGrid">
                  <div>
                    <span className="tag">Portafolio Profesional Animado</span>
                    <h1>
                      Hola, soy <span className="gradientText">Lenin Johan Cojal Valle</span>
                    </h1>
                    <p>
                      Desarrollo p?ginas web modernas, portafolios, sistemas y proyectos
                      usando HTML, CSS, JavaScript, React, Next.js, GitHub y Vercel.
                    </p>

                    <div className="stats">
                      <div className="stat">
                        <b>{projects.length}+</b>
                        <span>Proyectos</span>
                      </div>
                      <div className="stat">
                        <b>Next.js</b>
                        <span>Framework</span>
                      </div>
                      <div className="stat">
                        <b>Vercel</b>
                        <span>Publicado</span>
                      </div>
                    </div>

                    <div className="buttons">
                      <button className="btn btnPrimary" onClick={() => cambiarSeccion("proyectos")}>
                        Ver proyectos
                      </button>
                      <button className="btn btnSecondary" onClick={() => cambiarSeccion("contacto")}>
                        Contactarme
                      </button>
                    </div>
                  </div>

                  <div className="profile">
                    <img src="/logo.svg" alt="Logo Lenin Johan" />
                    <h2>Lenin Johan</h2>
                    <p>Frontend Developer</p>
                    <small style={{ color: "#94a3b8" }}>@{GITHUB_USER}</small>
                  </div>
                </div>
              )}

              {section === "sobre" && (
                <div>
                  <span className="tag">Sobre m?</span>
                  <h2>?Qui?n soy?</h2>
                  <p>
                    Soy Lenin Johan Cojal Valle. Estoy construyendo mi portafolio profesional
                    para mostrar mis proyectos, p?ginas web, sistemas, dise?os y trabajos realizados.
                  </p>

                  <div className="cards">
                    <div className="card">
                      <h3>?? Desarrollo Web</h3>
                      <p>Creo p?ginas modernas, limpias, r?pidas y adaptables a celular.</p>
                    </div>
                    <div className="card">
                      <h3>?? Proyectos</h3>
                      <p>Mis repositorios p?blicos de GitHub aparecen autom?ticamente.</p>
                    </div>
                    <div className="card">
                      <h3>?? Objetivo</h3>
                      <p>Seguir mejorando y crear proyectos cada vez m?s profesionales.</p>
                    </div>
                  </div>
                </div>
              )}

              {section === "habilidades" && (
                <div>
                  <span className="tag">Tecnolog?as</span>
                  <h2>Mis habilidades</h2>
                  <p>Herramientas que uso para crear mis p?ginas y sistemas web.</p>

                  <div className="cards">
                    {["HTML", "CSS", "JavaScript", "React", "Next.js", "GitHub", "VS Code", "Dise?o Web"].map((skill) => (
                      <div className="card skill" key={skill}>{skill}</div>
                    ))}
                  </div>
                </div>
              )}

              {section === "proyectos" && (
                <div>
                  <span className="tag">GitHub autom?tico</span>
                  <h2>Mis proyectos</h2>
                  <p>
                    Cuando subas nuevos repositorios p?blicos a GitHub, aparecer?n aqu? autom?ticamente.
                  </p>

                  <button className="btn btnSecondary" onClick={cargarProyectos}>
                    Actualizar proyectos
                  </button>

                  {loading ? (
                    <div className="card" style={{ marginTop: 25 }}>
                      Cargando proyectos desde GitHub...
                    </div>
                  ) : (
                    <>
                      <div className="cards">
                        {visibleProjects.map((project) => (
                          <div className="card projectCard" key={project.id}>
                            <div>
                              <span className="badge">{project.language || "GitHub"}</span>
                              <h3>{project.name}</h3>
                              <p>{project.description || "Proyecto p?blico subido a GitHub."}</p>
                            </div>
                            <a href={project.html_url} target="_blank" rel="noreferrer" className="link">
                              Ver c?digo
                            </a>
                          </div>
                        ))}
                      </div>

                      <div className="pager">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                          Anterior
                        </button>
                        <span>P?gina {page} de {totalPages}</span>
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
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
                  <h2>Cont?ctame</h2>
                  <p>Estos son mis datos principales para mi portafolio.</p>

                  <div className="cards">
                    <div className="card">
                      <h3>Nombre</h3>
                      <p>Lenin Johan Cojal Valle</p>
                    </div>
                    <div className="card">
                      <h3>GitHub</h3>
                      <p>{GITHUB_USER}</p>
                    </div>
                    <div className="card">
                      <h3>Correo</h3>
                      <p>cojalvallelenin919@gmail.com</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
