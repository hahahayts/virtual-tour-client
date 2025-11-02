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
import type { UserDataSchema } from "@/schema/user";

const Users = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchData("users"),
  });

  if (isPending) {
    return <TableSkeleton />;
  }

  if (error) {
    return <ErrorPage name="users" />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Users Management</h1>
      </div>

      {!data || data.length === 0 ? (
        <div className="text-muted-foreground">
          No users yet. Click "Add New User" to get started.
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.users.map((user: z.infer<typeof UserDataSchema>) => (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name || "N/A"}</TableCell>
                  <TableCell>{user.last_name || "N/A"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {user.updated_at
                      ? new Date(user.updated_at).toLocaleString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant={"link"} size={"sm"}>
                        <Link to={`/admin/users/${user.id}`}>View</Link>
                      </Button>
                      <DeleteButton querykey="users" id={user.id} url="users" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Users;
