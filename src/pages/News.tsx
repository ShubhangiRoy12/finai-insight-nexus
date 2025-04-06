
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import MarketNews from "@/components/dashboard/MarketNews";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Globe, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock data for featured news
const featuredNews = [
  {
    id: 1,
    title: "Reserve Bank of India Maintains Key Interest Rate Amid Inflation Concerns",
    summary: "RBI keeps repo rate unchanged at 6.5% for the seventh consecutive policy meeting, citing ongoing inflation risks despite moderating price pressures.",
    source: "Economic Times",
    time: "3 hours ago",
    category: "India",
    sentiment: "neutral",
  },
  {
    id: 2,
    title: "Global Markets Rally as Fed Chair Signals Potential Rate Cuts",
    summary: "Stock markets worldwide surge after Federal Reserve Chairman indicated the central bank is prepared to begin cutting interest rates in the coming months.",
    source: "Financial Times",
    time: "5 hours ago",
    category: "Global",
    sentiment: "positive",
  },
  {
    id: 3,
    title: "Tech Giant Reports Record Quarterly Earnings, Exceeding Analyst Expectations",
    summary: "Shares jump over one leading tech company announces better-than-expected Q1 results, driven by strong cloud services and AI product adoption.",
    source: "Bloomberg",
    time: "1 day ago",
    category: "Global",
    sentiment: "positive",
  },
];

// Mock data for market updates
const marketUpdates = [
  { id: 1, index: "Sensex", value: "72,456.18", change: "+256.35", percent: "+0.35%" },
  { id: 2, index: "Nifty 50", value: "22,043.25", change: "+78.90", percent: "+0.36%" },
  { id: 3, index: "Dow Jones", value: "39,123.15", change: "+123.45", percent: "+0.32%" },
  { id: 4, index: "NASDAQ", value: "16,378.85", change: "-42.17", percent: "-0.26%" },
  { id: 5, index: "FTSE 100", value: "8,245.30", change: "+32.15", percent: "+0.39%" },
];

const News = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Market News</h1>
          <div className="relative max-w-sm">
            <Input 
              placeholder="Search news..." 
              className="pl-10"
            />
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="india">India</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="gap-2">
              <Globe size={14} />
              Latest Updates
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="md:col-span-2">
              <TabsContent value="all" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Stories</CardTitle>
                    <CardDescription>Top financial news from around the world</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {featuredNews.map((news) => (
                        <div key={news.id} className="border-b pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-normal">
                                  {news.category}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs",
                                    news.sentiment === "positive" && "bg-finai-success/10 text-finai-success border-finai-success/30",
                                    news.sentiment === "negative" && "bg-finai-danger/10 text-finai-danger border-finai-danger/30",
                                    news.sentiment === "neutral" && "bg-muted text-muted-foreground"
                                  )}
                                >
                                  {news.sentiment}
                                </Badge>
                              </div>
                              <h3 className="text-lg font-semibold mt-2">{news.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {news.summary}
                              </p>
                              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                <span>{news.source}</span>
                                <span className="mx-1">•</span>
                                <span>{news.time}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                              <ArrowUpRight size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="india" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Indian Market News</CardTitle>
                    <CardDescription>Financial updates from India</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                      Displaying Indian market news...
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="global" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Global Market News</CardTitle>
                    <CardDescription>Worldwide financial updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center py-8 text-muted-foreground">
                      Displaying global market news...
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
            
            <div>
              <Card>
                <CardHeader className="flex flex-row items-center pb-2">
                  <div>
                    <CardTitle className="text-base">Market Updates</CardTitle>
                    <CardDescription>Major indices</CardDescription>
                  </div>
                  <TrendingUp size={18} className="ml-auto text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketUpdates.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{item.index}</div>
                          <div className="text-sm text-muted-foreground">{item.value}</div>
                        </div>
                        <div className={`text-right ${item.change.startsWith('+') ? 'text-finai-success' : 'text-finai-danger'}`}>
                          <div className="font-medium">{item.change}</div>
                          <div className="text-sm">{item.percent}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <MarketNews />
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default News;
