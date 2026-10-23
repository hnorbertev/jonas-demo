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

A `src/Excavator.tsx` egyetlen, statikus SVG-illusztráció, kizárólag a hero szekción belül. Nincs scrollvezérlés, eseménykezelő, maszkolás vagy JavaScript-alapú pozicionálás. A kanál és a hidraulika rögzített, egymáshoz igazított pózban jelenik meg.

A `src/excavator.css` kezeli a hero határain belül levágott, abszolút dekorációt. Desktopon a jobb oldalról nyúlik be; 1024 px alatt külön grid-sor biztosít helyet a szöveg, CTA-k és értékelések után. Az SVG viewBoxa minden méreten ugyanaz, az ábrát aránytartó CSS méretezi. A dekoráció nem fogad pointer eseményeket, és reduced-motion mellett is változatlanul statikus.

A jelenlegi ellenőrzés eredményei: [ellenőrzési jegyzőkönyv](qa/markolo-statikus/ELLENORZES.md). A korábbi QA-mappák képei a lecserélt, animált megoldás történeti felvételei.

## Tartalom és képek

Az adatlap és az implementációs brief adatai kerültek az oldalra. Az értékelések kutatási pillanatképek; az árak, készlet és szállítási feltételek telefonos egyeztetést igényelnek. A `szen.jpg` és `zsakosaru.jpg` kisméretű termékfotóként szerepel. A zsúfolt logó és a két kevésbé használható fotó megmaradt az assets mappában, de nem töltődik le az oldallal. A betűk Google Fonts-ról tölthetők be, rendszerbetűs tartalékkal. Ez bemutató oldal, nem hivatalos üzleti webhely.
