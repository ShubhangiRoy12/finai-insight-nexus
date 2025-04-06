
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
const expenseData = [
  { name: "Housing", value: 1200, color: "#0F4C81" },
  { name: "Food", value: 450, color: "#00A5A5" },
  { name: "Transportation", value: 300, color: "#FFA63F" },
  { name: "Entertainment", value: 200, color: "#FF6B6B" },
  { name: "Utilities", value: 180, color: "#8B5CF6" },
  { name: "Other", value: 270, color: "#64748B" },
];

const ExpenseChart: React.FC = () => {
  const total = expenseData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>Breakdown by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[300px]">
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center" 
                  formatter={(value) => <span className="text-xs">{value}</span>}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value}`, 'Amount']}
                  itemStyle={{ fontSize: '12px' }}
                  labelStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground">Total Expenses</span>
            <div className="text-xl font-bold">${total.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
