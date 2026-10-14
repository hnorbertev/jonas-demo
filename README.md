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

A csökkentett mozgás beállítás statikus pózt ad; 768 px alatt egy halvány, statikus sziluett látható. A jobb szélről belógó SVG csak kart és kanalat ábrázol, nincs külön oldalsáv vagy görgetés közbeni összeméretezés. A szekciók teljes szélességűek: hátterük az SVG alatt, tartalmuk felette helyezkedik el. A fix SVG-réteg nem fogad pointer eseményt. A nyitó szakasz után a grafika halványodik a szövegek olvashatósága érdekében.

## Tartalom és képek

Az adatlap és az implementációs brief adatai kerültek az oldalra. Az értékelések kutatási pillanatképek; az árak, készlet és szállítási feltételek telefonos egyeztetést igényelnek. A `szen.jpg` és `zsakosaru.jpg` kisméretű termékfotóként szerepel. A zsúfolt logó és a két kevésbé használható fotó megmaradt az assets mappában, de nem töltődik le az oldallal. A betűk Google Fonts-ról tölthetők be, rendszerbetűs tartalékkal. Ez bemutató oldal, nem hivatalos üzleti webhely.

