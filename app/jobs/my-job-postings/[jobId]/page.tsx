'use client';

import { useEffect, useState } from "react";
import { Job } from "../../apply/[jobId]/page";
import { getJobById } from "@/app/actions/get-jobs";
import { fetchApplicationsByJobId } from "@/app/actions/application";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaUserTie } from 'react-icons/fa';

interface Application {
    id: number;
    applicantName: string;
    applicantEmail: string;
    phoneNumber: string;
    coverLetter: string;
    resumeUrl: string;
}

const JobDetails = ({ params }: { params: { jobId: string } }) => {
    const [job, setJob] = useState<Job | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        const fetchJobDetails = async () => {
            const fetchedJob = await getJobById(parseInt(params.jobId));
            const fetchedApplications = await fetchApplicationsByJobId(parseInt(params.jobId));

            setJob(fetchedJob);
            setApplications(fetchedApplications);
        };

        fetchJobDetails();
    }, []);

    if (!job) {
        return <div className="flex items-center justify-center h-screen text-2xl font-bold text-purple-600">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
                        <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
                        <p className="flex items-center"><FaBuilding className="mr-2" /> {job.company}</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <p className="flex items-center text-gray-700"><FaMapMarkerAlt className="mr-2 text-indigo-500" /> {job.location}</p>
                            <p className="flex items-center text-gray-700"><FaBriefcase className="mr-2 text-indigo-500" /> {job.jobType}</p>
                            <p className="flex items-center text-gray-700"><FaMoneyBillWave className="mr-2 text-indigo-500" /> {job.salaryRange}</p>
                            <p className="flex items-center text-gray-700"><FaCalendarAlt className="mr-2 text-indigo-500" /> Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2 text-indigo-600">Job Description</h2>
                            <p className="text-gray-700">{job.jobDescription}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2 text-indigo-600">Requirements</h2>
                            <p className="text-gray-700">{job.requirements}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
                        <h2 className="text-3xl font-semibold mb-2 flex items-center">
                            <FaUserTie className="mr-2" /> Applicants
                        </h2>
                    </div>
                    <div className="p-6">
                        {applications.length === 0 ? (
                            <p className="text-gray-700 text-center">No applicants yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {applications.map((app) => (
                                    <div key={app.id} className="bg-gradient-to-br from-cyan-50 to-blue-100 p-4 rounded-lg shadow-md border border-blue-200">
                                        <h3 className="text-xl font-bold text-blue-800 mb-2">{app.applicantName}</h3>
                                        <p className="text-gray-700 mb-1"><strong>Email:</strong> {app.applicantEmail}</p>
                                        <p className="text-gray-700 mb-1"><strong>Phone:</strong> {app.phoneNumber}</p>
                                        <p className="text-gray-700 mb-2"><strong>Cover Letter:</strong> {app.coverLetter.substring(0, 100)}...</p>
                                        <a href={app.resumeUrl} className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition duration-300" target="_blank" rel="noopener noreferrer">View Resume</a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;