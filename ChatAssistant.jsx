import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ChatAssistant = ({ closeChat }) => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // Initial greeting from the bot
  useEffect(() => {
    setMessages([
      { 
        from: 'bot', 
        text: "Hello! I'm a virtual assistant for Tim Harmar Legal. How can I help you today?",
        options: ["Our Services", "Contact Info", "Credentials"]
      }
    ]);
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUserChoice = (choice) => {
    const userMessage = { from: 'user', text: choice };
    let botResponse = {};

    switch (choice) {
      case "Our Services":
        botResponse = { 
          from: 'bot', 
          text: "We specialize in several areas. Which are you interested in?",
          options: ["Cybersecurity Law", "Maritime Law", "IP Law", "Business Law"]
        };
        break;
      case "Contact Info":
        botResponse = {
          from: 'bot',
          text: "You can reach Tim Harmar at (705) 943-0634 or timharmar@yahoo.ca. The office is at 67 Hugill Street, Sault Ste. Marie."
        };
        break;
      case "Credentials":
        botResponse = {
          from: 'bot',
          text: "Tim Harmar is an award-winning lawyer with an MBA, a Juris Doctor, and is a candidate for a Master of Engineering in Cybersecurity. He is also a Professor at Sault College and holds a Chartered Privacy and Access Professional (CAPP) designation.",
          options: ["Back to start"]
        };
        break;
      case "Cybersecurity Law":
      case "Maritime Law":
      case "IP Law":
      case "Business Law":
        botResponse = {
          from: 'bot',
          text: `Great! For detailed questions about ${choice}, I recommend scheduling a formal consultation to get the best advice. I can provide the contact info again if you need it.`,
          options: ["Contact Info", "Back to start"]
        };
        break;
      case "Back to start":
        botResponse = { 
          from: 'bot', 
          text: "What else can I help you with?",
          options: ["Our Services", "Contact Info", "Credentials"]
        };
        break;
      default:
        botResponse = { from: 'bot', text: "I'm not sure how to help with that. Please select one of the guided options." };
    }

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h3 className="font-bold text-lg">Legal Assistant</h3>
        <button onClick={closeChat} aria-label="Close chat" className="text-white hover:text-teal-300"><X size={20} /></button>
      </div>
      <div className="h-80 p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.from === 'bot' ? 'items-start' : 'items-end'}`}>
            <p className={`max-w-xs p-3 rounded-lg text-sm ${msg.from === 'bot' ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'bg-teal-500 text-white'}`}>
              {msg.text}
            </p>
            {msg.from === 'bot' && msg.options && (
              <div className="flex flex-wrap gap-2 mt-2">
                {msg.options.map((option, i) => (
                  <button key={i} onClick={() => handleUserChoice(option)} className="px-3 py-1 bg-white dark:bg-gray-600 border border-teal-500 rounded-full text-teal-500 dark:text-teal-300 text-xs hover:bg-teal-50 dark:hover:bg-gray-500 transition-colors">
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </motion.div>
  );
};

export default ChatAssistant;