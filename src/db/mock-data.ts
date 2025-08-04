import type { RestaurantDataSchema } from "@/schema/restaurant";
import type z from "zod";

// Updated mock data based on the provided schema
export const mockDestinations = [
  {
    id: "1",
    name: "Chocolate Hills",
    description:
      "Famous geological formation with over 1,200 cone-shaped hills",
    address: "Carmen, Bohol, Philippines",
    email: null,
    phone: null,
    website: null,
    facebook: null,
    imageUrl_1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    imageUrl_2: null,
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    count: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "2",
    name: "Tarsier Sanctuary",
    description: "Home to the world's smallest primates - Philippine Tarsiers",
    address: "Corella, Bohol, Philippines",
    email: null,
    phone: null,
    website: null,
    facebook: null,
    imageUrl_1:
      "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
    imageUrl_2: null,
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    count: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "3",
    name: "Baclayon Church",
    description: "Historic stone church built by Spanish missionaries in 1595",
    address: "Baclayon, Bohol, Philippines",
    email: null,
    phone: null,
    website: null,
    facebook: null,
    imageUrl_1:
      "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?w=800&q=80",
    imageUrl_2: null,
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    count: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "4",
    name: "Loboc River",
    description: "Scenic river cruise with floating restaurant experience",
    address: "Loboc, Bohol, Philippines",
    email: null,
    phone: null,
    website: null,
    facebook: null,
    imageUrl_1:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageUrl_2: null,
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    count: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "5",
    name: "Mag-Aso Falls",
    description: "Hidden waterfall perfect for swimming and nature photography",
    address: "Antequera, Bohol, Philippines",
    email: null,
    phone: null,
    website: null,
    facebook: null,
    imageUrl_1:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    imageUrl_2: null,
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    count: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "6",
    name: "Blood Compact Site",
    description:
      "Historical monument commemorating the first treaty of friendship",
    address: "Tagbilaran, Bohol, Philippines",
    email: null,
    phone: null,
    website: null,
    facebook: null,
    imageUrl_1:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    imageUrl_2: null,
    imageUrl_3: null,
    imageUrl_4: null,
    imageUrl_5: null,
    videoUrl: null,
    latitude: null,
    longitude: null,
    count: null,
    createdAt: null,
    updatedAt: null,
  },
];

// Sample restaurant data for Tubigon
export const restaurants: z.infer<typeof RestaurantDataSchema>[] = [
  {
    id: "1",
    name: "Seaside Grill & Bar",
    description:
      "Fresh seafood with stunning ocean views. Specializing in local catch and traditional Filipino dishes.",
    address: "Barangay Poblacion, Tubigon",
    email: "info@seasidegrill.com",
    phone: "+63 38 515 1234",
    website: "https://seasidegrill.com",
    facebook: "https://facebook.com/seasidegrill",
    imageUrl_1:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    imageUrl_2:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    imageUrl_3: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "2",
    name: "Tubigon Heritage Café",
    description:
      "Cozy café serving local coffee and traditional pastries in a heritage building.",
    address: "Town Center, Tubigon",
    email: "contact@heritagecafe.com",
    phone: "+63 38 515 5678",
    website: "https://heritagecafe.com",
    facebook: "https://facebook.com/heritagecafe",
    imageUrl_1:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    imageUrl_2: null,
    imageUrl_3: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "3",
    name: "Mangrove View Restaurant",
    description:
      "Authentic Filipino cuisine with panoramic mangrove views. Family-owned since 1985.",
    address: "Mangrove Area, Tubigon",
    email: "mangrove@restaurant.com",
    phone: "+63 38 515 9012",
    website: null,
    facebook: "https://facebook.com/mangroverestaurant",
    imageUrl_1:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    imageUrl_2: null,
    imageUrl_3: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "4",
    name: "Island Breeze Bistro",
    description:
      "Modern bistro offering international cuisine with local ingredients and creative presentations.",
    address: "Marina District, Tubigon",
    email: "bistro@islandbreeze.com",
    phone: "+63 38 515 3456",
    website: "https://islandbreeze.com",
    facebook: null,
    imageUrl_1:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
    imageUrl_2: null,
    imageUrl_3: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "5",
    name: "Lola's Kitchen",
    description:
      "Home-style Filipino cooking passed down through generations. Known for authentic flavors.",
    address: "Barangay San Vicente, Tubigon",
    email: "lola@kitchen.com",
    phone: "+63 38 515 7890",
    website: null,
    facebook: "https://facebook.com/lolaskitchen",
    imageUrl_1:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    imageUrl_2: null,
    imageUrl_3: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: "6",
    name: "Coconut Grove Resto",
    description:
      "Tropical dining experience surrounded by coconut palms. Fresh seafood and tropical drinks.",
    address: "Coastal Road, Tubigon",
    email: null,
    phone: "+63 38 515 2468",
    website: "https://coconutgrove.com",
    facebook: "https://facebook.com/coconutgrove",
    imageUrl_1:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
    imageUrl_2: null,
    imageUrl_3: null,
    latitude: null,
    longitude: null,
    createdAt: null,
    updatedAt: null,
  },
];

export const waterTransports = [
  {
    id: "wt001",
    name: "Tubigon-Cebu Fast Ferry",
    description:
      "Premium fast ferry service connecting Tubigon to Cebu City with comfortable seating and air conditioning. Perfect for business travelers and tourists.",
    expected_fee: 450,
    departure_days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    departure_time: "06:00 AM, 02:00 PM, 08:00 PM",
    guidelines_and_policies:
      "Passengers must arrive 30 minutes before departure. Valid ID required. No smoking onboard. Life jackets provided.",
    rebooking_supercharges:
      "₱50 rebooking fee applies. Changes allowed up to 2 hours before departure.",
    refund_policy:
      "Full refund if cancelled 24 hours prior. 50% refund if cancelled 12-24 hours prior. No refund for same-day cancellations.",
    duration: null,
    imageUrl_1: null,
    imageUrl_2: null,
    imageUrl_3: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
  },
  {
    id: "wt002",
    name: "Island Hopping Boat",
    description:
      "Traditional bancas for island hopping adventures around Tubigon. Visit nearby islands and enjoy snorkeling, swimming, and beach exploration.",
    expected_fee: 150,
    departure_days: ["Saturday", "Sunday"],
    departure_time: "08:00 AM, 01:00 PM",
    guidelines_and_policies:
      "Bring own snorkeling gear or rent onboard. Swimming ability required. Children must be supervised.",
    rebooking_supercharges:
      "₱30 rebooking fee. Weather-dependent cancellations are free.",
    refund_policy:
      "Full refund for weather cancellations. 75% refund if cancelled 12+ hours prior.",
    duration: null,
    imageUrl_1: null,
    imageUrl_2: null,
    imageUrl_3: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
  },
  {
    id: "wt003",
    name: "Cargo-Passenger Vessel",
    description:
      "Economical transportation option for passengers and cargo. Reliable service connecting Tubigon to nearby provinces with budget-friendly rates.",
    expected_fee: 80,
    departure_days: ["Monday", "Wednesday", "Friday"],
    departure_time: "05:00 AM",
    guidelines_and_policies:
      "Cargo weight limits apply. Early boarding recommended. Basic amenities available.",
    rebooking_supercharges:
      "₱25 rebooking fee. Subject to vessel availability.",
    refund_policy:
      "80% refund if cancelled 6+ hours prior. No refund for no-shows.",
    duration: null,
    imageUrl_1: null,
    imageUrl_2: null,
    imageUrl_3: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
  },
];

export const landTransports = [
  {
    id: "lt001",
    name: "Tubigon City Tours Van",
    description:
      "Comfortable air-conditioned van service for city tours and airport transfers. Professional drivers with local knowledge and tourist-friendly service.",
    vehicleType: "Van",
    capacity: 15,
    operator: "Tubigon Tourism Transport",
    contactNumber: "+63 38 515 2345",
    baseFee: 200,
    feeDescription:
      "Base rate per hour. City tour packages available starting at ₱1,500 for half-day tours.",
    imageUrl_1:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
    imageUrl_2:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    imageUrl_3:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    createdAt: "2024-01-15",
    updatedAt: "2024-08-01",
    deletedAt: null,
  },
  {
    id: "lt002",
    name: "Jeepney Route Express",
    description:
      "Traditional Filipino jeepney service covering major routes in Tubigon. Affordable public transportation connecting key destinations around the town.",
    vehicleType: "Jeepney",
    capacity: 20,
    operator: "Tubigon Jeepney Association",
    contactNumber: "+63 38 515 3456",
    baseFee: 15,
    feeDescription:
      "Minimum fare ₱15. Distance-based pricing. Operates on fixed routes with regular schedules.",
    imageUrl_1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    imageUrl_2:
      "https://images.unsplash.com/photo-1520637736862-4d197d17c0aa?w=800&h=600&fit=crop",
    imageUrl_3: null,
    createdAt: "2024-02-01",
    updatedAt: "2024-07-20",
    deletedAt: null,
  },
  {
    id: "lt003",
    name: "Tricycle Hub Service",
    description:
      "Convenient tricycle service for short-distance travel within Tubigon. Perfect for quick trips to markets, schools, and residential areas.",
    vehicleType: "Tricycle",
    capacity: 6,
    operator: "Tubigon Tricycle Operators",
    contactNumber: "+63 38 515 4567",
    baseFee: 50,
    feeDescription:
      "Starting fare ₱50 for first 2km. Additional ₱10 per kilometer. Special rates for hourly rentals.",
    imageUrl_1:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    imageUrl_2:
      "https://images.unsplash.com/photo-1562424160-445ab8af7e07?w=800&h=600&fit=crop",
    imageUrl_3: null,
    createdAt: "2024-01-20",
    updatedAt: "2024-07-10",
    deletedAt: null,
  },
  {
    id: "lt004",
    name: "Premium SUV Charter",
    description:
      "Luxury SUV rental service for comfortable long-distance travel and special occasions. Professional chauffeur service available for corporate and leisure trips.",
    vehicleType: "SUV",
    capacity: 7,
    operator: "Bohol Luxury Transport",
    contactNumber: "+63 38 515 5678",
    baseFee: 800,
    feeDescription:
      "Daily rate ₱3,500. Hourly rate ₱800. Includes fuel, driver, and insurance. Airport transfers available.",
    imageUrl_1:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    imageUrl_2:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    imageUrl_3:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
    createdAt: "2024-03-01",
    updatedAt: "2024-08-01",
    deletedAt: null,
  },
  {
    id: "lt005",
    name: "Motorcycle Taxi Express",
    description:
      "Fast and efficient motorcycle taxi service for solo travelers. Quick navigation through traffic with experienced local drivers for urgent trips.",
    vehicleType: "Motorcycle",
    capacity: 2,
    operator: "Habal-Habal Riders Coop",
    contactNumber: "+63 38 515 6789",
    baseFee: 30,
    feeDescription:
      "Base fare ₱30 for first 3km. ₱8 per additional kilometer. Helmet provided for passenger safety.",
    imageUrl_1:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
    imageUrl_2:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
    imageUrl_3: null,
    createdAt: "2024-02-15",
    updatedAt: "2024-07-25",
    deletedAt: null,
  },
  {
    id: "lt006",
    name: "Cargo Truck Service",
    description:
      "Heavy-duty cargo truck service for moving goods, construction materials, and large items. Professional loading and unloading assistance available.",
    vehicleType: "Truck",
    capacity: 2,
    operator: "Tubigon Logistics Corp",
    contactNumber: "+63 38 515 7890",
    baseFee: 500,
    feeDescription:
      "Half-day rate ₱1,500. Full day ₱2,500. Includes driver and fuel. Loading assistance ₱200 extra.",
    imageUrl_1:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop",
    imageUrl_2:
      "https://images.unsplash.com/photo-1587838756005-e4c5e6c1d62c?w=800&h=600&fit=crop",
    imageUrl_3: null,
    createdAt: "2024-01-10",
    updatedAt: "2024-06-15",
    deletedAt: null,
  },
];

export const mockHotels = [
  {
    id: "1",
    name: "Oceanview Resort",
    description: "Luxury beachfront resort with stunning ocean views",
    address: "Panglao Island, Bohol",
    type: "RESORT",
    email: "info@oceanview.com",
    phone: "+63382551234",
    website: "https://www.oceanview.com",
    imageUrl_1:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  },
  {
    id: "2",
    name: "Tubigon City Hotel",
    description: "Comfortable accommodations in the city center",
    address: "Tubigon Town Proper",
    type: "HOTEL",
    phone: "+63382345678",
    imageUrl_1:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  },
  {
    id: "3",
    name: "Seaside Apartment",
    description: "Modern apartment with sea view",
    address: "Anda, Bohol",
    type: "APARTMENT",
    imageUrl_1:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  },
  {
    id: "4",
    name: "Heritage Inn",
    description: "Charming historic inn with local character",
    address: "Loay, Bohol",
    type: "INN",
    imageUrl_1:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
  },
];
