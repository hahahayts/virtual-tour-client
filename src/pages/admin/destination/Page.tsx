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
import type { DestinationSchema } from "@/schema/destination";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/db";
import { PageHeader } from "@/components/page-header";
import { ErrorPage } from "@/components/error-page";

import { DeleteButton } from "@/components/delete-btn";

const Destination = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => fetchData("destinations"),
  });

  if (isPending) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorPage name="destination" />;
  }

  return (
    <div className="p-6">
      <PageHeader name="Destination" url="destinations" />

      {!data || data.length === 0 ? (
        <div className="text-muted-foreground">
          No destinations yet. Click "Add Destination" to get started.
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.destinations.map(
                (destination: z.infer<typeof DestinationSchema>) => (
                  <TableRow key={destination.id}>
                    <TableCell>
                      {destination.imageUrl_1 ? (
                        <img
                          src={destination.imageUrl_1}
                          alt={destination.name}
                          className="w-16 h-16 object-cover rounded-md"
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
                      {destination.name}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={destination.description}>
                        {destination.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {destination.email && (
                          <div className="text-sm">
                            <span className="font-medium">Email:</span>{" "}
                            {destination.email}
                          </div>
                        )}
                        {destination.phone && (
                          <div className="text-sm">
                            <span className="font-medium">Phone:</span>{" "}
                            {destination.phone}
                          </div>
                        )}
                        {destination.address && (
                          <div className="text-sm">
                            <span className="font-medium">Address:</span>{" "}
                            {destination.address}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex  gap-2">
                        <Button variant={"link"} size={"sm"}>
                          <Link to={`/admin/destinations/${destination.id}`}>
                            View
                          </Link>
                        </Button>

                        {/* Delete Dialog */}
                        <DeleteButton
                          querykey="destinations"
                          id={destination.id}
                          url="destinations"
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

export default Destination;
