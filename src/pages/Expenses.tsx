
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PiggyBank, Plus, Lightbulb, TrendingUp, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for expenses
const categories = [
  { name: "Housing", amount: 1500, budget: 1800, color: "bg-blue-500" },
  { name: "Food", amount: 420, budget: 500, color: "bg-green-500" },
  { name: "Transportation", amount: 280, budget: 300, color: "bg-yellow-500" },
  { name: "Entertainment", amount: 150, budget: 200, color: "bg-purple-500" },
  { name: "Shopping", amount: 310, budget: 250, color: "bg-pink-500" },
  { name: "Utilities", amount: 180, budget: 250, color: "bg-orange-500" },
];

const financialTips = [
  {
    title: "50/30/20 Rule",
    description: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings/debt.",
    icon: PiggyBank,
  },
  {
    title: "Emergency Fund",
    description: "Build an emergency fund that covers 3-6 months of expenses.",
    icon: Lightbulb,
  },
  {
    title: "Debt Management",
    description: "Pay high-interest debts first while making minimum payments on others.",
    icon: TrendingUp,
  },
];

const Expenses = () => {
  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          <Button className="gap-2">
            <Plus size={16} />
            Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>April 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ${category.amount} / ${category.budget}
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <Progress 
                        value={(category.amount / category.budget) * 100} 
                        className={`h-2 ${category.amount > category.budget ? 'bg-finai-danger/20' : 'bg-muted'}`}
                      />
                      <div 
                        className={`absolute top-1 left-0 h-2 ${category.color} rounded-full transition-all`}
                        style={{ width: `${(category.amount / category.budget) * 100}%`, maxWidth: '100%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 size={18} />
                Summary
              </CardTitle>
              <CardDescription>Your financial status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium">Total Spent</span>
                  <span className="font-semibold">$2,840</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium">Monthly Budget</span>
                  <span className="font-semibold">$3,300</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm font-medium">Remaining</span>
                  <span className="font-semibold text-finai-success">$460</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium">Status</span>
                  <span className="bg-finai-success/10 text-finai-success px-2 py-1 rounded-full text-xs font-medium">
                    On Budget
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Financial Tips & Suggestions</CardTitle>
            <CardDescription>Smart ways to manage your expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tips">
              <TabsList className="mb-4">
                <TabsTrigger value="tips">Tips</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="budgeting">Budgeting</TabsTrigger>
              </TabsList>
              <TabsContent value="tips">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {financialTips.map((tip, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <tip.icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-medium">{tip.title}</h3>
                          <p className="text-sm text-muted-foreground">{tip.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="savings">
                <p className="text-muted-foreground">
                  Set up automatic transfers to your savings account on payday. 
                  Consider using high-yield savings accounts to maximize your returns.
                  Try the 30-day rule for non-essential purchases: wait 30 days before buying to avoid impulse spending.
                </p>
              </TabsContent>
              <TabsContent value="budgeting">
                <p className="text-muted-foreground">
                  Review your budget monthly and adjust categories as needed.
                  Use zero-based budgeting to account for every dollar of income.
                  Track all expenses, even small ones, as they can add up quickly.
                  Consider using the envelope system for categories where you tend to overspend.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Expenses;
