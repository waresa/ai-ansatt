
import '../App.css';
import '../normal.css';
import { useState }  from 'react';




function Search() {

  const [question, setQuestion] = useState('');
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');


async function handleSubmit(e) {
    e.preventDefault();

  
    const response = await fetch('http://localhost:5000/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: question, text: text})
    });
  
    const data = await response.json();
    await setResponse(data.message);

  }

  return (
    
    <div className="App">
      <form onSubmit={(e) => {handleSubmit(e);}}>
        <input className='chat-input-question' value={question} onChange={e => setQuestion(e.target.value)} />
        <input className='chat-input-text' value={text} onChange={e => setText(e.target.value)} />
        <input type="submit" className='submit-btn' value="Send"/>
      </form>
      <p>This should be the response: {response}</p>
    </div>
  );
}

export default Search;
