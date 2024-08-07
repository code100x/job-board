import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle
} from "@/components/ui/dialog";
import { Job } from "@prisma/client";
import { Banknote, MapPin } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Session } from "inspector";

type JobDetailModalProps = {
  job: Job;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
 
};

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const { title, description, companyName, salary, currency, location } = job;
  const currencySign = currency === "USD" ? "$" : "₹";
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

 

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const MAX_LENGTH = 200;
  const truncatedDescription = description.length > MAX_LENGTH ? description.slice(0, MAX_LENGTH) + "..." : description;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30" />
      <DialogContent className="max-w-lg mx-auto p-4 bg-white rounded shadow-lg">
        <div className="flex justify-between items-start">
          <DialogTitle className="text-2xl font-semibold text-gray-700">{title}</DialogTitle>
        </div>
        <h4 className="text-lg font-semibold text-gray-500 mt-2">{companyName}</h4>
        <span className="flex items-center gap-2 text-gray-500 mt-2">
          <Banknote className="text-gray-700" />
          <h4 className="text-base font-medium">
            <span className="font-semibold">{currencySign}</span> {salary}
          </h4>
        </span>
        <span className="flex items-center gap-2 text-gray-500 mt-2">
          <MapPin className="text-gray-700" />
          <h4 className="text-base font-medium">{location}</h4>
        </span>
        <h1 className="font-bold">About the job</h1>
        <p className="text-base text-gray-700 ">
          {isExpanded ? description : truncatedDescription}
          {description.length > MAX_LENGTH && (
            <span className="text-blue-600 cursor-pointer ml-2" onClick={toggleDescription}>
              {isExpanded ? "See Less" : "See More"}
            </span>
          )}
        </p>
        <Button type="submit">
            Apply Now
          </Button>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
