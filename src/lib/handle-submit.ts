import { API_BASE } from "@/constant";
import type { AccommodationSchema } from "@/schema/accommodation";
import type { destinationSchema } from "@/schema/destination";
import type { RestaurantSchema } from "@/schema/restaurant";
import { toast } from "sonner";
import type z from "zod";
import { dateFormatter } from "./date-formatter";
import axios from "axios";
import type { NavigateFunction } from "react-router";
import type { WaterTransportationSchema } from "@/schema/water-transportation";
import type { CreateLandTransportationSchema } from "@/schema/land-transportation";

interface Args {
  data: z.infer<
    | typeof destinationSchema
    | typeof AccommodationSchema
    | typeof RestaurantSchema
    | typeof WaterTransportationSchema
    | typeof CreateLandTransportationSchema
  >;
  name: string;
  url: string;
  setIsSubmitting: (bool: boolean) => void;
  navigate: NavigateFunction;
  reset: () => void;
}

export async function handleSubmitForm({
  data,
  name,
  url,
  setIsSubmitting,
  navigate,
  reset,
}: Args) {
  try {
    console.log("Data", data);
    await axios.post(`${API_BASE}/${url}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTimeout(() => {
      navigate(`/admin/${url}`);
    }, 1000);
    toast.success(`${name} created successfully`, {
      description: dateFormatter(new Date()),
      richColors: true,
      duration: 2500,
      position: "top-center",
    });
    reset();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error("Creation failed", {
        description: error.response?.data?.message || "Please try again later.",
        richColors: true,
      });
    } else {
      toast.error("An unexpected error occurred.", {
        richColors: true,
      });
    }

    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
}
