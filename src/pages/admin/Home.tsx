import React, { useState, useEffect } from "react";
import {
  Bell,
  MapPin,
  Building,
  Utensils,
  Ship,
  Car,
  X,
  Check,
  Users,
  Calendar,
  Star,
  Moon,
  Sun,
} from "lucide-react";

const Home = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New restaurant 'Ocean View Bistro' added to Boracay",
      type: "success",
      time: "1 hour ago",
    },
    {
      id: 2,
      message: "5 new accommodations pending approval",
      type: "warning",
      time: "3 hours ago",
    },
    {
      id: 3,
      message: "Water transportation route updated for Palawan",
      type: "info",
      time: "5 hours ago",
    },
    {
      id: 4,
      message: "Land transportation booking increased by 20%",
      type: "success",
      time: "1 day ago",
    },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  // Tourism analytics data
  const analyticsData = {
    totalDestinations: 127,
    totalAccommodations: 892,
    totalRestaurants: 456,
    totalWaterTransportations: 89,
    totalLandTransportations: 234,
    destinationGrowth: 8.5,
    accommodationGrowth: 12.3,
    restaurantGrowth: 15.7,
    waterTransportGrowth: 5.2,
    landTransportGrowth: 9.8,
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const MetricCard = ({ title, value, growth, icon: Icon, color }) => (
    <div
      className="bg-card rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow border border-border"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">
            {value.toLocaleString()}
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

  const NotificationItem = ({ notification }) => (
    <div
      className={`p-4 border-l-4 mb-3 bg-card rounded-r-lg shadow-sm hover:shadow-md transition-shadow ${
        notification.type === "success"
          ? "border-green-400"
          : notification.type === "warning"
          ? "border-yellow-400"
          : "border-blue-400"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-card-foreground font-medium">
            {notification.message}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {notification.time}
          </p>
        </div>
        <button
          onClick={() => dismissNotification(notification.id)}
          className="text-muted-foreground hover:text-card-foreground ml-3 p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const QuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-card rounded-lg shadow-md p-6 border border-border">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
            <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">
              Active Bookings
            </p>
            <p className="text-2xl font-bold text-card-foreground">1,247</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-md p-6 border border-border">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <Calendar className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">
              This Month's Visits
            </p>
            <p className="text-2xl font-bold text-card-foreground">8,932</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-md p-6 border border-border">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">
              Average Rating
            </p>
            <p className="text-2xl font-bold text-card-foreground">4.8</p>
          </div>
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

        <div className="flex items-center gap-4">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 text-muted-foreground hover:text-foreground bg-card rounded-full shadow-md hover:shadow-lg transition-all border border-border"
            >
              <Bell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-popover rounded-lg shadow-xl border border-border z-10">
                <div className="p-4 border-b border-border bg-card rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-card-foreground">
                      Notifications
                    </h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto p-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Check className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        No new notifications
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Destinations"
          value={analyticsData.totalDestinations}
          growth={analyticsData.destinationGrowth}
          icon={MapPin}
          color="#3B82F6"
        />

        <MetricCard
          title="Total Accommodations"
          value={analyticsData.totalAccommodations}
          growth={analyticsData.accommodationGrowth}
          icon={Building}
          color="#10B981"
        />

        <MetricCard
          title="Total Restaurants"
          value={analyticsData.totalRestaurants}
          growth={analyticsData.restaurantGrowth}
          icon={Utensils}
          color="#F59E0B"
        />

        <MetricCard
          title="Water Transportations"
          value={analyticsData.totalWaterTransportations}
          growth={analyticsData.waterTransportGrowth}
          icon={Ship}
          color="#06B6D4"
        />

        <MetricCard
          title="Land Transportations"
          value={analyticsData.totalLandTransportations}
          growth={analyticsData.landTransportGrowth}
          icon={Car}
          color="#8B5CF6"
        />
      </div>

      {/* Quick Stats Section */}
      <QuickStats />

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-card rounded-lg shadow-md p-6 border border-border">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-muted rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Building className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-card-foreground">
                  New accommodation registered
                </p>
                <p className="text-xs text-muted-foreground">
                  Sunset Resort, Bohol - 15 minutes ago
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-muted rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-card-foreground">
                  Destination updated
                </p>
                <p className="text-xs text-muted-foreground">
                  El Nido, Palawan - 1 hour ago
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-muted rounded-lg">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Utensils className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-card-foreground">
                  Restaurant review submitted
                </p>
                <p className="text-xs text-muted-foreground">
                  Seafood Paradise, Cebu - 2 hours ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
