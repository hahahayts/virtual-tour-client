import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

interface Props {
  name: string;
  itemName: string;
  id: string;
  url: string;
}

export const ViewPageHeader = ({ name, id, url, itemName }: Props) => {
  return (
    <div className="mb-8">
      <Link
        to={`/admin/${url}`}
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to {itemName}s
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="capitalize ext-3xl font-bold mb-2">{name}</h1>
          <p className="text-muted-foreground">ID: {id}</p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/admin/${url}/${id}/edit`}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Edit {itemName}
          </Link>
        </div>
      </div>
    </div>
  );
};
