
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import StockWatchlist from "@/components/dashboard/StockWatchlist";
import StockChart from "@/components/dashboard/StockChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, ChevronUp, ChevronDown, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data for sector performance
const sectorData = [
  { name: "Technology", change: 1.25, status: "up" },
  { name: "Healthcare", change: 0.75, status: "up" },
  { name: "Financials", change: -0.5, status: "down" },
  { name: "Energy", change: -1.2, status: "down" },
  { name: "Consumer Staples", change: 0.32, status: "up" },
  { name: "Industrials", change: 0.14, status: "up" },
];

const Stocks = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Stock Market</h1>
          <Button variant="outline" className="gap-2">
            <LineChart size={16} />
            Market Overview
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <StockChart 
              title="S&P 500" 
              symbol="SPX" 
              currentPrice={4534.87} 
              change={23.78} 
              changePercent={0.53} 
            />
          </div>
          <div className="col-span-1">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sector Performance</CardTitle>
                    <CardDescription>Today's market movers</CardDescription>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <InfoIcon size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Sector performance shows how different market sectors are performing today. Green indicates positive movement while red shows negative.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectorData.map((sector) => (
                    <div key={sector.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{sector.name}</span>
                      <div className={`flex items-center ${sector.status === "up" ? "text-finai-success" : "text-finai-danger"}`}>
                        {sector.status === "up" ? (
                          <ChevronUp size={16} className="mr-1" />
                        ) : (
                          <ChevronDown size={16} className="mr-1" />
                        )}
                        <span>{Math.abs(sector.change).toFixed(2)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <StockWatchlist />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Screener</CardTitle>
              <CardDescription>Find stocks that match your criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="performance">
                <TabsList className="mb-4">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>
                <TabsContent value="performance" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Use this screener to find stocks based on their performance metrics such as price change,
                    volume, and market cap.
                  </p>
                  <Button>Run Screener</Button>
                </TabsContent>
                <TabsContent value="fundamentals" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Screen stocks based on fundamental data like P/E ratio, EPS growth, dividend yield,
                    and more.
                  </p>
                  <Button>Run Screener</Button>
                </TabsContent>
                <TabsContent value="technical" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Find stocks matching technical criteria such as moving averages, RSI, MACD,
                    and other technical indicators.
                  </p>
                  <Button>Run Screener</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Stocks;
