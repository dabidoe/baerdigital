import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm here to help you learn about Baer Digital Studios. Ask me about our services, pricing, or schedule a consultation!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
      return "Our rates are $100/hour for podcast recording and $150/hour for our unique video studio with greenscreen (bulk rates available). For digital marketing, mobile advertising, and AI-enhanced production, we provide custom quotes based on your project needs. Would you like more details about any specific service?";
    }

    if (message.includes('drive-in') || message.includes('greenscreen') || message.includes('car') || message.includes('vehicle')) {
      return "Our video studio with greenscreen is unique in Philadelphia! Vehicles can drive directly into our studio for seamless greenscreen integration. Perfect for automotive content and commercials. Would you like to schedule a consultation?";
    }

    if (message.includes('marketing') || message.includes('website') || message.includes('case study') || message.includes('results')) {
      return "Our digital marketing services combine professional video content with website development. For example, we helped Paddock Blade launch their automotive product, achieving increased sales and expanded distribution from direct-to-consumer to retail partnerships. Would you like to discuss your marketing goals?";
    }

    if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('runway') || message.includes('midjourney')) {
      return "We use cutting-edge AI tools like Runway and Midjourney for rapid, cost-effective content creation. These tools help accelerate your production timeline while maintaining quality. Interested in learning more about our AI-enhanced production capabilities?";
    }

    if (message.includes('podcast') || message.includes('audio') || message.includes('recording')) {
      return "Our podcast recording suite features acoustically treated spaces, professional audio equipment, and expert mixing capabilities. We handle everything from recording to post-production. Ready to start your podcast?";
    }

    if (message.includes('mobile') || message.includes('advertising') || message.includes('ad') || message.includes('campaign')) {
      return "We specialize in mobile advertising optimized for social media platforms. We create scroll-stopping content designed to drive action. Want to discuss your campaign goals?";
    }

    if (message.includes('consultation') || message.includes('meeting') || message.includes('schedule') || message.includes('appointment')) {
      return "I'd be happy to help you schedule a consultation! You can fill out our contact form below or call us directly. We typically respond within 24 hours. What type of project are you interested in discussing?";
    }

    if (message.includes('location') || message.includes('philadelphia') || message.includes('where') || message.includes('address')) {
      return "We're located in Philadelphia, PA with convenient parking for productions of all sizes. Our facility serves the greater metro area and is easily accessible for clients and crew.";
    }

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to Baer Digital Studios. How can I help you today? Feel free to ask about our services, pricing, or schedule a consultation!";
    }

    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! Is there anything else you'd like to know about our services? I'm here to help!";
    }

    return "That's a great question! For specific details about your project needs, I'd recommend scheduling a consultation with our team. You can use the contact form below or ask me about our services, pricing, or studio capabilities.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] bg-[#1a1a1a] border-[#d4af37]/30 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-[#d4af37] to-[#00d4ff] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="text-[#1a1a1a] font-bold">Baer Digital</h3>
                <p className="text-[#1a1a1a]/80 text-sm">Assistant</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-[#1a1a1a] hover:bg-[#1a1a1a]/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 h-[calc(100%-140px)] flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.isBot ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 bg-[#d4af37]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-[#d4af37]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-[#2a2a2a] text-white'
                        : 'bg-[#d4af37] text-[#1a1a1a]'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 bg-[#00d4ff]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-[#00d4ff]" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-[#d4af37]" />
                  </div>
                  <div className="bg-[#2a2a2a] p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>
          
          <div className="p-4 border-t border-[#d4af37]/20">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our services..."
                className="flex-1 bg-[#2a2a2a] border-[#d4af37]/30 text-white placeholder-gray-400 focus:border-[#d4af37]"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#1a1a1a]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}