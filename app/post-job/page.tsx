'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postJob } from '../actions/post-job';
import { useSession, signIn } from 'next-auth/react';

const PostJob = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [jobDetails, setJobDetails] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: '',
        salary: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setJobDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (status === 'authenticated') {
            const result = await postJob({ ...jobDetails, authorEmail: session?.user?.email! });
            console.log('Job details submitted:', jobDetails);
            router.push('/');
        }
    };

    if (status === 'unauthenticated') {
        return (
            <div className='bg-slate-100 h-screen flex items-center justify-center'>
                <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl text-center">
                    <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">You have not signed in</h1>
                    <p className="mb-4 text-gray-700">Sign in to post a job</p>
                    <button
                        onClick={() => signIn()}
                        className="py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-slate-100'>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Post a New Job</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={jobDetails.title}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={jobDetails.company}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={jobDetails.location}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
                        <select
                            id="type"
                            name="type"
                            value={jobDetails.type}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={jobDetails.description}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
                        <textarea
                            id="requirements"
                            name="requirements"
                            rows={4}
                            value={jobDetails.requirements}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary Range</label>
                        <input
                            type="text"
                            id="salary"
                            name="salary"
                            value={jobDetails.salary}
                            onChange={handleChange}
                            placeholder="e.g. $50,000 - $70,000"
                            className="mt-1 p-2 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
