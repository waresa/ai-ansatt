
import '../App.css';
import '../normal.css';
import { useState }  from 'react';
import Hamburger from 'hamburger-react';
import ChatMessage from '../components/ChatMessage';




function Chat() {

  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [ansatt, setAnsatt] = useState("");
  const [generator, setGenerator] = useState("");
  const [isLoading, setIsLoading] = useState(false);

function clearChat() {
  setChatLog([]);
}

function toggleInfoOff() {
  const info = document.querySelector('.info');
  info.style.display = 'none';
}

function toggleInfoOn() {
  const info = document.querySelector('.info');
  info.style.display = 'flex';
}

// function showNavbar that turns the display of the sidemenu on and off
function showNavbar() {
  const sidemenu = document.querySelector('.sidemenu');
  if (sidemenu.style.display === 'block') {
    sidemenu.style.display = 'none';
  } else {
    sidemenu.style.display = 'block';
  }
}

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}`}]
    setInput('');
    setChatLog(chatLogNew);
    setIsLoading(true);

    const messages = chatLogNew.map((message) => message.message);

    const response = await fetch('http://localhost:3080', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: messages, ansatt: `${ansatt}`, generator: `${generator}`})
    });
    

    const data = await response.json();
    await setChatLog([...chatLogNew, { user: 'gpt', message: data.message }]);
    setIsLoading(false);
  }

  return (
    
    <div className="App">
      {window.innerWidth < 768 && (<div className='nav'><Hamburger onToggle={showNavbar} color='#fff' size={20} /></div> )}
      <aside className='sidemenu'>
        <div className='sidemenu-btn' onClick={() => {clearChat(); toggleInfoOn();}}>
          <span>+</span>
          Ny Samtale
        </div>
        <select className='sidemenu-select' value={ansatt} onChange={(e) => {setAnsatt(e.target.value); setGenerator(''); clearChat();}}>
          <option value=''>Velg ansatt</option>
          <option value='markedssjef'>Markedssjef</option>
          <option value='kundeservice'>Kundeservice</option>
          <option value='seo-spesialist'>SEO Spesialist</option>
          <option value='regnskapsfører'>Regnskapsfører</option>
          <option value='produktansvarlig'>Produktansvarlig</option>
          <option value='salgsansvarlig'>Salgsansvarlig</option>
          <option value='social media expert'>Social Media Expert</option>
          <option value='juridisk rådgiver'>Juridisk Rådgiver</option>
        </select>

        <select className='sidemenu-select' value={generator} onChange={(e) => {setGenerator(e.target.value); setAnsatt(''); clearChat();}}>
          <option value=''>Velg generator</option>
          <option value='code generator'>Kode Generering</option>
          <option value='content generator'>Content Generering</option>
          <option value='email generator'>Email Generering</option>
          <option value='content spinner'>Innholdsspinning</option>
          <option value='text summarizer'>Tekstsummering</option>
          <option value='text optimizer'>Tekstoptimalisering</option>
          <option value='text simplifier, simplify to a 5th grader level.'>Tekstforenkling</option>
          <option value='resume generator'>CV-generator</option>
          <option value='buisness plan generator'>Forretningsplan Generator</option>
        </select>

      </aside>
      <section className='chatbox'>
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key = {index} message={message} />
          ))}

          {isLoading &&     <div className= "chat-message chatgpt">
    
    <div className='chat-message-center'>
        
        
        <div className="avatar chatgpt">
       <svg
                        width={41}
                        height={41}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth={1.5}
                        className="h-6 w-6"
                    >
                        <path
                        d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813ZM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496ZM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744ZM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237Zm27.658 6.437-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132Zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763Zm-21.063 6.929-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225Zm1.829-3.943 4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18Z"
                        fill="currentColor"
                        />
                    </svg>
        </div>
        <div className='message'>
          <div id="cursor"></div>
        </div>
    </div>
    </div>}

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
          <div className='chat-input-holder'>
            <form onSubmit={(e) => {handleSubmit(e); toggleInfoOff();}}>
              <input className='chat-input-textarea' value={input} onChange={e => setInput(e.target.value)} />
              <input type="submit" className='submit-btn' value="Send"/>
            </form>

          </div>
      </section>
      </div>
  );
}

export default Chat;
