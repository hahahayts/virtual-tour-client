import type { DestinationSchema } from "@/schema/destination";
import type z from "zod";

export type MediaType = "photos" | "360" | "video";

export type Destination = z.infer<typeof DestinationSchema>;

export interface InfoPillProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface MediaControlButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface ImageGalleryItemProps {
  image: string;
  index: number;
  destinationName: string;
  isActive: boolean;
  onClick: () => void;
  priority?: boolean;
}

export interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export interface ShareButtonProps {
  destinationName: string;
  onShare: () => void;
}
