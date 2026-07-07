
"use client";

import { useEffect, useMemo, useState } from "react";

const GITHUB_USER = "lenin1754575412";

const imageMap = {
  "lenin1754575412.github.io": "/projects/portfolio.svg",
  "openjarvis-local": "/projects/jarvis.svg",
  "fiestas-patronales-celendin": "/projects/fiestas.svg",
  "peru-turismo-next": "/projects/turismo.svg"
};

const fallbackProjects = [
  {
    id: "local-1",
    name: "Portafolio Personal",
    description: "Mi portafolio profesional creado con Next.js, GitHub y Vercel.",
    html_url: "https://github.com/lenin1754575412/lenin1754575412.github.io",
    language: "Next.js",
    image: "/projects/portfolio.svg"
  },
  {
    id: "local-2",
    name: "OpenJarvis Local",
    description: "Asistente local con inteligencia artificial.",
    html_url: "https://github.com/lenin1754575412",
    language: "Python",
    image: "/projects/jarvis.svg"
  },
  {
    id: "local-3",
    name: "Turismo Peru",
    description: "Portal web turistico moderno.",
    html_url: "https://github.com/lenin1754575412",
    language: "Next.js",
    image: "/projects/turismo.svg"
  }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
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
        const repos = data
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            ...repo,
            description: repo.description || "Proyecto publico subido a GitHub.",
            image: imageMap[repo.name] || "/projects/default.svg"
          }));

        setProjects(repos.length ? repos : fallbackProjects);
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

  function closeMenu() {
    setMenuOpen(false);
  }

  const css = [
    "* { box-sizing: border-box; }",
    "html { scroll-behavior: smooth; }",
    "body { margin: 0; background: #120817; color: #fff7ed; font-family: Arial, Helvetica, sans-serif; overflow-x: hidden; }",
    "a { text-decoration: none; color: inherit; }",
    "button { font-family: inherit; }",

    ".site { min-height: 100vh; background: radial-gradient(circle at top left, rgba(249,115,22,0.22), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,0.18), transparent 35%), linear-gradient(135deg, #120817, #1e1028, #09060d); overflow: hidden; }",

    ".nav { position: sticky; top: 0; z-index: 50; padding: 18px 7%; display: flex; align-items: center; justify-content: space-between; gap: 18px; background: rgba(18,8,23,0.82); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,0.10); }",
    ".brand { display: flex; align-items: center; gap: 13px; min-width: 0; }",
    ".brand img { width: 56px; height: 56px; border-radius: 18px; box-shadow: 0 16px 42px rgba(249,115,22,0.24); flex: 0 0 auto; }",
    ".brand h2 { margin: 0; color: #fff7ed; font-size: 22px; line-height: 1.1; letter-spacing: -0.5px; }",
    ".brand span { color: #fed7aa; font-size: 13px; font-weight: 700; }",

    ".menu { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }",
    ".menu a { padding: 10px 15px; border-radius: 999px; color: #ffedd5; font-weight: 900; font-size: 14px; transition: 0.25s; border: 1px solid rgba(255,255,255,0.10); background: rgba(255,255,255,0.04); }",
    ".menu a:hover { background: #f97316; color: #120817; transform: translateY(-2px); }",
    ".menu .navCta { background: #fff7ed; color: #120817; box-shadow: 0 14px 35px rgba(249,115,22,0.20); }",

    ".hamburger { display: none; width: 48px; height: 48px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); cursor: pointer; align-items: center; justify-content: center; flex-direction: column; gap: 5px; }",
    ".hamburger span { width: 23px; height: 3px; border-radius: 999px; background: #fff7ed; transition: 0.25s; }",
    ".hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }",
    ".hamburger.open span:nth-child(2) { opacity: 0; }",
    ".hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }",

    ".hero { max-width: 1480px; margin: 0 auto; padding: 80px 7% 70px; display: grid; grid-template-columns: minmax(300px, 1.05fr) minmax(300px, 0.95fr); gap: 48px; align-items: center; }",

    ".eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 999px; background: rgba(249,115,22,0.14); color: #fdba74; border: 1px solid rgba(249,115,22,0.32); font-weight: 900; font-size: 14px; }",
    ".hero h1 { margin: 24px 0 20px; font-size: clamp(44px, 7vw, 88px); line-height: 0.94; letter-spacing: -3px; color: #fff7ed; }",
    ".hero h1 span { display: block; background: linear-gradient(90deg, #f97316, #fff7ed, #ec4899, #8b5cf6); background-size: 220%; -webkit-background-clip: text; color: transparent; animation: gradientMove 4s ease-in-out infinite; }",
    "@keyframes gradientMove { 0%, 100% { background-position: 0%; } 50% { background-position: 100%; } }",
    ".hero p { max-width: 660px; color: #fed7aa; font-size: 20px; line-height: 1.75; margin: 0; }",

    ".heroActions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }",
    ".btn { display: inline-block; padding: 15px 22px; border-radius: 16px; font-weight: 900; font-size: 15px; transition: 0.25s; }",
    ".btnPrimary { background: #f97316; color: #120817; box-shadow: 0 18px 45px rgba(249,115,22,0.22); }",
    ".btnLight { background: rgba(255,255,255,0.08); color: #fff7ed; border: 1px solid rgba(255,255,255,0.14); }",
    ".btn:hover { transform: translateY(-4px); }",

    ".playerCard { position: relative; min-height: 570px; border-radius: 36px; padding: 28px; background: radial-gradient(circle at 80% 10%, rgba(236,72,153,0.25), transparent 30%), linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04)); border: 1px solid rgba(255,255,255,0.14); box-shadow: 0 40px 110px rgba(0,0,0,0.30); overflow: hidden; }",
    ".playerCard::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 38px 38px; mask-image: radial-gradient(circle at center, black, transparent 80%); }",
    ".playerInner { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: space-between; gap: 24px; }",

    ".cover { padding: 28px; border-radius: 32px; background: rgba(18,8,23,0.70); border: 1px solid rgba(255,255,255,0.12); text-align: center; }",
    ".cover img { width: 170px; height: 170px; border-radius: 36px; background: white; box-shadow: 0 26px 70px rgba(249,115,22,0.24); animation: floatCover 4s ease-in-out infinite; }",
    "@keyframes floatCover { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }",
    ".cover h2 { margin: 18px 0 8px; font-size: 34px; }",
    ".cover p { margin: 0; color: #fed7aa; font-size: 16px; }",

    ".audioBox { padding: 22px; border-radius: 26px; background: rgba(18,8,23,0.72); border: 1px solid rgba(255,255,255,0.12); }",
    ".audioTop { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 20px; }",
    ".play { width: 58px; height: 58px; border-radius: 50%; border: 0; display: grid; place-items: center; background: #f97316; color: #120817; font-size: 22px; font-weight: 900; box-shadow: 0 14px 35px rgba(249,115,22,0.25); }",
    ".audioInfo strong { display: block; font-size: 18px; }",
    ".audioInfo span { color: #fed7aa; font-size: 14px; }",
    ".wave { display: flex; align-items: center; gap: 5px; height: 70px; }",
    ".wave span { flex: 1; min-width: 5px; border-radius: 999px; background: linear-gradient(180deg, #f97316, #ec4899); animation: wave 1.2s ease-in-out infinite; }",
    ".wave span:nth-child(2n) { animation-delay: 0.15s; }",
    ".wave span:nth-child(3n) { animation-delay: 0.30s; }",
    "@keyframes wave { 0%, 100% { height: 18px; opacity: 0.65; } 50% { height: 62px; opacity: 1; } }",

    ".stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }",
    ".stat { padding: 18px; border-radius: 20px; background: rgba(18,8,23,0.70); border: 1px solid rgba(255,255,255,0.12); }",
    ".stat b { display: block; color: #fdba74; font-size: 28px; }",
    ".stat span { color: #fed7aa; font-size: 13px; font-weight: 800; }",

    ".section { max-width: 1480px; margin: 0 auto; padding: 75px 7%; }",
    ".sectionHeader { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 32px; }",
    ".sectionHeader h2 { margin: 14px 0 0; font-size: clamp(34px, 5vw, 58px); line-height: 1; letter-spacing: -2px; color: #fff7ed; }",
    ".sectionHeader p { max-width: 570px; color: #fed7aa; line-height: 1.7; font-size: 18px; margin: 0; }",

    ".cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; }",
    ".card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 28px; padding: 27px; box-shadow: 0 22px 70px rgba(0,0,0,0.18); transition: 0.25s; }",
    ".card:hover { transform: translateY(-8px); border-color: rgba(249,115,22,0.55); box-shadow: 0 32px 85px rgba(249,115,22,0.14); }",
    ".card h3 { margin: 0 0 12px; color: #fff7ed; font-size: 23px; }",
    ".card p { color: #fed7aa; line-height: 1.65; margin: 0; }",

    ".icon { width: 54px; height: 54px; border-radius: 17px; display: grid; place-items: center; background: rgba(249,115,22,0.14); color: #fdba74; font-weight: 900; margin-bottom: 18px; border: 1px solid rgba(249,115,22,0.25); }",

    ".episodeCard { padding: 0; overflow: hidden; min-height: 470px; display: flex; flex-direction: column; }",
    ".episodeCard img { width: 100%; height: 180px; object-fit: cover; }",
    ".episodeBody { padding: 24px; display: flex; flex-direction: column; justify-content: space-between; flex: 1; }",
    ".badge { display: inline-block; width: fit-content; padding: 7px 12px; border-radius: 999px; background: rgba(249,115,22,0.14); color: #fdba74; font-weight: 900; font-size: 13px; margin-bottom: 14px; border: 1px solid rgba(249,115,22,0.25); }",
    ".projectLink { display: inline-block; width: fit-content; margin-top: 20px; padding: 11px 15px; border-radius: 12px; background: #f97316; color: #120817; font-weight: 900; }",

    ".pager { display: flex; justify-content: center; align-items: center; gap: 14px; margin-top: 30px; color: #fed7aa; font-weight: 900; }",
    ".pager button { padding: 11px 16px; border-radius: 12px; border: 1px solid rgba(249,115,22,0.35); background: rgba(255,255,255,0.06); color: #fff7ed; font-weight: 900; cursor: pointer; }",
    ".pager button:disabled { opacity: 0.45; cursor: not-allowed; }",

    ".cta { max-width: 1280px; margin: 70px auto 90px; padding: 58px 7%; border-radius: 34px; background: radial-gradient(circle at top right, rgba(236,72,153,0.26), transparent 35%), linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04)); color: white; text-align: center; border: 1px solid rgba(255,255,255,0.12); }",
    ".cta h2 { font-size: clamp(34px, 5vw, 58px); margin: 0 0 16px; letter-spacing: -2px; }",
    ".cta p { color: #fed7aa; max-width: 720px; margin: 0 auto 28px; line-height: 1.7; font-size: 18px; }",

    "@media (max-width: 920px) { .hero { grid-template-columns: 1fr; padding-top: 55px; } .playerCard { min-height: auto; } .sectionHeader { align-items: start; flex-direction: column; } }",

    "@media (max-width: 650px) { .nav { padding: 13px 5%; align-items: center; } .brand img { width: 48px; height: 48px; border-radius: 15px; } .brand h2 { font-size: 20px; } .brand span { font-size: 12px; } .hamburger { display: flex; } .menu { display: none; width: 100%; flex-direction: column; align-items: stretch; gap: 10px; padding: 14px; margin-top: 10px; border-radius: 22px; background: rgba(18,8,23,0.96); border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 22px 60px rgba(0,0,0,0.24); } .menu.open { display: flex; animation: menuDown 0.25s ease both; } @keyframes menuDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } } .menu a { width: 100%; text-align: center; padding: 13px 15px; } .hero { padding: 38px 5% 40px; gap: 28px; } .eyebrow { font-size: 13px; padding: 8px 13px; } .hero h1 { font-size: 42px; line-height: 1.02; letter-spacing: -1.2px; } .hero p { font-size: 17px; line-height: 1.65; } .heroActions { flex-direction: column; } .btn { width: 100%; text-align: center; } .playerCard { border-radius: 28px; padding: 16px; } .cover { padding: 22px; } .cover img { width: 125px; height: 125px; } .cover h2 { font-size: 25px; } .audioBox { padding: 16px; } .stats { grid-template-columns: 1fr; } .section { padding: 45px 5%; } .sectionHeader h2 { font-size: 36px; letter-spacing: -1px; } .sectionHeader p { font-size: 16px; } .cards { grid-template-columns: 1fr; } .episodeCard { min-height: auto; } .episodeCard img { height: 155px; } .cta { margin: 45px 5% 70px; padding: 36px 24px; } }"
  ].join("\n");

  return (
    <>
      <style>{css}</style>

      <main className="site">
        <nav className="nav">
          <a href="#inicio" className="brand" onClick={closeMenu}>
            <img src="/logo.svg" alt="Logo Lenin Johan" />
            <div>
              <h2>Lenin Johan</h2>
              <span>Portafolio Podcast</span>
            </div>
          </a>

          <button
            className={menuOpen ? "hamburger open" : "hamburger"}
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={menuOpen ? "menu open" : "menu"}>
            <a href="#servicios" onClick={closeMenu}>Servicios</a>
            <a href="#habilidades" onClick={closeMenu}>Habilidades</a>
            <a href="#episodios" onClick={closeMenu}>Proyectos</a>
            <a href="#contacto" className="navCta" onClick={closeMenu}>Contacto</a>
          </div>
        </nav>

        <section id="inicio" className="hero">
          <div>
            <span className="eyebrow">Nuevo episodio disponible</span>
            <h1>
              El podcast de mis
              <span>proyectos web.</span>
            </h1>

            <p>
              Soy Lenin Johan Cojal Valle. Aqui presento mis proyectos como episodios:
              paginas web, sistemas, portafolios y trabajos hechos con Next.js, React,
              GitHub y Vercel.
            </p>

            <div className="heroActions">
              <a href="#episodios" className="btn btnPrimary">Ver episodios</a>
              <a href="#contacto" className="btn btnLight">Contactarme</a>
            </div>
          </div>

          <div className="playerCard">
            <div className="playerInner">
              <div className="cover">
                <img src="/logo.svg" alt="Logo Lenin Johan" />
                <h2>Lenin Johan Show</h2>
                <p>Frontend Developer - Portfolio Podcast</p>
              </div>

              <div className="audioBox">
                <div className="audioTop">
                  <button className="play" type="button">?</button>
                  <div className="audioInfo">
                    <strong>Temporada 01</strong>
                    <span>Proyectos, codigo y diseno web</span>
                  </div>
                </div>

                <div className="wave">
                  <span></span><span></span><span></span><span></span><span></span>
                  <span></span><span></span><span></span><span></span><span></span>
                  <span></span><span></span><span></span><span></span><span></span>
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>

              <div className="stats">
                <div className="stat">
                  <b>{projects.length}+</b>
                  <span>Episodios</span>
                </div>
                <div className="stat">
                  <b>Next</b>
                  <span>Framework</span>
                </div>
                <div className="stat">
                  <b>Vercel</b>
                  <span>Publicado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="section">
          <div className="sectionHeader">
            <div>
              <span className="eyebrow">Servicios</span>
              <h2>Lo que puedo crear.</h2>
            </div>
            <p>
              Creo paginas web modernas, portafolios, sistemas basicos y proyectos
              listos para publicar en GitHub y Vercel.
            </p>
          </div>

          <div className="cards">
            <div className="card">
              <div className="icon">01</div>
              <h3>Landing Pages</h3>
              <p>Paginas para negocios, productos, servicios o instituciones.</p>
            </div>

            <div className="card">
              <div className="icon">02</div>
              <h3>Portafolios</h3>
              <p>Portafolios personales con proyectos, contacto y diseno profesional.</p>
            </div>

            <div className="card">
              <div className="icon">03</div>
              <h3>Sistemas Web</h3>
              <p>Sistemas basicos para ventas, turismo, tiendas y administracion.</p>
            </div>
          </div>
        </section>

        <section id="habilidades" className="section">
          <div className="sectionHeader">
            <div>
              <span className="eyebrow">Tecnologias</span>
              <h2>Habilidades principales.</h2>
            </div>
            <p>
              Herramientas que uso para crear interfaces limpias, modernas y responsive.
            </p>
          </div>

          <div className="cards">
            {["HTML", "CSS", "JavaScript", "React", "Next.js", "GitHub", "VS Code", "Vercel"].map((skill) => (
              <div className="card" key={skill}>
                <div className="icon">{skill.slice(0, 2)}</div>
                <h3>{skill}</h3>
                <p>Herramienta usada para construir proyectos web profesionales.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="episodios" className="section">
          <div className="sectionHeader">
            <div>
              <span className="eyebrow">Episodios de GitHub</span>
              <h2>Mis proyectos recientes.</h2>
            </div>
            <p>
              Cada repositorio publico aparece como un episodio. Cuando subas nuevos
              proyectos a GitHub, apareceran aqui automaticamente.
            </p>
          </div>

          {loading ? (
            <div className="card">Cargando episodios desde GitHub...</div>
          ) : (
            <>
              <div className="cards">
                {visibleProjects.map((project) => (
                  <div className="card episodeCard" key={project.id}>
                    <img src={project.image || "/projects/default.svg"} alt={project.name} />

                    <div className="episodeBody">
                      <div>
                        <span className="badge">{project.language || "GitHub"}</span>
                        <h3>{project.name}</h3>
                        <p>{project.description || "Proyecto publico subido a GitHub."}</p>
                      </div>

                      <a href={project.html_url} target="_blank" rel="noreferrer" className="projectLink">
                        Escuchar proyecto
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pager">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button>
                <span>Pagina {page} de {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Siguiente</button>
              </div>
            </>
          )}
        </section>

        <section id="contacto" className="cta">
          <h2>Hablemos de tu proximo proyecto.</h2>
          <p>
            Puedo ayudarte a crear paginas web, portafolios, sistemas simples y proyectos
            modernos con estilo profesional.
          </p>

          <a href="mailto:cojalvallelenin919@gmail.com" className="btn btnPrimary">
            cojalvallelenin919@gmail.com
          </a>
        </section>
      </main>
    </>
  );
}
