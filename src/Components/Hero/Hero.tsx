import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';
import { color } from 'framer-motion';

/* ── Canvas: light scene with navy elements ─────────────── */
function drawScene(ctx: CanvasRenderingContext2D, w: number, h: number, tick: number) {
  ctx.clearRect(0, 0, w, h);
 
  // ── Grid ──────────────────────────────────────────────
  ctx.strokeStyle = 'rgba(27,42,74,0.04)';
  ctx.lineWidth = 1;
  const gs = 64;
  for (let x = 0; x < w; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y < h; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
 
  // ── Dashed route lines ─────────────────────────────────
  const routes = [
    { y: h * 0.22, speed: 0.18 },
    { y: h * 0.50, speed: 0.12 },
    { y: h * 0.76, speed: 0.22 },
  ];
  routes.forEach((r) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(27,42,74,0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([18, 14]);
    ctx.lineDashOffset = -(tick * r.speed) % 32;
    ctx.beginPath(); ctx.moveTo(0, r.y); ctx.lineTo(w, r.y); ctx.stroke();
    ctx.restore();
  });
 
  // ── Floating dots + connections ────────────────────────
  const dots = Array.from({ length: 44 }, (_, i) => {
    const seed = i * 137.508;
    return {
      x: ((seed * 73.1) % w) + Math.sin(tick * 0.0008 + i) * 20,
      y: ((seed * 41.7) % h) + Math.cos(tick * 0.0006 + i * 1.3) * 15,
      r: 0.8 + (i % 3) * 0.55,
      alpha: 0.07 + (i % 4) * 0.035,
    };
  });
  dots.forEach((d) => {
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(27,42,74,${d.alpha})`; ctx.fill();
  });
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(27,42,74,${0.04 * (1 - dist / 110)})`; ctx.lineWidth = 0.7; ctx.stroke();
      }
    }
  }
 
  // ── AGRICULTURAL: Crop field rows (bottom-left area) ──
  {
    const fieldX = w * 0.02;
    const fieldY = h * 0.72;
    const rowCount = 6;
    const rowSpacing = 18;
    const rowWidth = w * 0.28;
 
    ctx.save();
    for (let row = 0; row < rowCount; row++) {
      const ry = fieldY + row * rowSpacing;
      // Row soil line
      ctx.strokeStyle = 'rgba(27,42,74,0.07)';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(fieldX, ry); ctx.lineTo(fieldX + rowWidth, ry); ctx.stroke();
 
      // Wheat stalks along each row
      const stalkCount = Math.floor(rowWidth / 16);
      for (let s = 0; s < stalkCount; s++) {
        const sx = fieldX + s * 16 + 6;
        const stalkH = 22 + (s % 3) * 5;
        const sway = Math.sin(tick * 0.018 + s * 0.8 + row * 0.5) * 2.5;
 
        ctx.globalAlpha = 0.13 - row * 0.01;
        ctx.strokeStyle = '#1B2A4A';
        ctx.lineWidth = 1;
        // Stalk
        ctx.beginPath();
        ctx.moveTo(sx, ry);
        ctx.quadraticCurveTo(sx + sway * 0.5, ry - stalkH * 0.5, sx + sway, ry - stalkH);
        ctx.stroke();
 
        // Grain head (small oval at top)
        ctx.fillStyle = '#C9A84C';
        ctx.globalAlpha = 0.18 - row * 0.015;
        ctx.beginPath();
        ctx.ellipse(sx + sway, ry - stalkH - 4, 2, 5, (sway * Math.PI) / 180, 0, Math.PI * 2);
        ctx.fill();
 
        // Left leaf
        ctx.globalAlpha = 0.09;
        ctx.strokeStyle = '#1B2A4A';
        ctx.beginPath();
        ctx.moveTo(sx + sway * 0.4, ry - stalkH * 0.55);
        ctx.quadraticCurveTo(sx - 6, ry - stalkH * 0.4, sx - 9, ry - stalkH * 0.55);
        ctx.stroke();
      }
    }
    ctx.restore();
  }
 
  // ── AGRICULTURAL: Tractor (moves slowly right) ────────
  {
    const totalW = w + 300;
    const offset = (tick * 0.18) % totalW;
    const tx = ((w * 0.05 + offset) % totalW) - 150;
    const ty = h * 0.88;
 
    ctx.save();
    ctx.globalAlpha = 0.11;
    ctx.fillStyle = '#1B2A4A';
 
    // Body
    ctx.beginPath(); ctx.rect(tx, ty - 28, 52, 22); ctx.fill();
    // Hood / engine block
    ctx.beginPath(); ctx.rect(tx + 36, ty - 22, 24, 16); ctx.fill();
    // Exhaust pipe
    ctx.strokeStyle = '#1B2A4A'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(tx + 52, ty - 22); ctx.lineTo(tx + 52, ty - 34); ctx.stroke();
    // Exhaust puff (small circles that fade)
    [1, 2, 3].forEach((puff) => {
      const puffAge = (tick * 0.03 + puff * 0.4) % 1;
      ctx.globalAlpha = 0.06 * (1 - puffAge);
      ctx.fillStyle = '#8A93A8';
      ctx.beginPath();
      ctx.arc(tx + 52, ty - 34 - puff * 8 * puffAge, 3 + puff * puffAge * 3, 0, Math.PI * 2);
      ctx.fill();
    });
 
    ctx.globalAlpha = 0.11; ctx.fillStyle = '#1B2A4A';
 
    // Large rear wheel
    ctx.beginPath(); ctx.arc(tx + 14, ty, 18, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 0.07; ctx.fillStyle = '#F4F5F7';
    ctx.beginPath(); ctx.arc(tx + 14, ty, 10, 0, Math.PI * 2); ctx.fill();
    // Wheel spokes (rotate with tick)
    ctx.globalAlpha = 0.11; ctx.strokeStyle = '#1B2A4A'; ctx.lineWidth = 1.5;
    for (let sp = 0; sp < 6; sp++) {
      const angle = (tick * 0.025 + sp * Math.PI / 3);
      ctx.beginPath();
      ctx.moveTo(tx + 14, ty);
      ctx.lineTo(tx + 14 + Math.cos(angle) * 10, ty + Math.sin(angle) * 10);
      ctx.stroke();
    }
 
    ctx.globalAlpha = 0.11; ctx.fillStyle = '#1B2A4A';
    // Small front wheel
    ctx.beginPath(); ctx.arc(tx + 46, ty + 4, 10, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 0.07; ctx.fillStyle = '#F4F5F7';
    ctx.beginPath(); ctx.arc(tx + 46, ty + 4, 5.5, 0, Math.PI * 2); ctx.fill();
 
    // Cab window
    ctx.globalAlpha = 0.07; ctx.fillStyle = '#8A93A8';
    ctx.beginPath(); ctx.rect(tx + 6, ty - 25, 22, 12); ctx.fill();
 
    ctx.restore();
  }
 
  // ── AGRICULTURAL: Floating grain/seed particles ────────
  {
    const grainSeeds = Array.from({ length: 18 }, (_, i) => {
      const seed = i * 89.3;
      const baseX = (seed * 61.7) % w;
      const baseY = (seed * 43.1) % (h * 0.6) + h * 0.1;
      const drift = Math.sin(tick * 0.006 + i * 1.1) * 30;
      const rise  = ((tick * (0.15 + (i % 4) * 0.06) + seed * 10) % (h * 0.7));
      return {
        x: baseX + drift,
        y: baseY - rise,
        size: 1.5 + (i % 3) * 0.8,
        alpha: 0.08 + (i % 3) * 0.04,
        rotation: tick * 0.015 + i,
      };
    });
 
    grainSeeds.forEach((g) => {
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.rotation);
      ctx.globalAlpha = g.alpha;
      // Seed shape: small ellipse
      ctx.fillStyle = '#C9A84C';
      ctx.beginPath();
      ctx.ellipse(0, 0, g.size, g.size * 2.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }
 
  // ── AGRICULTURAL: Wheat stalk watermark (large, top-right) ──
  {
    const wx = w * 0.88;
    const wy = h * 0.55;
    const sway = Math.sin(tick * 0.008) * 4;
 
    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = '#1B2A4A';
    ctx.lineWidth = 3;
 
    // Main stalk
    ctx.beginPath();
    ctx.moveTo(wx, wy + 120);
    ctx.quadraticCurveTo(wx + sway, wy + 40, wx + sway * 1.5, wy - 80);
    ctx.stroke();
 
    // Grain pods left
    [0.2, 0.4, 0.6, 0.75].forEach((t, idx) => {
      const px = wx + sway * t;
      const py = wy + 120 - (200 * t);
      const len = 40 - idx * 6;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.quadraticCurveTo(px - len * 0.6, py - 14, px - len, py - 8);
      ctx.stroke();
    });
    // Grain pods right
    [0.25, 0.45, 0.65].forEach((t) => {
      const px = wx + sway * t;
      const py = wy + 120 - (200 * t);
      const len = 36;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.quadraticCurveTo(px + len * 0.6, py - 14, px + len, py - 8);
      ctx.stroke();
    });
 
    // Grain head
    ctx.fillStyle = '#C9A84C';
    ctx.globalAlpha = 0.05;
    ctx.beginPath();
    ctx.ellipse(wx + sway * 1.5, wy - 90, 12, 28, (sway * 0.02), 0, Math.PI * 2);
    ctx.fill();
 
    ctx.restore();
  }
 
  // ── Trucks ────────────────────────────────────────────
  const trucks = [
    { baseX: w * 0.85, y: h * 0.22 - 14, speed: 0.5,  scale: 1.1,  alpha: 0.08 },
    { baseX: w * 0.60, y: h * 0.50 - 14, speed: 0.32, scale: 0.8,  alpha: 0.06 },
  ];
  trucks.forEach((t) => {
    const totalW = w + 400;
    const offset = (tick * t.speed) % totalW;
    const x = ((t.baseX + offset) % totalW + totalW) % totalW - 200;
    ctx.save();
    ctx.translate(x, t.y);
    ctx.scale(t.scale, t.scale);
    ctx.globalAlpha = t.alpha;
    ctx.fillStyle = '#1B2A4A';
    ctx.beginPath(); ctx.rect(-118, -30, 114, 30); ctx.fill();
    ctx.strokeStyle = 'rgba(244,245,247,0.5)'; ctx.lineWidth = 1.2;
    for (let ri = 1; ri <= 4; ri++) { ctx.beginPath(); ctx.moveTo(-118 + ri * 22, -30); ctx.lineTo(-118 + ri * 22, 0); ctx.stroke(); }
    ctx.fillStyle = '#1B2A4A';
    ctx.beginPath(); ctx.rect(0, -32, 38, 32); ctx.fill();
    ctx.globalAlpha = t.alpha * 0.3; ctx.fillStyle = '#8A93A8';
    ctx.beginPath(); ctx.rect(4, -27, 30, 15); ctx.fill();
    ctx.globalAlpha = t.alpha; ctx.fillStyle = '#1B2A4A';
    [{ cx: -86 }, { cx: -56 }, { cx: 20 }].forEach(({ cx }) => {
      ctx.beginPath(); ctx.arc(cx, 6, 10, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = t.alpha * 0.4; ctx.fillStyle = '#F4F5F7';
      ctx.beginPath(); ctx.arc(cx, 6, 5.5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = t.alpha; ctx.fillStyle = '#1B2A4A';
    });
    ctx.restore();
  });
 
  // ── Container stacks ──────────────────────────────────
  const stacks = [
    { x: w * 0.68, y: h * 0.87, cols: 4, rows: 2, alpha: 0.075 },
    { x: w * 0.83, y: h * 0.91, cols: 3, rows: 3, alpha: 0.05  },
  ];
  stacks.forEach((s) => {
    for (let row = 0; row < s.rows; row++) {
      for (let col = 0; col < s.cols; col++) {
        const cx = s.x + col * 54;
        const cy = s.y - row * 31;
        ctx.save();
        ctx.globalAlpha = s.alpha - row * 0.01;
        ctx.fillStyle = '#1B2A4A';
        ctx.beginPath(); ctx.rect(cx, cy, 50, 27); ctx.fill();
        ctx.strokeStyle = 'rgba(244,245,247,0.45)'; ctx.lineWidth = 1;
        for (let rib = 1; rib <= 4; rib++) {
          ctx.beginPath(); ctx.moveTo(cx + rib * 10, cy); ctx.lineTo(cx + rib * 10, cy + 27); ctx.stroke();
        }
        ctx.restore();
      }
    }
  });
 
  // ── Ship ──────────────────────────────────────────────
  const sx = w * 0.72 + Math.sin(tick * 0.0004) * 5;
  const sy = h * 0.65;
  ctx.save(); ctx.globalAlpha = 0.04; ctx.fillStyle = '#1B2A4A';
  ctx.beginPath();
  ctx.moveTo(sx, sy); ctx.lineTo(sx + 220, sy);
  ctx.lineTo(sx + 240, sy + 22); ctx.lineTo(sx - 18, sy + 22);
  ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.rect(sx + 18, sy - 34, 65, 34); ctx.fill();
  for (let sc = 0; sc < 7; sc++) { ctx.beginPath(); ctx.rect(sx + 95 + sc * 20, sy - 18, 16, 18); ctx.fill(); }
  ctx.restore();
 
  // ── Radar rings ───────────────────────────────────────
  const rx = w * 0.12, ry = h * 0.15;
  [0, 0.33, 0.66].forEach((offset) => {
    const pulse = (tick * 0.0012 + offset) % 1;
    ctx.beginPath();
    ctx.arc(rx, ry, 18 + 80 * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(201,168,76,${0.16 * (1 - pulse)})`;
    ctx.lineWidth = 1.5; ctx.stroke();
  });
  ctx.beginPath(); ctx.arc(rx, ry, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(201,168,76,0.45)'; ctx.fill();
  ctx.beginPath(); ctx.arc(rx, ry, 2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(201,168,76,0.85)'; ctx.fill();
 
  // ── Location pins ─────────────────────────────────────
  const pins = [
    { x: w * 0.30, y: h * 0.22 - 28 },
    { x: w * 0.65, y: h * 0.50 - 28 },
    { x: w * 0.48, y: h * 0.76 - 28 },
  ];
  pins.forEach((p, i) => {
    const pulse = (Math.sin(tick * 0.02 + i * 2) + 1) / 2;
    ctx.save();
    ctx.globalAlpha = 0.10 + pulse * 0.05;
    ctx.fillStyle = '#C9A84C';
    ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5 + pulse * 10, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(201,168,76,${0.18 * (1 - pulse)})`;
    ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
  });
}

/* ── Component ──────────────────────────────────────────── */
const Hero: React.FC = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickRef   = useRef(0);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const loop = () => { tickRef.current += 1; drawScene(ctx, canvas.width, canvas.height, tickRef.current); animRef.current = requestAnimationFrame(loop); };
    loop();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  const tags = [
    { en: 'Logistics',   ar: 'اللوجستيات', color: '#355872' },
    { en: 'Trading',     ar: 'التجارة',     color: '#637AB9' },
    { en: 'Export',      ar: 'التصدير',     color: '#6984A9' },
    { en: 'Import',      ar: 'الاستيراد',   color: '#5F9598' },
    { en: 'Agri. Growers', ar: 'منتجون زراعيون',     color: '#67C090' },
  ];

  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__geo hero__geo--1" />
      <div className="hero__geo hero__geo--2" />
      <div className="hero__geo hero__geo--3" />

      <div className="hero__layout container">

        {/* ── Left: arrow tag stack ── */}
        <div className={`hero__tags ${isRTL ? 'hero__tags--rtl' : ''}`}>
          {tags.map((tag, i) => (
            <div
              key={tag.en}
              className="hero__tag fade-in-up"
              style={{ animationDelay: `${i * 0.12}s`, backgroundColor: tag.color }}
            >
              <span className="hero__tag-text">{isRTL ? tag.ar : tag.en}</span>
              {/* <span className="hero__tag-arrow">
                <svg viewBox="0 0 28 20" fill="none">
                  <path d="M0 10 H20 M14 3 L22 10 L14 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span> */}
            </div>
          ))}
        </div>

        {/* ── Right: logo + buttons + stats ── */}
        <div className="hero__right fade-in-up delay-3">
          <img
            src="../../../public/assets/Logo/logo-v.PNG"
            alt="Al Raedon"
            className="hero__logo"
          />

          <div className="hero__ctas">
            <button
              className="hero__btn hero__btn--primary"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta')}
            </button>
            <button
              className="hero__btn hero__btn--ghost"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta2')}
            </button>
          </div>

          <div className="hero__stats">
            {[
              { num: '4+',   label: 'Core Services' },
              { num: '360°', label: 'Supply Chain'   },
              { num: '24/7', label: 'Monitoring'     },
            ].map((s) => (
              <div className="hero__stat" key={s.label}>
                <span className="hero__stat-num">{s.num}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;