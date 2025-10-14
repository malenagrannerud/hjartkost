import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const tips = [
  {
    id: 1,
    title: "Ät mer grönsaker, frukt och bär",
    description: "Minst 500 gram om dagen. Välj gärna olika färger för att få i dig olika näringsämnen",
    detailedInfo: "Grönsaker, frukt och bär innehåller fibrer, vitaminer och mineraler som kroppen behöver. De mättar bra och ger skydd mot flera sjukdomar. Försök äta minst 500 gram per dag. Variationen är viktig - olika färger innehåller olika nyttigheter. Frysta och konserverade grönsaker räknas också.",
    steps: [
      "Lägg till en portion grönsaker till varje måltid",
      "Förbered frukt och grönsaker på söndagar så de är lättillgängliga",
      "Börja alltid lunchen med en sallad eller grönsaker"
    ],
    color: "bg-green-100",
    textColor: "text-blue-900"
  },
  {
    id: 2,
    title: "Välj fullkorn",
    description: "När du äter spannmålsprodukter som bröd, pasta och gryn - välj helst fullkorn",
    detailedInfo: "Fullkornsprodukter innehåller mer fibrer, vitaminer och mineraler än produkter av raffinerat mjöl. Fibrer mättar bra och är viktiga för matsmältningen. Fullkorn kan också ge skydd mot hjärt-kärlsjukdom och typ 2-diabetes. Välj gärna rågbröd, havregryn, fullkornspasta och råris.",
    steps: [
      "Byt ut ditt vanliga bröd mot fullkornsbröd denna vecka",
      "Välj havregryn eller fullkornsflingor till frukost",
      "Testa fullkornspasta eller råris istället för vanliga varianter"
    ],
    color: "bg-amber-50",
    textColor: "text-blue-900"
  },
  {
    id: 3,
    title: "Ät fisk och skaldjur",
    description: "2-3 gånger i veckan. Variera mellan fet fisk som lax, sill och makrill och magert som torsk",
    detailedInfo: "Fisk och skaldjur innehåller protein, D-vitamin, jod och selen. Fet fisk innehåller dessutom omega-3-fettsyror som är viktiga för hjärtat och hjärnan. Ät fisk och skaldjur 2-3 gånger i veckan och blanda mellan fet och mager fisk. Exempel på fet fisk är lax, sill, makrill och strömming.",
    steps: [
      "Planera två fiskmiddagar varje vecka",
      "Prova en ny fiskrätt varje månad",
      "Köp fryst fisk för att alltid ha hemma"
    ],
    color: "bg-cyan-50",
    textColor: "text-blue-900"
  },
  {
    id: 4,
    title: "Välj nyttiga fetter",
    description: "Använd flytande margarin och oljor i matlagning. Begränsa smör, hårdmargarin och andra mättade fetter",
    detailedInfo: "Fettkvaliteten påverkar hälsan. Omättade fetter från växtolior, flytande margarin, nötter och fet fisk är nyttigare än mättade fetter från smör, hårdmargarin och fett kött. Byt gärna ut mättade fetter mot omättade. Använd rapsolja eller olivolja i matlagningen.",
    steps: [
      "Byt ut smör mot flytande margarin på mackan",
      "Använd rapsolja eller olivolja vid matlagning",
      "Snacksa på nötter istället för chips"
    ],
    color: "bg-yellow-50",
    textColor: "text-blue-900"
  },
  {
    id: 5,
    title: "Välj magra mejeriprodukter",
    description: "Mjölk, filmjölk och yoghurt med max 1,5% fett. Ost med max 17% fett",
    detailedInfo: "Mejeriprodukter innehåller kalcium, protein, jod och flera vitaminer. För de flesta är det bra att välja magra varianter för att minska intaget av mättat fett. Välj mjölk, fil och yoghurt med max 1,5% fett. Vid ostköp, välj ost med högst 17% fett. Laktosfria alternativ finns om du inte tål laktos.",
    steps: [
      "Välj mellanmjölk eller lättmjölk istället för standardmjölk",
      "Prova lättfil eller lättyoghurt till frukost",
      "Kolla fetthalt på ost och välj varianter under 17%"
    ],
    color: "bg-blue-50",
    textColor: "text-blue-900"
  },
  {
    id: 6,
    title: "Minska på rött och bearbetat kött",
    description: "Max 500 gram tillagat kött per vecka. Begränsa chark, korv och andra bearbetade köttprodukter",
    detailedInfo: "Kött innehåller protein, järn och B-vitaminer, men ett stort intag av rött kött och charkprodukter ökar risken för tjocktarmscancer. Begränsa till max 500 gram tillagat rött kött per vecka. Välj gärna fågel, fisk eller vegetabiliska proteinkällor som bönor och linser istället. Undvik chark och korv så ofta som möjligt.",
    steps: [
      "Byt ut kött mot kyckling eller fisk 2 gånger i veckan",
      "Testa vegetariska alternativ som bönor eller linser",
      "Skippa charken på mackan - välj ägg, ost eller hummus"
    ],
    color: "bg-rose-50",
    textColor: "text-blue-900"
  },
  {
    id: 7,
    title: "Begränsa socker och salt",
    description: "Undvik läsk, godis och bakverk. Max 6 gram salt per dag. Använd joderat salt",
    detailedInfo: "Högt sockerintag ökar risken för karies, övervikt och typ 2-diabetes. Begränsa sötsaker, läsk och godis. För mycket salt ökar risken för högt blodtryck. Ät max 6 gram salt per dag - det motsvarar en tesked. Använd joderat salt och undvik att salta för mycket. Färdiglagad mat innehåller ofta mycket salt.",
    steps: [
      "Byt ut läsk mot vatten eller sprudel",
      "Smaka på maten innan du saltar",
      "Välj frukt eller nötter istället för godis"
    ],
    color: "bg-orange-50",
    textColor: "text-blue-900"
  },
  {
    id: 8,
    title: "Ät lagom mycket",
    description: "Anpassa mängden mat efter ditt energibehov. Lyssna på din kropp och ät när du är hungrig",
    detailedInfo: "Energibehovet varierar mellan personer beroende på ålder, kön och hur mycket du rör dig. Ät lagom mycket för att hålla en hälsosam vikt. Lyssna på kroppens signaler - ät när du är hungrig och sluta när du är mätt. Regelbundna måltider och mellanmål hjälper till att hålla blodsockret stabilt.",
    steps: [
      "Använd mindre tallrikar för att kontrollera portioner",
      "Ät långsamt och känn efter när du är mätt",
      "Planera regelbundna måltider - 3 huvudmål och 2 mellanmål"
    ],
    color: "bg-purple-50",
    textColor: "text-blue-900"
  },
  {
    id: 9,
    title: "Rör på dig",
    description: "Minst 30 minuter om dagen. Fysisk aktivitet är viktig för hälsan tillsammans med bra matvanor",
    detailedInfo: "Fysisk aktivitet är en viktig del av en hälsosam livsstil. Rör på dig minst 30 minuter om dagen med måttlig intensitet. Det kan vara promenader, cykling, trädgårdsarbete eller annan vardagsmotion. Motion i kombination med bra matvanor minskar risken för övervikt, hjärt-kärlsjukdom, diabetes och cancer.",
    steps: [
      "Gå en 30 minuters promenad varje dag",
      "Ta trapporna istället för hissen",
      "Hitta en aktivitet du tycker om - dans, simning eller cykling"
    ],
    color: "bg-teal-50",
    textColor: "text-blue-900"
  },
  {
    id: 10,
    title: "Ät mer baljväxter",
    description: "Bönor, linser och ärtor är bra proteinkällor och innehåller fibrer. Klimatsmart alternativ till kött",
    detailedInfo: "Baljväxter som bönor, linser, ärtor och kikärtor innehåller protein, fibrer, vitaminer och mineraler. De är klimatsmarta alternativ till kött och fungerar utmärkt i grytor, soppor, sallader och köttfärsblandningar. Baljväxter mättar bra och är dessutom prisvärda. Både torkade och konserverade varianter är bra.",
    steps: [
      "Blanda 50% baljväxter i köttfärsen vid tacos eller bolognese",
      "Testa en lins- eller böngryta varje vecka",
      "Snacksa på rostade kikärtor eller bönor"
    ],
    color: "bg-green-50",
    textColor: "text-blue-900"
  }
];

const TipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tip = tips.find(t => t.id === Number(id));

  if (!tip) {
    return <div>Tip not found</div>;
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Green Header */}
      <div className="bg-green-100 p-6 h-1/4 flex flex-col justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-900 mb-6 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={24} />
          <span className="font-semibold">Tillbaka</span>
        </button>
        <h1 className="text-3xl font-bold text-blue-900">{tip.title}</h1>
      </div>

      {/* Content Section */}
      <div className={`${tip.color} p-6 space-y-8`}>
        <p className={`text-lg ${tip.textColor} opacity-90 leading-relaxed`}>
          {tip.detailedInfo}
        </p>

        <div className="space-y-4">
          <h2 className={`text-xl font-bold ${tip.textColor}`}>Så här skapar du vanan</h2>
          <div className="space-y-3">
            {tip.steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className={`flex-shrink-0 w-7 h-7 rounded-full bg-green-100 flex items-center justify-center font-bold ${tip.textColor}`}>
                  {index + 1}
                </div>
                <p className={`${tip.textColor} opacity-90 pt-0.5`}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetail;
