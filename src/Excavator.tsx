import { useEffect, useRef } from 'react';

/** SVG transforms use their real pin coordinates, not the image bounding box. */
export default function Excavator() {
  const layer = useRef<HTMLDivElement>(null);
  const arm = useRef<SVGGElement>(null);
  const bucket = useRef<SVGGElement>(null);
  const piston = useRef<SVGLineElement>(null);
  const rod = useRef<SVGLineElement>(null);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = matchMedia('(min-width: 1024px)');
    let frame = 0;
    let current = 0;
    let target = 0;
    let previous = 0;
    const paint = (progress: number) => {
      // Move into the reserved right gutter before opaque sections reach the viewport.
      const compact = Math.min(1, progress / .09);
      const fullWidth = Math.min(innerWidth * .48, 700);
      layer.current?.style.setProperty('width', `${fullWidth + (280 - fullWidth) * compact}px`);
      layer.current?.style.setProperty('--caption-opacity', String(1 - compact));
      // The bucket rotates relative to the stick. Its linkage follows the same pin.
      const angle = 18 + progress * 88;
      arm.current?.setAttribute('transform', `rotate(${-progress * 7} 410 168)`);
      bucket.current?.setAttribute('transform', `rotate(${angle} 247 383)`);
      const radians = angle * Math.PI / 180;
      const x = 247 + 16 * Math.cos(radians) + 39 * Math.sin(radians);
      const y = 383 + 16 * Math.sin(radians) - 39 * Math.cos(radians);
      const startX = 337, startY = 234;
      piston.current?.setAttribute('x2', String(startX + (x - startX) * .58));
      piston.current?.setAttribute('y2', String(startY + (y - startY) * .58));
      rod.current?.setAttribute('x2', String(x));
      rod.current?.setAttribute('y2', String(y));
    };
    const tick = (time: number) => {
      const delta = previous ? Math.min(time - previous, 64) : 16;
      previous = time;
      current += (target - current) * (1 - Math.exp(-delta / 85));
      if (Math.abs(target - current) < .0002) current = target;
      paint(current);
      if (current !== target) frame = requestAnimationFrame(tick);
      else { frame = 0; previous = 0; }
    };
    const update = () => {
      if (motion.matches || !desktop.matches) {
        cancelAnimationFrame(frame); frame = 0; previous = 0;
        paint(.3); return;
      }
      const range = document.documentElement.scrollHeight - innerHeight;
      target = range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    motion.addEventListener('change', update);
    desktop.addEventListener('change', update);
    update();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('scroll', update); window.removeEventListener('resize', update);
      motion.removeEventListener('change', update); desktop.removeEventListener('change', update);
    };
  }, []);
  return <div className="machine-layer" ref={layer} aria-hidden="true">
    <div className="machine-grid" />
    <svg className="excavator" viewBox="0 0 650 650" fill="none">
      <defs>
        <linearGradient id="paint" x1="220" y1="140" x2="480" y2="450" gradientUnits="userSpaceOnUse"><stop stopColor="#f8b563"/><stop offset=".5" stopColor="#e98232"/><stop offset="1" stopColor="#be5927"/></linearGradient>
        <linearGradient id="steel" x1="175" y1="380" x2="280" y2="520" gradientUnits="userSpaceOnUse"><stop stopColor="#626a65"/><stop offset="1" stopColor="#252c29"/></linearGradient>
        <linearGradient id="glass" x1="455" y1="335" x2="540" y2="430" gradientUnits="userSpaceOnUse"><stop stopColor="#a0b6af"/><stop offset="1" stopColor="#43554f"/></linearGradient>
      </defs>
      <circle cx="366" cy="322" r="223" stroke="#aeb2a6" strokeOpacity=".35" strokeDasharray="3 9" />
      <path d="M125 537H605M365 90V560" stroke="#aeb2a6" strokeOpacity=".4" />
      <ellipse cx="435" cy="559" rx="161" ry="13" fill="#252c29" opacity=".09"/>
      <g stroke="#2e3530" strokeWidth="3" strokeLinejoin="round">
        <rect x="335" y="489" width="255" height="59" rx="29" fill="#303632"/>
        <rect x="350" y="500" width="225" height="36" rx="18" fill="#555d56"/>
        {[371, 411, 451, 491, 531, 561].map(x => <circle key={x} cx={x} cy="518" r="13" fill="#777c70"/>)}
        {Array.from({length: 14}, (_, i) => <path key={i} d={`M${348+i*17} 489v9m0 41v9`} stroke="#92958a" strokeWidth="2"/>)}
        <path d="M366 461h203v27H366z" fill="#777d70"/>
        <path d="M425 414h146l25 21v33H365v-43l60-11Z" fill="url(#paint)"/>
        <path d="M539 435h53v30h-53z" fill="#c8672b"/>
        <path d="M548 444h33m-33 8h33m-33 8h33" strokeWidth="2"/>
        <path d="M444 335h99l18 97H438l6-97Z" fill="#dca35a"/>
        <path d="M454 346h78l12 72h-92l2-72Z" fill="url(#glass)"/>
        <path d="M496 345v73m-43-39h84" strokeWidth="5"/>
        <path d="m462 352 22 0-27 56" stroke="#e2e7d7" strokeOpacity=".35" strokeWidth="4"/>
        <path d="M444 335h99l-4-10h-89z" fill="#303632"/>
        <path d="M452 431h93v9h-93z" fill="#303632"/>
        <path d="M455 446h36" stroke="#f9d7a1" strokeWidth="4"/>
        <path d="M452 413 379 207l31-39 87 253-45-8Z" fill="url(#paint)"/>
        <path d="M460 390 404 215" stroke="#2e3530" strokeWidth="12"/>
        <path d="M460 390 420 265" stroke="#acb4aa" strokeWidth="6"/>
        <path d="M405 183q29 2 34 34l39 146" stroke="#2e3530" strokeWidth="4"/>
        <g ref={arm} data-joint="arm">
          <path d="M410 168 379 158 231 375l27 17 154-194-2-30Z" fill="url(#paint)"/>
          <path d="M391 185 252 377" stroke="#ffc67f" strokeWidth="5"/>
          <path d="M392 175q-14-17-26 2L249 350" stroke="#313832" strokeWidth="4"/>
          <line ref={rod} x1="337" y1="234" x2="274" y2="351" stroke="#b8c2b5" strokeWidth="7"/>
          <line ref={piston} x1="337" y1="234" x2="300" y2="302" stroke="#323b34" strokeWidth="14"/>
          <g ref={bucket} transform="rotate(18 247 383)" data-joint="bucket">
            <path d="M263 344 247 383 220 398" stroke="#303a33" strokeWidth="13"/>
            <circle cx="263" cy="344" r="7" fill="#a2a991"/>
            <path d="M247 383c-12 24-12 63 9 96l-80 20c-32-13-46-49-34-86l53 10 22-45 30 5Z" fill="url(#steel)"/>
            <path d="m151 417 35 11-9 59c-21-12-30-37-26-70Z" fill="#7a8176"/>
            <path d="m195 423 25-42 15 5c-9 30-3 62 12 86l-62 19 10-68Z" fill="#424c43"/>
            <path d="m176 499 80-20 9 8-85 26-4-14Z" fill="#929a84"/>
            <path d="m181 510-5 17 13-6 6-15m10-3-2 15 14-6 2-14m11-3 1 14 12-6-3-12m11-3 5 12 11-7-7-9" fill="#bcc1a6"/>
            <path d="m203 424-8 58m24-81-4 74m18-74 1 68" stroke="#727b6e" strokeWidth="4"/>
            <circle cx="247" cy="383" r="11" fill="#e99b4e"/><circle cx="247" cy="383" r="4" fill="#303a33"/>
          </g>
          <circle cx="410" cy="168" r="15" fill="#b87437"/><circle cx="410" cy="168" r="8" fill="#d7b57d"/>
        </g>
        <circle cx="464" cy="414" r="10" fill="#d7b57d"/>
      </g>
      <g fill="#777e6b"><path d="m173 547 19-21 26 12 9 21h-58z"/><path d="m223 554 15-29 20 5 20 24z"/><path d="m136 552 13-14 16 6 2 11z"/></g>
      <g stroke="#8b927e" strokeWidth="1"><path d="M128 310h28m-14-14v28M571 217h28m-14-14v28"/></g>
    </svg>
    <div className="machine-caption"><span>ANYAG. MUNKA. OTTHON.</span><span>ESZTERGOM</span></div>
  </div>;
}
