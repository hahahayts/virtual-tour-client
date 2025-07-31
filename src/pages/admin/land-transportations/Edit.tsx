import Header from "@/components/form/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, DollarSign, Phone, Camera } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateLandTransportationSchema } from "@/schema/land-transportation";
import { useNavigate, useParams } from "react-router";
import { LoadingBtn } from "@/components/form/loader-btn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDataById, updateData } from "@/db";
import { toast } from "sonner";
import { useEffect } from "react";
import { DataFetching } from "@/components/fetch";
import { ErrorEdit, ErrorFetchingData } from "@/components/error-edit";
import { PreviewImages } from "@/components/preview-images";

const EditLandTransportation = () => {
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
  } = useForm({
    resolver: zodResolver(CreateLandTransportationSchema),
    defaultValues: {
      name: "",
      description: "",
      vehicleType: null,
      capacity: null,
      operator: null,
      contactNumber: null,
      baseFee: null,
      feeDescription: null,
      imageUrl_1: null,
      imageUrl_2: null,
      imageUrl_3: null,
    },
  });
  const imageUrls = watch(["imageUrl_1", "imageUrl_2", "imageUrl_3"]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["land-transportation", id],
    queryFn: () => fetchDataById(id, "land-transportations"),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formatData: z.infer<typeof CreateLandTransportationSchema>) =>
      updateData(formatData, id, "land-transportations"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["land-transportations", id],
      });
      toast.success("Land Transportation updated successfully", {
        richColors: true,
      });
      navigate("/admin/land-transportations");
    },
    onError: () => {
      toast.error("Something went wrong", {
        richColors: true,
      });
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        description: data.description || "",
        vehicleType: data.vehicleType || null,
        capacity: data.capacity || null,
        operator: data.operator || null,
        contactNumber: data.contactNumber || null,
        baseFee: data.baseFee || null,
        feeDescription: data.feeDescription || null,
        imageUrl_1: data.imageUrl_1 || null,
        imageUrl_2: data.imageUrl_2 || null,
        imageUrl_3: data.imageUrl_3 || null,
      });
    }
  }, [data, reset]);

  if (isFetching) {
    return <DataFetching name="land transportation" />;
  }

  if (error) {
    return <ErrorEdit name="land transportation" />;
  }

  if (!data && !isFetching) {
    return (
      <ErrorFetchingData
        name="Land Transportation"
        url="land-transportations"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <Header
        title="Edit Land Transportation"
        description="Edit land transportation details here. Click save when you're done."
        backUrl="land-transportations"
      />

      <form
        onSubmit={handleSubmit((formatData) => mutate(formatData))}
        className="space-y-6"
      >
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Truck className="h-5 w-5" />
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
                placeholder="Enter transportation name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <MDEditor
                    value={field.value || ""}
                    onChange={(value = "") => field.onChange(value)}
                    height={300}
                  />
                )}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Truck className="h-5 w-5" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleType" className="text-sm font-medium">
                  Vehicle Type
                </Label>
                <Input
                  {...register("vehicleType")}
                  id="vehicleType"
                  placeholder="e.g., Bus, Van, Jeepney"
                />
                {errors.vehicleType && (
                  <p className="text-sm text-red-500">
                    {errors.vehicleType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity" className="text-sm font-medium">
                  Passenger Capacity
                </Label>
                <Input
                  {...register("capacity", { valueAsNumber: true })}
                  type="number"
                  id="capacity"
                  min="0"
                />
                {errors.capacity && (
                  <p className="text-sm text-red-500">
                    {errors.capacity.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operator Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5" />
              Operator Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="operator" className="text-sm font-medium">
                Operator
              </Label>
              <Input
                {...register("operator")}
                id="operator"
                placeholder="Enter operator name"
              />
              {errors.operator && (
                <p className="text-sm text-red-500">
                  {errors.operator.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-sm font-medium">
                Contact Number
              </Label>
              <Input
                {...register("contactNumber")}
                id="contactNumber"
                placeholder="e.g., +63 912 345 6789"
              />
              {errors.contactNumber && (
                <p className="text-sm text-red-500">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5" />
              Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="baseFee" className="text-sm font-medium">
                  Base Fee
                </Label>
                <Input
                  {...register("baseFee", { valueAsNumber: true })}
                  type="number"
                  id="baseFee"
                  min="0"
                  step="0.01"
                />
                {errors.baseFee && (
                  <p className="text-sm text-red-500">
                    {errors.baseFee.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="feeDescription" className="text-sm font-medium">
                  Fee Description
                </Label>
                <Input
                  {...register("feeDescription")}
                  id="feeDescription"
                  placeholder="Additional fee information"
                />
                {errors.feeDescription && (
                  <p className="text-sm text-red-500">
                    {errors.feeDescription.message}
                  </p>
                )}
              </div>
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
                        `imageUrl_${num}` as keyof typeof CreateLandTransportationSchema.shape
                      )}
                      id={`imageUrl_${num}`}
                      placeholder={`https://example.com/image-${num}.jpg`}
                    />
                    {errors[`imageUrl_${num}` as keyof typeof errors] && (
                      <p className="text-sm text-red-500">
                        {
                          errors[`imageUrl_${num}` as keyof typeof errors]
                            ?.message
                        }
                      </p>
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

export default EditLandTransportation;
