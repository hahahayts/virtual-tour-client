import { API_BASE } from "@/constant";
import type { AccommodationSchema } from "@/schema/accommodation";
import type { destinationSchema } from "@/schema/destination";
import type { CreateLandTransportationSchema } from "@/schema/land-transportation";
import type { RestaurantSchema } from "@/schema/restaurant";
import type { WaterTransportationSchema } from "@/schema/water-transportation";
import axios from "axios";
import type z from "zod";

type FormData =
  | z.infer<typeof destinationSchema>
  | z.infer<typeof AccommodationSchema>
  | z.infer<typeof RestaurantSchema>
  | z.infer<typeof WaterTransportationSchema>
  | z.infer<typeof CreateLandTransportationSchema>;

export const fetchData = async (url: string) => {
  const { data } = await axios.get(`${API_BASE}/${url}`);

  return data;
};

export const fetchDataById = async (id: string | undefined, url: string) => {
  const { data } = await axios.get(`${API_BASE}/${url}/${id}`);

  return data;
};

export const updateData = async (
  formData: FormData,
  id: string | undefined,
  url: string
) => {
  console.log(id);
  const data = await axios.patch(`${API_BASE}/${url}/${id}`, formData);

  return data;
};

export const deleteDataById = async (id: string | undefined, url: string) => {
  const { data } = await axios.delete(`${API_BASE}/${url}/${id}`);

  return data;
};
