import React from 'react';
import { Job } from '@prisma/client';
import { Banknote, MapPin } from 'lucide-react';

type JobDetailsProps = {
    job: Job;
    onApply: () => void;
};

const JobDetails: React.FC<JobDetailsProps> = ({ job, onApply }) => {
    const { title, description, companyName, salary, currency, location, state, country } = job;
    const currencySign = currency === 'USD' ? '$' : '₹';

    return (
        <div className="text-gray-100">
            <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>
                <h2 className="text-xl font-semibold mb-4 text-blue-400">{companyName}</h2>
            </div>
            <div className="flex items-center gap-4 mb-4 text-blue-300">
                <span className="flex items-center gap-2">
                    <MapPin />
                    <span className="text-lg font-medium">
                        {location}, {state && `${state},`} {country}
                    </span>
                </span>
                <span className="flex items-center gap-2">
                    <Banknote />
                    <span className="text-lg font-medium">
                        <span className="font-semibold">{currencySign}</span> {salary}
                    </span>
                </span>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <h3 className="text-lg font-semibold text-blue-400">Info</h3>
                </div>
                <div className="w-3/4">
                    <p className="text-gray-200">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
