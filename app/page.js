
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
  const [section, setSection] = useState("inicio");
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

  function cambiarSeccion(nombre) {
    setSection(nombre);
    setMenuOpen(false);
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const css = [
    "* { box-sizing: border-box; }",
    "html { scroll-behavior: smooth; }",
    "body { margin: 0; background: #120817; color: #fff7ed; font-family: Arial, Helvetica, sans-serif; overflow-x: hidden; }",
    "button, a { font-family: inherit; }",
    "button { cursor: pointer; }",
    ".site { min-height: 100vh; background: radial-gradient(circle at top left, rgba(249,115,22,0.22), transparent 30%), radial-gradient(circle at top right, rgba(236,72,153,0.18), transparent 35%), linear-gradient(135deg, #120817, #1e1028, #09060d); }",

    ".nav { position: sticky; top: 0; z-index: 50; padding: 18px 7%; display: flex; align-items: center; justify-content: space-between; gap: 18px; background: rgba(18,8,23,0.86); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,0.10); }",
    ".brand { display: flex; align-items: center; gap: 13px; min-width: 0; }",
    ".brand img { width: 56px; height: 56px; border-radius: 18px; box-shadow: 0 16px 42px rgba(249,115,22,0.24); flex: 0 0 auto; }",
    ".brand h2 { margin: 0; color: #fff7ed; font-size: 22px; line-height: 1.1; letter-spacing: -0.5px; }",
    ".brand span { color: #fed7aa; font-size: 13px; font-weight: 700; }",

    ".menu { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }",
    ".menu button { padding: 10px 15px; border-radius: 999px; color: #ffedd5; font-weight: 900; font-size: 14px; transition: 0.25s; border: 1px solid rgba(255,255,255,0.10); background: rgba(255,255,255,0.04); }",
    ".menu button:hover, .menu button.active { background: #f97316; color: #120817; transform: translateY(-2px); }",

    ".hamburger { display: none; width: 48px; height: 48px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); align-items: center; justify-content: center; flex-direction: column; gap: 5px; }",
    ".hamburger span { width: 23px; height: 3px; border-radius: 999px; background: #fff7ed; transition: 0.25s; }",
    ".hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }",
    ".hamburger.open span:nth-child(2) { opacity: 0; }",
    ".hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }",

    ".screen { min-height: calc(100vh - 93px); padding: 55px 7%; display: flex; align-items: center; justify-content: center; }",
    ".panel { width: 100%; max-width: 1260px; min-height: 620px; border-radius: 36px; padding: 42px; background: radial-gradient(circle at top right, rgba(236,72,153,0.20), transparent 32%), linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04)); border: 1px solid rgba(255,255,255,0.14); box-shadow: 0 40px 110px rgba(0,0,0,0.30); overflow: hidden; animation: appear 0.35s ease both; }",
    "@keyframes appear { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }",

    ".grid { display: grid; grid-template-columns: minmax(280px, 1.05fr) minmax(280px, 0.95fr); gap: 42px; align-items: center; }",
    ".eyebrow { display: inline-flex; align-items: center; padding: 9px 14px; border-radius: 999px; background: rgba(249,115,22,0.14); color: #fdba74; border: 1px solid rgba(249,115,22,0.32); font-weight: 900; font-size: 14px; }",
    "h1 { margin: 24px 0 20px; font-size: clamp(42px, 7vw, 82px); line-height: 0.94; letter-spacing: -3px; color: #fff7ed; }",
    "h1 span { display: block; background: linear-gradient(90deg, #f97316, #fff7ed, #ec4899, #8b5cf6); background-size: 220%; -webkit-background-clip: text; color: transparent; animation: gradientMove 4s ease-in-out infinite; }",
    "@keyframes gradientMove { 0%, 100% { background-position: 0%; } 50% { background-position: 100%; } }",
    "h2 { margin: 14px 0 14px; font-size: clamp(34px, 5vw, 56px); line-height: 1; letter-spacing: -2px; }",
    "p { color: #fed7aa; font-size: 18px; line-height: 1.7; }",

    ".actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }",
    ".btn { display: inline-block; padding: 15px 22px; border-radius: 16px; font-weight: 900; font-size: 15px; transition: 0.25s; border: 0; }",
    ".btnPrimary { background: #f97316; color: #120817; box-shadow: 0 18px 45px rgba(249,115,22,0.22); }",
    ".btnLight { background: rgba(255,255,255,0.08); color: #fff7ed; border: 1px solid rgba(255,255,255,0.14); }",
    ".btn:hover { transform: translateY(-4px); }",

    ".playerCard { min-height: 500px; border-radius: 32px; padding: 26px; background: rgba(18,8,23,0.70); border: 1px solid rgba(255,255,255,0.12); display: flex; flex-direction: column; justify-content: space-between; gap: 22px; }",
    ".cover { text-align: center; }",
    ".cover img { width: 165px; height: 165px; border-radius: 34px; background: white; box-shadow: 0 26px 70px rgba(249,115,22,0.24); animation: floatCover 4s ease-in-out infinite; }",
    "@keyframes floatCover { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }",
    ".cover h2 { margin: 18px 0 8px; font-size: 34px; }",
    ".audioBox { padding: 20px; border-radius: 24px; background: rgba(18,8,23,0.75); border: 1px solid rgba(255,255,255,0.12); }",
    ".wave { display: flex; align-items: center; gap: 5px; height: 60px; }",
    ".wave span { flex: 1; min-width: 5px; border-radius: 999px; background: linear-gradient(180deg, #f97316, #ec4899); animation: wave 1.2s ease-in-out infinite; }",
    ".wave span:nth-child(2n) { animation-delay: 0.15s; }",
    ".wave span:nth-child(3n) { animation-delay: 0.30s; }",
    "@keyframes wave { 0%, 100% { height: 16px; opacity: 0.65; } 50% { height: 56px; opacity: 1; } }",

    ".stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }",
    ".stat { padding: 18px; border-radius: 20px; background: rgba(18,8,23,0.70); border: 1px solid rgba(255,255,255,0.12); }",
    ".stat b { display: block; color: #fdba74; font-size: 28px; }",
    ".stat span { color: #fed7aa; font-size: 13px; font-weight: 800; }",

    ".cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 22px; margin-top: 30px; }",
    ".card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 28px; padding: 27px; box-shadow: 0 22px 70px rgba(0,0,0,0.18); transition: 0.25s; }",
    ".card:hover { transform: translateY(-8px); border-color: rgba(249,115,22,0.55); box-shadow: 0 32px 85px rgba(249,115,22,0.14); }",
    ".card h3 { margin: 0 0 12px; color: #fff7ed; font-size: 23px; }",
    ".icon { width: 54px; height: 54px; border-radius: 17px; display: grid; place-items: center; background: rgba(249,115,22,0.14); color: #fdba74; font-weight: 900; margin-bottom: 18px; border: 1px solid rgba(249,115,22,0.25); }",

    ".projectCard { padding: 0; overflow: hidden; min-height: 440px; display: flex; flex-direction: column; }",
    ".projectCard img { width: 100%; height: 170px; object-fit: cover; }",
    ".projectBody { padding: 22px; display: flex; flex-direction: column; justify-content: space-between; flex: 1; }",
    ".badge { display: inline-block; width: fit-content; padding: 7px 12px; border-radius: 999px; background: rgba(249,115,22,0.14); color: #fdba74; font-weight: 900; font-size: 13px; margin-bottom: 14px; border: 1px solid rgba(249,115,22,0.25); }",
    ".projectLink { display: inline-block; width: fit-content; margin-top: 18px; padding: 11px 15px; border-radius: 12px; background: #f97316; color: #120817; font-weight: 900; text-decoration: none; }",

    ".pager { display: flex; justify-content: center; align-items: center; gap: 14px; margin-top: 26px; color: #fed7aa; font-weight: 900; }",
    ".pager button { padding: 11px 16px; border-radius: 12px; border: 1px solid rgba(249,115,22,0.35); background: rgba(255,255,255,0.06); color: #fff7ed; font-weight: 900; cursor: pointer; }",
    ".pager button:disabled { opacity: 0.45; cursor: not-allowed; }",

    "@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } .panel { min-height: auto; } }",
    "@media (max-width: 650px) { .nav { padding: 13px 5%; align-items: center; } .brand img { width: 48px; height: 48px; border-radius: 15px; } .brand h2 { font-size: 20px; } .brand span { font-size: 12px; } .hamburger { display: flex; } .menu { display: none; width: 100%; flex-direction: column; align-items: stretch; gap: 10px; padding: 14px; margin-top: 10px; border-radius: 22px; background: rgba(18,8,23,0.96); border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 22px 60px rgba(0,0,0,0.24); } .menu.open { display: flex; animation: menuDown 0.25s ease both; } @keyframes menuDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } } .menu button { width: 100%; text-align: center; padding: 13px 15px; } .screen { padding: 30px 5%; align-items: flex-start; } .panel { padding: 24px; border-radius: 28px; } h1 { font-size: 40px; line-height: 1.02; letter-spacing: -1.2px; } h2 { font-size: 34px; letter-spacing: -1px; } p { font-size: 16px; } .actions { flex-direction: column; } .btn { width: 100%; text-align: center; } .playerCard { min-height: auto; padding: 20px; } .cover img { width: 120px; height: 120px; } .cover h2 { font-size: 24px; } .stats { grid-template-columns: 1fr; } .cards { grid-template-columns: 1fr; } .projectCard { min-height: auto; } .projectCard img { height: 155px; } }"
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
        <nav className="nav">
          <div className="brand">
            <img src="/logo.svg" alt="Logo Lenin Johan" />
            <div>
              <h2>Lenin Johan</h2>
              <span>Portafolio Podcast</span>
            </div>
          </div>

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
            {menuButton("inicio", "Inicio")}
            {menuButton("servicios", "Servicios")}
            {menuButton("habilidades", "Habilidades")}
            {menuButton("proyectos", "Proyectos")}
            {menuButton("contacto", "Contacto")}
          </div>
        </nav>

        <section className="screen">
          <div className="panel" key={section}>
            {section === "inicio" && (
              <div className="grid">
                <div>
                  <span className="eyebrow">Nuevo episodio disponible</span>
                  <h1>
                    El podcast de mis
                    <span>proyectos web.</span>
                  </h1>
                  <p>
                    Soy Lenin Johan Cojal Valle. Aqui presento mis servicios y proyectos:
                    paginas web, sistemas, portafolios y trabajos hechos con Next.js, React,
                    GitHub y Vercel.
                  </p>

                  <div className="actions">
                    <button className="btn btnPrimary" onClick={() => cambiarSeccion("proyectos")}>
                      Ver proyectos
                    </button>
                    <button className="btn btnLight" onClick={() => cambiarSeccion("contacto")}>
                      Contactarme
                    </button>
                  </div>
                </div>

                <div className="playerCard">
                  <div className="cover">
                    <img src="/logo.svg" alt="Logo Lenin Johan" />
                    <h2>Lenin Johan Show</h2>
                    <p>Frontend Developer - Portfolio Podcast</p>
                  </div>

                  <div className="audioBox">
                    <p style={{ marginTop: 0 }}>Temporada 01 - Proyectos y codigo</p>
                    <div className="wave">
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
            )}

            {section === "servicios" && (
              <div>
                <span className="eyebrow">Servicios</span>
                <h2>Lo que puedo hacer.</h2>
                <p>
                  Estos son los servicios que puedo ofrecer por mientras:
                  paginas web, sistemas de ventas, portafolios, catalogos,
                  soporte tecnico y correccion de errores.
                </p>

                <div className="cards">
                  <div className="card">
                    <div className="icon">WEB</div>
                    <h3>Paginas Web</h3>
                    <p>
                      Creo paginas modernas para negocios, tiendas, eventos,
                      turismo, motos, instituciones y presentaciones personales.
                    </p>
                  </div>

                  <div className="card">
                    <div className="icon">VEN</div>
                    <h3>Sistemas de Ventas</h3>
                    <p>
                      Desarrollo sistemas basicos para registrar productos,
                      clientes, ventas, inventario, reportes y control de una tienda.
                    </p>
                  </div>

                  <div className="card">
                    <div className="icon">POR</div>
                    <h3>Portafolios Profesionales</h3>
                    <p>
                      Diseno portafolios personales con proyectos, contacto,
                      GitHub, Vercel y un estilo profesional.
                    </p>
                  </div>

                  <div className="card">
                    <div className="icon">CAT</div>
                    <h3>Tiendas y Catalogos Web</h3>
                    <p>
                      Creo catalogos para mostrar productos, precios, imagenes,
                      descripcion y contacto para clientes.
                    </p>
                  </div>

                  <div className="card">
                    <div className="icon">TEC</div>
                    <h3>Soporte y Configuracion</h3>
                    <p>
                      Ayudo con instalacion de programas, configuracion de Windows,
                      VS Code, Node.js, GitHub, Vercel y herramientas de trabajo.
                    </p>
                  </div>

                  <div className="card">
                    <div className="icon">ERR</div>
                    <h3>Correccion de Errores</h3>
                    <p>
                      Soluciono errores en paginas web, proyectos Next.js,
                      GitHub, Vercel, HTML, CSS y JavaScript.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {section === "habilidades" && (
              <div>
                <span className="eyebrow">Tecnologias</span>
                <h2>Habilidades principales.</h2>
                <p>Herramientas que uso para crear interfaces limpias, modernas y responsive.</p>

                <div className="cards">
                  {["HTML", "CSS", "JavaScript", "React", "Next.js", "GitHub", "VS Code", "Vercel"].map((skill) => (
                    <div className="card" key={skill}>
                      <div className="icon">{skill.slice(0, 2)}</div>
                      <h3>{skill}</h3>
                      <p>Herramienta usada para construir proyectos web profesionales.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "proyectos" && (
              <div>
                <span className="eyebrow">Episodios de GitHub</span>
                <h2>Mis proyectos recientes.</h2>
                <p>
                  Cada repositorio publico aparece como un episodio. Cuando subas nuevos
                  proyectos a GitHub, apareceran aqui automaticamente.
                </p>

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
              </div>
            )}

            {section === "contacto" && (
              <div>
                <span className="eyebrow">Contacto</span>
                <h2>Hablemos de tu proximo proyecto.</h2>
                <p>
                  Puedo ayudarte a crear paginas web, portafolios, sistemas simples y proyectos
                  modernos con estilo profesional.
                </p>

                <div className="cards">
                  <div className="card">
                    <div className="icon">NO</div>
                    <h3>Nombre</h3>
                    <p>Lenin Johan Cojal Valle</p>
                  </div>

                  <div className="card">
                    <div className="icon">GH</div>
                    <h3>GitHub</h3>
                    <p>{GITHUB_USER}</p>
                  </div>

                  <div className="card">
                    <div className="icon">@</div>
                    <h3>Correo</h3>
                    <p>cojalvallelenin919@gmail.com</p>
                  </div>
                </div>

                <div className="actions">
                  <a className="btn btnPrimary" href="mailto:cojalvallelenin919@gmail.com">
                    Enviar correo
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
