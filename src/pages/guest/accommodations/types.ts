export type AccommodationType =
  | "HOTEL"
  | "INN"
  | "RESORT"
  | "APARTMENT"
  | string;

export interface AccommodationData {
  id: string;
  name: string;
  type: AccommodationType;
  address?: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  latitude?: number;
  longitude?: number;
  videoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  imageUrl_1?: string;
  imageUrl_2?: string;
  imageUrl_3?: string;
  imageUrl_4?: string;
  imageUrl_5?: string;
}

export const getTypeColor = (type: AccommodationType): string => {
  const colors: Record<string, string> = {
    HOTEL: "bg-blue-100 text-blue-800",
    INN: "bg-green-100 text-green-800",
    RESORT: "bg-purple-100 text-purple-800",
    APARTMENT: "bg-orange-100 text-orange-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

export const getTypeIcon = (type: AccommodationType): string => {
  const icons: Record<string, string> = {
    HOTEL: "🏨",
    INN: "🏠",
    RESORT: "🌴",
    APARTMENT: "🏢",
  };
  return icons[type] || "🏨";
};
