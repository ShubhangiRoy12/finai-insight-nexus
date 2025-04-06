
import React from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const generateData = (days: number, trend: "up" | "down" | "volatile") => {
  const data = [];
  let baseValue = 100;
  
  for (let i = 0; i < days; i++) {
    if (trend === "up") {
      baseValue += Math.random() * 5;
    } else if (trend === "down") {
      baseValue -= Math.random() * 4;
    } else {
      baseValue += Math.random() * 10 - 5;
    }
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: Math.max(baseValue, 10)
    });
  }
  
  return data;
};

const stockData = {
  "1W": generateData(7, "up"),
  "1M": generateData(30, "volatile"),
  "3M": generateData(90, "up"),
  "1Y": generateData(365, "volatile"),
  "ALL": generateData(730, "up")
};

interface StockChartProps {
  title: string;
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

const StockChart: React.FC<StockChartProps> = ({ 
  title, 
  symbol, 
  currentPrice,
  change,
  changePercent
}) => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{symbol}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
            <div className={`text-sm font-medium ${change >= 0 ? 'text-finai-success' : 'text-finai-danger'}`}>
              {change >= 0 ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1M">
          <TabsList className="mb-4">
            <TabsTrigger value="1W">1W</TabsTrigger>
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
            <TabsTrigger value="ALL">ALL</TabsTrigger>
          </TabsList>
          
          {Object.entries(stockData).map(([timeframe, data]) => (
            <TabsContent key={timeframe} value={timeframe} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id={`gradient-${timeframe}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0F4C81" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(val) => val.split('/')[1]}
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0F4C81" 
                    fillOpacity={1} 
                    fill={`url(#gradient-${timeframe})`} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StockChart;
