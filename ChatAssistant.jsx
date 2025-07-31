import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';

// --- TF-IDF Logic (from chat.js) ---

// Utility: tokenize and normalize text
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(token => token.length > 1);
}

// --- React Component ---

const ChatAssistant = ({ closeChat }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef(null);

  // TF-IDF related state
  const [faq, setFaq] = useState([]);
  const [vocab, setVocab] = useState([]);
  const [idf, setIdf] = useState({});
  const [tfidfMatrix, setTfidfMatrix] = useState([]);

  // --- Effects ---

  // Initial greeting from the bot
  useEffect(() => {
    setMessages([{ from: 'bot', text: "Hello! I'm a virtual assistant. Ask me a question about our services, fees, or how to schedule a consultation." }]);
  }, []);

  // Fetch and process FAQ data on component mount
  useEffect(() => {
    async function setupFaq() {
      try {
        const res = await fetch('/faq.json'); // Fetched from /public folder
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const faqData = await res.json();
        setFaq(faqData);

        const docs = faqData.map(item => tokenize(item.question));

        // Build vocabulary
        const newVocab = [];
        docs.forEach(tokens => {
          tokens.forEach(t => {
            if (!newVocab.includes(t)) newVocab.push(t);
          });
        });
        setVocab(newVocab);

        // Compute IDF
        const newIdf = {};
        newVocab.forEach(term => {
          const df = docs.reduce((count, doc) => count + (doc.includes(term) ? 1 : 0), 0);
          newIdf[term] = Math.log((docs.length + 1) / (df + 1)) + 1;
        });
        setIdf(newIdf);

        // Build TF-IDF matrix
        const newTfidfMatrix = docs.map(tokens => {
          const tf = {};
          tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });
          const vec = newVocab.map(term => (tf[term] || 0) * newIdf[term]);
          const norm = Math.hypot(...vec);
          return vec.map(v => (norm ? v / norm : 0));
        });
        setTfidfMatrix(newTfidfMatrix);

      } catch (error) {
        console.error("Failed to load or process FAQ:", error);
        setMessages(prev => [...prev, { from: 'bot', text: "Sorry, I'm having trouble accessing my knowledge base right now." }]);
      }
    }
    setupFaq();
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- Functions ---

  // Cosine similarity
  function cosineSimilarity(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
    return sum;
  }

  // Find best FAQ match
  function getBestAnswer(query) {
    if (!query || faq.length === 0) {
      return "I'm not sure how to answer that. Please try rephrasing your question.";
    }

    const queryTokens = tokenize(query);
    const queryTf = {};
    queryTokens.forEach(t => { queryTf[t] = (queryTf[t] || 0) + 1; });

    const queryVec = vocab.map(term => (queryTf[term] || 0) * (idf[term] || 0));
    const queryNorm = Math.hypot(...queryVec);
    const normalizedQueryVec = queryVec.map(v => (queryNorm ? v / queryNorm : 0));

    let bestMatch = { score: -1, index: -1 };
    tfidfMatrix.forEach((docVec, index) => {
      const score = cosineSimilarity(normalizedQueryVec, docVec);
      if (score > bestMatch.score) {
        bestMatch = { score, index };
      }
    });

    // Confidence threshold
    if (bestMatch.score > 0.1) {
      return faq[bestMatch.index].answer;
    }
    return "I'm sorry, I don't have a direct answer for that. You can try asking about our services, fees, or contact information.";
  }

  const handleSendMessage = () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const userMessage = { from: 'user', text: trimmedInput };
    const botResponseText = getBestAnswer(trimmedInput);
    const botMessage = { from: 'bot', text: botResponseText };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setUserInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
      style={{ height: '500px' }}
    >
      {/* Header */}
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center flex-shrink-0">
        <h3 className="font-bold text-lg">Legal Assistant</h3>
        <button onClick={closeChat} aria-label="Close chat" className="text-white hover:text-teal-300"><X size={20} /></button>
      </div>

      {/* Message Log */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col ${msg.from === 'bot' ? 'items-start' : 'items-end'}`}>
            <div className={`flex items-center ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex-shrink-0 ${msg.from === 'bot' ? 'bg-blue-900' : 'bg-teal-500'}`}></div>
              <p className={`max-w-xs p-3 rounded-lg text-sm mx-2 ${msg.from === 'bot' ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'bg-teal-500 text-white'}`}>
                {msg.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center bg-white dark:bg-gray-800 flex-shrink-0">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question..."
          className="flex-grow px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button onClick={handleSendMessage} aria-label="Send message" className="ml-3 p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors">
          <Send size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatAssistant;
