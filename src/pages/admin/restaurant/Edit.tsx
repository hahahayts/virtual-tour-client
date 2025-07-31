import Header from "@/components/form/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Camera,
  Video,
} from "lucide-react";

import MDEditor from "@uiw/react-md-editor";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RestaurantSchema } from "@/schema/restaurant";
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

const EditRestaurant = () => {
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
    resolver: zodResolver(RestaurantSchema),
    defaultValues: {
      name: "",
      description: "",
      address: null,
      latitude: null,
      longitude: null,
      email: null,
      phone: null,
      website: null,
      facebook: null,
      three_sixty_imageUrl: null,
      imageUrl_1: null,
      imageUrl_2: null,
      imageUrl_3: null,
      imageUrl_4: null,
      imageUrl_5: null,
      videoUrl: null,
    },
  });

  const imageUrls = watch([
    "imageUrl_1",
    "imageUrl_2",
    "imageUrl_3",
    "imageUrl_4",
    "imageUrl_5",
  ]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => fetchDataById(id, "restaurants"),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formatData: z.infer<typeof RestaurantSchema>) =>
      updateData(formatData, id, "restaurants"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants", id] });
      toast.success("Restaurant updated successfully", { richColors: true });
      navigate("/admin/restaurants");
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        description: data.description || "",
        address: data.address || "",
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        email: data.email || "",
        phone: data.phone || "",
        website: data.website || "",
        facebook: data.facebook || "",
        three_sixty_imageUrl: data.three_sixty_imageUrl || "",
        imageUrl_1: data.imageUrl_1 || "",
        imageUrl_2: data.imageUrl_2 || "",
        imageUrl_3: data.imageUrl_3 || "",
        imageUrl_4: data.imageUrl_4 || "",
        imageUrl_5: data.imageUrl_5 || "",
        videoUrl: data.videoUrl || "",
      });
    }
  }, [data, reset]);

  if (isFetching) {
    return <DataFetching name="restaurant" />;
  }

  // Handle error state
  if (error) {
    return <ErrorEdit name="restaurant" />;
  }

  // Handle case where destination is not found
  if (!data && !isFetching) {
    return <ErrorFetchingData name="Restaurant" url="restaurants" />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <Header
        title="Add New Restaurant"
        description="Add new restaurant here. Click save when you're done."
        backUrl="restaurants"
      />

      <form
        onSubmit={handleSubmit((formData) => mutate(formData))}
        className="space-y-6"
      >
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
              <Label htmlFor="name" className="text-sm font-medium">
                Name *
              </Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="Enter restaurant name"
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

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5" />
              Location Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Address
              </Label>
              <Input
                {...register("address")}
                id="address"
                placeholder="Enter full address"
              />
              {errors.address && (
                <ErrorMessage message={errors.address.message} />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-sm font-medium">
                  Latitude
                </Label>
                <Input
                  {...register("latitude", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  type="number"
                  id="latitude"
                  placeholder="e.g., 14.5995"
                  step="0.000001"
                />
                {errors.latitude && (
                  <ErrorMessage message={errors.latitude.message} />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude" className="text-sm font-medium">
                  Longitude *
                </Label>
                <Input
                  {...register("longitude", {
                    setValueAs: (value) =>
                      value === "" ? null : Number(value),
                  })}
                  type="number"
                  id="longitude"
                  placeholder="e.g., 120.9842"
                  min="-180"
                  max="180"
                  step="0.000001"
                />
                {errors.longitude && (
                  <ErrorMessage message={errors.longitude.message} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="contact@restaurant.com"
                />
                {errors.email && (
                  <ErrorMessage message={errors.email.message} />
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  {...register("phone")}
                  id="phone"
                  placeholder="+63 912 345 6789"
                />
                {errors.phone && (
                  <ErrorMessage message={errors.phone.message} />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="website"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  {...register("website")}
                  id="website"
                  placeholder="https://website.com"
                />
                {errors.website && (
                  <ErrorMessage message={errors.website.message} />
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="facebook"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Label>
                <Input
                  {...register("facebook")}
                  id="facebook"
                  placeholder="https://facebook.com/page"
                />
                {errors.facebook && (
                  <ErrorMessage message={errors.facebook.message} />
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
            <div className="space-y-2">
              <Label
                htmlFor="three_sixty_imageUrl"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                360° Image URL
              </Label>
              <Input
                {...register("three_sixty_imageUrl")}
                id="three_sixty_imageUrl"
                placeholder="https://example.com/360-image.jpg"
              />
              {errors.three_sixty_imageUrl && (
                <ErrorMessage message={errors.three_sixty_imageUrl.message} />
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="videoUrl"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Video className="h-4 w-4" />
                Video URL
              </Label>
              <Input
                {...register("videoUrl")}
                id="videoUrl"
                placeholder="https://example.com/video.mp4"
              />
              {errors.videoUrl && (
                <ErrorMessage message={errors.videoUrl.message} />
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Gallery Images</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="space-y-2">
                    <Label
                      htmlFor={`imageUrl_${num}`}
                      className="text-xs text-muted-foreground"
                    >
                      Image {num}
                    </Label>
                    <Input
                      {...register(
                        `imageUrl_${num}` as keyof typeof RestaurantSchema.shape
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
          {/* <Button type="submit">Save Restaurant</Button>
           */}
          <LoadingBtn isSubmitting={isPending} title="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default EditRestaurant;
