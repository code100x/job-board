import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '../jobs/apply/[jobId]/page';



interface JobCardProps {
    job: Job;
    isAuthor?: boolean
}

const JobCard: React.FC<JobCardProps> = ({ job, isAuthor }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const cardColors = [
        'bg-blue-600',
        'bg-yellow-300',
        'bg-red-500',
        'bg-orange-500',
        'bg-green-500'
    ];
    const bgColor = cardColors[Math.floor(Math.random() * cardColors.length)];

    const calculateTimeAgo = (createdAt: any) => {
        const now = new Date();
        const created = new Date(createdAt);
        const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d`;
        if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo`;
        return `${Math.floor(diffInSeconds / 31536000)}y`;
    };

    const timeAgo = calculateTimeAgo(job.createdAt);

    const handleApply = () => {
        router.push(`/jobs/apply/${job.id}`);
    };
    const handleView = () => {
        router.push(`/jobs/my-job-postings/${job.id}`);
    };

    return (
        <div
            className={`rounded-lg p-4 ${bgColor} text-white mb-4 relative overflow-hidden transition-all duration-300`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-full mr-4 flex items-center justify-center">
                        {/* <Image src={job.logo} alt={job.company} width={40} height={40} /> */}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{job.title}</h2>
                        <p>{job.company} </p>
                    </div>
                </div>
                {/* {job.isVerified && (
                    <span className="bg-green-400 text-white px-2 py-1 rounded text-xs">VERIFIED</span>
                )} */}
            </div>
            <div className="mt-4 flex items-center space-x-4">
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {job.location}
                </span>
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    {job.salaryRange}
                </span>
                <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {job.jobType}
                </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div className="space-x-2">
                    {/* {job.tags.map((tag, index) => (
                        <span key={index} className="bg-white text-black px-2 py-1 rounded text-sm">{tag}</span>
                    ))} */}
                </div>
                <span className="text-sm">{timeAgo}</span>
            </div>

            {/* Apply Now button */}
            <div
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <button
                    onClick={(isAuthor) ? handleView : handleApply}
                    className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition duration-300"
                >
                    {(isAuthor) ? "View" : "Apply Now"}
                </button>
            </div>
        </div>
    );
};

export default JobCard;