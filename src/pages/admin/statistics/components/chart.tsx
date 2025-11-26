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
    color: "#6366f1",
  },
} satisfies ChartConfig;

export function ChartBarDefault({
  destinationId,
  name,
}: {
  destinationId: string;
  name: string;
}) {
  const { data, isPending, error } = useQuery({
    queryKey: ["chartData", destinationId],
    queryFn: () => fetchData(`destination-visit-stats/${destinationId}`),
  });

  if (isPending)
    return (
      <div className="p-2 text-sm text-muted-foreground">Loading chart...</div>
    );

  if (error)
    return (
      <div className="p-2 text-sm text-destructive">
        Error loading chart data
      </div>
    );

  const chartData = data?.chartData ?? [];

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-sm md:text-base">{name}</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Monthly visitor statistics
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <ChartContainer config={chartConfig} className="h-40 md:h-48">
          <BarChart width={300} height={160} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visited" fill="var(--color-visited)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-xs md:text-sm">
        <div className="flex gap-1 font-medium">
          Visits this month <TrendingUp className="h-3 w-3" />
        </div>
        <div className="text-muted-foreground">
          Showing total visitors for the whole year
        </div>
      </CardFooter>
    </Card>
  );
}
