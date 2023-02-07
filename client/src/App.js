
import './App.css';
import './normal.css';
import { useState }  from 'react';
import Hamburger from 'hamburger-react';


function App() {

  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [ansatt, setAnsatt] = useState("");
  const [generator, setGenerator] = useState("");

function clearChat() {
  setChatLog([]);
}

// function showNavbar that turns the display of the sidemenu on and off
function showNavbar() {
  const sidemenu = document.querySelector('.sidemenu');
  if (sidemenu.style.display === 'none') {
    sidemenu.style.display = 'block';
  } else {
    sidemenu.style.display = 'none';
  }
}

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}`}]
    setInput('');
    setChatLog(chatLogNew);

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
  }

  return (
    
    <div className="App">
      {window.innerWidth < 768 && (<div className='nav'><Hamburger onToggle={showNavbar} color='#fff' size={20} /></div> )}
      <aside className='sidemenu'>
        <div className='sidemenu-btn' onClick={clearChat}>
          <span>+</span>
          Ny Samtale
        </div>
        <select className='sidemenu-select' onChange={(e) => {setAnsatt(e.target.value); setGenerator('');}}>
          <option value=''>Velg ansatt</option>
          <option value='markedssjef'>Markedssjef</option>
          <option value='seo-spesialist'>SEO Spesialist</option>
          <option value='regnskapsfører'>Regnskapsfører</option>
          <option value='produktansvarlig'>Produktansvarlig</option>
          <option value='social media expert'>Social Media Expert</option>
          <option value='juridisk rådgiver'>Juridisk Rådgiver</option>
        </select>

        <select className='sidemenu-select' onChange={(e) => {setGenerator(e.target.value); setAnsatt('')}}>
          <option value=''>Velg generator</option>
          <option value='kode gernerator'>Kode Generering</option>
          <option value='content generator'>Content Generering</option>
          <option value='email generator'>Email Generering</option>
          <option value='tekst omskriver'>Omskriv Tekst</option>
          <option value='tekstkompressor'>Tekstkompressor</option>
          <option value='tesktoptimaliserer'>Optimiser Tekst</option>
          <option value='tekst forenkler for 5. klassinger'>Forenkle Tekst</option>
          <option value='søknad generator'>Søknad Generator</option>
          <option value='produkt beskrivelse generator'>Produkt Beskrivelse</option>
          <option value='produkt ide generator'>Produkt Ide</option>
          <option value='forretningsplan generator'>Forretningsplan Generator</option>
        </select>
      </aside>
      <section className='chatbox'>
        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key = {index} message={message} />
          ))}

          
        
        </div>
          <div className='chat-input-holder'>
            <form onSubmit={handleSubmit}>
              <input className='chat-input-textarea' value={input} onChange={e => setInput(e.target.value)} />
              <div className='chat-input-icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480v-83.6c0-4 1.5-7.8 4.2-10.7l167.6-182.9c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8l-88.3-44.2C7.1 311.3.3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
              </svg>
              </div>
            </form>

          </div>
      </section>
      </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>

    <div className='chat-message-center'>
      
      
      <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
        {message.user === "gpt" &&       <svg
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
                    </svg>}
        {message.user === "me" &&     <svg
    viewBox="-2.4 -2.4 28.8 28.8"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#fff"
  >
    <rect
      x={-2.4}
      y={-2.4}
      width={28.8}
      height={28.8}
      rx={14.4}
      fill="#fff"
      stroke="none"
      strokeWidth={0}
    />
    <g
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.4}
    >
      <circle cx={12} cy={8} r={5} />
      <path d="M20 21a8 8 0 1 0-16 0m16 0a8 8 0 1 0-16 0" />
    </g>
  </svg> }
      </div>
      <div className='message'>{message.message}</div>
  </div>
</div>

  );
}

export default App;
