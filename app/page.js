"use client";

import { useEffect, useRef, useState } from "react";
import "./tiktok-portfolio.css";

const USER = "lenin1754575412";
const GITHUB = `https://github.com/${USER}`;
const SITE = "https://lenin-portafolio.vercel.app";
const NAV = [
  ["inicio", "Inicio"],
  ["sobre-mi", "Sobre mí"],
  ["experiencia", "Experiencia"],
  ["proyectos", "Proyectos"],
  ["contacto", "Contacto"],
];
const STACK = ["React", "Next.js", "JavaScript", "HTML5", "CSS3", "Git", "GitHub", "Vercel"];
const WORK = [
  {
    number: "01",
    title: "Desarrollo web",
    detail: "Sitios rápidos, visuales y adaptados a cualquier pantalla.",
    tag: "WEB & FRONTEND",
  },
  {
    number: "02",
    title: "Sistemas digitales",
    detail: "Interfaces útiles para organizar productos, usuarios y procesos.",
    tag: "APLICACIONES",
  },
  {
    number: "03",
    title: "Diseño interactivo",
    detail: "Microinteracciones, movimiento y experiencias memorables.",
    tag: "UI / UX",
  },
];
const FALLBACK = [
  {
    id: "portfolio",
    name: "lenin1754575412.github.io",
    description: "Mi portafolio personal desarrollado con Next.js y React.",
    html_url: `${GITHUB}/lenin1754575412.github.io`,
    homepage: SITE,
    language: "JavaScript",
    topics: ["portfolio", "nextjs"],
  },
];

function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let raf = 0;
    let stars = [];
    let width = 0;
    let height = 0;
    const mouse = { x: 0, y: 0 };

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = Math.min(220, Math.max(90, Math.floor((width * height) / 5900)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.45 + 0.25,
        depth: Math.random() * 1.5 + 0.25,
        phase: Math.random() * Math.PI * 2,
      }));
      draw();
    }

    function move(event) {
      mouse.x = (event.clientX / Math.max(width, 1) - 0.5) * 25;
      mouse.y = (event.clientY / Math.max(height, 1) - 0.5) * 25;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = motionOff ? 0.7 : 0.55 + 0.45 * Math.sin(frame * 0.012 * star.depth + star.phase);
        const x = star.x + mouse.x * star.depth;
        const y = star.y + mouse.y * star.depth;
        ctx.beginPath();
        ctx.fillStyle = `rgba(220,231,255,${0.25 + 0.62 * twinkle})`;
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!motionOff) {
        frame += 1;
        raf = window.requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (!motionOff) window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={ref} className="lp-stars" aria-hidden="true" />;
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="lp-arrow">{diagonal ? "↗" : "→"}</span>;
}

function ProjectCard({ project, index }) {
  const title = project.name.replaceAll("-", " ").replaceAll("_", " ");
  const tags = [project.language, ...(project.topics || []).slice(0, 2)].filter(Boolean);
  const url = project.html_url || GITHUB;
  const isLive = typeof project.homepage === "string" && /^https?:\/\//.test(project.homepage);

  return (
    <article className="lp-project lp-reveal">
      <div className={`lp-project-art lp-art-${index % 3}`} aria-hidden="true">
        <div className="lp-art-grid" />
        <div className="lp-art-window">
          <div className="lp-art-window-top"><i /><i /><i /><span>PROJECT / {String(index + 1).padStart(2, "0")}</span></div>
          <div className="lp-art-window-body">
            <div className="lp-art-line lp-art-line-short" />
            <div className="lp-art-line lp-art-line-wide" />
            <div className="lp-art-line" />
            <div className="lp-art-tiles"><b /><b /><b /></div>
          </div>
        </div>
        <span className="lp-art-count">0{index + 1}</span>
      </div>
      <div className="lp-project-content">
        <div className="lp-project-category">PROYECTO DESTACADO / {String(index + 1).padStart(2, "0")}</div>
        <h3>{title}</h3>
        <p>{project.description || "Desarrollo y experimentación con tecnología web."}</p>
        <div className="lp-project-tags">{tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="lp-project-links">
          <a href={url} target="_blank" rel="noopener noreferrer">Código <Arrow diagonal /></a>
          {isLive && <a href={project.homepage} target="_blank" rel="noopener noreferrer">Ver sitio <Arrow diagonal /></a>}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => { if (!response.ok) throw new Error("GitHub no disponible"); return response.json(); })
      .then((data) => {
        if (!Array.isArray(data)) return;
        const selected = data
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((a, b) => Number(b.stargazers_count || 0) - Number(a.stargazers_count || 0))
          .slice(0, 6);
        if (selected.length) setProjects(selected);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".lp-reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("lp-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("lp-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.09, rootMargin: "0px 0px -45px 0px" });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  function submitContact(event) {
    event.preventDefault();
    const title = `Contacto desde portafolio - ${form.name}`;
    const body = `Nombre: ${form.name}\nCorreo: ${form.email}\n\nMensaje:\n${form.message}`;
    const link = `${GITHUB}/lenin1754575412.github.io/issues/new?${new URLSearchParams({ title, body })}`;
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="lp-page">
      <Starfield />
      <div className="lp-grain" aria-hidden="true" />
      <header className="lp-header">
        <a className="lp-brand" href="#inicio" onClick={() => setMenuOpen(false)} aria-label="Volver al inicio">
          <span className="lp-brand-symbol">L<span>.</span></span>
          <span className="lp-brand-name">LENIN COJAL <small>CREATIVE DEVELOPER</small></span>
        </a>
        <nav className={`lp-nav ${menuOpen ? "lp-nav-open" : ""}`} aria-label="Navegación principal">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="lp-header-cta" href="#contacto">Hablemos <Arrow diagonal /></a>
        <button className="lp-menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
      </header>

      <main>
                        <section className="lp-hero lp-hero-rebuild lp-premium" id="inicio">
          <div className="lp01-grid" aria-hidden="true" />
          <div className="lp01-light" aria-hidden="true" />

          <div className="lpx-layout">
            <div className="lpx-left">
              <div className="lpx-eyebrow">
                <span className="lpx-dot" />
                PORTAFOLIO DIGITAL / 2026
                <span className="lpx-rule" />
              </div>

              <h1 className="lpx-heading">
                <span>DESARROLLANDO</span>
                <span className="lpx-stroke">EXPERIENCIAS</span>
                <span className="lpx-blue">DIGITALES</span>
                <span className="lpx-last">PARA EL FUTURO<span className="lpx-period">.</span></span>
              </h1>

              <p className="lpx-description">
                Desarrollo soluciones web modernas, creativas y
                funcionales que convierten ideas en experiencias
                digitales reales, escalables y con impacto.
              </p>

              <div className="lpx-actions">
                <a className="lpx-button lpx-button-main" href="#proyectos">
                  EXPLORAR PROYECTOS <span>↗</span>
                </a>
                <a className="lpx-button lpx-button-alt" href="#contacto">
                  HABLEMOS <span>→</span>
                </a>
              </div>
            </div>

            <div className="lpx-scene">
              <div className="lpx-aura" aria-hidden="true" />
              <div className="lpx-halo" aria-hidden="true" />
              <div className="lpx-ring lpx-ring-one" aria-hidden="true" />
              <div className="lpx-ring lpx-ring-two" aria-hidden="true" />
              <div className="lpx-ring lpx-ring-three" aria-hidden="true" />

              <div className="lpx-person">
                <img
                  src="/perfil-transparente.png"
                  alt="Lenin Johan Cojal Valle"
                />
              </div>

              <div className="lpx-orbit-front" aria-hidden="true" />
              <div className="lpx-platform" aria-hidden="true" />

              <div className="lpx-tech lpx-tech-one">
                &lt;/&gt; &nbsp; WEB DEVELOPMENT
              </div>
              <div className="lpx-tech lpx-tech-two">
                ◈ &nbsp; NEXT.JS / REACT
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-about" id="sobre-mi">
          <div className="lp-section-overline lp-reveal"><span>01 / SOBRE MÍ</span><span>UNA FORMA DIFERENTE DE CREAR</span></div>
          <div className="lp-about-grid">
            <div className="lp-reveal"><p className="lp-small-caption">HOLA, SOY LENIN</p><h2>Las buenas ideas merecen <em>una gran experiencia.</em></h2></div>
            <div className="lp-about-copy lp-reveal"><p>Me interesa desarrollar productos digitales que combinen una estética cuidada con una experiencia de uso clara, rápida e intuitiva.</p><p>Trabajo con tecnologías web modernas, desde la primera idea hasta su publicación, prestando atención a cada detalle.</p><a className="lp-text-link" href={GITHUB} target="_blank" rel="noopener noreferrer">EXPLORAR MI GITHUB <Arrow diagonal /></a></div>
          </div>
          <div className="lp-stack lp-reveal"><span className="lp-stack-label">TECNOLOGÍAS /</span>{STACK.map((item) => <span className="lp-stack-item" key={item}>{item}</span>)}</div>
        </section>

        <section className="lp-section lp-services" id="experiencia">
          <div className="lp-section-overline lp-reveal"><span>02 / EXPERIENCIA EN PROYECTOS</span><span>LO QUE HAGO</span></div>
          <div className="lp-section-heading lp-reveal"><p className="lp-small-caption">MI ENFOQUE</p><h2>Diseño. Código.<br /><em>Resultados.</em></h2></div>
          <div className="lp-work-list">
            {WORK.map((item) => <article key={item.number} className="lp-work-item lp-reveal"><span className="lp-work-number">{item.number}</span><div><span className="lp-work-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.detail}</p></div><span className="lp-work-arrow"><Arrow diagonal /></span></article>)}
          </div>
        </section>

        <section className="lp-section lp-projects-section" id="proyectos">
          <div className="lp-section-overline lp-reveal"><span>03 / PROYECTOS</span><span>TRABAJOS DESARROLLADOS</span></div>
          <div className="lp-section-heading lp-reveal"><p className="lp-small-caption">SELECCIÓN DE PROYECTOS</p><h2>Cosas que he<br /><em>construido.</em></h2><p className="lp-projects-description">Proyectos públicos obtenidos de mi cuenta de GitHub. Cada tarjeta tiene enlace a su repositorio.</p></div>
          <div className="lp-project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
          {loading && <p className="lp-project-status">Actualizando proyectos desde GitHub...</p>}
          <div className="lp-center lp-reveal"><a href={`${GITHUB}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="lp-outline-btn">VER TODOS LOS REPOSITORIOS <Arrow diagonal /></a></div>
        </section>

        <section className="lp-contact" id="contacto">
          <div className="lp-contact-inner">
            <div className="lp-section-overline lp-reveal"><span>04 / CONTACTO</span><span>HAGAMOS ALGO BUENO</span></div>
            <p className="lp-small-caption lp-reveal">¿TIENES UN PROYECTO EN MENTE?</p>
            <h2 className="lp-reveal">HABLE<span>MOS</span><span className="lp-period">.</span></h2>
            <div className="lp-contact-grid">
              <div className="lp-contact-copy lp-reveal"><p>Una buena conversación es el comienzo de algo extraordinario.</p><div className="lp-contact-details"><a href={GITHUB} target="_blank" rel="noopener noreferrer">GITHUB <Arrow diagonal /></a><a href={SITE} target="_blank" rel="noopener noreferrer">PORTAFOLIO ONLINE <Arrow diagonal /></a></div></div>
              <form className="lp-contact-form lp-reveal" onSubmit={submitContact}>
                <label>Tu nombre<input required maxLength={80} type="text" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="¿Cómo te llamas?" /></label>
                <label>Tu correo<input required maxLength={120} type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="nombre@correo.com" /></label>
                <label>Cuéntame tu idea<textarea required maxLength={2000} rows={3} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Escribe tu mensaje..." /></label>
                <button type="submit">CONTINUAR EN GITHUB <Arrow diagonal /></button>
                <p className="lp-form-note">Se abrirá GitHub para publicar tu mensaje como una incidencia. Necesitas iniciar sesión allí; aquí no se almacenan los datos.</p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="lp-footer"><span>© {new Date().getFullYear()} LENIN JOHAN COJAL VALLE</span><span>DISEÑADO CON CÓDIGO Y DETALLE</span><a href="#inicio">VOLVER ARRIBA ↑</a></footer>
      <div className="lp-dock" aria-label="Accesos rápidos"><a href="#inicio" title="Inicio" aria-label="Inicio">⌂</a><a href="#proyectos" title="Proyectos" aria-label="Proyectos">▦</a><a href={GITHUB} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">GH</a><a href="#contacto" title="Contacto" aria-label="Contacto">✉</a></div>
    </div>
  );
}
