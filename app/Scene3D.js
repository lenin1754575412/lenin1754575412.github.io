"use client";

import { useEffect, useRef, useState } from "react";

/*
  Escena 3D real (WebGL / Three.js) hecha en casa.
  Un cristal iridiscente que se deforma, flota y reacciona al cursor.
  Es lo que le da al sitio su identidad "estilo Spline", pero empaquetado
  dentro del propio proyecto: sin cuentas externas ni archivos remotos.
*/

const vertexShader = `
  uniform float uTime;
  uniform float uAmp;
  uniform float uScale;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  // Simplex noise 3D (Ashima Arts) — dominio público
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float n1 = snoise(position * uScale + uTime * 0.18);
    float n2 = snoise(position * uScale * 2.1 - uTime * 0.12);
    float disp = (n1 * 0.65 + n2 * 0.35) * uAmp;
    vDisp = disp;
    vec3 newPos = position + normal * disp;
    vec4 mv = modelViewMatrix * vec4(newPos, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.2);

    vec3 base = mix(uColorC, uColorA, smoothstep(0.0, 0.6, fres));
    base = mix(base, uColorB, smoothstep(0.45, 1.0, fres));

    float shimmer = 0.5 + 0.5 * sin(uTime * 0.7 + vDisp * 7.0 + vNormal.y * 3.5);
    base += 0.10 * shimmer * uColorA;

    vec3 col = base * (0.22 + fres * 1.15);
    col += pow(fres, 3.0) * uColorA * 0.9;      // brillo del borde
    col += smoothstep(0.6, 0.0, fres) * uColorC * 0.05; // núcleo tenue

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Scene3D({ reduced = false }) {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let renderer, scene, camera, mesh, geometry, material, raf, ro;
    let disposed = false;
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const clock = { start: performance.now() };
    const cleanupRef = { current: null };

    (async () => {
      let THREE;
      try {
        THREE = await import("three");
      } catch (e) {
        if (!disposed) setFailed(true);
        return;
      }
      const mount = mountRef.current;
      if (!mount || disposed) return;

      let width = mount.clientWidth || 300;
      let height = mount.clientHeight || 300;

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch (e) {
        if (!disposed) setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.display = "block";

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 0, 4.2);

      geometry = new THREE.IcosahedronGeometry(1.18, 24);
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 0.34 },
          uScale: { value: 0.9 },
          uColorA: { value: new THREE.Color(0.22, 1.0, 0.35) },  // verde neón
          uColorB: { value: new THREE.Color(0.0, 0.90, 0.55) },  // verde menta
          uColorC: { value: new THREE.Color(0.02, 0.45, 0.30) }  // verde profundo
        }
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const onPointer = (e) => {
        const r = mount.getBoundingClientRect();
        pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        pointer.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const resize = () => {
        if (!mount) return;
        width = mount.clientWidth || width;
        height = mount.clientHeight || height;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(resize);
        ro.observe(mount);
      } else {
        window.addEventListener("resize", resize);
      }

      const renderFrame = (t) => {
        target.x += (pointer.x - target.x) * 0.05;
        target.y += (pointer.y - target.y) * 0.05;
        material.uniforms.uTime.value = t;
        mesh.rotation.y = t * 0.25 + target.x * 0.6;
        mesh.rotation.x = target.y * 0.5;
        mesh.position.y = Math.sin(t * 0.9) * 0.06;
        renderer.render(scene, camera);
      };

      if (reduced) {
        // Sin animación continua: un solo fotograma estático y elegante.
        material.uniforms.uTime.value = 0.6;
        mesh.rotation.set(0.2, 0.6, 0);
        renderer.render(scene, camera);
      } else {
        const loop = (now) => {
          const t = (now - clock.start) / 1000;
          renderFrame(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      }

      // Guarda referencias para limpieza
      cleanupRef.current = () => {
        window.removeEventListener("pointermove", onPointer);
        if (ro) ro.disconnect();
        else window.removeEventListener("resize", resize);
        if (raf) cancelAnimationFrame(raf);
        geometry?.dispose();
        material?.dispose();
        renderer?.dispose();
        if (renderer?.domElement && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      if (cleanupRef.current) cleanupRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (failed) {
    return <div className="scene3d-fallback" aria-hidden="true" />;
  }

  return <div className="scene3d" ref={mountRef} aria-hidden="true" />;
}
