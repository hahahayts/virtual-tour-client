import type { ViewProps } from "@/schema/props";
import { Link } from "react-router";

export const PageHeader = ({ name, url }: ViewProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <Link
        to={`/admin/${url}/create`}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Add New {name}
      </Link>
    </div>
  );
};
