
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SendIcon, Bot, User, Clock, Sparkles, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Mock conversation data
const defaultMessages = [
  {
    id: 1,
    role: "system",
    content: "Hello! I'm your AI Financial Advisor. I can help you with investment advice, financial planning, and market insights. How can I assist you today?",
    timestamp: "09:30 AM",
  },
  {
    id: 2,
    role: "user",
    content: "I want to start investing in mutual funds. What should I consider?",
    timestamp: "09:31 AM",
  },
  {
    id: 3,
    role: "system",
    content: "Great question! When starting with mutual funds, consider these key factors:\n\n1. **Investment Goals**: Define if you're investing for retirement, education, or other goals.\n\n2. **Time Horizon**: Longer horizons (>5 years) can accommodate higher-risk equity funds; shorter periods might need debt funds.\n\n3. **Risk Tolerance**: Assess how comfortable you are with market fluctuations.\n\n4. **SIP vs. Lump Sum**: SIPs (Systematic Investment Plans) allow regular, small investments and help with rupee-cost averaging.\n\n5. **Expense Ratio**: Lower expense ratios mean more of your money is actually invested.\n\n6. **Fund Manager Track Record**: Research the fund manager's performance across market cycles.\n\nWould you like specific recommendations based on your risk profile?",
    timestamp: "09:32 AM",
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
  
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "system",
        content: "I'm analyzing your question about " + inputValue + "... This is a simulated response. In a real implementation, this would connect to an AI service like Gemini or GPT to provide personalized financial advice based on your query.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
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
                    <CardDescription>Personal finance assistant</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>AI Powered</span>
                </Badge>
              </div>
            </CardHeader>
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
                />
                <Button onClick={handleSend} disabled={!inputValue.trim()}>
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
