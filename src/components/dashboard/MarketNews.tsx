
import React from "react";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data
const newsData = [
  {
    id: 1,
    title: "Federal Reserve Signals Potential Rate Cuts Later This Year",
    summary: "The Fed Chairman indicated in a recent speech that inflation is cooling, opening the door for future rate cuts.",
    source: "Financial Times",
    time: "2 hours ago",
    sentiment: "positive",
  },
  {
    id: 2,
    title: "Tech Stocks Slide as Earnings Reports Disappoint Investors",
    summary: "Major tech companies released Q2 earnings below analyst expectations, triggering a sell-off in the sector.",
    source: "Bloomberg",
    time: "5 hours ago",
    sentiment: "negative",
  },
  {
    id: 3,
    title: "Oil Prices Stabilize Amid Middle East Tensions",
    summary: "Crude oil prices have remained steady despite ongoing geopolitical concerns in major producing regions.",
    source: "Reuters",
    time: "10 hours ago",
    sentiment: "neutral",
  },
  {
    id: 4,
    title: "New Startup Funding Rounds Show Venture Capital Is Back",
    summary: "Several fintech startups announced successful Series B funding rounds, suggesting VC confidence is returning.",
    source: "TechCrunch",
    time: "1 day ago",
    sentiment: "positive",
  },
];

interface NewsItemProps {
  title: string;
  summary: string;
  source: string;
  time: string;
  sentiment: "positive" | "negative" | "neutral";
}

const NewsItem: React.FC<NewsItemProps> = ({ title, summary, source, time, sentiment }) => {
  return (
    <div className="p-4 border-b last:border-0 hover:bg-muted/30 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <Badge
          variant="outline"
          className={cn(
            "text-xs",
            sentiment === "positive" && "bg-finai-success/10 text-finai-success border-finai-success/30",
            sentiment === "negative" && "bg-finai-danger/10 text-finai-danger border-finai-danger/30",
            sentiment === "neutral" && "bg-muted text-muted-foreground"
          )}
        >
          {sentiment}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{summary}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">{source} • {time}</span>
        <ArrowUpRight size={14} className="text-primary cursor-pointer" />
      </div>
    </div>
  );
};

const MarketNews: React.FC = () => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Market News</CardTitle>
          <CardDescription>Latest financial insights</CardDescription>
        </div>
        <Newspaper size={18} className="ml-auto text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-0 pb-1">
        <div className="max-h-[350px] overflow-y-auto">
          {newsData.map((news) => (
            <NewsItem
              key={news.id}
              title={news.title}
              summary={news.summary}
              source={news.source}
              time={news.time}
              sentiment={news.sentiment as "positive" | "negative" | "neutral"}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketNews;
