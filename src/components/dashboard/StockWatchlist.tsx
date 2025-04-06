
import React from "react";
import { ChevronUp, ChevronDown, Star, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock data
const watchlistData = [
  { id: 1, name: "Apple Inc.", symbol: "AAPL", price: 178.72, change: 2.14, changePercent: 1.21, favorite: true },
  { id: 2, name: "Microsoft", symbol: "MSFT", price: 416.38, change: 5.73, changePercent: 1.39, favorite: true },
  { id: 3, name: "Amazon", symbol: "AMZN", price: 178.92, change: -0.76, changePercent: -0.42, favorite: false },
  { id: 4, name: "Alphabet", symbol: "GOOGL", price: 163.49, change: 0.58, changePercent: 0.36, favorite: false },
  { id: 5, name: "Tesla", symbol: "TSLA", price: 176.75, change: -4.28, changePercent: -2.36, favorite: true },
];

const StockWatchlist: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Watchlist</CardTitle>
            <CardDescription>Keep track of your favorite stocks</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            + Add Stock
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="w-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlistData.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell className="text-center p-2">
                  <Star size={16} className={cn(
                    "cursor-pointer",
                    stock.favorite ? "fill-finai-accent text-finai-accent" : "text-muted-foreground"
                  )} />
                </TableCell>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell className="text-muted-foreground">{stock.name}</TableCell>
                <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className={cn(
                    "flex items-center justify-end",
                    stock.change >= 0 ? "text-finai-success" : "text-finai-danger"
                  )}>
                    {stock.change >= 0 ? (
                      <ChevronUp size={16} className="mr-1" />
                    ) : (
                      <ChevronDown size={16} className="mr-1" />
                    )}
                    {Math.abs(stock.change).toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
                  </div>
                </TableCell>
                <TableCell className="p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Add to Portfolio</DropdownMenuItem>
                      <DropdownMenuItem>Set Alert</DropdownMenuItem>
                      <DropdownMenuItem className="text-finai-danger">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StockWatchlist;
