import { Link } from "react-router";

export const ErrorEdit = ({ name }: { name: string }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading {name}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export const ErrorFetchingData = ({
  name,
  url,
}: {
  name: string;
  url: string;
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{name} not found</p>
          <Link
            to={`/admin/${url}`}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Back to {name}
          </Link>
        </div>
      </div>
    </div>
  );
};
