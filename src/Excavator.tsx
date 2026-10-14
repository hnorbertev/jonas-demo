import { useEffect, useRef } from 'react';

/** Articulated arm only: every animated SVG group rotates around its actual pin. */
export default function Excavator() {
  const layer = useRef<HTMLDivElement>(null);
  const illustration = useRef<SVGSVGElement>(null);
  const arm = useRef<SVGGElement>(null);
  const bucket = useRef<SVGGElement>(null);
  const cylinder = useRef<SVGLineElement>(null);
  const rod = useRef<SVGLineElement>(null);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 1023px)');
    let frame = 0, current = 0, target = 0, previous = 0;
    const paint = (progress: number) => {
      const angle = mobile.matches ? 8 + progress * 38 : 8 + progress * 88;
      arm.current?.setAttribute('transform', `rotate(${-progress * (mobile.matches ? 2 : 5)} 685 205)`);
      bucket.current?.setAttribute('transform', `rotate(${angle} 425 535)`);
      // Cylinder attaches to the bucket bell crank, in the stick's coordinate space.
      const radians = angle * Math.PI / 180;
      const x = 425 + 32 * Math.cos(radians) + 59 * Math.sin(radians);
      const y = 535 + 32 * Math.sin(radians) - 59 * Math.cos(radians);
      cylinder.current?.setAttribute('x2', String(569 + (x - 569) * .57));
      cylinder.current?.setAttribute('y2', String(320 + (y - 320) * .57));
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
      const hero = layer.current?.closest<HTMLElement>('.hero');
      const heroRect = hero?.getBoundingClientRect();
      const range = document.documentElement.scrollHeight - innerHeight;
      const progress = mobile.matches && heroRect
        ? Math.min(1, Math.max(0, -heroRect.top / Math.max(heroRect.height, 1)))
        : range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
      const emphasis = Math.max(0, 1 - scrollY / Math.max(innerHeight * .65, 1));
      layer.current?.style.setProperty('--arm-opacity', String(.16 + emphasis * .68));
      // The mobile composition frames the complete stick and bucket, without the boom.
      illustration.current?.setAttribute('viewBox', mobile.matches ? '180 130 580 680' : '0 0 1100 850');
      if (motion.matches) {
        cancelAnimationFrame(frame); frame = 0; previous = 0;
        current = target = .28; paint(current); return;
      }
      target = progress;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    motion.addEventListener('change', update);
    mobile.addEventListener('change', update);
    update();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('scroll', update); window.removeEventListener('resize', update);
      motion.removeEventListener('change', update); mobile.removeEventListener('change', update);
    };
  }, []);

  return <div className="machine-layer" ref={layer} aria-hidden="true">
    <svg className="excavator" ref={illustration} viewBox="0 0 1100 850" fill="none">
      <defs>
        <linearGradient id="arm-paint" x1="650" y1="140" x2="480" y2="570" gradientUnits="userSpaceOnUse"><stop stopColor="#ffc77e"/><stop offset=".38" stopColor="#ea8b3c"/><stop offset="1" stopColor="#b75424"/></linearGradient>
        <linearGradient id="arm-side" x1="500" y1="240" x2="650" y2="380" gradientUnits="userSpaceOnUse"><stop stopColor="#be612c"/><stop offset="1" stopColor="#7c3d22"/></linearGradient>
        <linearGradient id="bucket-steel" x1="240" y1="535" x2="450" y2="725" gradientUnits="userSpaceOnUse"><stop stopColor="#899084"/><stop offset=".45" stopColor="#505b51"/><stop offset="1" stopColor="#252d28"/></linearGradient>
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2=".3"><stop stopColor="#616e66"/><stop offset=".42" stopColor="#edf0df"/><stop offset=".7" stopColor="#afb7a5"/><stop offset="1" stopColor="#57665c"/></linearGradient>
      </defs>
      <g stroke="#303a32" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        {/* The boom continues beyond the right viewport edge; no cab or chassis. */}
        <g className="excavator-boom">
        <path d="m1160 370-118 75-380-195 21-69 61-26 416 215Z" fill="url(#arm-side)"/>
        <path d="m1154 333-96 78-397-178 11-63 52-26 430 189Z" fill="url(#arm-paint)"/>
        <path d="m750 174 302 147-23 17-297-137Z" fill="#f8b663" strokeWidth="2"/>
        <path d="m769 223 255 116" stroke="#a85828" strokeWidth="3"/>
        <path d="m1104 279-319-140" stroke="#29362e" strokeWidth="25"/>
        <path d="m896 188-184-83" stroke="url(#chrome)" strokeWidth="15"/>
        <path d="m712 105-31 76" stroke="#3b483c" strokeWidth="17"/>
        <circle cx="712" cy="105" r="12" fill="#c69b62"/>
        <path d="M1140 307 788 148q-70-39-106 16" stroke="#303a32" strokeWidth="8"/>
        <path d="M1121 322 785 163q-61-31-92 10" stroke="#8e9886" strokeWidth="3"/>
        <path d="m972 279 22 10m-45-20 8 4" stroke="#ffcf8c" strokeWidth="3"/>
        </g>
        <g ref={arm} data-joint="arm">
          <path d="m690 177-37-6-254 344 33 42 39-5 240-322-21-53Z" fill="url(#arm-side)"/>
          <path d="m677 168-31 4-252 340 28 40 35-14 239-321-19-49Z" fill="url(#arm-paint)"/>
          <path d="m651 195-228 308 8 19 239-318" stroke="#ffce88" strokeWidth="5"/>
          <path d="m643 242-185 251" stroke="#a95a2b" strokeWidth="3"/>
          <path d="M662 185q-24-24-43 10L436 448q-20 29-10 59" stroke="#28382e" strokeWidth="8"/>
          <path d="M668 197q-22-23-39 9L452 454q-16 25-9 47" stroke="#89947e" strokeWidth="3"/>
          <path d="m591 281 17 13-27 36-17-12z" fill="#4b5545" strokeWidth="2"/>
          <path d="m513 385 14 11-14 19-14-10z" fill="#4b5545" strokeWidth="2"/>
          <line ref={rod} x1="569" y1="320" x2="457" y2="476" stroke="url(#chrome)" strokeWidth="13"/>
          <line ref={cylinder} x1="569" y1="320" x2="505" y2="409" stroke="#313e33" strokeWidth="24"/>
          <path d="m565 312 14 10m-24 4 14 10" stroke="#a1a98e" strokeWidth="4"/>
          <circle cx="569" cy="320" r="13" fill="#b59660"/><circle cx="569" cy="320" r="5" fill="#303a32"/>
          <g ref={bucket} transform="rotate(8 425 535)" data-joint="bucket">
            <path d="m457 476-32 59-37 30" stroke="#354236" strokeWidth="22"/>
            <path d="m457 476-32 59-37 30" stroke="#7a856b" strokeWidth="8"/>
            <circle cx="457" cy="476" r="12" fill="#bdba96"/><circle cx="457" cy="476" r="4" fill="#303a32"/>
            <path d="M425 535c-17 53-13 106 22 162l-122 35c-67-18-101-78-81-143l81 18 46-80 54 8Z" fill="url(#bucket-steel)"/>
            <path d="m244 589 30-10 65 24-14 129c-67-18-101-78-81-143Z" fill="#768170"/>
            <path d="m274 579 65 24 44-82-12 6-46 80-81-18 30-10Z" fill="#a2a992"/>
            <path d="m339 603 44-82 29 8c-15 62-8 111 24 163l-106 30 9-119Z" fill="#36463b"/>
            <path d="m353 608 25-46m-24 62-12 78m39-126-16 119m37-135-3 124" stroke="#75836d" strokeWidth="7"/>
            <path d="m256 608c-3 42 17 78 50 95" stroke="#bcc2a3" strokeWidth="3"/>
            <path d="m325 732 122-35 15 17-131 39-6-21Z" fill="#98a386"/>
            <path d="m331 752-3 25 20-8 7-23m11-4 1 25 19-10 3-22m12-3 5 24 17-12-1-18m10-3 10 21 17-13-7-17" fill="#c4c9aa"/>
            <path d="m265 635 7 25m18 15 6 8m51 43 63-18" stroke="#b0b79c" strokeWidth="2"/>
            <circle cx="425" cy="535" r="19" fill="#ae793d"/><circle cx="425" cy="535" r="11" fill="#d3bf8c"/><circle cx="425" cy="535" r="5" fill="#374334"/>
            {[0,1,2].map(i=><circle key={i} cx={281+i*8} cy={614+i*20} r="3" fill="#c0c4a5" strokeWidth="1"/>)}
          </g>
          <circle cx="685" cy="205" r="29" fill="#ab7137"/><circle cx="685" cy="205" r="20" fill="#d1a564"/><circle cx="685" cy="205" r="10" fill="#48523e"/>
          <path d="m676 191 5-3m19 14 1 6" stroke="#f3d09a" strokeWidth="3"/>
        </g>
      </g>
    </svg>
  </div>;
}

