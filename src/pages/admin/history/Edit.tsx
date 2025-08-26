import Header from "@/components/form/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HistoryCreateSchema } from "@/schema/history";
import { useNavigate, useParams } from "react-router";
import { ErrorMessage } from "@/components/form/err-message";
import { LoadingBtn } from "@/components/form/loader-btn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchDataById, updateData } from "@/db";
import { toast } from "sonner";
import { DataFetching } from "@/components/fetch";
import { ErrorEdit, ErrorFetchingData } from "@/components/error-edit";
import { PreviewImages } from "@/components/preview-images";

const EditHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<z.infer<typeof HistoryCreateSchema>>({
    resolver: zodResolver(HistoryCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl_1: null,
      imageUrl_2: null,
      imageUrl_3: null,
    },
  });

  const imageUrls = watch(["imageUrl_1", "imageUrl_2", "imageUrl_3"]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["history", id],
    queryFn: () => fetchDataById(id, "history"),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: z.infer<typeof HistoryCreateSchema>) =>
      updateData(formData, id, "history"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["histories", id] });
      toast.success("History updated successfully", { richColors: true });
      navigate("/admin/history");
    },
    onError: (error) => {
      toast.error(`Error updating history: ${error.message}`, {
        richColors: true,
      });
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        description: data.description || "",
        imageUrl_1: data.imageUrl_1 || "",
        imageUrl_2: data.imageUrl_2 || "",
        imageUrl_3: data.imageUrl_3 || "",
      });
    }
  }, [data, reset]);

  if (isFetching) {
    return <DataFetching name="history" />;
  }

  if (error) {
    return <ErrorEdit name="history" />;
  }

  if (!data && !isFetching) {
    return <ErrorFetchingData name="History" url="histories" />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <Header
        title="Edit History"
        description="Edit the history entry below. Click save when you're done."
        backUrl="histories"
      />

      <form
        onSubmit={handleSubmit((formData) => mutate(formData))}
        className="space-y-6"
      >
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name *
              </Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="Enter history entry name"
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description *
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={(value = "") => field.onChange(value)}
                    height={300}
                  />
                )}
              />
              {errors.description && (
                <ErrorMessage message={errors.description.message} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Media Gallery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Camera className="h-5 w-5" />
              Media Gallery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Gallery Images</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="space-y-2">
                    <Label
                      htmlFor={`imageUrl_${num}`}
                      className="text-xs text-muted-foreground"
                    >
                      Image {num}
                    </Label>
                    <Input
                      {...register(
                        `imageUrl_${num}` as keyof typeof HistoryCreateSchema.shape
                      )}
                      id={`imageUrl_${num}`}
                      placeholder={`https://example.com/image-${num}.jpg`}
                    />
                    {errors[`imageUrl_${num}` as keyof typeof errors] && (
                      <ErrorMessage
                        message={
                          errors[`imageUrl_${num}` as keyof typeof errors]
                            ?.message
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <PreviewImages imageUrls={imageUrls} />
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t">
          <LoadingBtn isSubmitting={isPending} title="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default EditHistory;
