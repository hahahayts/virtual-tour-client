import { formatDate } from "@/lib/date-formatter";
import { Calendar } from "lucide-react";

interface Props {
  createdAt: any;
  updatedAt: any;
}

export const MetaData = ({ createdAt, updatedAt }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Details</h3>
      <div className="space-y-3 text-sm text-gray-600">
        {createdAt && (
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-gray-500">Listed</p>
              <p>{formatDate(createdAt)}</p>
            </div>
          </div>
        )}
        {updatedAt && (
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-gray-500">Updated</p>
              <p>{formatDate(updatedAt)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
