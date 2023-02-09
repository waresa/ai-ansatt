const ChatForm = (props) => {

    const { input, setInput, handleSubmit, toggleInfoOff } = props;

    return (
        <div className='chat-input-holder'>
        <form onSubmit={(e) => {handleSubmit(e); toggleInfoOff();}}>
          <input className='chat-input-textarea' value={input} onChange={e => setInput(e.target.value)} />
          <input type="submit" className='submit-btn' value="Send"/>
        </form>

      </div>
    );
    }

    export default ChatForm;