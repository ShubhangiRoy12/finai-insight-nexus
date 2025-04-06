
import React from "react";
import { ArrowRightIcon, AreaChart, BadgeDollarSign, LineChart, PiggyBank, TrendingUp } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import StockChart from "@/components/dashboard/StockChart";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import MarketNews from "@/components/dashboard/MarketNews";
import AIChatbot from "@/components/dashboard/AIChatbot";
import StockWatchlist from "@/components/dashboard/StockWatchlist";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Financial Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your financial insights center</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Portfolio Value"
          value="$24,589.75"
          description="Your total investments"
          icon={AreaChart}
          trend="up"
          trendValue="+$420.65 (1.73%)"
        />
        <StatCard 
          title="Monthly Income"
          value="$8,500.00"
          description="April 2025"
          icon={BadgeDollarSign}
          trend="up"
          trendValue="+5% from last month"
        />
        <StatCard 
          title="Monthly Expenses"
          value="$2,845.50"
          description="18 transactions"
          icon={PiggyBank}
          trend="down"
          trendValue="-$124.30 (-4.2%)"
        />
        <StatCard 
          title="Market Trends"
          value="S&P 500: 5,235.48"
          description="Market closed"
          icon={TrendingUp}
          trend="up"
          trendValue="+0.89% today"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <StockChart 
            title="Market Overview"
            symbol="S&P 500"
            currentPrice={5235.48}
            change={46.59}
            changePercent={0.89}
          />
        </div>
        <div>
          <ExpenseChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MarketNews />
        <AIChatbot />
      </div>
      
      <div className="mb-6">
        <StockWatchlist />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-finai-primary/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-full bg-finai-primary/20 flex items-center justify-center">
              <LineChart size={20} className="text-finai-primary" />
            </div>
            <Button variant="ghost" size="sm" className="text-finai-primary gap-1">
              Start Now <ArrowRightIcon size={14} />
            </Button>
          </div>
          <h3 className="text-lg font-semibold mb-2">Investment Analysis</h3>
          <p className="text-sm text-muted-foreground">Get personalized investment recommendations based on your risk profile and financial goals.</p>
        </div>
        
        <div className="bg-finai-secondary/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-full bg-finai-secondary/20 flex items-center justify-center">
              <PiggyBank size={20} className="text-finai-secondary" />
            </div>
            <Button variant="ghost" size="sm" className="text-finai-secondary gap-1">
              Explore <ArrowRightIcon size={14} />
            </Button>
          </div>
          <h3 className="text-lg font-semibold mb-2">Budget Planner</h3>
          <p className="text-sm text-muted-foreground">Create and manage your monthly budget with AI-powered insights and recommendations.</p>
        </div>
        
        <div className="bg-finai-accent/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-full bg-finai-accent/20 flex items-center justify-center">
              <BadgeDollarSign size={20} className="text-finai-accent" />
            </div>
            <Button variant="ghost" size="sm" className="text-finai-accent gap-1">
              Learn More <ArrowRightIcon size={14} />
            </Button>
          </div>
          <h3 className="text-lg font-semibold mb-2">Financial Education</h3>
          <p className="text-sm text-muted-foreground">Access curated resources to improve your financial literacy and make better investment decisions.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
