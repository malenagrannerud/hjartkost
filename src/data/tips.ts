export interface Tip {
  id: number;
  title: string;
  color: string;
  textColor: string;
  healthScore: number;
  description: string;
  detailedInfo: string;
  steps: string[];
}

export const tips: Tip[] = [
  {
    id: 1,
    title: "Fem nävar frukt och grönt",
    color: "bg-green-100",
    textColor: "text-blue-900",
    healthScore: 4,
    description: "Frukt",
    detailedInfo:
      "Fem nävar grönsaker, rotfrukter, frukter och bär per dag minskar risken för hjärt- och kärlsjukdom, cancer i bland annat bröst och tjocktarm samt förtidig död. Det beror på det höga innehållet av fibrer och antioxidanter samt ett lågt energiinnehåll.",
    steps: [
      "Förbered frukter och grönsaker på söndagar så de är lättillgängliga",
      "Gör en stor sallad med fint riven rödkål, vitkål, morot och äpple exempelvis. Blanda i olivolja, vitvinsvinäger, salt och peppar och låt stå i kylen. Salladen håller hela veckan, prefekt att ta fram som tillbehör till veckans alla middagar.",
      "Koka upp valfria grönsaker och bönor i buljong och mixa slät med en stavmixer. Resultatet blir en mycket smak- och näringsrik soppa som är redd och klar att äta. ",
    ],
  },
  {
    id: 2,
    title: "Fyll på med fullkorn",
    color: "bg-amber-100",
    textColor: "text-blue-900",
    healthScore: 3,
    description: "Välj helst fullkornsbröd, fullkornspasta, råris och havregryn",
    detailedInfo: "Fullkorn innehåller fibrer, vitaminer och mineraler som är viktiga för din hälsa. Genom att välja fullkorn istället för raffinerade produkter får du mer näring och håller dig mätt längre. Fullkorn har också visats minska risken för hjärt-kärlsjukdomar och typ 2-diabetes.",
    steps: [
      "Byt ut vitt bröd mot fullkornsbröd",
      "Välj havregryn eller fullkornsflingor till frukost",
      "Testa fullkornspasta eller råris istället för vanliga varianter",
      "Ha havregryn eller müsli med fullkorn till frukost"
    ],
  },
  {
    id: 3,
    title: "Fisk och skaldjur 3 gånger i veckan",
    color: "bg-cyan-100",
    textColor: "text-blue-900",
    healthScore: 3,
    description: "...",
    detailedInfo:
      "Fisk och skaldjur innehåller protein, D-vitamin, jod och selen. Fet fisk innehåller dessutom omega-3-fettsyror som är viktiga för hjärtat och hjärnan.",
    steps: [
      "Planera två fiskmiddagar varje vecka",
      "Fisksoppa kan varieras. Prova olika recept",
      "Köp fryst fisk för att alltid ha hemma",
    ],
  },
  {
    id: 4,
    title: "Rätt fett",
    color: "bg-yellow-100",
    textColor: "text-blue-900",
    healthScore: 3,
    description:
      "Använd flytande margarin och oljor i matlagning. Begränsa smör, hårdmargarin och andra mättade fetter",
    detailedInfo:
      "Fettkvaliteten påverkar hälsan. Omättade fetter från växtolior, flytande margarin, nötter och fet fisk är nyttigare än mättade fetter från smör, hårdmargarin och fett kött.",
    steps: [
      "Byt ut smör mot flytande margarin på mackan",
      "Använd rapsolja eller olivolja vid matlagning",
      "Snacksa på nötter istället för chips",
    ],
  },
  {
    id: 5,
    title: "Mera magra mejerier",
    color: "bg-blue-100",
    textColor: "text-blue-900",
    healthScore: 3,
    description: "Mjölk, filmjölk och yoghurt med max 1,5% fett. Ost med max 17% fett",
    detailedInfo:
      "Mejeriprodukter innehåller kalcium, protein, jod och flera vitaminer. För de flesta är det bra att välja magra varianter för att minska intaget av mättat fett.",
    steps: [
      "Välj mellanmjölk eller lättmjölk istället för standardmjölk",
      "Prova lättfil eller lättyoghurt till frukost",
      "Kolla fetthalt på ost och välj varianter under 17%",
    ],
  },
  {
    id: 6,
    title: "Minska på rött och bearbetat kött",
    color: "bg-rose-100",
    textColor: "text-blue-900",
    healthScore: 3,
    description: "Max 500 gram tillagat kött per vecka. Begränsa chark, korv och andra bearbetade köttprodukter",
    detailedInfo:
      "Kött innehåller protein, järn och B-vitaminer, men ett stort intag av rött kött och charkprodukter ökar risken för tjocktarmscancer.",
    steps: [
      "Byt ut kött mot kyckling eller fisk 2 gånger i veckan",
      "Testa vegetariska alternativ som bönor eller linser",
      "Skippa charken på mackan - välj ägg, ost eller hummus",
    ],
  },
  {
    id: 7,
    title: "Salt-halt",
    color: "bg-orange-100",
    textColor: "text-blue-900",
    healthScore: 4,
    description: "Minska saltintaget till max 6 gram per dag. Använd joderat salt",
    detailedInfo:
      "För mycket salt ökar risken för högt blodtryck. Ät max 6 gram salt per dag - det motsvarar en tesked. Använd joderat salt och undvik att salta för mycket.",
    steps: [
      "Smaka på maten innan du saltar",
      "Krydda med örter och kryddor istället för salt",
      "Välj produkter med lägre saltinnehåll",
    ],
  },
  {
    id: 8,
    title: "Ät lagom mycket",
    color: "bg-purple-100",
    textColor: "text-blue-900",
    healthScore: 4,
    description: "Anpassa mängden mat efter ditt energibehov. Lyssna på din kropp och ät när du är hungrig",
    detailedInfo:
      "Energibehovet varierar mellan personer beroende på ålder, kön och hur mycket du rör dig. Ät lagom mycket för att hålla en hälsosam vikt.",
    steps: [
      "Använd mindre tallrikar för att kontrollera portioner",
      "Ät långsamt och känn efter när du är mätt",
      "Planera regelbundna måltider - 3 huvudmål och 2 mellanmål",
    ],
  },
  {
    id: 9,
    title: "Rör på dig minst 30 min om dagen",
    color: "bg-teal-100",
    textColor: "text-blue-900",
    healthScore: 5,
    description: "Fysisk aktivitet är viktig för hälsan tillsammans med bra matvanor",
    detailedInfo:
      "Fysisk aktivitet är en viktig del av en hälsosam livsstil. Rör på dig minst 30 minuter om dagen med måttlig intensitet.",
    steps: [
      "Gå en 30 minuters promenad varje dag",
      "Ta trapporna istället för hissen",
      "Hitta en aktivitet du tycker om - dans, simning eller cykling",
    ],
  },
  {
    id: 10,
    title: "Ät mer baljväxter",
    color: "bg-green-100",
    textColor: "text-blue-900",
    healthScore: 3,
    description: "Bönor, linser och ärtor är bra proteinkällor och innehåller fibrer. Klimatsmart alternativ till kött",
    detailedInfo:
      "Baljväxter som bönor, linser, ärtor och kikärtor innehåller protein, fibrer, vitaminer och mineraler. De är klimatsmarta alternativ till kött.",
    steps: [
      "Blanda 50% baljväxter i köttfärsen vid tacos eller bolognese",
      "Testa en lins- eller böngryta varje vecka",
      "Snacksa på rostade kikärtor eller bönor",
    ],
  },
  {
    id: 11,
    title: "Minska på sockret",
    color: "bg-green-100",
    textColor: "text-blue-900",
    healthScore: 3,
    description: "Begränsa sötsaker, läsk och godis. Max 10% av ditt dagliga energiintag",
    detailedInfo: "För mycket socker och salt är skadligt för hjärtat och blodtrycket. Genom att minska på dessa kan du förbättra din hälsa avsevärt. Socker ökar risken för övervikt och diabetes, medan för mycket salt höjer blodtrycket.",
    steps: [
      "Undvik läsk, saft och andra sockrade drycker",
      "Begränsa sötsaker och godis till speciella tillfällen",
      "Koka själv så du kan kontrollera salt- och sockermängden",
      "Läs innehållsförteckningen - socker har många namn (glukos, sackaros, fruktossirap)",
      "Använd kryddor istället för salt för mer smak"
    ],
  },
];
