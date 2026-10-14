# Jónás Tüzép – bemutató weboldal

Magyar nyelvű, egyoldalas React + Vite + TypeScript demó. Node.js 20.19+ vagy 22.12+ szükséges.

## Futtatás

```sh
npm install
npm run dev
```

A terminálban megjelenő helyi címen nyitható meg (alapértelmezetten http://127.0.0.1:5173).

```sh
npm run typecheck
npm run build
npm run preview
```

## Vercel

Importálja ezt a projektmappát egy Git-tárolóból a Vercelbe, vagy futtassa a Vercel CLI-t a mappában. Keretrendszer: **Vite**, telepítési parancs: `npm install`, build: `npm run build`, kimeneti mappa: `dist`. Nincs szükség környezeti változóra vagy szerveroldali szolgáltatásra. A demó `noindex, nofollow` beállítást használ.

## Markoló

A `src/Excavator.tsx` egyetlen, gyökérszintű fix dekoráció. A hozzá tartozó rétegzés és a két dokumentált SVG-kompozíció képaránya a `src/excavator.css` fájlban található. A szekcióhátterek alatta, a tartalmak felette vannak; nincs helyfoglaló blokk vagy oldalsáv.

A lágy szélű luminanciamaszk összefüggő tartalmi csoportokat véd. Kompakt nézeten a sűrű terméklista mögött a grafika tudatosan rejtett, így nem villannak elő széteső géprészletek a sorok között. Az SVG méretezését a tényleges geometria és a rendelkezésre álló viewportmagasság korlátozza; görgetéskor a kompozíció nem változik.

A kanál csuklója `(425, 535)`, a karé `(685, 205)`. A teljes dokumentum görgetési aránya vezérli a 8–96°-os desktop és 8–80°-os kompakt kanálmozgást. A hidraulika végpontja követi a kanál csuklószerkezetét. A finom követés requestAnimationFrame-et használ, automatikus mozgás és wheel-kezelés nélkül; nyugalomban leáll. A reduced-motion statikus köztes pózt ad.

A 390, 768 és 1440 px-es hero, termékek és kiszállítás nézetek képei és mérései: [ellenőrzési jegyzőkönyv](qa/markolo/ELLENORZES.md). Az animáció regressziótesztje: `node qa/markolo/verify-animation.cjs`.

## Tartalom és képek

Az adatlap és az implementációs brief adatai kerültek az oldalra. Az értékelések kutatási pillanatképek; az árak, készlet és szállítási feltételek telefonos egyeztetést igényelnek. A `szen.jpg` és `zsakosaru.jpg` kisméretű termékfotóként szerepel. A zsúfolt logó és a két kevésbé használható fotó megmaradt az assets mappában, de nem töltődik le az oldallal. A betűk Google Fonts-ról tölthetők be, rendszerbetűs tartalékkal. Ez bemutató oldal, nem hivatalos üzleti webhely.






