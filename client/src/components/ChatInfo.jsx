
const ToolInfo = (props) => {

    const { ansatt, generator } = props;

    return (
        <div className='info'>
        {ansatt === "" && generator === "" && 
        <div className='info'>
          <h1>Velkommen til AI-Assistenten</h1>
          <p>Her kan du chatte om generelle ting med en AI assistanten. Du kan velge en ansatt eller en generator for å få hjelp om spesefike oppgaver.</p>
        </div>
        }

      {ansatt === "markedssjef" && 
        <div className='info'> 
          <h1>Markedssjef</h1>
          <p>Som Markedssjef kan jeg hjelpe deg å utvikle og implementere markedsstrategier for å fremme et produkt, en tjeneste eller et merke.</p>
          <p><span className='ex'>Eksempel spørsmål:</span> Gi meg en strategi for å øke merkevarebevisstheten i det nye markedsområdet.</p>
        </div>}

      {ansatt === "seo-spesialist" && 
        <div className='info'> 
          <h1>SEO Spesialist</h1>
          <p>En SEO-spesialist kan jeg hjelpe deg å forbedre synligheten til din nettside i søkemotorer som Google. Jeg kan lære deg teknikker for SEO som kan hjelpe deg å rangere høyere i søkeresultatene og få mer relevant trafikk.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>Hva er de viktigste faktorene for å rangere høyt på Google?</p>
        </div>}

      {ansatt === "regnskapsfører" && 
        <div className='info'> 
          <h1>Regnskapsfører</h1>
          <p>Som regnskapsfører kan jeg hjelpe deg med å holde orden på bedriftens økonomi. Jeg kan hjelpe deg med å lage budsjett, regnskap og rapporter.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>Hvordan kan jeg optimalisere min bedrifts økonomiske rapportering for å forbedre vår økonomiske stilling?</p>
        </div>
      }
      {ansatt === "produktansvarlig" && 
        <div className='info'> 
          <h1>Produktansvarlig</h1>
          <p>Som produktansvarlig kan jeg hjelpe deg med å utvikle og lansere nye produkter. Jeg kan hjelpe deg med å identifisere markedsmuligheter, utvikle produkter og lansere dem.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>Hvordan kan jeg lage en produktstrategi for å øke salget?</p>
        </div>
      }
      {ansatt === "kundeservice" && 
        <div className='info'> 
          <h1>Kundeservice</h1>
          <p>Som kundeservice kan jeg hjelpe deg med å svare på spørsmål fra kunder. Jeg kan hjelpe deg med å svare på spørsmål om produkter, tjenester, priser og levering.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>Hva skal jeg si til en kunde som er ikke fornøyd med varen sin?</p>
        </div>
      }
      {ansatt === "salgsansvarlig" && 
        <div className='info'> 
          <h1>Salgsansvarlig</h1>
          <p>Som salgsansvarlig kan jeg hjelpe deg med å utvikle og implementere salgsstrategier for å øke salget. Jeg kan hjelpe deg med å identifisere markedsmuligheter, utvikle salgsstrategier og implementere dem.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>Hvordan kan jeg øke salget i det nye sko markedet?</p>
        </div>
      }

    {ansatt === "social media expert" && 
      <div className='info'> 
        <h1>Social Media Expert</h1>
        <p>Som Social Media Expert kan jeg hjelpe deg med å utvikle og implementere sosiale mediestrategier for å øke salget. Jeg kan hjelpe deg med å identifisere markedsmuligheter, utvikle sosiale mediestrategier og implementere dem.</p>
        <p><span className='ex'>Eksempel spørsmål: </span>Hvilken type innlegg er best innen fitness markedet?</p>
      </div>}

    {ansatt === "juridisk rådgiver" && 
      <div className='info'> 
        <h1>Juridisk Rådgiver</h1><p>Som juridisk rådgiver kan jeg hjelpe deg med å utvikle og implementere juridiske strategier for å beskytte bedriften din. Jeg kan hjelpe deg med å identifisere juridiske risikoer, utvikle juridiske strategier og implementere dem.</p>
        <p><span className='ex'>Eksempel spørsmål: </span>Hvordan kan jeg beskytte bedriften min mot juridiske risikoer?</p>
      </div>}

      {generator === "code generator" && 
        <div className='info'> 
          <h1>Kodegenerering</h1>
          <p>Code Generator kan hjelpe deg med å generere ny kode og hjelpe deg å debugge din kode.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>Lag et JS script som printer ut 1 til 10.</p>
        </div>}

      {generator === "content generator" && 
        <div className='info'> 
          <h1>Innholdsgenerering</h1>
          <p>Innholdsgenerering kan hjelpe deg med å generere nye innholdsideer og styrke ditt digitale innhold.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>En 200 ord om reisebransjen.</p>
          <p><span className='ex'>Eksempel spørsmål 2: </span>Produktbeskrivelse, tastatur.</p>
        </div>}

      {generator === "email generator" && 
        <div className='info'> 
          <h1>E-postgenerering</h1><p>E-postgenerering kan hjelpe deg med å generere nye e-postideer og templates.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>Takk kunde for å ha bestilt av oss.</p>
        </div>}

      {generator === "content spinner" && 
        <div className='info'> 
          <h1>Innholdsspinning</h1>
          <p>Innholdsspinning kan hjelpe deg med å spinne ditt eksisterende innhold og lage nye versjoner av det.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>"Jeg liker å spise pizza"</p>
        </div>}

      {generator === "text simplifier, simplify to a 5th grader level." && 
        <div className='info'> 
          <h1>Tekstforenkling</h1>
          <p>Tekstforbedring kan hjelpe deg med å forbedre teksten din og gjøre den enklere. Så enkelt at en barn kan skjønne den.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>"Denne løsningen benytter en multithreaded algoritme for å effektivisere databehandlingen og øke ytelsen på systemet"</p>
        </div>}

      {generator === "text optimizer" && 
        <div className='info'> 
          <h1>Tekstoptimalisering</h1>
          <p>Tekstoptimalisering kan hjelpe deg med å optimalisere teksten din og gjøre den mer effektiv.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>"morgenen jeg gå ut å kjøpe boller til frokost fordi jeg sulten"</p>
        </div>}

      {generator === "text summarizer" && 
        <div className='info'> 
          <h1>Tekstsummering</h1><p>Tekstsummering kan hjelpe deg med å summere teksten din.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>"Neste år vil det være 100 år siden man første gang kunne se et fly i luften. Flyreiser har blitt en viktig del av livet vårt, og gir oss muligheten til å besøke andre land og kulturer. Men selv om vi har kommet langt siden de første flyreisene, er det fortsatt mye arbeid som må gjøres for å gjøre luftfart mer bærekraftig. Flyreiser har en stor påvirkning på miljøet, og det er viktig at vi jobber for å redusere denne påvirkningen"</p>
        </div>}

      {generator === "resume generator" && 
        <div className='info'> 
          <h1>CV-generator</h1>
          <p>CV-generator kan hjelpe deg med å generere et nytt CV.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>CV for en 20 år gammel kvinne som søker jobb som designer med X erfaring hos Y.</p>
        </div>}

      {generator === "buisness plan generator" && 
        <div className='info'> 
          <h1>Forretningsplan Generator</h1>
          <p>Forretningsplan generator kan hjelpe deg med å generere en forretningsplan.</p>
          <p><span className='ex'>Eksempel spørsmål: </span>Startup som skal lage en app for å hjelpe folk med å finne en partner.</p>
        </div>}
        </div>

    );

    }

    export default ToolInfo;