
import '../App.css';
import '../normal.css';
import { useState }  from 'react';
import SideMenuFile from '../components/SideMenuFile';
import ChatBox from '../components/ChatBox';




function FileSearch() {

  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [ansatt, setAnsatt] = useState("");
  const [generator, setGenerator] = useState("");
  const [isLoading, setIsLoading] = useState(false);

function clearChat() {
  setChatLog([]);
}

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}`}]
    setInput('');
    setChatLog(chatLogNew);
    setIsLoading(true);

    const messages = chatLogNew.map((message) => message.message);

    const response = await fetch('http://localhost:3080/filesearch', {
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
      <SideMenuFile ansatt={ansatt} setAnsatt={setAnsatt} generator={generator} setGenerator={setGenerator} clearChat={clearChat} />
      <ChatBox chatLog={chatLog} isLoading={isLoading} handleSubmit={handleSubmit} input={input} setInput={setInput} FileSearch={"filesearch"}  />
      </div>
  );
}

export default FileSearch;
