import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ErrorPage } from "@/components/error-page";
import { TableSkeleton } from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { DeleteButton } from "@/components/delete-btn";
import { API_BASE } from "@/constant";

/* 🧩 Destination Type */
interface Destination {
  id: string;
  name: string;
  imageUrl_1: string | null;
  imageUrl_2?: string | null;
  imageUrl_3?: string | null;
  address?: string | null;
}

/* 💬 Rating Type */
interface Rating {
  id: string;
  score: number;
  comment: string;
  mac_address: string;
  is_display: boolean;
  destinationId: string;
  createdAt: string;
  updatedAt: string;
  destination?: Destination | null;
}

/* 📦 API Response Type */
interface RatingsResponse {
  ratings: Rating[];
}

export default function View() {
  const queryClient = useQueryClient();

  // ✅ Fetch ratings using Axios
  const { data, isLoading, error } = useQuery<RatingsResponse>({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/ratings`);
      return res.data;
    },
  });

  // ✅ Approve comment (PATCH)
  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.patch(`${API_BASE}/ratings/${id}/display`);
    },
    onSuccess: () => {
      toast.success("Comment approved successfully!", { richColors: true });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["public-comments"] });
    },
    onError: () => {
      toast.error("Failed to approve comment. Please try again.", {
        richColors: true,
      });
    },
  });

  // ✅ Delete comment (DELETE)
  // const deleteMutation = useMutation({
  //   mutationFn: async (id: string) => {
  //     const res = await axios.delete(`http://localhost:3000/api/ratings/${id}`);
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     toast.success("Comment deleted successfully!", { richColors: true });
  //     queryClient.invalidateQueries({ queryKey: ["comments"] });
  //     queryClient.invalidateQueries({ queryKey: ["public-comments"] });
  //   },
  //   onError: () => {
  //     toast.error("Failed to delete comment.", { richColors: true });
  //   },
  // });

  if (isLoading) return <TableSkeleton />;
  if (error) return <ErrorPage name="comments" />;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manage Comments</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mac Address</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.ratings?.map((comment) => (
            <TableRow key={comment.id}>
              {/* 🧩 Mac Address */}
              <TableCell>{comment.mac_address || "—"}</TableCell>

              {/* ⭐ Rating stars */}
              <TableCell>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= comment.score
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </TableCell>

              {/* 💬 Comment (Expandable) */}
              <TableCell className="max-w-[250px]">
                <ExpandableComment text={comment.comment} />
              </TableCell>

              {/* 🖼 Destination image + name */}
              <TableCell>
                {comment.destination?.imageUrl_1 ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={comment.destination.imageUrl_1}
                      alt={comment.destination.name}
                      className="w-16 h-16 object-cover rounded-lg border mb-1"
                    />
                    <span className="text-sm text-gray-600 font-medium text-center">
                      {comment.destination.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 italic text-sm">No image</span>
                )}
              </TableCell>

              {/* ⚙️ Actions */}
              <TableCell className="space-x-3">
                <Button
                  variant="outline"
                  disabled={comment.is_display || approveMutation.isPending}
                  onClick={() => approveMutation.mutate(comment.id)}
                >
                  {comment.is_display ? "Approved" : "Accept"}
                </Button>
                {/* <Button
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(comment.id)}
                >
                  Delete
                </Button> */}

                <DeleteButton
                  querykey="comments"
                  url="ratings"
                  id={comment.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* 🔽 Expandable Comment Component */
function ExpandableComment({ text = "" }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  if (text.length <= 60) return <span>{text}</span>;
  return (
    <span>
      {expanded ? text : text.slice(0, 60) + "... "}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-500 text-sm"
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </span>
  );
}
