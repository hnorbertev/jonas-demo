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

A `src/Excavator.tsx` egyedi SVG-t és külön transzformálható kar/kanál csoportot tartalmaz. A kanál rögzítőcsapja `(425, 535)`, a kar csuklója `(685, 205)`. A hidraulikarúd a forgatott kanálhoz kapcsolódó végpontot követi. A dokumentum teljes görgetési tartománya vezérli a kanál 8–96° közötti forgását, időalapú requestAnimationFrame simítással. Felfelé görgetve ugyanaz az interpoláció fordul vissza. Nincs wheel esemény vagy görgetésátvétel. Nyugalomban nincs folyamatos animációs ciklus.

1024 px-től a markoló fix, oldalszintű réteg, amely a jobb szélről lóg be, külön oldalsáv nélkül. A szekcióhátterek az SVG alatt, a tartalmak felette helyezkednek el; a nyitó szakasz után a grafika halványodik.

1024 px alatt ugyanaz az SVG a relative hero szövege, CTA-i és Google-értékelései alatti, előre méretezett vizuális terében, abszolút dekorációs rétegként látható. A grafika középre igazított, és a gép gémje helyett a teljes rövid kar és kanál szerepel rajta. A `180 130 580 680` viewBox a teljes rövid kart és a kanál mozgástartományát foglalja be, levágott géprészlet nélkül. A grafikai blokk előre lefoglalt magasságú, overflow-clippelt, nem fix vagy sticky, és nem lóg át más szekcióba. A hero görgetési előrehaladása vezérli a 8–46° közötti kanálmozgást. A hero elhagyása után a rajz is kigördül a képernyőről.

A `prefers-reduced-motion` statikus, köztes pózt ad mindkét megjelenítésben. A dekoráció nem fogad pointer eseményt; a scrollanimáció csak SVG-transzformációkat és a hidraulika végpontjait módosítja, a grafikai blokk méretét nem.

## Tartalom és képek

Az adatlap és az implementációs brief adatai kerültek az oldalra. Az értékelések kutatási pillanatképek; az árak, készlet és szállítási feltételek telefonos egyeztetést igényelnek. A `szen.jpg` és `zsakosaru.jpg` kisméretű termékfotóként szerepel. A zsúfolt logó és a két kevésbé használható fotó megmaradt az assets mappában, de nem töltődik le az oldallal. A betűk Google Fonts-ról tölthetők be, rendszerbetűs tartalékkal. Ez bemutató oldal, nem hivatalos üzleti webhely.




