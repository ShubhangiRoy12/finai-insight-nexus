
import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Mock initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your FinAI Assistant. How can I help you with your financial questions today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      let response: string;
      
      // Simple response logic based on keywords
      if (input.toLowerCase().includes("sip") || input.toLowerCase().includes("mutual fund")) {
        response = "SIPs (Systematic Investment Plans) are a great way to invest in mutual funds. They allow you to invest small amounts regularly, typically monthly, which helps in reducing the average cost of investment through rupee cost averaging. I recommend starting with index funds for beginners due to their lower expense ratios and market-matching returns.";
      } else if (input.toLowerCase().includes("stock") || input.toLowerCase().includes("shares")) {
        response = "When investing in stocks, it's important to focus on companies with strong fundamentals, good management, and growth potential. Consider diversifying your portfolio across different sectors to manage risk. Currently, the technology and healthcare sectors are showing strong performance in the market.";
      } else if (input.toLowerCase().includes("gold") || input.toLowerCase().includes("silver")) {
        response = "Gold and silver can be good diversification assets in your portfolio. They often act as a hedge against inflation and economic uncertainty. You can invest in physical metals, ETFs, or sovereign gold bonds. Sovereign gold bonds offer the additional benefit of 2.5% annual interest along with potential capital appreciation.";
      } else if (input.toLowerCase().includes("budget") || input.toLowerCase().includes("expense")) {
        response = "Creating a budget is essential for financial health. Consider using the 50-30-20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Track your expenses regularly and look for areas where you can reduce spending without significantly impacting your lifestyle.";
      } else {
        response = "I'd be happy to help with your financial queries. You can ask me about investments, SIPs, mutual funds, stocks, market trends, budgeting, or financial planning. What specific aspect of your finances would you like to explore?";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>Financial AI Advisor</CardTitle>
        <CardDescription>Ask me about investments, SIPs, market trends</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col h-[400px]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>
        
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Ask about stocks, SIPs, mutual funds..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()}
          >
            <SendHorizontal size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;
