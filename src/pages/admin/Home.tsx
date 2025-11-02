import { fetchData } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Building, Utensils, Ship, Car, History } from "lucide-react";
import { ChartBarDefault } from "./chart";

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

  const MetricCard = ({ title, value, icon: Icon, color }: any) => (
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
            Admin Dashboard
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
          icon={MapPin}
          color="#3B82F6"
        />

        <MetricCard
          title="Total Accommodations"
          value={data?.accommodations}
          icon={Building}
          color="#10B981"
        />

        <MetricCard
          title="Total Restaurants"
          value={data?.restaurnant} // Note: API returns "restaurnant" (typo in API)
          icon={Utensils}
          color="#F59E0B"
        />

        <MetricCard
          title="Water Transportations"
          value={data?.water_transportation}
          icon={Ship}
          color="#06B6D4"
        />

        <MetricCard
          title="Land Transportations"
          value={data?.land_transportation}
          icon={Car}
          color="#8B5CF6"
        />

        <MetricCard
          title="Historical Records"
          value={data?.history}
          icon={History}
          color="#EC4899"
        />
      </div>
      <div className="mt-5">
        <ChartBarDefault />
      </div>
    </div>
  );
};

export default Home;
