import Header from "@/components/form/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { ErrorMessage } from "@/components/form/err-message";
import { LoadingBtn } from "@/components/form/loader-btn";
import { useState } from "react";
import { handleSubmitForm } from "@/lib/handle-submit";
import { PreviewImages } from "@/components/preview-images";
import { HistoryCreateSchema } from "@/schema/history";

const Create = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
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

  const onSubmit = async (data: z.infer<typeof HistoryCreateSchema>) => {
    console.log("Data: ", data);

    handleSubmitForm({
      data,
      name: "History",
      url: "history",
      setIsSubmitting,
      navigate,
      reset,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <Header
        title="Add New Cultural and Heritage"
        description="Add new cultural and heritage entry here. Click save when you're done."
        backUrl="history"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                defaultValue=""
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
          <LoadingBtn isSubmitting={isSubmitting} title="Save History" />
        </div>
      </form>
    </div>
  );
};

export default Create;
