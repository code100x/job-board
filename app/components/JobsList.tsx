'use client';
import { useEffect, useState } from 'react';
import { getAllJobs } from '../actions/get-jobs';
import JobCard from './JobCard';
import { Job } from '../jobs/apply/[jobId]/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loadingState, searchBarInput } from '@/store/state';
import { Loader } from 'lucide-react';

const JobsList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const searchInput = useRecoilValue(searchBarInput);
    const [loading, setLoading] = useRecoilState(loadingState);

    

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            const allJobs = await getAllJobs();
            setJobs(allJobs);
            setLoading(false);
        };
        init();
    }, []);

    const filteredJobs = searchInput !== '' ? jobs.filter((job) =>
        job.title.toLowerCase().includes(searchInput.toLowerCase())
    ) : jobs;

    return (
        <div className="w-full">
            {loading ? (
                <div className="p-4 w-full">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 mb-4 shadow-md">
                            <div className="animate-pulse flex flex-col space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="flex space-x-4">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
                    ) : (
                        <div className="flex items-center justify-center text-slate-500 font-semibold text-3xl">
                            No jobs found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobsList;
