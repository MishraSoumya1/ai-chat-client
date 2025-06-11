import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AiChat from './AiChat.jsx'
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AiChat />
  </StrictMode>,
)
