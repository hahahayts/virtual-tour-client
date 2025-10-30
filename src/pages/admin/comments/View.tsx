import { ErrorPage } from "@/components/error-page";
import { PageHeader } from "@/components/page-header";
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
import { fetchData } from "@/db";
import type { RatingSchema } from "@/schema/comment";
import { useQuery } from "@tanstack/react-query";

import type z from "zod";

export default function View() {
  const { data, isPending, error } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchData("ratings"),
  });

  if (isPending) return <TableSkeleton />;

  if (error) return <ErrorPage name="comments" />;

  return (
    <div className="p-6">
      <PageHeader name="Manage Comment" url="comments" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mac Address</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Destination ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.ratings.map((comment: z.infer<typeof RatingSchema>) => (
            <TableRow key={comment.id}>
              <TableCell>{comment.mac_address}</TableCell>
              <TableCell>{comment.comment}</TableCell>
              <TableCell>{comment.destinationId}</TableCell>
              <TableCell className="space-x-3">
                <Button variant={"outline"}>Accept</Button>
                <Button variant={"destructive"}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
