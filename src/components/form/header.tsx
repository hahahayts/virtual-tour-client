import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

interface HeaderProps {
  title: string;
  description: string;
  backUrl: string;
}

export default function Header({ title, description, backUrl }: HeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <Link
          to={`/admin/${backUrl}`}
          className="flex justify-center items-center gap-2"
        >
          <ArrowLeft />
          Back
        </Link>
      </div>
      <div className="text-center">
        <h2 className="text-2xl">{title}</h2>
        <p className="opacity-75">{description}</p>
      </div>
      <div></div>
    </div>
  );
}
