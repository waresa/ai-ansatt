
 import '../App.css';
 import '../normal.css';
 import { useState }  from 'react';
 import SideMenu from '../components/SideMenu';
 import ChatBox from '../components/ChatBox';


 function Chat() {

   const [input, setInput] = useState('');
   const [chatLog, setChatLog] = useState([]);
   const [ansatt, setAnsatt] = useState("");
   const [generator, setGenerator] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [file, setFile] = useState(null);

 function clearChat() {
   setChatLog([]);
 }

 async function handleSubmit(e) {
     e.preventDefault();
     let chatLogNew = [...chatLog, { user: "me", message: `${input}`}];
     setInput('');
     setChatLog(chatLogNew);
     setIsLoading(true);

     const messages = chatLogNew.map((message) => message.message);  
     const formData = new FormData();
     formData.append('file', file);
     formData.append('message', JSON.stringify({ message: messages, ansatt: `${ansatt}`, generator: `${generator}`}));

     if (file === null) {
     const response = await fetch('http://localhost:3080/chat', {
       method: 'POST',
       body: formData
       });
       const data = await response.json();
       setChatLog([...chatLogNew, { user: 'gpt', message: data.message }]);
       setIsLoading(false);
   } else {
       const response = await fetch('http://localhost:3080/file', {
       method: 'POST',
       body: formData
       });
       const data = await response.json();
       setChatLog([...chatLogNew, { user: 'gpt', message: data.message }]);
       setIsLoading(false);
   }
 }

   return (
    
     <div className="App">
       <SideMenu ansatt={ansatt} setAnsatt={setAnsatt} generator={generator} setGenerator={setGenerator} clearChat={clearChat} file={file} setFile={setFile} />
       <ChatBox chatLog={chatLog} isLoading={isLoading} handleSubmit={handleSubmit} input={input} setInput={setInput} ansatt={ansatt} generator={generator} file={file} />
       </div>
   );
 }

 export default Chat;