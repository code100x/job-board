// components/JobCard.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '@prisma/client';
import { Banknote, MapPin, SquareArrowOutUpRight } from 'lucide-react';
import Modal from './Modal';

type JobCardProps = {
  job: Job;
  userRole: string; // Add userRole prop
};

const JobCard = ({ job, userRole }: JobCardProps) => {
  const { title, description, companyName, salary, currency, location, id } = job;
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const currencySign = currency === 'USD' ? '$' : '₹';

  const viewDetails = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <div className="max-w-full mx-auto h-fit w-full flex flex-col sm:flex-row items-start gap-4 border border-gray-200 hover:border-gray-300 transition-all shadow-sm rounded-md px-4 py-3">
        <div className="logo-area p-2 flex-shrink-0">
          <div className="h-20 w-20 bg-gray-100 border border-gray-300 rounded-full"></div>
        </div>
        <div className="p-2 h-full flex-grow flex flex-col gap-1">
          <h3 className="text-lg sm:text-xl tracking-tight font-semibold text-gray-700">
            {title}
          </h3>
          <h4 className="text-sm sm:text-base tracking-tight font-semibold text-gray-500 truncate">
            {companyName}
          </h4>
          <span className="flex items-end gap-2 text-gray-500">
            <Banknote className="text-gray-700" />
            <h4 className="text-sm sm:text-base tracking-tight font-medium">
              <span className="font-semibold">{currencySign}</span> {salary}
            </h4>
          </span>

          <div className="w-full flex flex-col sm:flex-row justify-between">
            <span className="flex items-end gap-2 text-gray-500">
              <MapPin className="text-gray-700" />
              <h4 className="text-sm sm:text-base tracking-tight font-medium">
                {location}
              </h4>
            </span>
            <p
              onClick={viewDetails}
              className="flex gap-2 items-center cursor-pointer hover:underline mt-2 sm:mt-0"
              aria-label="View job details"
              role="button"
            >
              view details
              <span>
                <SquareArrowOutUpRight size={14} />
              </span>
            </p>
          </div>
        </div>
      </div>
      {showModal && <Modal job={job} onClose={closeModal} userRole={userRole} />}
    </div>
  );
};

export default JobCard;
