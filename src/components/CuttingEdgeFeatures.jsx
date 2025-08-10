import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Calendar,
  FileText,
  Search,
  Bell,
  Shield,
  Zap,
  Brain,
  Globe,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

// AI-Powered Legal Assistant Chat Widget
export const AILegalAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Tim's AI legal assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { id: Date.now(), text: inputValue, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Simulate AI response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: "Thank you for your question. Tim Harmar specializes in privacy law, civil litigation, and economic development. Would you like to schedule a consultation to discuss your specific legal needs?",
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-full shadow-lg z-50 hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-40 right-8 w-80 h-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col"
          >
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">AI Legal Assistant</h3>
              <p className="text-sm opacity-90">Powered by Tim Harmar Legal</p>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a legal question..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Smart Appointment Scheduler
export const SmartScheduler = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('');

  const availableTimes = ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM', '4:30 PM'];
  const consultationTypes = [
    'Privacy Law Consultation',
    'Civil Litigation Review',
    'IP Strategy Session',
    'Business Development Consultation'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex items-center mb-6">
        <Calendar className="w-8 h-8 text-teal-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Smart Scheduler</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Consultation Type
          </label>
          <select
            value={consultationType}
            onChange={(e) => setConsultationType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">Select consultation type</option>
            {consultationTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Times
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableTimes.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`p-2 rounded-lg border transition-all ${
                  selectedTime === time
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-teal-500'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          Schedule Consultation
        </motion.button>
      </div>
    </motion.div>
  );
};

// Legal Document Generator
export const DocumentGenerator = () => {
  const [documentType, setDocumentType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const documentTypes = [
    'Privacy Policy Template',
    'Non-Disclosure Agreement',
    'Service Agreement Template',
    'Business Formation Checklist',
    'IP Protection Guide'
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Document template generated! Check your email for the download link.');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-xl shadow-lg"
    >
      <div className="flex items-center mb-6">
        <FileText className="w-8 h-8 text-blue-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Document Generator</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Generate customized legal document templates for your business needs.
      </p>

      <div className="space-y-4">
        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select document type</option>
          {documentTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>

        <motion.button
          onClick={handleGenerate}
          disabled={!documentType || isGenerating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating...
            </div>
          ) : (
            'Generate Document'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

// Legal News & Updates Feed
export const LegalNewsFeed = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  const newsItems = {
    privacy: [
      { title: 'New PIPEDA Amendments Coming in 2025', date: '2025-01-15', category: 'Privacy Law' },
      { title: 'Supreme Court Rules on Digital Privacy Rights', date: '2025-01-10', category: 'Privacy Law' },
      { title: 'CASL Enforcement Trends for Small Business', date: '2025-01-05', category: 'Privacy Law' }
    ],
    litigation: [
      { title: 'Ontario Court of Appeal Updates Civil Procedure Rules', date: '2025-01-12', category: 'Civil Litigation' },
      { title: 'New Anti-SLAPP Legislation Developments', date: '2025-01-08', category: 'Civil Litigation' },
      { title: 'Commercial Dispute Resolution Trends', date: '2025-01-03', category: 'Civil Litigation' }
    ],
    business: [
      { title: 'Economic Development Incentives for Northern Ontario', date: '2025-01-14', category: 'Business Law' },
      { title: 'Corporate Governance Best Practices Update', date: '2025-01-09', category: 'Business Law' },
      { title: 'IP Strategy for Tech Startups', date: '2025-01-06', category: 'Business Law' }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="flex items-center mb-6">
        <Bell className="w-8 h-8 text-teal-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Legal Updates</h3>
      </div>

      <div className="flex space-x-4 mb-6">
        {Object.keys(newsItems).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {newsItems[activeTab].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-l-4 border-teal-500 pl-4 py-2"
          >
            <h4 className="font-semibold text-gray-900">{item.title}</h4>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Clock className="w-4 h-4 mr-1" />
              {item.date} • {item.category}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Interactive Legal Assessment Tool
export const LegalAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'business_type',
      question: 'What type of business do you operate?',
      options: ['Technology Startup', 'Manufacturing', 'Professional Services', 'Retail', 'Other']
    },
    {
      id: 'legal_concerns',
      question: 'What are your primary legal concerns?',
      options: ['Privacy Compliance', 'Contract Review', 'IP Protection', 'Regulatory Compliance', 'Litigation Risk']
    },
    {
      id: 'urgency',
      question: 'How urgent is your legal need?',
      options: ['Immediate (within 1 week)', 'Soon (within 1 month)', 'Planning ahead (3+ months)']
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl shadow-lg"
    >
      <div className="flex items-center mb-6">
        <Brain className="w-8 h-8 text-purple-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">Legal Needs Assessment</h3>
      </div>

      {!showResults ? (
        <div>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h4 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h4>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 text-left border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h4 className="text-lg font-semibold mb-4">Assessment Complete!</h4>
          <div className="bg-white p-6 rounded-lg mb-4">
            <p className="text-gray-700 mb-4">
              Based on your responses, Tim Harmar can help you with specialized legal services tailored to your needs.
            </p>
            <div className="space-y-2">
              <p><strong>Business Type:</strong> {answers.business_type}</p>
              <p><strong>Primary Concern:</strong> {answers.legal_concerns}</p>
              <p><strong>Timeline:</strong> {answers.urgency}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={resetAssessment}
              className="flex-1 bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Retake Assessment
            </button>
            <button className="flex-1 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default {
  AILegalAssistant,
  SmartScheduler,
  DocumentGenerator,
  LegalNewsFeed,
  LegalAssessment
};
