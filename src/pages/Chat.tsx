
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SendIcon, Bot, User, Clock, Sparkles, FileText, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { GeminiService } from "@/services/GeminiService";

// Mock conversation data
const defaultMessages = [
  {
    id: 1,
    role: "system",
    content: "Hello! I'm your AI Financial Advisor. I can help you with investment advice, financial planning, and market insights. How can I assist you today?",
    timestamp: "09:30 AM",
  },
];

// Suggested questions
const suggestedQuestions = [
  "How should I diversify my investment portfolio?",
  "What's the difference between mutual funds and ETFs?",
  "How much should I save for retirement?",
  "Can you explain the current market trends?",
  "How do I create an emergency fund?",
];

const Chat = () => {
  const [messages, setMessages] = useState(defaultMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const { toast } = useToast();
  
  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      if (!apiKey && !localStorage.getItem('gemini_api_key')) {
        throw new Error("API key is required");
      }
      
      const geminiService = new GeminiService(apiKey || localStorage.getItem('gemini_api_key') || "");
      const response = await geminiService.generateResponse(inputValue);
      
      const aiResponse = {
        id: messages.length + 2,
        role: "system",
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate response. Please check your API key.",
        variant: "destructive",
      });
      
      // Add error message to chat
      const errorMessage = {
        id: messages.length + 2,
        role: "system",
        content: "Sorry, I encountered an error. Please check your API key or try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
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
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
        <div className="md:col-span-2 flex flex-col h-full">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">AI Financial Advisor</CardTitle>
                    <CardDescription>Powered by Gemini</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Powered</span>
                </Badge>
              </div>
            </CardHeader>
            
            {showApiKeyInput && (
              <div className="p-4 bg-muted/50 border-b">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Google API Key Required</p>
                      <p className="text-sm text-muted-foreground">
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
                      className="flex-1"
                    />
                    <Button onClick={handleSaveApiKey}>Save Key</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your API key will be stored in your browser's local storage.
                  </p>
                </div>
              </div>
            )}
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${
                        message.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <Avatar className={`h-8 w-8 ${
                        message.role === "user"
                          ? "bg-primary"
                          : "bg-primary/10"
                      }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-primary" />
                        )}
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="whitespace-pre-line text-sm">{message.content}</div>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </Avatar>
                      <div>
                        <div className="rounded-lg p-3 bg-muted">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                            <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask your financial question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  className="flex-1"
                  disabled={isLoading || showApiKeyInput}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={!inputValue.trim() || isLoading || showApiKeyInput}
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="hidden md:flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="w-full justify-start text-sm h-auto py-2"
                  onClick={() => {
                    setInputValue(question);
                  }}
                  disabled={isLoading || showApiKeyInput}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Financial Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">Investment Basics Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">Tax Planning Strategies</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">Retirement Planning Checklist</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">Budget Templates</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
