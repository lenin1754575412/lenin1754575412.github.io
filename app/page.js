
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
    "body { margin: 0; background: #f8fafc; color: #111827; font-family: Arial, Helvetica, sans-serif; overflow-x: hidden; }",
    "a { text-decoration: none; color: inherit; }",
    "button { font-family: inherit; }",

    ".site { min-height: 100vh; background: radial-gradient(circle at top left, rgba(59,130,246,0.13), transparent 34%), radial-gradient(circle at top right, rgba(6,182,212,0.14), transparent 34%), linear-gradient(180deg, #ffffff 0%, #f8fafc 46%, #eef6ff 100%); }",

    ".navbar { position: sticky; top: 0; z-index: 50; padding: 18px 7%; display: flex; align-items: center; justify-content: space-between; gap: 18px; background: rgba(255,255,255,0.82); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(17,24,39,0.08); }",
    ".brand { display: flex; align-items: center; gap: 13px; min-width: 0; }",
    ".brand img { width: 54px; height: 54px; border-radius: 16px; box-shadow: 0 16px 40px rgba(6,182,212,0.18); flex: 0 0 auto; }",
    ".brand h2 { margin: 0; color: #111827; font-size: 22px; line-height: 1.1; letter-spacing: -0.5px; }",
    ".brand span { color: #64748b; font-size: 13px; font-weight: 700; }",

    ".menu { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }",
    ".menu a { padding: 10px 15px; border-radius: 999px; color: #334155; font-weight: 900; font-size: 14px; transition: 0.25s; }",
    ".menu a:hover { background: #e0f2fe; color: #0369a1; }",
    ".menu .navCta { background: #111827; color: white; box-shadow: 0 14px 35px rgba(17,24,39,0.18); }",

    ".hamburger { display: none; width: 48px; height: 48px; border-radius: 15px; border: 1px solid rgba(17,24,39,0.10); background: white; box-shadow: 0 16px 40px rgba(17,24,39,0.10); cursor: pointer; align-items: center; justify-content: center; flex-direction: column; gap: 5px; }",
    ".hamburger span { width: 23px; height: 3px; border-radius: 999px; background: #111827; transition: 0.25s; }",
    ".hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }",
    ".hamburger.open span:nth-child(2) { opacity: 0; }",
    ".hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }",

    ".hero { position: relative; max-width: 1480px; margin: 0 auto; padding: 85px 7% 70px; display: grid; grid-template-columns: minmax(300px, 1.04fr) minmax(300px, 0.96fr); gap: 48px; align-items: center; }",
    ".heroText { position: relative; z-index: 2; }",
    ".eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 999px; background: white; color: #0369a1; border: 1px solid rgba(6,182,212,0.20); font-weight: 900; font-size: 14px; box-shadow: 0 18px 45px rgba(6,182,212,0.10); }",
    ".hero h1 { margin: 24px 0 20px; font-size: clamp(44px, 7vw, 86px); line-height: 0.95; letter-spacing: -3px; color: #111827; }",
    ".hero h1 span { display: block; background: linear-gradient(90deg, #0891b2, #2563eb, #7c3aed); -webkit-background-clip: text; color: transparent; }",
    ".hero p { max-width: 650px; color: #475569; font-size: 20px; line-height: 1.75; margin: 0; }",

    ".heroActions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }",
    ".btn { display: inline-block; padding: 15px 22px; border-radius: 15px; font-weight: 900; font-size: 15px; transition: 0.25s; }",
    ".btnDark { background: #111827; color: white; box-shadow: 0 18px 45px rgba(17,24,39,0.18); }",
    ".btnLight { background: white; color: #111827; border: 1px solid rgba(17,24,39,0.10); box-shadow: 0 18px 45px rgba(17,24,39,0.08); }",
    ".btn:hover { transform: translateY(-4px); }",

    ".heroVisual { position: relative; min-height: 560px; border-radius: 34px; padding: 24px; background: radial-gradient(circle at 80% 20%, rgba(6,182,212,0.30), transparent 32%), linear-gradient(145deg, #111827, #0f172a); box-shadow: 0 40px 110px rgba(17,24,39,0.28); overflow: hidden; }",
    ".heroVisual::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 38px 38px; mask-image: radial-gradient(circle at center, black, transparent 78%); }",
    ".dashboard { position: relative; z-index: 2; height: 100%; border-radius: 28px; padding: 28px; color: white; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); backdrop-filter: blur(16px); }",
    ".dashTop { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }",
    ".dashDots { display: flex; gap: 8px; }",
    ".dashDots span { width: 11px; height: 11px; border-radius: 50%; background: #22d3ee; }",

    ".profileCard { padding: 30px; border-radius: 28px; background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.12); text-align: center; }",
    ".profileCard img { width: 155px; height: 155px; border-radius: 34px; object-fit: contain; background: white; box-shadow: 0 20px 55px rgba(6,182,212,0.22); animation: floatLogo 4s ease-in-out infinite; }",
    "@keyframes floatLogo { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }",
    ".profileCard h2 { margin: 18px 0 6px; font-size: 32px; }",
    ".profileCard p { margin: 0; color: #cbd5e1; }",

    ".dashGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 20px; }",
    ".dashItem { padding: 18px; border-radius: 18px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.10); }",
    ".dashItem b { display: block; color: #67e8f9; font-size: 26px; }",
    ".dashItem span { color: #cbd5e1; font-size: 13px; font-weight: 800; }",

    ".section { max-width: 1480px; margin: 0 auto; padding: 75px 7%; }",
    ".sectionHeader { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 32px; }",
    ".sectionHeader h2 { margin: 14px 0 0; font-size: clamp(34px, 5vw, 58px); line-height: 1; letter-spacing: -2px; color: #111827; }",
    ".sectionHeader p { max-width: 570px; color: #64748b; line-height: 1.7; font-size: 18px; margin: 0; }",

    ".cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; }",
    ".card { background: rgba(255,255,255,0.84); border: 1px solid rgba(17,24,39,0.08); border-radius: 28px; padding: 27px; box-shadow: 0 22px 70px rgba(17,24,39,0.08); transition: 0.25s; }",
    ".card:hover { transform: translateY(-8px); border-color: rgba(6,182,212,0.35); box-shadow: 0 32px 85px rgba(6,182,212,0.14); }",
    ".card h3 { margin: 0 0 12px; color: #111827; font-size: 23px; }",
    ".card p { color: #64748b; line-height: 1.65; margin: 0; }",

    ".skillIcon { width: 54px; height: 54px; border-radius: 17px; display: grid; place-items: center; background: #e0f2fe; color: #0369a1; font-weight: 900; margin-bottom: 18px; }",

    ".projectCard { padding: 0; overflow: hidden; min-height: 460px; display: flex; flex-direction: column; }",
    ".projectCard img { width: 100%; height: 175px; object-fit: cover; }",
    ".projectBody { padding: 24px; display: flex; flex-direction: column; justify-content: space-between; flex: 1; }",
    ".badge { display: inline-block; width: fit-content; padding: 7px 12px; border-radius: 999px; background: #e0f2fe; color: #0369a1; font-weight: 900; font-size: 13px; margin-bottom: 14px; }",
    ".projectLink { display: inline-block; width: fit-content; margin-top: 20px; padding: 11px 15px; border-radius: 12px; background: #111827; color: white; font-weight: 900; }",

    ".pager { display: flex; justify-content: center; align-items: center; gap: 14px; margin-top: 30px; color: #334155; font-weight: 900; }",
    ".pager button { padding: 11px 16px; border-radius: 12px; border: 1px solid rgba(17,24,39,0.12); background: white; color: #111827; font-weight: 900; cursor: pointer; }",
    ".pager button:disabled { opacity: 0.45; cursor: not-allowed; }",

    ".cta { max-width: 1280px; margin: 70px auto 90px; padding: 58px 7%; border-radius: 34px; background: radial-gradient(circle at top right, rgba(6,182,212,0.22), transparent 35%), linear-gradient(135deg, #111827, #0f172a); color: white; text-align: center; box-shadow: 0 40px 100px rgba(17,24,39,0.22); }",
    ".cta h2 { font-size: clamp(34px, 5vw, 58px); margin: 0 0 16px; letter-spacing: -2px; }",
    ".cta p { color: #cbd5e1; max-width: 720px; margin: 0 auto 28px; line-height: 1.7; font-size: 18px; }",

    "@media (max-width: 920px) { .hero { grid-template-columns: 1fr; padding-top: 55px; } .heroVisual { min-height: 460px; } .sectionHeader { align-items: start; flex-direction: column; } }",

    "@media (max-width: 650px) { .navbar { padding: 13px 5%; align-items: center; } .brand img { width: 48px; height: 48px; border-radius: 15px; } .brand h2 { font-size: 20px; } .brand span { font-size: 12px; } .hamburger { display: flex; } .menu { display: none; width: 100%; flex-direction: column; align-items: stretch; gap: 10px; padding: 14px; margin-top: 10px; border-radius: 22px; background: rgba(255,255,255,0.96); border: 1px solid rgba(17,24,39,0.08); box-shadow: 0 22px 60px rgba(17,24,39,0.14); } .menu.open { display: flex; animation: menuDown 0.25s ease both; } @keyframes menuDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } } .menu a { width: 100%; text-align: center; padding: 13px 15px; } .hero { padding: 38px 5% 40px; gap: 28px; } .eyebrow { font-size: 13px; padding: 8px 13px; } .hero h1 { font-size: 42px; line-height: 1.02; letter-spacing: -1.2px; } .hero p { font-size: 17px; line-height: 1.65; } .heroActions { flex-direction: column; } .btn { width: 100%; text-align: center; } .heroVisual { min-height: 360px; border-radius: 28px; padding: 16px; } .dashboard { padding: 18px; } .profileCard { padding: 22px; } .profileCard img { width: 120px; height: 120px; } .profileCard h2 { font-size: 25px; } .dashGrid { grid-template-columns: 1fr; } .section { padding: 45px 5%; } .sectionHeader h2 { font-size: 36px; letter-spacing: -1px; } .sectionHeader p { font-size: 16px; } .cards { grid-template-columns: 1fr; } .projectCard { min-height: auto; } .projectCard img { height: 155px; } .cta { margin: 45px 5% 70px; padding: 36px 24px; } }"
  ].join("\n");

  return (
    <>
      <style>{css}</style>

      <main className="site">
        <nav className="navbar">
          <a href="#inicio" className="brand" onClick={closeMenu}>
            <img src="/logo.svg" alt="Logo Lenin Johan" />
            <div>
              <h2>Lenin Johan</h2>
              <span>Portafolio profesional</span>
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
            <a href="#proyectos" onClick={closeMenu}>Proyectos</a>
            <a href="#contacto" className="navCta" onClick={closeMenu}>Contacto</a>
          </div>
        </nav>

        <section id="inicio" className="hero">
          <div className="heroText">
            <span className="eyebrow">Disponible para nuevos proyectos</span>
            <h1>
              Creo paginas web modernas
              <span>para negocios y portafolios.</span>
            </h1>
            <p>
              Soy Lenin Johan Cojal Valle. Desarrollo portafolios, landing pages,
              sistemas web y proyectos modernos con Next.js, React, GitHub y Vercel.
            </p>

            <div className="heroActions">
              <a href="#proyectos" className="btn btnDark">Ver proyectos</a>
              <a href="#contacto" className="btn btnLight">Contactarme</a>
            </div>
          </div>

          <div className="heroVisual">
            <div className="dashboard">
              <div className="dashTop">
                <strong>Panel del Portafolio</strong>
                <div className="dashDots">
                  <span></span><span></span><span></span>
                </div>
              </div>

              <div className="profileCard">
                <img src="/logo.svg" alt="Logo Lenin Johan" />
                <h2>Lenin Johan</h2>
                <p>Desarrollador Frontend</p>
              </div>

              <div className="dashGrid">
                <div className="dashItem">
                  <b>{projects.length}+</b>
                  <span>Proyectos</span>
                </div>
                <div className="dashItem">
                  <b>Next</b>
                  <span>Framework</span>
                </div>
                <div className="dashItem">
                  <b>Vercel</b>
                  <span>Deploy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="section">
          <div className="sectionHeader">
            <div>
              <span className="eyebrow">Servicios</span>
              <h2>Soluciones web para proyectos modernos.</h2>
            </div>
            <p>
              Puedo crear paginas informativas, portafolios personales, sistemas
              basicos, paginas para negocios y proyectos conectados con GitHub.
            </p>
          </div>

          <div className="cards">
            <div className="card">
              <div className="skillIcon">01</div>
              <h3>Landing Pages</h3>
              <p>Paginas modernas para presentar negocios, productos o servicios.</p>
            </div>

            <div className="card">
              <div className="skillIcon">02</div>
              <h3>Portafolios</h3>
              <p>Portafolios personales con secciones, proyectos y contacto.</p>
            </div>

            <div className="card">
              <div className="skillIcon">03</div>
              <h3>Sistemas Web</h3>
              <p>Sistemas basicos para ventas, tiendas, turismo y administracion.</p>
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
              Herramientas que uso para crear interfaces limpias, rapidas y adaptables.
            </p>
          </div>

          <div className="cards">
            {["HTML", "CSS", "JavaScript", "React", "Next.js", "GitHub", "VS Code", "Vercel"].map((skill) => (
              <div className="card" key={skill}>
                <div className="skillIcon">{skill.slice(0, 2)}</div>
                <h3>{skill}</h3>
                <p>Herramienta usada para construir proyectos web profesionales.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="proyectos" className="section">
          <div className="sectionHeader">
            <div>
              <span className="eyebrow">GitHub automatico</span>
              <h2>Proyectos recientes.</h2>
            </div>
            <p>
              Estos proyectos se cargan desde GitHub. Cuando subas nuevos repositorios,
              apareceran aqui automaticamente.
            </p>
          </div>

          {loading ? (
            <div className="card">Cargando proyectos desde GitHub...</div>
          ) : (
            <>
              <div className="cards">
                {visibleProjects.map((project) => (
                  <div className="card projectCard" key={project.id}>
                    <img src={project.image || "/projects/default.svg"} alt={project.name} />

                    <div className="projectBody">
                      <div>
                        <span className="badge">{project.language || "GitHub"}</span>
                        <h3>{project.name}</h3>
                        <p>{project.description || "Proyecto publico subido a GitHub."}</p>
                      </div>

                      <a href={project.html_url} target="_blank" rel="noreferrer" className="projectLink">
                        Ver codigo
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
          <h2>Listo para crear nuevos proyectos.</h2>
          <p>
            Este es mi portafolio profesional. Puedes contactarme para proyectos web,
            landing pages, sistemas y paginas modernas.
          </p>

          <a href="mailto:cojalvallelenin919@gmail.com" className="btn btnLight">
            cojalvallelenin919@gmail.com
          </a>
        </section>
      </main>
    </>
  );
}
