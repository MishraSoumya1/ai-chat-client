import { useState, useRef, useEffect } from 'react';
import ChatContainer from './components/ChatContainer';
import InputBox from './components/InputBox';
import Header from './components/Header';

import { botMarkdownMessage } from "./assets/MockText"

function AiChat() {
  const [messages, setMessages] = useState([]);
  const [botTypingText, setBotTypingText] = useState('');
  const [triggerTyping, setTriggerTyping] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [moved, setMoved] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  const handleSend = () => {
    const text = textareaRef.current.value.trim();
    if (!text) return;

    setMoved(true);
    setHasUserSentMessage(true);
    setMessages((prev) => [
      ...prev,
      { type: 'user', text },
      { type: 'thinking', text: 'AI is thinking...' }
    ]);

    textareaRef.current.value = '';
    textareaRef.current.blur();

    setIsTyping(true)
    setTimeout(() => {
       setMessages((prev) => [
        ...prev.filter(msg => msg.type !== 'thinking'),
      ]);
      setTriggerTyping(true)
    }, 5000);
  };

  useEffect(() => {
    if (!triggerTyping || !hasUserSentMessage) return;

    if (botTypingText.length < botMarkdownMessage.length) {
      const timeout = setTimeout(() => {
        setBotTypingText(botMarkdownMessage.slice(0, botTypingText.length + 7));
      }, 20);
      return () => clearTimeout(timeout);
    }

    // Finished typing
    if (botTypingText === botMarkdownMessage) {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev.filter(msg => msg.type !== 'thinking'),
        { type: 'bot', text: botMarkdownMessage }
      ]);
      setBotTypingText('');
      setTriggerTyping(false);
    }
  }, [triggerTyping, botTypingText, hasUserSentMessage]);


  return (
    <div className="app">
      <Header />

      <ChatContainer
        messages={messages}
        botTypingText={botTypingText}
      />

      <InputBox
        moved={moved}
        textareaRef={textareaRef}
        onSend={handleSend}
        isTyping={isTyping}
      />
    </div>
  );
}

export default AiChat;
