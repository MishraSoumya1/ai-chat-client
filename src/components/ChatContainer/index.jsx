import { Virtuoso } from 'react-virtuoso';
import MarkdownRenderer from "../MarkdownRenderer";
import "./style.css"

export default function ChatContainer({ messages, botTypingText }) {
  const fullMessages = botTypingText
    ? [...messages, { type: 'botTyping', text: botTypingText }]
    : messages;

  return (
    <div className="chat-container">
      <Virtuoso
        className='virtuoso-container'
        data={fullMessages}
        followOutput="auto"
        increaseViewportBy={{ top: 0, bottom: 300 }}
        itemContent={(index, msg) => (
          <div
            className={`chat-message ${
              msg.type === 'user'
                ? 'user'
                : msg.type === 'thinking'
                ? 'thinking'
                : 'bot'
            }`}
          >
            <div className="bubble">
              {msg.type === 'bot' || msg.type === 'botTyping' ? (
                <>
                  {msg.html ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.html }} />
                  ) : (
                    <>
                      <MarkdownRenderer content={msg.text} />
                      {msg.type === 'botTyping' && (
                        <span className="typing-cursor">|</span>
                      )}
                    </>
                  )}
                </>
              ) : (
                msg.text
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}
