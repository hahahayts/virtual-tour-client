import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const Booking = ({ name }: { name: string }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-sm p-6 text-white">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="text-yellow-300 h-5 w-5" />
        ))}
      </div>
      <h3 className="text-xl font-bold mb-2">Ready to Book?</h3>
      <p className="mb-4 opacity-90">
        Experience the comfort and hospitality of {name}
      </p>
      <Button
        size="lg"
        className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
      >
        Check Availability
      </Button>
    </div>
  );
};
