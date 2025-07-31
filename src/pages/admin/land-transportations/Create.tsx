import Header from "@/components/form/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, DollarSign, Image as ImageIcon, User } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { ErrorMessage } from "@/components/form/err-message";
import { LoadingBtn } from "@/components/form/loader-btn";
import { useState } from "react";
import { handleSubmitForm } from "@/lib/handle-submit";
import { CreateLandTransportationSchema } from "@/schema/land-transportation";
import { PreviewImages } from "@/components/preview-images";

type CreateLandTransportationFormData = z.infer<
  typeof CreateLandTransportationSchema
>;

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
  } = useForm<CreateLandTransportationFormData>({
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

  const onSubmit = async (data: CreateLandTransportationFormData) => {
    await handleSubmitForm({
      data,
      name: "Land Transportation",
      url: "land-transportations",
      setIsSubmitting,
      navigate,
      reset,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <Header
        title="Add New Land Transportation"
        description="Add new land transportation service. Click save when you're done."
        backUrl="land-transportations"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="Enter transportation name"
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Input
                  {...register("vehicleType")}
                  id="vehicleType"
                  placeholder="e.g., Bus, Van, Jeepney"
                />
                {errors.vehicleType && (
                  <ErrorMessage message={errors.vehicleType.message} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Passenger Capacity</Label>
                <Input
                  {...register("capacity", { valueAsNumber: true })}
                  type="number"
                  id="capacity"
                  min="0"
                />
                {errors.capacity && (
                  <ErrorMessage message={errors.capacity.message} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operator Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5" />
              Operator Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="operator">Operator</Label>
              <Input
                {...register("operator")}
                id="operator"
                placeholder="Enter operator name"
              />
              {errors.operator && (
                <ErrorMessage message={errors.operator.message} />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                {...register("contactNumber")}
                id="contactNumber"
                placeholder="e.g., +63 912 345 6789"
              />
              {errors.contactNumber && (
                <ErrorMessage message={errors.contactNumber.message} />
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
                <Label htmlFor="baseFee">Base Fee</Label>
                <Input
                  {...register("baseFee", { valueAsNumber: true })}
                  type="number"
                  id="baseFee"
                  min="0"
                  step="0.01"
                />
                {errors.baseFee && (
                  <ErrorMessage message={errors.baseFee.message} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="feeDescription">Fee Description</Label>
                <Input
                  {...register("feeDescription")}
                  id="feeDescription"
                  placeholder="Additional fee information"
                />
                {errors.feeDescription && (
                  <ErrorMessage message={errors.feeDescription.message} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ImageIcon className="h-5 w-5" />
              Media
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="space-y-2">
                  <Label htmlFor={`imageUrl_${num}`}>Image {num} URL</Label>
                  <Input
                    {...register(
                      `imageUrl_${num}` as keyof typeof CreateLandTransportationSchema.shape
                    )}
                    id={`imageUrl_${num}`}
                    placeholder={`https://example.com/image${num}.jpg`}
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
            <PreviewImages imageUrls={imageUrls} />
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t">
          <LoadingBtn isSubmitting={isSubmitting} title="Save Transportation" />
        </div>
      </form>
    </div>
  );
};

export default Create;
