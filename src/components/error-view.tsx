import type { ViewProps } from "@/schema/props";
import { Link } from "react-router";

export const ErrorView = ({ name, url }: ViewProps) => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-destructive mb-2">
          Error Loading {name} View Page
        </h2>
        <p className="text-muted-foreground mb-4">
          Could not load {name} details.
        </p>
        <Link to={`/admin/${url}`} className="text-primary hover:underline">
          ← Back to {name}
        </Link>
      </div>
    </div>
  );
};
