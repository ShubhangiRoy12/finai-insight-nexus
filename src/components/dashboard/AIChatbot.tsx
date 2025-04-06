
import React, { useState, useEffect } from "react";
import { SendHorizontal, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { GeminiService } from "@/services/GeminiService";

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
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const { toast } = useToast();
  
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (!savedApiKey) {
      setShowApiKeyInput(true);
    }
  }, []);

  const handleSendMessage = async () => {
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
    
    try {
      const savedApiKey = localStorage.getItem('gemini_api_key');
      
      if (!savedApiKey) {
        throw new Error("API key not found");
      }
      
      const geminiService = new GeminiService(savedApiKey);
      const response = await geminiService.generateResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to generate response. Please check your API key.",
        variant: "destructive",
      });
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please check your API key or try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      setShowApiKeyInput(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey);
      setShowApiKeyInput(false);
      toast({
        title: "Success",
        description: "API key saved successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>Financial AI Advisor</CardTitle>
        <CardDescription>Ask me about investments, SIPs, market trends</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col h-[400px]">
        {showApiKeyInput && (
          <div className="p-4 mb-4 bg-muted/50 border rounded-md">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Google API Key Required</p>
                  <p className="text-xs text-muted-foreground">
                    Enter your Google Gemini API key to use the AI advisor. You can get one from the{" "}
                    <a 
                      href="https://makersuite.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary underline hover:no-underline"
                    >
                      Google AI Studio
                    </a>.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-1">
                <Input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="flex-1 text-xs"
                  size={30}
                />
                <Button onClick={handleSaveApiKey} size="sm">Save</Button>
              </div>
            </div>
          </div>
        )}
        
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
            disabled={isLoading || showApiKeyInput}
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim() || showApiKeyInput}
          >
            <SendHorizontal size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;
