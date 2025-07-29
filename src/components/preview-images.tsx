export const PreviewImages = ({
  imageUrls,
}: {
  imageUrls: (string | null)[];
}) => {
  return (
    <div>
      <h4 className="text-base font-semibold mb-2">Images Preview</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imageUrls.map(
          (url, idx) =>
            url && (
              <div
                key={idx}
                className="w-full aspect-video rounded overflow-hidden border border-gray-300 shadow-sm"
              >
                <img
                  src={url}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};
