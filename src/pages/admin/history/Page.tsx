import { TableSkeleton } from "@/components/table-skeleton";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/db";
import { PageHeader } from "@/components/page-header";
import { ErrorPage } from "@/components/error-page";
import { DeleteButton } from "@/components/delete-btn";
import type { HistoryDataSchema } from "@/schema/history";

const History = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["histories"],
    queryFn: () => fetchData("history"),
  });

  if (isPending) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorPage name="history" />;
  }

  return (
    <div className="p-6">
      <PageHeader name="Historie" url="history" />

      {!data || data.length === 0 ? (
        <div className="text-muted-foreground">
          No history entries yet. Click "Add History" to get started.
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.histories.map(
                (history: z.infer<typeof HistoryDataSchema>) => (
                  <TableRow key={history.id}>
                    <TableCell>
                      {history.imageUrl_1 ? (
                        <img
                          src={history.imageUrl_1}
                          alt={history.name}
                          className="w-16 h-16 object-cover rounded-md"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            No image
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {history.name}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={history.description}>
                        {history.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      {history.createdAt
                        ? new Date(history.createdAt).toLocaleString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {history.updatedAt
                        ? new Date(history.updatedAt).toLocaleString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant={"link"} size={"sm"}>
                          <Link to={`/admin/history/${history.id}`}>View</Link>
                        </Button>
                        <DeleteButton
                          querykey="histories"
                          id={history.id}
                          url="history"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default History;
