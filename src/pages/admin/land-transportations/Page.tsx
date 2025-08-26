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
import { Button } from "@/components/ui/button";
import { fetchData } from "@/db";
import { PageHeader } from "@/components/page-header";
import { formatCurrency } from "@/lib/currency";
import { ErrorPage } from "@/components/error-page";
import type z from "zod";
import type { LandTransportationSchema } from "@/schema/land-transportation";
import { DeleteButton } from "@/components/delete-btn";

const LandTransportation = () => {
  const {
    data,
    isPending,

    isError,
  } = useQuery({
    queryKey: ["land-transportations"],
    queryFn: () => fetchData("land-transportations"),
  });

  if (isPending) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <ErrorPage name="land-transportation" />;
  }

  const transportations = data?.landTransportations || [];

  return (
    <div className="p-6 space-y-4">
      <PageHeader name="Land Transportation" url="land-transportations" />

      {transportations.length === 0 ? (
        <div className="text-muted-foreground text-center py-8">
          No land transportations yet. Click "Add New Land Transportation" to
          get started.
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transportations.map(
                (transportation: z.infer<typeof LandTransportationSchema>) => (
                  <TableRow key={transportation.id}>
                    <TableCell>
                      {transportation.imageUrl_1 ? (
                        <img
                          src={transportation.imageUrl_1}
                          alt={`Image of ${transportation.name}`}
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
                      {transportation.name}
                    </TableCell>
                    <TableCell>{transportation.vehicleType || "-"}</TableCell>
                    <TableCell>
                      {transportation.capacity
                        ? `${transportation.capacity} persons`
                        : "1 person"}
                    </TableCell>
                    <TableCell>{transportation.operator || "-"}</TableCell>
                    <TableCell>{transportation.contactNumber || "-"}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-green-600">
                          {transportation.baseFee
                            ? formatCurrency(transportation.baseFee)
                            : "-"}
                        </div>
                        {transportation.feeDescription && (
                          <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {transportation.feeDescription}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button asChild variant="link" size="sm">
                          <Link
                            to={`/admin/land-transportations/${transportation.id}`}
                          >
                            View
                          </Link>
                        </Button>
                        <DeleteButton
                          querykey="land-transportations"
                          id={transportation.id}
                          url="land-transportations"
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

export default LandTransportation;
