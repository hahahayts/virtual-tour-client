import { ExternalLink, Facebook, Globe, Mail, Phone } from "lucide-react";

interface Props {
  phone: string | undefined;
  email: string | undefined;
  website: string | undefined;
  facebook: string | undefined;
}

export const ContactInfo = ({ email, phone, facebook, website }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Contact Information
      </h3>
      <div className="space-y-3">
        {phone && (
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="text-blue-600 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <a
                href={`tel:${phone}`}
                className="text-gray-700 hover:text-blue-600"
              >
                {phone}
              </a>
            </div>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="text-blue-600 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <a
                href={`mailto:${email}`}
                className="text-gray-700 hover:text-blue-600"
              >
                {email}
              </a>
            </div>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <Globe className="text-blue-600 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Website</p>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
              >
                Visit website <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
        {facebook && (
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <Facebook className="text-blue-600 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Facebook</p>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
              >
                Visit page <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
