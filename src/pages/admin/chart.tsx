import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/db";

export const description = "A bar chart showing total visits per month";

const chartConfig = {
  visited: {
    label: "Visits",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartBarDefault() {
  const { data, isPending, error } = useQuery({
    queryKey: ["chartData"],
    queryFn: () => fetchData("get-mac-address"),
  });

  // Handle loading/error state
  if (isPending) {
    return (
      <div className="p-4 text-sm text-muted-foreground">Loading chart...</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-destructive">
        Error loading chart data
      </div>
    );
  }

  // Extract chartData from API response
  const chartData = data?.chartData ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitors Overview</CardTitle>
        <CardDescription>Monthly visitor statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Use 'visited' since that matches your API response */}
            <Bar dataKey="visited" fill="var(--color-visited)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Visits this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the whole year
        </div>
      </CardFooter>
    </Card>
  );
}
