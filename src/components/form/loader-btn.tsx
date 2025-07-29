import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  isSubmitting: boolean;
  title: string;
}

export const LoadingBtn = ({ isSubmitting, title }: Props) => {
  return (
    <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <span>{title}</span>
      )}
    </Button>
  );
};
