import type { AccomodationData } from "@/schema/accommodation";
import type { LandTransportationSchema } from "@/schema/land-transportation";
import type { RestaurantDataSchema } from "@/schema/restaurant";
import type { WaterTransportationDataSchema } from "@/schema/water-transportation";
import type z from "zod";

export type User = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => void;
};

export interface ProtectedRoutesTypes {
  user: User | null;
  redirectPath?: string;
  children: React.ReactNode;
}

export type RestaurantType = z.infer<typeof RestaurantDataSchema>;
export type WaterTranspoType = z.infer<typeof WaterTransportationDataSchema>;
export type LandTranspoType = z.infer<typeof LandTransportationSchema>;
export type AccommodationType = z.infer<typeof AccomodationData>;
