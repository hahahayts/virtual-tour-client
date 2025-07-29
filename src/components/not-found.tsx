import type { ViewProps } from "@/schema/props";
import { Link } from "react-router";

export const NotFoundView = ({ name, url }: ViewProps) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{name}Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The destination you're looking for doesn't exist.
        </p>
        <Link to={`/admin/${url}`} className="text-primary hover:underline">
          ← Back to {name}
        </Link>
      </div>
    </div>
  );
};
