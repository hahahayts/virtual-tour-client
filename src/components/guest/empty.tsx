import { Compass } from "lucide-react";

interface Props {
  name: string;
  description: string;
}

export const Empty = ({ name, description }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div
        className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-12 text-center max-w-md shadow-xl"
        style={{
          animation: "fadeInUp 0.6s ease-out both",
        }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Compass className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          No {name} Yet
        </h3>
        <p className="text-gray-600 mb-6">{description}. Check back soon!</p>
      </div>
    </div>
  );
};
