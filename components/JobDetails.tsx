import React from 'react';
import { Job } from '@prisma/client';
import { Banknote, MapPin } from 'lucide-react';

type JobDetailsProps = {
    job: Job;
    onApply: () => void; // Function to handle the apply action
};

const JobDetails: React.FC<JobDetailsProps> = ({ job, onApply }) => {
    const { title, description, companyName, salary, currency, location, state, country } = job;
    const currencySign = currency === 'USD' ? '$' : '₹';

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 shadow-md rounded-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">{companyName}</h2>
            <p className="text-gray-700 mb-4">{description}</p>
            <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center gap-2 text-gray-500">
                    <MapPin className="text-gray-700" />
                    <span className="text-lg font-medium">
                        {location}, {state && `${state},`} {country}
                    </span>
                </span>
                <span className="flex items-center gap-2 text-gray-500">
                    <Banknote className="text-gray-700" />
                    <span className="text-lg font-medium">
                        <span className="font-semibold">{currencySign}</span> {salary}
                    </span>
                </span>
            </div>
            <button
                onClick={onApply}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
                Apply
            </button>
        </div>
    );
};

export default JobDetails;
