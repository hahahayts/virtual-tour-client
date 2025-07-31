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

import { useNavigate } from "react-router";
import { useState } from "react";
import { LoadingBtn } from "@/components/form/loader-btn";
import { handleSubmitForm } from "@/lib/handle-submit";
import { PreviewImages } from "@/components/preview-images";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Create = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
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

  const onSubmit = async (data: z.infer<typeof WaterTransportationSchema>) => {
    console.log("Data: ", data);

    handleSubmitForm({
      data,
      name: "Water Transportation",
      url: "water-transportations",
      setIsSubmitting,
      navigate,
      reset,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <Header
        title="Add New Water Transportation"
        description="Add new water transportation here. Click save when you're done."
        backUrl="water-transportations"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <LoadingBtn isSubmitting={isSubmitting} title="Save Transportation" />
        </div>
      </form>
    </div>
  );
};

export default Create;
