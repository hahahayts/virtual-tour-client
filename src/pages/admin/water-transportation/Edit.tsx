import Header from "@/components/form/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Ship,
  DollarSign,
  Clock,
  Calendar,
  Camera,
  FileText,
  RefreshCw,
  Shield,
} from "lucide-react";

import MDEditor from "@uiw/react-md-editor";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { WaterTransportationSchema } from "@/schema/water-transportation";

import { useNavigate, useParams } from "react-router";
import { LoadingBtn } from "@/components/form/loader-btn";
import { daysOfWeek } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDataById, updateData } from "@/db";
import { toast } from "sonner";
import { useEffect } from "react";
import { DataFetching } from "@/components/fetch";
import { ErrorEdit, ErrorFetchingData } from "@/components/error-edit";
import { PreviewImages } from "@/components/preview-images";

const EditWaterTransportation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(WaterTransportationSchema),
    defaultValues: {
      name: "",
      description: "",
      expected_fee: 0,
      departure_days: [],
      departure_time: "",
      guidelines_and_policies: "",
      rebooking_supercharges: "",
      refund_policy: "",
      duration: null,
      imageUrl_1: null,
      imageUrl_2: null,
      imageUrl_3: null,
    },
  });

  const imageUrls = watch(["imageUrl_1", "imageUrl_2", "imageUrl_3"]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["water-transportation", id],
    queryFn: () => fetchDataById(id, "water-transportations"),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formatData: z.infer<typeof WaterTransportationSchema>) =>
      updateData(formatData, id, "water-transportations"),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["water-transportations", id],
      });
      toast.success("Water Transportation updated successfully", {
        richColors: true,
      });
      navigate("/admin/water-transportations");
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        description: data.description || "",
        expected_fee: data.expected_fee || 0,
        departure_days: data.departure_days || [],
        departure_time: data.departure_time || "",
        guidelines_and_policies: data.guidelines_and_policies || "",
        rebooking_supercharges: data.rebooking_supercharges || "",
        refund_policy: data.refund_policy || "",
        duration: data.duration || null,
        imageUrl_1: data.imageUrl_1 || null,
        imageUrl_2: data.imageUrl_2 || null,
        imageUrl_3: data.imageUrl_3 || null,
      });
    }
  }, [data, reset]);

  const selectedDays = watch("departure_days") || [];

  const handleDayChange = (day: string, checked: boolean | string) => {
    const currentDays = selectedDays;
    if (checked) {
      setValue("departure_days", [...currentDays, day]);
    } else {
      setValue(
        "departure_days",
        currentDays.filter((d) => d !== day)
      );
    }
  };

  if (isFetching) {
    return <DataFetching name="water transportation" />;
  }

  // Handle error state
  if (error) {
    return <ErrorEdit name="water transportation" />;
  }

  // Handle case where destination is not found
  if (!data && !isFetching) {
    return (
      <ErrorFetchingData
        name="Water Transportation"
        url="water-transportations"
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <Header
        title="Edit Water Transportation"
        description="Edit water transportation details here. Click save when you're done."
        backUrl="water-transportations"
      />

      <form
        onSubmit={handleSubmit((formatData) => mutate(formatData))}
        className="space-y-6"
      >
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Ship className="h-5 w-5" />
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
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Schedule & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Expected Fee *
              </Label>
              <Input
                {...register("expected_fee", {
                  setValueAs: (value) => (value === "" ? 0 : Number(value)),
                })}
                type="number"
                id="expected_fee"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.expected_fee && (
                <p className="text-sm text-red-500">
                  {errors.expected_fee.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Departure Days *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={selectedDays.includes(day)}
                      onCheckedChange={(checked) =>
                        handleDayChange(day, checked)
                      }
                    />
                    <Label
                      htmlFor={day}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.departure_days && (
                <p className="text-sm text-red-500">
                  {errors.departure_days.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Departure Time *
              </Label>
              <Controller
                name="departure_time"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={(value = "") => field.onChange(value)}
                    height={200}
                    data-color-mode="light"
                  />
                )}
              />
              {errors.departure_time && (
                <p className="text-sm text-red-500">
                  {errors.departure_time.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Duration (minutes)
              </Label>
              <Input
                {...register("duration", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
                type="number"
                id="duration"
                placeholder="Enter duration in minutes"
                min="0"
              />
              {errors.duration && (
                <p className="text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Policies & Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              Policies & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Guidelines and Policies
              </Label>
              <Controller
                name="guidelines_and_policies"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={(value = "") => field.onChange(value)}
                    height={250}
                    data-color-mode="light"
                  />
                )}
              />
              {errors.guidelines_and_policies && (
                <p className="text-sm text-red-500">
                  {errors.guidelines_and_policies.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Rebooking Supercharges
              </Label>
              <Controller
                name="rebooking_supercharges"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={(value = "") => field.onChange(value)}
                    height={250}
                    data-color-mode="light"
                  />
                )}
              />
              {errors.rebooking_supercharges && (
                <p className="text-sm text-red-500">
                  {errors.rebooking_supercharges.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Refund Policy
              </Label>
              <Controller
                name="refund_policy"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={(value = "") => field.onChange(value)}
                    height={250}
                    data-color-mode="light"
                  />
                )}
              />
              {errors.refund_policy && (
                <p className="text-sm text-red-500">
                  {errors.refund_policy.message}
                </p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        `imageUrl_${num}` as keyof typeof WaterTransportationSchema.shape
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

export default EditWaterTransportation;
