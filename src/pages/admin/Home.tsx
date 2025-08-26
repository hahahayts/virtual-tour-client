import { fetchData } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Building, Utensils, Ship, Car, History } from "lucide-react";

const Home = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["data_lengths"],
    queryFn: () => fetchData("dashboard"),
  });

  // Loading state
  if (isFetching) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-muted-foreground">
            Loading dashboard data...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">
            Error loading dashboard data
          </div>
        </div>
      </div>
    );
  }

  // Default growth percentages (since API doesn't provide growth data)
  const defaultGrowthRates = {
    destinations: 8.5,
    accommodations: 12.3,
    restaurants: 15.7,
    waterTransport: 5.2,
    landTransport: 9.8,
    history: 7.1,
  };

  const MetricCard = ({ title, value, growth, icon: Icon, color }: any) => (
    <div
      className="bg-card rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow border border-border"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">
            {value?.toLocaleString() || 0}
          </p>
          <div className="flex items-center mt-3">
            <div
              className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                growth >= 0
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              <span>
                {growth >= 0 ? "+" : ""}
                {growth}%
              </span>
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              vs last month
            </span>
          </div>
        </div>
        <div
          className="p-4 rounded-full"
          style={{ backgroundColor: color + "15" }}
        >
          <Icon className="w-10 h-10" style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Tourism Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your tourism platform metrics
          </p>
        </div>
      </div>

      {/* Main Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Destinations"
          value={data?.destinations}
          growth={defaultGrowthRates.destinations}
          icon={MapPin}
          color="#3B82F6"
        />

        <MetricCard
          title="Total Accommodations"
          value={data?.accommodations}
          growth={defaultGrowthRates.accommodations}
          icon={Building}
          color="#10B981"
        />

        <MetricCard
          title="Total Restaurants"
          value={data?.restaurnant} // Note: API returns "restaurnant" (typo in API)
          growth={defaultGrowthRates.restaurants}
          icon={Utensils}
          color="#F59E0B"
        />

        <MetricCard
          title="Water Transportations"
          value={data?.water_transportation}
          growth={defaultGrowthRates.waterTransport}
          icon={Ship}
          color="#06B6D4"
        />

        <MetricCard
          title="Land Transportations"
          value={data?.land_transportation}
          growth={defaultGrowthRates.landTransport}
          icon={Car}
          color="#8B5CF6"
        />

        <MetricCard
          title="Historical Records"
          value={data?.history}
          growth={defaultGrowthRates.history}
          icon={History}
          color="#EC4899"
        />
      </div>
    </div>
  );
};

export default Home;
