export default function InputBox({ moved, textareaRef, onSend, isTyping }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={`input-container ${moved ? 'moved' : ''}`}>
      {!moved && <h1 className="welcome-header">What's on your mind today?</h1>}
      <div className="input-box">
        <textarea
          ref={textareaRef}
          placeholder="Ask anything..."
          className="textarea"
          onKeyDown={handleKeyDown}
        />
        <button className="send-button" onClick={onSend}>
          {!isTyping ? 'Send' : 'Stop'}
        </button>
      </div>
    </div>
  );
}
