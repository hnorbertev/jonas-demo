# Statikus markoló – ellenőrzés

Dátum: 2026-10-23. Helyi Vite szerver; valódi, headless Microsoft Edge böngésző Playwright vezérléssel. A viewportok magassága 900 px volt. Az alábbi képernyőképek tényleges böngészős renderelések, amelyeket vizuálisan is átnéztünk.

| Szélesség | Hero | Termékkategóriák | Kiszállítás |
| --- | --- | --- | --- |
| 390 px | [kép](390-hero.png) | [kép](390-termekek.png) | [kép](390-kiszallitas.png) |
| 768 px | [kép](768-hero.png) | [kép](768-termekek.png) | [kép](768-kiszallitas.png) |
| 1024 px | [kép](1024-hero.png) | [kép](1024-termekek.png) | [kép](1024-kiszallitas.png) |
| 1440 px | [kép](1440-hero.png) | [kép](1440-termekek.png) | [kép](1440-kiszallitas.png) |

Mind a négy méreten felismerhető a kanál és a kar, a kanál teljes egészében a hero és a vízszintes viewport határain belül van. Desktopon a kanál a szövegoszlop mellett jelenik meg. Mobilon/tableten a szöveg, CTA-k és Google-értékelések után külön grid-sor biztosít helyet a dekorációnak. A kar a jobb szélen szándékosan folytatódik a képen kívül.

A termék- és kiszállítási szekciókban nincs markoló. A hero overflow: clip határa megakadályozza az átlógást. A szekciók eredeti színű, átlátszatlan hátterei közvetlen CSS-hátterek, a korábbi globális pszeudoelem-rétegzés megszűnt.

A mérésekben a dokumentumszélesség minden esetben pontosan megegyezett a viewporttal. Egyetlen, a hero közvetlen gyermekeként renderelt dekoráció van, position: absolute és pointer-events: none értékekkel. Nincs mask, filter vagy aktív animáció. Görgetés, egérmozgatás és reduced-motion váltás után is változatlan a kanál 22°-os póza. Böngészős JavaScript-hiba nem jelentkezett.

A komponens forrásellenőrzése: nincsenek React hookok, DOM-mérések, observerek, eseménykezelők, requestAnimationFrame hívások vagy dinamikus transzformációk. A hidraulika fix végpontjai a statikus csuklóállapothoz igazodnak.

Ellenőrzések: `npm run typecheck`, `npm run build`, valamint `verify-static.cjs`: sikeres. A böngészős teszthez Playwright és telepített Edge kell; a Playwright modult a PLAYWRIGHT_MODULE környezeti változóval is meg lehet adni. Részletes DOM-mérések: [meresek.json](meresek.json).

A régi `qa/markolo/verify-animation.cjs` teszt törölve, mert a megszüntetett animációs működést követelte meg. A korábbi QA-képek történeti felvételek.
