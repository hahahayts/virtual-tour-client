interface Props {
  availableImages: string[];
  currentImage: string | null;
  name: string;
  setCurrentImage: (imageUrl: string) => void;
}

export const GalleryImages = ({
  availableImages,
  currentImage,
  name,
  setCurrentImage,
}: Props) => {
  return (
    <>
      {availableImages.length > 0 ? (
        <div className="grid gap-4">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            {currentImage ? (
              <img
                src={currentImage}
                alt={`${name} - Main image`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div>No Image yet.</div>
            )}
          </div>

          {availableImages.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableImages.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(imageUrl)}
                  className={`overflow-hidden rounded aspect-video border-2 ${
                    currentImage === imageUrl
                      ? "border-primary ring-2 ring-primary"
                      : "border-gray-300 hover:opacity-80"
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`${name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">No images available</p>
        </div>
      )}
    </>
  );
};
