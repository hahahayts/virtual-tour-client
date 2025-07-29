import { useState } from "react";
import { deleteDataById } from "@/db";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  querykey: string;
  id: string;
  url: string;
}

export const DeleteButton = ({ querykey, id, url }: Props) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteDataById(id, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [querykey] });
      toast.success("Item deleted successfully", {
        richColors: true,
      });

      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p>Are you sure you want to delete this item?</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
