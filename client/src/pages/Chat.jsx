
import '../App.css';
import '../normal.css';
import { useState }  from 'react';
import Hamburger from 'hamburger-react';
import SideMenu from '../components/SideMenu';
import ChatBox from '../components/ChatBox';




function Chat() {

  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [ansatt, setAnsatt] = useState("");
  const [generator, setGenerator] = useState("");
  const [isLoading, setIsLoading] = useState(false);

function clearChat() {
  setChatLog([]);
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
      <SideMenu ansatt={ansatt} setAnsatt={setAnsatt} generator={generator} setGenerator={setGenerator} clearChat={clearChat} />
      <ChatBox chatLog={chatLog} isLoading={isLoading} handleSubmit={handleSubmit} input={input} setInput={setInput} ansatt={ansatt} generator={generator}  />
      </div>
  );
}

export default Chat;
