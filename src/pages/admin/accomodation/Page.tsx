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
import type { AccomodationData } from "@/schema/accommodation";
import { ErrorPage } from "@/components/error-page";
import { DeleteButton } from "@/components/delete-btn";

const Accommodation = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["accommodations"],
    queryFn: () => fetchData("accommodations"),
  });

  if (isPending) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorPage name="accommodation" />;
  }

  return (
    <div className="p-6">
      <PageHeader name="Accommodation" url="accommodations" />

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
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.accommodations.map(
                (accommodation: z.infer<typeof AccomodationData>) => (
                  <TableRow key={accommodation.id}>
                    <TableCell>
                      {accommodation.imageUrl_1 ? (
                        <img
                          src={accommodation.imageUrl_1}
                          alt={accommodation.name}
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
                      {accommodation.name}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div
                        className="truncate"
                        title={accommodation.description}
                      >
                        {accommodation.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {accommodation.email && (
                          <div className="text-sm">
                            <span className="font-medium">Email:</span>{" "}
                            {accommodation.email}
                          </div>
                        )}
                        {accommodation.phone && (
                          <div className="text-sm">
                            <span className="font-medium">Phone:</span>{" "}
                            {accommodation.phone}
                          </div>
                        )}
                        {accommodation.address && (
                          <div className="text-sm">
                            <span className="font-medium">Address:</span>{" "}
                            {accommodation.address}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">
                          {accommodation.type}
                        </span>{" "}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex  gap-2">
                        <Button variant={"link"} size={"sm"}>
                          <Link
                            to={`/admin/accommodations/${accommodation.id}`}
                          >
                            View
                          </Link>
                        </Button>

                        <DeleteButton
                          querykey="accommodations"
                          id={accommodation.id}
                          url="accommodations"
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

export default Accommodation;
