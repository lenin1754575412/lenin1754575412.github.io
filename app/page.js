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

const Icon = ({ paths }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
);

const services = [
  {
    icon: <Icon paths={<><rect x="2.5" y="4" width="19" height="15" rx="2.5" /><path d="M2.5 8.5h19" /><circle cx="5.5" cy="6.2" r="0.6" fill="currentColor" /><circle cx="7.6" cy="6.2" r="0.6" fill="currentColor" /></>} />,
    title: "Páginas Web",
    text: "Creo páginas modernas para negocios, tiendas, eventos, turismo, instituciones y presentaciones personales."
  },
  {
    icon: <Icon paths={<><path d="M3 20h18" /><rect x="4" y="11" width="3.5" height="6" rx="1" /><rect x="10" y="7" width="3.5" height="10" rx="1" /><rect x="16" y="4" width="3.5" height="13" rx="1" /></>} />,
    title: "Sistemas de Ventas",
    text: "Desarrollo sistemas para registrar productos, clientes, ventas, inventario, reportes y control de una tienda."
  },
  {
    icon: <Icon paths={<><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M8 7V5.5A2 2 0 0 1 10 3.5h4A2 2 0 0 1 16 5.5V7" /><path d="M3 12.5h18" /></>} />,
    title: "Portafolios Profesionales",
    text: "Diseño portafolios personales con proyectos, contacto, GitHub, Vercel y un estilo profesional."
  },
  {
    icon: <Icon paths={<><path d="M5 8h14l-1 11.5A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5L5 8Z" /><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" /></>} />,
    title: "Tiendas y Catálogos Web",
    text: "Creo catálogos para mostrar productos, precios, imágenes, descripción y contacto para clientes."
  },
  {
    icon: <Icon paths={<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>} />,
    title: "Soporte y Configuración",
    text: "Ayudo con instalación de programas, configuración de Windows, VS Code, Node.js, GitHub y Vercel."
  },
  {
    icon: <Icon paths={<><rect x="5" y="7" width="14" height="12" rx="4" /><path d="M9 4l1.5 3M15 4l-1.5 3M5 11H2.5M21.5 11H19M5 15H2.5M21.5 15H19M12 11v5M9.5 13l-1.2 1.4" /></>} />,
    title: "Corrección de Errores",
    text: "Soluciono errores en páginas web, proyectos Next.js, GitHub, Vercel, HTML, CSS y JavaScript."
  }
];

const skills = [
  { name: "HTML", level: 92 },
  { name: "CSS", level: 88 },
  { name: "JavaScript", level: 82 },
  { name: "React", level: 80 },
  { name: "Next.js", level: 78 },
  { name: "GitHub", level: 85 },
  { name: "VS Code", level: 90 },
  { name: "Vercel", level: 83 }
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

      const res = await fetch(
        "https://api.github.com/users/" + GITHUB_USER + "/repos?sort=updated&per_page=100"
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        const repos = data
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            ...repo,
            description: repo.description || "Proyecto público subido a GitHub.",
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

  const css = `
    .site { position: relative; min-height: 100vh; background:
      radial-gradient(1200px 600px at 15% -10%, rgba(249,115,22,0.18), transparent 55%),
      radial-gradient(1000px 700px at 100% 0%, rgba(236,72,153,0.16), transparent 50%),
      linear-gradient(160deg, #0c0611, #160a20 45%, #07050b);
      overflow: hidden; }

    /* Floating light orbs */
    .orb { position: fixed; border-radius: 50%; filter: blur(70px); opacity: 0.5; pointer-events: none; z-index: 0; }
    .orb.o1 { width: 420px; height: 420px; top: -120px; left: -80px; background: rgba(249,115,22,0.45); animation: drift1 16s ease-in-out infinite; }
    .orb.o2 { width: 360px; height: 360px; bottom: -100px; right: -60px; background: rgba(236,72,153,0.40); animation: drift2 19s ease-in-out infinite; }
    .orb.o3 { width: 300px; height: 300px; top: 40%; left: 55%; background: rgba(139,92,246,0.30); animation: drift1 22s ease-in-out infinite; }
    @keyframes drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px, 50px); } }
    @keyframes drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px, -40px); } }

    .nav { position: sticky; top: 0; z-index: 50; padding: 16px 7%; display: flex; align-items: center; justify-content: space-between; gap: 18px; background: rgba(12,6,17,0.72); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid var(--line); }
    .brand { display: flex; align-items: center; gap: 13px; min-width: 0; }
    .brand .logoWrap { position: relative; flex: 0 0 auto; }
    .brand img { width: 52px; height: 52px; border-radius: 16px; box-shadow: 0 14px 38px rgba(249,115,22,0.30); display: block; }
    .brand .dot { position: absolute; right: -2px; bottom: -2px; width: 14px; height: 14px; border-radius: 50%; background: #22c55e; border: 3px solid var(--bg); box-shadow: 0 0 0 0 rgba(34,197,94,0.6); animation: pulse 2.2s infinite; }
    @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); } 70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
    .brand h2 { margin: 0; font-size: 21px; line-height: 1.1; letter-spacing: -0.5px; }
    .brand span { color: var(--ink-soft); font-size: 12px; font-weight: 700; letter-spacing: 0.3px; }

    .menu { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .menu button { padding: 10px 16px; border-radius: 999px; color: var(--ink-soft); font-weight: 700; font-size: 14px; transition: 0.25s; border: 1px solid transparent; background: transparent; }
    .menu button:hover { color: var(--ink); background: var(--glass); }
    .menu button.active { background: linear-gradient(135deg, var(--brand), var(--brand-2)); color: #120817; box-shadow: 0 12px 30px rgba(249,115,22,0.28); }

    .hamburger { display: none; width: 48px; height: 48px; border-radius: 15px; border: 1px solid var(--line-strong); background: var(--glass-2); align-items: center; justify-content: center; flex-direction: column; gap: 5px; }
    .hamburger span { width: 22px; height: 3px; border-radius: 999px; background: var(--ink); transition: 0.25s; }
    .hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; }
    .hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

    .screen { position: relative; z-index: 1; min-height: calc(100vh - 90px); padding: 48px 7%; display: flex; align-items: center; justify-content: center; }
    .panel { width: 100%; max-width: 1240px; border-radius: 34px; padding: 44px; background:
      radial-gradient(circle at top right, rgba(236,72,153,0.14), transparent 40%),
      linear-gradient(150deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03));
      border: 1px solid var(--line-strong); box-shadow: var(--shadow); animation: appear 0.45s cubic-bezier(.2,.7,.3,1) both; }
    @keyframes appear { from { opacity: 0; transform: translateY(18px) scale(.99); } to { opacity: 1; transform: translateY(0) scale(1); } }

    .grid { display: grid; grid-template-columns: minmax(280px, 1.05fr) minmax(300px, 0.95fr); gap: 46px; align-items: center; }
    .eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 8px 15px; border-radius: 999px; background: rgba(249,115,22,0.12); color: #fdba74; border: 1px solid rgba(249,115,22,0.30); font-weight: 700; font-size: 13px; letter-spacing: 0.2px; }
    .eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--brand); box-shadow: 0 0 10px var(--brand); }
    h1 { margin: 22px 0 18px; font-size: clamp(40px, 6.5vw, 76px); line-height: 0.96; letter-spacing: -2.5px; }
    h1 .grad { display: block; background: linear-gradient(90deg, #f97316, #fff7ed, #ec4899, #8b5cf6); background-size: 220%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradientMove 5s ease-in-out infinite; }
    @keyframes gradientMove { 0%,100% { background-position: 0%; } 50% { background-position: 100%; } }
    h2.head { margin: 6px 0 12px; font-size: clamp(30px, 4.5vw, 50px); line-height: 1.02; letter-spacing: -1.5px; }
    p { color: var(--muted); font-size: 17px; line-height: 1.72; margin: 0 0 6px; }
    .lead { color: var(--ink-soft); max-width: 560px; }

    .actions { display: flex; flex-wrap: wrap; gap: 13px; margin-top: 28px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 15px 24px; border-radius: 15px; font-weight: 700; font-size: 15px; transition: transform .2s ease, box-shadow .2s ease; border: 0; text-decoration: none; }
    .btnPrimary { background: linear-gradient(135deg, var(--brand), var(--brand-2)); color: #120817; box-shadow: 0 16px 40px rgba(249,115,22,0.28); }
    .btnLight { background: var(--glass-2); color: var(--ink); border: 1px solid var(--line-strong); }
    .btn:hover { transform: translateY(-4px); }
    .btnPrimary:hover { box-shadow: 0 22px 50px rgba(236,72,153,0.32); }

    .playerCard { border-radius: 30px; padding: 28px; background: rgba(12,6,17,0.66); border: 1px solid var(--line-strong); display: flex; flex-direction: column; gap: 22px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); }
    .cover { text-align: center; }
    .cover img { width: 150px; height: 150px; border-radius: 32px; background: #fff; box-shadow: 0 26px 70px rgba(249,115,22,0.28); animation: floatCover 4.5s ease-in-out infinite; }
    @keyframes floatCover { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-12px) rotate(-1.5deg); } }
    .cover h3 { margin: 16px 0 6px; font-size: 26px; }
    .cover p { font-size: 14px; }
    .audioBox { padding: 18px; border-radius: 22px; background: rgba(12,6,17,0.72); border: 1px solid var(--line); }
    .audioBox .row { display: flex; align-items: center; justify-content: space-between; font-size: 13px; font-weight: 700; color: var(--ink-soft); margin-bottom: 12px; }
    .live { display: inline-flex; align-items: center; gap: 6px; color: #f97316; }
    .live b { width: 8px; height: 8px; border-radius: 50%; background: #f97316; animation: pulse 1.6s infinite; }
    .wave { display: flex; align-items: flex-end; gap: 4px; height: 54px; }
    .wave span { flex: 1; min-width: 4px; border-radius: 999px; background: linear-gradient(180deg, #f97316, #ec4899); animation: wave 1.2s ease-in-out infinite; }
    .wave span:nth-child(2n) { animation-delay: 0.15s; }
    .wave span:nth-child(3n) { animation-delay: 0.30s; }
    .wave span:nth-child(4n) { animation-delay: 0.45s; }
    @keyframes wave { 0%,100% { height: 14px; opacity: 0.6; } 50% { height: 50px; opacity: 1; } }

    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .stat { padding: 16px; border-radius: 18px; background: rgba(12,6,17,0.66); border: 1px solid var(--line); text-align: center; transition: 0.25s; }
    .stat:hover { border-color: rgba(249,115,22,0.5); transform: translateY(-3px); }
    .stat b { display: block; font-family: "Space Grotesk", sans-serif; color: #fdba74; font-size: 26px; }
    .stat span { color: var(--muted); font-size: 12px; font-weight: 700; }

    .sectionHead { max-width: 640px; margin-bottom: 8px; }

    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 30px; }
    .card { position: relative; background: var(--glass); border: 1px solid var(--line-strong); border-radius: 24px; padding: 26px; box-shadow: 0 18px 55px rgba(0,0,0,0.20); transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease; overflow: hidden; }
    .card::after { content: ""; position: absolute; inset: 0; border-radius: 24px; padding: 1px; background: linear-gradient(135deg, rgba(249,115,22,0.4), transparent 40%); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity .28s ease; pointer-events: none; }
    .card:hover { transform: translateY(-8px); border-color: rgba(249,115,22,0.35); box-shadow: 0 32px 80px rgba(249,115,22,0.14); }
    .card:hover::after { opacity: 1; }
    .card h3 { margin: 0 0 10px; font-size: 21px; }
    .card p { font-size: 15px; }
    .icon { position: relative; width: 56px; height: 56px; border-radius: 18px; display: grid; place-items: center; background: linear-gradient(135deg, rgba(249,115,22,0.24), rgba(236,72,153,0.16)); color: #fdba74; margin-bottom: 18px; border: 1px solid rgba(249,115,22,0.30); box-shadow: 0 10px 26px rgba(249,115,22,0.14); transition: transform .35s cubic-bezier(.2,.7,.3,1), box-shadow .35s ease, color .35s ease; }
    .icon svg { transition: transform .35s cubic-bezier(.2,.7,.3,1); }
    .card:hover .icon { transform: translateY(-4px) rotate(-6deg); color: #fff; box-shadow: 0 18px 40px rgba(236,72,153,0.30); background: linear-gradient(135deg, var(--brand), var(--brand-2)); }
    .card:hover .icon svg { transform: scale(1.12) rotate(6deg); }

    /* Staggered entrance (backwards keeps cards hidden during their delay,
       and lets normal :hover transforms work once the animation ends) */
    .rise { animation: rise .6s cubic-bezier(.2,.7,.3,1) backwards; }
    @keyframes rise { from { opacity: 0; transform: translateY(26px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

    /* Skills */
    .skillGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; margin-top: 30px; }
    .skill { padding: 20px 22px; border-radius: 20px; background: var(--glass); border: 1px solid var(--line); }
    .skill .top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .skill .name { font-weight: 700; font-size: 16px; }
    .skill .pct { color: #fdba74; font-weight: 700; font-size: 14px; font-family: "Space Grotesk", sans-serif; }
    .bar { height: 9px; border-radius: 999px; background: rgba(255,255,255,0.08); overflow: hidden; }
    .bar > i { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--brand), var(--brand-2)); animation: fill 1.1s cubic-bezier(.2,.7,.3,1) both; }
    @keyframes fill { from { width: 0 !important; } }

    /* Projects */
    .projectCard { padding: 0; overflow: hidden; display: flex; flex-direction: column; }
    .projectThumb { position: relative; overflow: hidden; }
    .projectThumb img { width: 100%; height: 168px; object-fit: cover; display: block; transition: transform .5s ease; }
    .projectCard:hover .projectThumb img { transform: scale(1.06); }
    .projectThumb::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(12,6,17,0.55)); }
    .playBtn { position: absolute; left: 16px; bottom: 16px; z-index: 2; width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center; color: #120817; background: linear-gradient(135deg, var(--brand), var(--brand-2)); box-shadow: 0 10px 26px rgba(249,115,22,0.45); transform: translateY(8px) scale(.85); opacity: 0; transition: transform .35s cubic-bezier(.2,.7,.3,1), opacity .35s ease; }
    .playBtn svg { margin-left: 2px; }
    .projectCard:hover .playBtn { opacity: 1; transform: translateY(0) scale(1); animation: playPulse 1.8s ease-in-out infinite .35s; }
    @keyframes playPulse { 0%,100% { box-shadow: 0 10px 26px rgba(249,115,22,0.45), 0 0 0 0 rgba(249,115,22,0.5); } 50% { box-shadow: 0 10px 26px rgba(249,115,22,0.45), 0 0 0 12px rgba(249,115,22,0); } }
    .projectBody { padding: 22px; display: flex; flex-direction: column; justify-content: space-between; flex: 1; }
    .badge { display: inline-block; width: fit-content; padding: 6px 12px; border-radius: 999px; background: rgba(249,115,22,0.14); color: #fdba74; font-weight: 700; font-size: 12px; margin-bottom: 12px; border: 1px solid rgba(249,115,22,0.25); }
    .projectBody h3 { font-size: 20px; margin: 0 0 8px; }
    .projectBody p { font-size: 14px; }
    .projectButtons { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 18px; }
    .projectLink { display: inline-flex; align-items: center; gap: 6px; padding: 11px 16px; border-radius: 12px; background: linear-gradient(135deg, var(--brand), var(--brand-2)); color: #120817; font-weight: 700; font-size: 14px; text-decoration: none; transition: transform .25s ease, box-shadow .25s ease; }
    .projectLink:hover { transform: translateY(-3px); box-shadow: 0 12px 25px rgba(249,115,22,0.28); }
    .projectLive { background: transparent; color: #fdba74; border: 1.5px solid rgba(249,115,22,0.6); }
    .projectLive:hover { background: rgba(249,115,22,0.12); }

    .skeletonGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 30px; }
    .skeleton { height: 300px; border-radius: 24px; background: linear-gradient(100deg, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 70%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border: 1px solid var(--line); }
    @keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

    .pager { display: flex; justify-content: center; align-items: center; gap: 14px; margin-top: 30px; color: var(--ink-soft); font-weight: 700; }
    .pager button { padding: 11px 18px; border-radius: 12px; border: 1px solid rgba(249,115,22,0.30); background: var(--glass-2); color: var(--ink); font-weight: 700; transition: 0.2s; }
    .pager button:hover:not(:disabled) { background: rgba(249,115,22,0.14); transform: translateY(-2px); }
    .pager button:disabled { opacity: 0.4; cursor: not-allowed; }

    /* Contact */
    .contactGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin-top: 30px; }
    .contactCard { display: flex; align-items: center; gap: 16px; padding: 22px; border-radius: 20px; background: var(--glass); border: 1px solid var(--line-strong); transition: 0.25s; }
    .contactCard:hover { transform: translateY(-5px); border-color: rgba(249,115,22,0.4); }
    .contactCard .icon { margin: 0; flex: 0 0 auto; }
    .contactCard .label { color: var(--muted); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .contactCard .value { font-size: 16px; font-weight: 700; word-break: break-word; }

    .footer { position: relative; z-index: 1; padding: 34px 7% 44px; display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; border-top: 1px solid var(--line); }
    .footBrand { font-family: "Space Grotesk", sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -0.3px; background: linear-gradient(90deg, var(--brand), var(--brand-2)); -webkit-background-clip: text; background-clip: text; color: transparent; }
    .footYear { color: var(--muted); font-size: 13px; }

    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
      .panel { padding: 34px; }
    }
    @media (max-width: 650px) {
      .nav { padding: 12px 5%; }
      .brand img { width: 46px; height: 46px; border-radius: 14px; }
      .brand h2 { font-size: 19px; }
      .brand span { font-size: 11px; }
      .hamburger { display: flex; }
      .menu { display: none; position: absolute; top: 74px; left: 5%; right: 5%; flex-direction: column; align-items: stretch; gap: 8px; padding: 14px; border-radius: 22px; background: rgba(12,6,17,0.97); border: 1px solid var(--line-strong); box-shadow: 0 22px 60px rgba(0,0,0,0.35); }
      .menu.open { display: flex; animation: menuDown 0.25s ease both; }
      @keyframes menuDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      .menu button { width: 100%; text-align: center; padding: 13px 15px; }
      .screen { padding: 30px 5%; align-items: flex-start; }
      .panel { padding: 24px; border-radius: 26px; }
      h1 { font-size: 40px; letter-spacing: -1.2px; }
      h2.head { font-size: 30px; letter-spacing: -1px; }
      p { font-size: 15px; }
      .actions { flex-direction: column; }
      .btn { width: 100%; }
      .cover img { width: 120px; height: 120px; }
      .stats { grid-template-columns: repeat(3, 1fr); }
      .stat b { font-size: 20px; }
      .stat span { font-size: 10px; }
    }
  `;

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
        <div className="orb o1" />
        <div className="orb o2" />
        <div className="orb o3" />

        <nav className="nav">
          <div className="brand">
            <div className="logoWrap">
              <img src="/logo.svg" alt="Logo Lenin Johan" />
              <span className="dot" />
            </div>
            <div>
              <h2>Lenin Johan</h2>
              <span>Portafolio · Podcast</span>
            </div>
          </div>

          <button
            className={menuOpen ? "hamburger open" : "hamburger"}
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
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
                    <span className="grad">proyectos web.</span>
                  </h1>
                  <p className="lead">
                    Soy <b style={{ color: "var(--ink)" }}>Lenin Johan Cojal Valle</b>. Aquí presento
                    mis servicios y proyectos: páginas web, sistemas, portafolios y trabajos hechos
                    con Next.js, React, GitHub y Vercel.
                  </p>

                  <div className="actions">
                    <button className="btn btnPrimary" onClick={() => cambiarSeccion("proyectos")}>
                      ▶ Ver proyectos
                    </button>
                    <button className="btn btnLight" onClick={() => cambiarSeccion("contacto")}>
                      Contactarme
                    </button>
                  </div>
                </div>

                <div className="playerCard">
                  <div className="cover">
                    <img src="/logo.svg" alt="Logo Lenin Johan" />
                    <h3>Lenin Johan Show</h3>
                    <p>Frontend Developer · Portfolio Podcast</p>
                  </div>

                  <div className="audioBox">
                    <div className="row">
                      <span>Temporada 01 · Proyectos y código</span>
                      <span className="live">
                        <b></b> EN VIVO
                      </span>
                    </div>
                    <div className="wave">
                      {Array.from({ length: 22 }).map((_, i) => (
                        <span key={i} />
                      ))}
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
                <div className="sectionHead">
                  <span className="eyebrow">Servicios</span>
                  <h2 className="head">Lo que puedo hacer.</h2>
                  <p>
                    Estos son los servicios que ofrezco: páginas web, sistemas de ventas,
                    portafolios, catálogos, soporte técnico y corrección de errores.
                  </p>
                </div>

                <div className="cards">
                  {services.map((s, i) => (
                    <div className="card rise" style={{ animationDelay: i * 0.08 + "s" }} key={s.title}>
                      <div className="icon">{s.icon}</div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "habilidades" && (
              <div>
                <div className="sectionHead">
                  <span className="eyebrow">Tecnologías</span>
                  <h2 className="head">Habilidades principales.</h2>
                  <p>Herramientas que uso para crear interfaces limpias, modernas y responsive.</p>
                </div>

                <div className="skillGrid">
                  {skills.map((s) => (
                    <div className="skill" key={s.name}>
                      <div className="top">
                        <span className="name">{s.name}</span>
                        <span className="pct">{s.level}%</span>
                      </div>
                      <div className="bar">
                        <i style={{ width: s.level + "%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "proyectos" && (
              <div>
                <div className="sectionHead">
                  <span className="eyebrow">Episodios de GitHub</span>
                  <h2 className="head">Mis proyectos recientes.</h2>
                  <p>
                    Cada repositorio público aparece como un episodio. Cuando subas nuevos proyectos
                    a GitHub, aparecerán aquí automáticamente.
                  </p>
                </div>

                {loading ? (
                  <div className="skeletonGrid">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div className="skeleton" key={i} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="cards">
                      {visibleProjects.map((project, i) => (
                        <div
                          className="card projectCard rise"
                          style={{ animationDelay: i * 0.08 + "s" }}
                          key={project.id}
                        >
                          <div className="projectThumb">
                            <img src={project.image || "/projects/default.svg"} alt={project.name} />
                            <span className="playBtn" aria-hidden="true">
                              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </div>

                          <div className="projectBody">
                            <div>
                              <span className="badge">{project.language || "GitHub"}</span>
                              <h3>{project.name}</h3>
                              <p>{project.description || "Proyecto público subido a GitHub."}</p>
                            </div>

                            <div className="projectButtons">
                              <a
                                href={project.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="projectLink"
                              >
                                Ver código
                              </a>

                              {project.homepage && (
                                <a
                                  href={project.homepage}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="projectLink projectLive"
                                >
                                  Ver página
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="pager">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                          ← Anterior
                        </button>
                        <span>
                          Página {page} de {totalPages}
                        </span>
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                          Siguiente →
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {section === "contacto" && (
              <div>
                <div className="sectionHead">
                  <span className="eyebrow">Contacto</span>
                  <h2 className="head">Hablemos de tu próximo proyecto.</h2>
                  <p>
                    Puedo ayudarte a crear páginas web, portafolios, sistemas simples y proyectos
                    modernos con estilo profesional.
                  </p>
                </div>

                <div className="contactGrid">
                  <div className="contactCard">
                    <div className="icon">◕</div>
                    <div>
                      <div className="label">Nombre</div>
                      <div className="value">Lenin Johan Cojal Valle</div>
                    </div>
                  </div>

                  <a
                    className="contactCard"
                    href={"https://github.com/" + GITHUB_USER}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="icon">⌥</div>
                    <div>
                      <div className="label">GitHub</div>
                      <div className="value">{GITHUB_USER}</div>
                    </div>
                  </a>

                  <a
                    className="contactCard"
                    href="mailto:cojalvallelenin919@gmail.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="icon">✉</div>
                    <div>
                      <div className="label">Correo</div>
                      <div className="value">cojalvallelenin919@gmail.com</div>
                    </div>
                  </a>
                </div>

                <div className="actions">
                  <a className="btn btnPrimary" href="mailto:cojalvallelenin919@gmail.com">
                    ✉ Enviar correo
                  </a>
                  <a
                    className="btn btnLight"
                    href={"https://github.com/" + GITHUB_USER}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver GitHub
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="footer">
          <span className="footBrand">Lenin Johan Cojal Valle</span>
          <span className="footYear">© {new Date().getFullYear()} · Todos los derechos reservados</span>
        </footer>
      </main>
    </>
  );
}
