import { Banknote, MapPin, SquareArrowOutUpRight } from "lucide-react";

const JobCard = () => {
  return (
    <div className="h-fit w-5/6 flex items-start gap-4 border border-gray-200 hover:border-gray-300 transition-all shadow-sm rounded-md px-4 py-3">
      <div className="logo-area p-2">
        <div className="h-20 w-20 bg-gray-100 border border-gray-300 rounded-full"></div>
      </div>
      <div className="p-2 h-full flex-grow flex flex-col gap-1">
        <h3 className="text-lg tracking-tight font-semibold text-gray-700">
          Full Stack Developer
        </h3>
        <h4 className="text-sm tracking-tight font-semibold text-gray-500">
          100xDevs
        </h4>
        <span className="flex items-end gap-2 text-gray-500">
          <Banknote className="text-gray-700" />
          <h4 className="text-sm tracking-tight font-medium">$ 40,000</h4>
        </span>

        <div className="w-full flex justify-between">
          <span className="flex items-end gap-2 text-gray-500">
            <MapPin className="text-gray-700" />
            <h4 className="text-sm tracking-tight font-medium">Remote</h4>
          </span>
          <p className="flex gap-2 items-center cursor-pointer hover:underline">
            view full{" "}
            <span>
              <SquareArrowOutUpRight size={14} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
