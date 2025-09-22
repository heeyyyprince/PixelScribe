import React, { useState, useRef, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

// Error boundary to avoid white screen on unexpected errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Chatbot crashed:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-red-600 border border-red-200 shadow-lg rounded-xl p-4">
          Something went wrong loading PixelBot. Please refresh.
        </div>
      )
    }
    return this.props.children
  }
}

const ChatbotInner = () => {
  const { backendUrl } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🤖 Hi, I’m PixelBot. How can I help you?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const messagesEndRef = useRef(null)

  const resetToGreeting = () => ([{
    id: Date.now(),
    text: "🤖 Hi, I’m PixelBot. How can I help you?",
    isBot: true,
    timestamp: new Date()
  }])

  const handleClearChat = () => {
    setMessages(resetToGreeting())
  }

  const handleDeleteMessage = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id))
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { text: "What features do you offer?", icon: "🎨" },
    { text: "How do I enhance images?", icon: "✨" },
    { text: "Tell me about pricing", icon: "💰" },
    { text: "How to remove backgrounds?", icon: "🖼️" },
    { text: "Style transfer guide", icon: "🎭" },
    { text: "Image colorization help", icon: "🌈" }
  ]

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('feature') || message.includes('what') && message.includes('offer')) {
      return "We offer 6 amazing AI-powered tools:\n\n🎨 **Text to Image** - Create images from descriptions\n✨ **Image Enhancer** - Upscale and improve image quality\n🖼️ **Background Remover** - Remove backgrounds instantly\n🎭 **Style Transfer** - Apply artistic styles to photos\n🌈 **Image Colorizer** - Add colors to black & white photos\n🗑️ **Object Remover** - Remove unwanted objects\n\nWhich one interests you most?"
    }
    
    if (message.includes('enhance') || message.includes('upscale')) {
      return "**Image Enhancement** is perfect for improving photo quality! 📸\n\n✅ Upload any image\n✅ AI automatically enhances details\n✅ Increases resolution up to 4K\n✅ Reduces noise and sharpens\n\nJust go to the Image Enhancer page, upload your photo, and click 'Enhance'. It costs 1 credit per enhancement."
    }
    
    if (message.includes('background') || message.includes('remove')) {
      return "**Background Removal** makes your photos stand out! 🎯\n\n✅ Precise edge detection\n✅ Preserves fine details like hair\n✅ Creates transparent PNG files\n✅ Perfect for product photos\n\nVisit the Background Remover page, upload your image, and let our AI do the magic!"
    }
    
    if (message.includes('style') || message.includes('artistic')) {
      return "**Style Transfer** turns photos into artwork! 🎨\n\n✅ Choose from famous art styles\n✅ Van Gogh, Picasso, Monet & more\n✅ Apply to any photo instantly\n✅ Create unique artistic versions\n\nUpload your photo, select a style, and watch the transformation!"
    }
    
    if (message.includes('colorize') || message.includes('color') || message.includes('black and white')) {
      return "**Image Colorization** brings old photos to life! 🌈\n\n✅ AI analyzes context for realistic colors\n✅ Perfect for historical photos\n✅ Preserves original details\n✅ Natural, authentic results\n\nUpload your black & white photo and watch it come alive with color!"
    }
    
    if (message.includes('object') && message.includes('remove')) {
      return "**Object Removal** cleans up your photos! 🗑️\n\n✅ Remove unwanted people or objects\n✅ AI fills removed areas naturally\n✅ Content-aware technology\n✅ Professional results\n\nUpload your photo and let AI remove distractions seamlessly!"
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('credit')) {
      return "**Our Pricing Plans** 💰\n\n🟢 **Basic** - $10 for 100 credits\n🔵 **Advanced** - $50 for 500 credits  \n🟣 **Business** - $250 for 5000 credits\n\nEach AI operation costs 1 credit. You can see pricing details on the Text-to-Image page!"
    }
    
    if (message.includes('help') || message.includes('how') || message.includes('guide')) {
      return "I'm here to help! 🤖 Here's how to get started:\n\n1️⃣ **Sign up** for a free account\n2️⃣ **Choose** your AI tool from the features page\n3️⃣ **Upload** your image or enter text\n4️⃣ **Process** and download your result\n\nNeed help with a specific feature? Just ask!"
    }
    
    if (message.includes('account') || message.includes('login') || message.includes('sign')) {
      return "**Account & Login** 👤\n\n✅ Click 'Login' in the top navigation\n✅ Sign up with email or social login\n✅ Get free credits to start\n✅ Track your usage and history\n\nYour account keeps all your creations safe and tracks your credits!"
    }
    
    if (message.includes('quality') || message.includes('resolution')) {
      return "**Image Quality** 📸\n\n✅ Support up to 4K resolution\n✅ High-quality AI processing\n✅ Maintains original aspect ratios\n✅ Professional-grade results\n\nOur AI ensures the best possible quality for all your creations!"
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! 😊 I'm always here to help you make the most of PixelScribe's AI tools. Feel free to ask anything else!"
    }
    
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      return "Hello! 👋 Welcome to PixelScribe! I'm here to help you explore our amazing AI tools. What would you like to know about?"
    }
    
    // Default response
    return "I'd be happy to help! 🤖 You can ask me about:\n\n• Our AI features and how to use them\n• Pricing and credit system\n• Account and login help\n• Technical questions\n• Getting started guide\n\nWhat specific topic interests you?"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)
    setIsProcessing(true)

    try {
      if (!backendUrl) {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: 'Backend not configured. Please set VITE_BACKEND_URL in client/.env and restart.', isBot: true, timestamp: new Date() }])
        return
      }
      // Always Ask AI mode
      const history = [
        ...messages.map(m => ({ role: m.isBot ? 'assistant' : 'user', content: m.text })),
        { role: 'user', content: userMessage.text }
      ].slice(-10)

      const resp = await fetch(`${backendUrl}/api/chat/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      })
      const data = await resp.json()
      const replyText = data.success ? data.reply : (data.message || 'Sorry, something went wrong.')
      const botResponse = {
        id: Date.now() + 1,
        text: replyText,
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } catch (err) {
      console.error('Chat error:', err)
      toast.error('Failed to process your request')
      setMessages(prev => [...prev, { id: Date.now() + 1, text: 'I had trouble responding. Please try again.', isBot: true, timestamp: new Date() }])
    } finally {
      setIsTyping(false)
      setIsProcessing(false)
    }
  }

  const handleQuickAction = (action) => {
    setInputMessage(action.text)
    setTimeout(() => handleSendMessage(), 100)
  }

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={index} className="font-semibold text-primary-600 mb-1">{line.slice(2, -2)}</div>
      }
      if (line.startsWith('✅')) {
        return <div key={index} className="flex items-start gap-2 mb-1"><span>✅</span><span>{line.slice(2)}</span></div>
      }
      if (line.match(/^\d+️⃣/)) {
        return <div key={index} className="flex items-start gap-2 mb-1 font-medium">{line}</div>
      }
      if (line.startsWith('• ')) {
        return <div key={index} className="text-sm mb-1">{line}</div>
      }
      return <div key={index} className="mb-1">{line}</div>
    })
  }

  return (
    <>
      {/* Chat Toggle Launcher (initial at bottom-right, draggable, hidden when open) */}
      {!isOpen && (
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        drag
        dragElastic={0.2}
        dragMomentum={true}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        animate={!isDragging ? { x: [0, -20, 0] } : { x: 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Greeting pill (only when closed) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden sm:block bg-white text-gray-800 rounded-full shadow-lg border border-gray-200 px-4 py-2"
          >
            How can I help you?
          </motion.div>
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close PixelBot' : 'Open PixelBot'}
          className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative">
              {/* Soft pulse ring */}
              <span className="absolute inset-0 rounded-full animate-ping bg-white/30"></span>
              {/* Cute robot icon (bigger) */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="relative w-9 h-9"
                initial={{ y: 0 }}
                animate={{ y: [0, -1.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Head */}
                <rect x="14" y="10" width="36" height="28" rx="6" fill="#ffffff" opacity="0.95" />
                {/* Eyes */}
                <circle cx="26" cy="24" r="3" fill="#4f46e5" />
                <circle cx="38" cy="24" r="3" fill="#ec4899" />
                {/* Mouth */}
                <rect x="24" y="30" width="16" height="3" rx="1.5" fill="#0ea5e9" />
                {/* Body */}
                <rect x="18" y="38" width="28" height="16" rx="4" fill="#ffffff" opacity="0.85" />
                {/* Left arm */}
                <rect x="10" y="42" width="8" height="6" rx="3" fill="#ffffff" opacity="0.85" />
                {/* Right arm waving */}
                <motion.g style={{ originX: 52, originY: 45 }} animate={{ rotate: [0, 20, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
                  <rect x="46" y="42" width="8" height="6" rx="3" fill="#ffffff" opacity="0.9" />
                </motion.g>
                {/* Antenna */}
                <line x1="32" y1="6" x2="32" y2="10" stroke="#ffffff" strokeWidth="2" />
                <circle cx="32" cy="6" r="2" fill="#ffffff" />
              </motion.svg>
            </div>
          )}
        </motion.button>
      </motion.div>
      )}

      {/* Chat Window (opens near bottom-right) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-28 right-6 z-40 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 overflow-hidden">
                  {/* Robot SVG with waving hand */}
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="w-8 h-8"
                    initial={{ rotate: 0 }}
                  >
                    {/* Head */}
                    <rect x="14" y="10" width="36" height="28" rx="6" fill="#ffffff" opacity="0.95" />
                    {/* Eyes */}
                    <circle cx="26" cy="24" r="3" fill="#4f46e5" />
                    <circle cx="38" cy="24" r="3" fill="#ec4899" />
                    {/* Mouth */}
                    <rect x="24" y="30" width="16" height="3" rx="1.5" fill="#0ea5e9" />
                    {/* Body */}
                    <rect x="18" y="38" width="28" height="16" rx="4" fill="#ffffff" opacity="0.85" />
                    {/* Left arm (static) */}
                    <rect x="10" y="42" width="8" height="6" rx="3" fill="#ffffff" opacity="0.85" />
                    {/* Right arm (waving) */}
                    <motion.g
                      style={{ originX: 52, originY: 45 }}
                      animate={{ rotate: [0, 18, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <rect x="46" y="42" width="8" height="6" rx="3" fill="#ffffff" opacity="0.85" />
                    </motion.g>
                    {/* Antenna */}
                    <line x1="32" y1="6" x2="32" y2="10" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="32" cy="6" r="2" fill="#ffffff" />
                  </motion.svg>
                </div>
                <div>
                  <h3 className="font-semibold">PixelBot</h3>
                  <p className="text-sm opacity-90">How can I help you?</p>
                </div>
              </div>
              {/* Right controls: mode toggle + close */}
              <div className="flex items-center gap-2">
                {/* Clear Chat */}
                <button
                  onClick={handleClearChat}
                  title="Clear chat"
                  className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/35 border border-white/40 flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a2 2 0 012-2h4a2 2 0 012 2m-8 0H5m11 0h3" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="w-12 h-12 rounded-full bg-white/25 hover:bg-white/35 border border-white/40 flex items-center justify-center"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`group relative max-w-[80%] p-3 rounded-2xl ${
                    message.isBot 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white'
                  }`}>
                    <div className="text-sm leading-relaxed">
                      {message.isBot ? formatMessage(message.text) : message.text}
                    </div>
                    <div className={`text-xs mt-2 opacity-70 ${message.isBot ? 'text-gray-500' : 'text-white/70'}`}>
                      {(message.timestamp ? new Date(message.timestamp) : null)?.toLocaleTimeString?.([], { hour: '2-digit', minute: '2-digit' }) || ''}
                    </div>
                    {/* Delete single message */}
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      title="Delete message"
                      className={`absolute -top-2 ${message.isBot ? '-right-2' : '-left-2'} hidden group-hover:flex items-center justify-center w-6 h-6 rounded-full bg-black/20 hover:bg-black/30 text-white`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.slice(0, 4).map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                    >
                      <span className="mr-1">{action.icon}</span>
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={'Ask PixelBot anything...'}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isProcessing}
                  className="p-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Wrapper with error boundary (single default export)
const Chatbot = () => (
  <ErrorBoundary>
    <ChatbotInner />
  </ErrorBoundary>
)

export default Chatbot
