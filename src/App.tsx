import { useEffect, useRef, useState } from 'react';
import Excavator from './Excavator';
import coal from '../assets/szen-web.jpg';
import bags from '../assets/zsakosaru.jpg';

const phone = 'tel:+3633416896';
const google = 'https://share.google/yRWmxmeRvB9gVSl7q';
const maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('2500 Esztergom, Dorogi út 5/D');
const facebook = 'https://www.facebook.com/p/J%C3%B3n%C3%A1s-T%C3%BCz%C3%A9p-100057113603282/';
const nav = [['Termékek', '#termekek'], ['Miért érdemes?', '#elonyok'], ['Vélemények', '#velemenyek'], ['Kapcsolat', '#kapcsolat']];
const categories = [
  { title: 'Tüzelőanyagok', detail: 'Szén, brikett, kalodás tűzifa', icon: 'flame' },
  { title: 'Ömlesztett anyagok', detail: 'Sóder, homok, murva, kavics, zúzott kő, kőpor, termőföld', icon: 'pile' },
  { title: 'Betonáruk', detail: 'Zsalukő, oszlopzsalu, kerti szegély, térkő, járdalap', icon: 'blocks' },
  { title: 'Építőanyagok és ragasztók', detail: 'Cement, tégla, mész, esztrich, csempe- és EPS-ragasztó', icon: 'bag' },
  { title: 'Szerszámok és kiegészítők', detail: 'Kőműves és kerti eszközök, munkavédelmi termékek', icon: 'tools' },
];
function Icon({ name, className = '' }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    phone: <path d="m8 3 3 5-3 3c2 3 3 4 5 5l3-3 5 3c-1 6-5 6-10 3S2 9 3 5l5-2Z"/>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,
    flame: <path d="M12 2c3 5-1 6 2 9l3-4c7 9 2 15-5 15S1 16 7 9c0 4 2 4 3 2s2-5 2-9Z"/>,
    pile: <><path d="m2 20 6-10 4 4 3-9 7 15H2Z"/><path d="m5 20 4-4 3 4m2-1 3-6 3 7"/></>,
    blocks: <><path d="M3 4h18v7H3zM3 14h18v7H3zM9 4v7m6 3v7"/><path d="M3 7h3m12 0h3M3 17h5m10 0h3"/></>,
    bag: <><path d="M7 3h10l-1 4 4 14H4L8 7 7 3Zm1 4h8M7 14h10"/><path d="M10 17h4"/></>,
    tools: <><path d="m3 21 11-11m-2-6 4-2 6 6-2 4-8-8Zm-9 0 17 17m-2-3 3 3"/></>,
    truck: <><path d="M2 5h12v12H2V5Zm12 5h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  };
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>;
}
function App() {
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && menu) { setMenu(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', close);
    const media = matchMedia('(min-width: 1024px)');
    const resized = () => { if (media.matches) setMenu(false); };
    media.addEventListener('change', resized);
    return () => { window.removeEventListener('keydown', close); media.removeEventListener('change', resized); };
  }, [menu]);
  return <>
    <a className="skip-link" href="#tartalom">Ugrás a tartalomhoz</a>
    <header className="header">
      <a className="wordmark" href="#" aria-label="Jónás Tüzép – az oldal teteje">JÓNÁS<span>TÜZÉP<span className="brand-square" /></span></a>
      <nav className={menu ? 'nav is-open' : 'nav'} id="fo-menu" aria-label="Fő navigáció">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}</nav>
      <a className="header-call" href={phone}><Icon name="phone"/><span>Hívás</span></a>
      <button className="menu-toggle" ref={menuButton} aria-expanded={menu} aria-controls="fo-menu" aria-label={menu ? 'Menü bezárása' : 'Menü megnyitása'} onClick={() => setMenu(!menu)}><span/><span/><span/></button>
    </header>
    <Excavator />
    <main id="tartalom">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow"><span className="small-square"/> ÉPÍTŐANYAG ÉS TÜZELŐANYAG · ESZTERGOM</p>
          <h1>A munkához<br/>szükséges anyagok,<br/><em>egy helyen.</em></h1>
          <p className="hero-description">Az első lapát sódertől az utolsó zsák cementig.<br className="desktop-break"/> Építőanyagok, tüzelőanyagok és kiegészítők, kis és nagy mennyiségben.</p>
          <div className="actions"><a className="button primary" href={phone}><Icon name="phone"/> Hívjon minket <Icon name="arrow"/></a><a className="text-link" href="#termekek">Termékkategóriák <Icon name="arrow"/></a></div>
          <div className="hero-trust"><span className="stars" aria-label="Google-értékelés">★★★★★</span><strong>4,6 / 5</strong><span>30 Google-vélemény alapján*</span></div>
        </div>
        <div className="hero-bottom"><span><Icon name="pin"/> Esztergom, Dorogi út 5/D</span><a href="#termekek">ISMERJE MEG A KÍNÁLATOT <span>↓</span></a></div>
      </section>
      <section className="intro section-pad">
        <p className="section-label">01 / JÓNÁS TÜZÉP</p>
        <div className="intro-grid"><h2>Építkezéshez.<br/>Felújításhoz.<br/><span>Otthoni munkákhoz.</span></h2><div><p>A Jónás Tüzép esztergomi telephelyén a tüzelőanyagoktól a betonárukig többféle alapanyag és kiegészítő érhető el.</p><p>Segítünk eligazodni a fő termékkategóriák között. Ön elmondja, mire van szüksége, mi pedig egyeztetjük a részleteket.</p><a className="text-link" href="#kapcsolat">Keressen minket <Icon name="arrow"/></a></div></div>
      </section>
      <section className="products section-pad" id="termekek">
        <div className="section-heading"><div><p className="section-label">02 / TERMÉKKATEGÓRIÁK</p><h2>Amire szüksége lehet<span className="accent">.</span></h2></div><p>Alapanyag a következő lépéshez.<br/>Átláthatóan, egy helyen.</p></div>
        <div className="category-list">{categories.map((category, i) => <a href="#kapcsolat" className="category" key={category.title}><span className="category-number">0{i+1}</span><Icon name={category.icon} className="category-icon"/><div><h3>{category.title}</h3><p>{category.detail}</p></div><Icon name="arrow" className="category-arrow"/></a>)}</div>
        <div className="product-note"><span>Az aktuális árakról és elérhetőségről érdeklődjön telefonon.</span><a href={phone}>(06 33) 416 896 <Icon name="arrow"/></a></div>
        <div className="material-strip"><figure><img src={coal} alt="A kínálatban szereplő szén a rendelkezésre bocsátott termékfotón" loading="lazy" width="480" height="640"/><figcaption>TÜZELŐANYAGOK</figcaption></figure><figure><img src={bags} alt="Raklapos zsákos építőanyagok a rendelkezésre bocsátott fotón" loading="lazy" width="828" height="828"/><figcaption>ZSÁKOS ÉPÍTŐANYAGOK</figcaption></figure><div><span className="material-cross">+</span><p>A jó munka<br/><strong>az alapoknál kezdődik.</strong></p><span>A KÍNÁLATBÓL · TERMÉKFOTÓK</span></div></div>
      </section>
      <section className="delivery section-pad"><Icon name="truck" className="delivery-icon"/><div><p className="section-label">AHOGYAN ÖNNEK KÉNYELMES</p><h2>Átvétel helyben.<br/><span>Kiszállítás egyeztetés szerint.</span></h2><p>Jöjjön el esztergomi telephelyünkre, vagy érdeklődjön a kiszállítás lehetőségéről. A mennyiséget, a szállítás részleteit és feltételeit telefonon egyeztetjük.</p><a className="button light" href={phone}>Egyeztessünk a szállításról <Icon name="arrow"/></a></div></section>
      <section className="benefits section-pad" id="elonyok"><p className="section-label">03 / MIÉRT ÉRDEMES?</p><h2>Egyszerűbb anyagbeszerzés,<br/><span>átlátható kínálat.</span></h2><div className="benefit-grid">{[
        ['Többféle termékkategória', 'Tüzelőanyagok, építőanyagok, betonáruk és szerszámok. A különböző munkákhoz szükséges alapok egy helyen.'],
        ['Kis és nagy mennyiség', 'Otthoni javításhoz vagy nagyobb munkához keres anyagot? Egyeztessen velünk az igényeiről.'],
        ['Átvétel vagy kiszállítás', 'Személyes átvétel Esztergomban, kiszállítási lehetőséggel. A részleteket beszéljük meg telefonon.'],
      ].map(([title, text], i) => <article key={title}><span className="benefit-index">0{i+1} <Icon name="check"/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="reviews section-pad" id="velemenyek"><div className="section-heading"><div><p className="section-label">04 / VÁSÁRLÓI VISSZAJELZÉSEK</p><h2>A vásárlók véleménye<span className="accent">.</span></h2></div><a className="text-link" href={google} target="_blank" rel="noreferrer">Megnézem a Google-on <Icon name="arrow"/></a></div><div className="review-grid"><div className="rating"><strong>4,6<span>/5</span></strong><span className="stars">★★★★★</span><p>30 Google-vélemény*</p></div>{[
        ['„Nagyszerű emberek, minőségi áru, kitűnő kiszolgálás.”', 'D. Ferenc'],
        ['„Segítőkészek, és értik amit csinálnak.”', 'B. Róbert'],
      ].map(([quote, name]) => <figure className="review" key={name}><span className="stars" aria-label="5 csillag">★★★★★</span><blockquote>{quote}</blockquote><figcaption>{name}<span>Google-vélemény</span></figcaption></figure>)}</div><p className="snapshot">* A bemutatóhoz megadott értékelési adatok alapján. Az értékelés és a véleményszám nem élő adat.</p></section>
      <section className="contact-cta section-pad"><span className="section-label">A KÖVETKEZŐ LÉPÉS EGY HÍVÁS</span><h2>Anyagra van szüksége?<br/><span>Egyeztessünk telefonon.</span></h2><p>Hívjon minket a termékekkel, árakkal és kiszállítással kapcsolatban.</p><div className="actions"><a className="button dark" href={phone}><Icon name="phone"/> (06 33) 416 896 <Icon name="arrow"/></a><a className="text-link" href="mailto:jonastuzep@gmail.com">Inkább e-mailt írok <Icon name="arrow"/></a></div></section>
      <section className="contact section-pad" id="kapcsolat"><p className="section-label">05 / KAPCSOLAT</p><h2>Keressen minket<br/><span>Esztergomban.</span></h2><div className="contact-grid"><div><h3>Telephely</h3><p>2500 Esztergom<br/>Dorogi út 5/D (Hatáskő)</p><a className="text-link" href={maps} target="_blank" rel="noreferrer">Útvonaltervezés <Icon name="arrow"/></a></div><div><h3>Elérhetőségek</h3><a href={phone}>(06 33) 416 896</a><a href="mailto:jonastuzep@gmail.com">jonastuzep@gmail.com</a><a className="text-link" href={facebook} target="_blank" rel="noreferrer">Facebook <Icon name="arrow"/></a></div><div><h3>Nyitvatartás</h3><dl><div><dt>Hétfő–péntek</dt><dd>8:00–16:00</dd></div><div><dt>Szombat</dt><dd>8:00–12:00</dd></div></dl><p className="hours-note">A megadott nyitvatartás szerint.</p></div></div></section>
    </main>
    <footer><a className="footer-brand" href="#">JÓNÁS TÜZÉP<span>Tüzelő és Építőanyag Centrum</span></a><span>Esztergom · Bemutató weboldal</span><a href="#">Vissza a tetejére ↑</a></footer>
  </>;
}
export default App;
