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
import type { WaterTransportationDataSchema } from "@/schema/water-transportation";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/db";
import { PageHeader } from "@/components/page-header";
import { formatCurrency } from "@/lib/currency";
import { formatDepartureDays } from "@/lib/date-formatter";
import { ErrorPage } from "@/components/error-page";

const WaterTransportation = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["water-transportations"],
    queryFn: () => fetchData("water-transportations"),
  });

  if (isPending) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorPage name="water-transportation" />;
  }

  return (
    <div className="p-6">
      <PageHeader name="Water Transportation" url="water-transportations" />

      {!data || data.length === 0 ? (
        <div className="text-muted-foreground">
          No water transportations yet. Click "Add New Water Transportation" to
          get started.
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.waterTransportations.map(
                (
                  transportation: z.infer<typeof WaterTransportationDataSchema>
                ) => (
                  <TableRow key={transportation.id}>
                    <TableCell>
                      {transportation.imageUrl_1 ? (
                        <img
                          src={transportation.imageUrl_1}
                          alt={transportation.name}
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
                      {transportation.name}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div
                        className="truncate"
                        title={transportation.description}
                      >
                        {transportation.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">
                        {formatCurrency(transportation.expected_fee)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">Days:</span>{" "}
                          <span
                            title={transportation.departure_days?.join(", ")}
                          >
                            {formatDepartureDays(transportation.departure_days)}
                          </span>
                        </div>
                        <div className="truncate">
                          <span className="font-medium">Time:</span>{" "}
                          {transportation.departure_time && (
                            <span title={transportation.departure_time}>
                              {transportation.departure_time.split("\n")[0]}...
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant={"link"} size={"sm"}>
                          <Link
                            to={`/admin/water-transportations/${transportation.id}`}
                          >
                            View
                          </Link>
                        </Button>

                        <Button variant={"destructive"} size={"sm"}>
                          Delete
                        </Button>
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

export default WaterTransportation;
