export interface RestaurantData {
  name: string;
  cuisineType: string;
  address?: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  hours?: string;
  facebook?: string;
  instagram?: string;
  imageUrl_1?: string;
  imageUrl_2?: string;
  imageUrl_3?: string;
  imageUrl_4?: string;
  imageUrl_5?: string;
  menuUrl?: string;
  hasWifi?: boolean;
  hasOutdoorSeating?: boolean;
  hasAlcohol?: boolean;
  hasCoffee?: boolean;
  dietaryOptions?: string[];
}

export const getCuisineColor = (cuisine: string) => {
  const colors: Record<string, string> = {
    ITALIAN: "bg-green-100 text-green-800",
    MEXICAN: "bg-red-100 text-red-800",
    JAPANESE: "bg-blue-100 text-blue-800",
    CHINESE: "bg-yellow-100 text-yellow-800",
    INDIAN: "bg-orange-100 text-orange-800",
    AMERICAN: "bg-purple-100 text-purple-800",
  };
  return colors[cuisine] || "bg-gray-100 text-gray-800";
};

export const getCuisineIcon = (cuisine: string) => {
  const icons: Record<string, string> = {
    ITALIAN: "🍝",
    MEXICAN: "🌮",
    JAPANESE: "🍣",
    CHINESE: "🥡",
    INDIAN: "🍛",
    AMERICAN: "🍔",
  };
  return icons[cuisine] || "🍴";
};
