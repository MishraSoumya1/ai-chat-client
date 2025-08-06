import { useState, useRef, useEffect } from 'react';
import ChatContainer from './components/ChatContainer';
import InputBox from './components/InputBox';
import Header from './components/Header';

function AiChat({ token }) {
  const [messages, setMessages] = useState([]);
  const [botTypingText, setBotTypingText] = useState('');
  const [triggerTyping, setTriggerTyping] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [moved, setMoved] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [fullBotMessage, setFullBotMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSend = async () => {
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
    setIsTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query: text })
      });

      const data = await response.json();
      console.log('#### AI Response:', data);

      const reply = data?.resolution?.render_text || 'Sorry, something went wrong.';

      // Clean up the thinking message
      setMessages((prev) => prev.filter(msg => msg.type !== 'thinking'));

      // Start typing animation
      setFullBotMessage(reply);
      setBotTypingText('');
      setTriggerTyping(true);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [
        ...prev.filter(msg => msg.type !== 'thinking'),
        { type: 'bot', text: 'Something went wrong. Please try again later.' }
      ]);
      setIsTyping(false);
    }
  };


  useEffect(() => {
    if (!triggerTyping || !hasUserSentMessage || !fullBotMessage) return;

    // If it's HTML content, skip typing animation
    if (/<[a-z][\s\S]*>/i.test(fullBotMessage)) {
      setMessages((prev) => [
        ...prev.filter(msg => msg.type !== 'bot-typing'),
        { type: 'bot', html: fullBotMessage } // New "html" key for HTML rendering
      ]);
      setBotTypingText('');
      setIsTyping(false);
      setTriggerTyping(false);
      setFullBotMessage('');
      return;
    }

    // Plain text typing animation
    let index = 0;
    const interval = setInterval(() => {
      index += 5;
      const typed = fullBotMessage.slice(0, index);
      setBotTypingText(typed);

      if (index >= fullBotMessage.length) {
        clearInterval(interval);
        setMessages((prev) => [
          ...prev.filter(msg => msg.type !== 'bot-typing'),
          { type: 'bot', text: fullBotMessage }
        ]);
        setBotTypingText('');
        setIsTyping(false);
        setTriggerTyping(false);
        setFullBotMessage('');
      }
    }, 15);

    return () => clearInterval(interval);
  }, [triggerTyping, fullBotMessage, hasUserSentMessage]);


  return (
    <div className="app">
      <Header />
      <ChatContainer messages={messages} botTypingText={botTypingText} />
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
