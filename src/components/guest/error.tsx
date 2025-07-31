import { MapPin } from "lucide-react";

export const Error = ({ name }: { name: string }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div
        className="bg-red-50/80 backdrop-blur-md border border-red-200/50 rounded-2xl p-8 text-center max-w-md"
        style={{
          animation: "slide-in-from-top-5 0.5s ease-out both",
        }}
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Unable to Load {name}
        </h3>
        <p className="text-red-600 text-sm">
          Please check your connection and try again.
        </p>
      </div>
    </div>
  );
};
