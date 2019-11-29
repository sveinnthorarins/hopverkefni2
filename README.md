# Hópverkefni 2

## Skipana leiðbeiningar
Eftirfarandi leiðbeiningar gefa skipanir sem skrifa má í skipanalínuglugga staðsettan í verkefnamöppu.

Til að setja upp öll nauðsynleg tæki og tól skal keyra:
`npm install`

Til að keyra lausnina og sjá breytingar uppfærðar samtímis skal keyra:
`npm run dev`

Til að linta verkefni og birta villur í stíl á bæði .scss og .js skrám skal keyra:
`npm run test`

## Uppsetning verkefnis
Í verkefnamöppu eru: 
- stillingarskrár fyrir tæki og tól
- html skrár (`index.html` og `fyrirlestur.html`)
- gögn um fyrirlestra (`lectures.json`)
- `src/` mappa sem inniheldur:
  - `index.js` - aðal javascript skráin
  - `lib/` mappa sem inniheldur aðrar javascript skrár sem nýtast í aðalskránni
  - `styles/` mappa sem inniheldur:
    - `styles.scss` - aðal sass skráin sem importar hinar skrárnar
    - `config.scss` - sass skrá sem inniheldur stillingar (letur, liti, bilstærðir o.fl.)
    - `list.scss` - sass skrá sem inniheldur stíla fyrir birtingu á lista
    - `body.scss` - sass skrá sem inniheldur stíla fyrir venjuleg element (header, toolbar, footer...) ásamt stílum fyrir mismunandi efni fyrirlestrar.
- `font/` mappa sem geymir allar leturgerðir verkefnis
- `img/` mappa sem geymir allar myndir verkefnis

Tæki og tól verkefnis þýða síðan og binda saman skrárnar í `src/` möppunni og setur í `dist/` möppu í verkefnamöppunni.
Þýddar skrár úr `dist/` möppunni skulu fara á vefþjón og allar html skrár skulu því vísa í þessar þýddu skrár.
Því ætti `src/` mappan aldrei að fyrirfinnast á vefþjóni.

## Þeir sem unnu að verkefni
Sveinn Þórarinsson, svt9\[at\]hi.is
