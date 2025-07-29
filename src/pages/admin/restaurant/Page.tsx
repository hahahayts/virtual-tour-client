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
import type { RestaurantDataSchema } from "@/schema/restaurant";
import { ErrorPage } from "@/components/error-page";
import { DeleteButton } from "@/components/delete-btn";

const Restaurant = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchData("restaurants"),
  });

  if (isPending) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorPage name="restaurant" />;
  }

  return (
    <div className="p-6">
      <PageHeader name="Restaurant" url="restaurants" />

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
              {data.restaurants.map(
                (restaurant: z.infer<typeof RestaurantDataSchema>) => (
                  <TableRow key={restaurant.id}>
                    <TableCell>
                      {restaurant.imageUrl_1 ? (
                        <img
                          src={restaurant.imageUrl_1}
                          alt={restaurant.name}
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
                      {restaurant.name}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={restaurant.description}>
                        {restaurant.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {restaurant.email && (
                          <div className="text-sm">
                            <span className="font-medium">Email:</span>{" "}
                            {restaurant.email}
                          </div>
                        )}
                        {restaurant.phone && (
                          <div className="text-sm">
                            <span className="font-medium">Phone:</span>{" "}
                            {restaurant.phone}
                          </div>
                        )}
                        {restaurant.address && (
                          <div className="text-sm">
                            <span className="font-medium">Address:</span>{" "}
                            {restaurant.address}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex  gap-2">
                        <Button variant={"link"} size={"sm"}>
                          <Link to={`/admin/restaurants/${restaurant.id}`}>
                            View
                          </Link>
                        </Button>

                        <DeleteButton
                          querykey="restaurants"
                          id={restaurant.id}
                          url="restaurants"
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

export default Restaurant;
