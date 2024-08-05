'use client';

import { getJobById } from "@/app/actions/get-jobs";
import { postApplication } from "@/app/actions/application";
import { getSignedURL } from "@/app/actions/getSignedUrl";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    jobType: string;
    jobDescription: string;
    requirements: string;
    salaryRange: string;
    createdAt: Date;
    authorId: number;
}

interface ApplicationInputs {
    fullName: string;
    email: string;
    phone: string;
    coverLetter: string;
}

export default function JobApplication({ params }: { params: { jobId: string } }) {
    const session = useSession();
    const router = useRouter();
    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

    const { register, handleSubmit, formState: { errors } } = useForm<ApplicationInputs>();

    

    useEffect(() => {
        async function getJobFromDb() {
            try {
                const fetchedJob = await getJobById(parseInt(params.jobId));
                setJob(fetchedJob);
            } catch (error) {
                console.error("Error fetching job:", error);
            } finally {
                setIsLoading(false);
            }
        }
        getJobFromDb();
    }, []);

    const onSubmit: SubmitHandler<ApplicationInputs> = async (data) => {
        setIsSubmitting(true);
        try {
            if (file) {
                console.log("inside file")
                const signedUrlResult = await getSignedURL(file.name);
                console.log(" signedUrlResult", signedUrlResult.error)
                if ('error' in signedUrlResult) {
                    throw new Error(signedUrlResult.error?.message);
                }
                const url = signedUrlResult.success.url;
                console.log("url", url);
                await fetch(url, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type || "",
                    },
                });

                const resumeUrl = url.split('?')[0];

                await postApplication({
                    applicantName: data.fullName,
                    applicantEmail: data.email,
                    phoneNumber: data.phone,
                    coverLetter: data.coverLetter,
                    resumeUrl: resumeUrl,
                    jobId: job!.id,
                });

                alert("Application submitted successfully!");
                router.push('/')
            } else {
                throw new Error('No file selected');
            }
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile);
        if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
        }
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setFileUrl(url);
        } else {
            setFileUrl(undefined);
        }
    };

    if (isLoading) return <div className="text-center py-10 text-white">Loading...</div>;
    if (!job) return <div className="text-center py-10 text-white">Job not found</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-12">
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <h1 className="text-4xl font-bold mb-6 text-white text-center">{job.title}</h1>
                <div className="bg-white bg-opacity-90 shadow-lg rounded-xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Job Details</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <p><span className="font-semibold">Company:</span> {job.company}</p>
                        <p><span className="font-semibold">Location:</span> {job.location}</p>
                        <p><span className="font-semibold">Job Type:</span> {job.jobType}</p>
                        <p><span className="font-semibold">Salary Range:</span> {job.salaryRange}</p>
                    </div>
                    <h3 className="font-semibold text-lg mt-6 mb-2 text-gray-700">Job Description:</h3>
                    <p className="text-gray-600">{job.jobDescription}</p>
                    <h3 className="font-semibold text-lg mt-6 mb-2 text-gray-700">Requirements:</h3>
                    <p className="text-gray-600">{job.requirements}</p>
                </div>

                {(session.status === 'authenticated') ? <div className="bg-white bg-opacity-90 shadow-lg rounded-xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Apply for this position</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block mb-2 font-medium text-gray-700">Full Name</label>
                            <input
                                {...register("fullName", { required: "Full name is required" })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
                            <input
                                {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Phone</label>
                            <input
                                {...register("phone", { required: "Phone number is required" })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="resume" className="block mb-2 font-medium text-gray-700">Resume</label>
                            <input
                                type="file"
                                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={onFileChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            {!file && <span className="text-red-500 text-sm mt-1">Resume is required</span>}
                        </div>
                        <div>
                            <label htmlFor="coverLetter" className="block mb-2 font-medium text-gray-700">Cover Letter</label>
                            <textarea
                                {...register("coverLetter", { required: "Cover letter is required" })}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                            ></textarea>
                            {errors.coverLetter && <span className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</span>}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || !file}
                            className={`w-full p-3 text-white rounded-md transition duration-300 ease-in-out ${(isSubmitting || !file) ? 'bg-gray-400' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </form>
                </div> : <div className="bg-white bg-opacity-90 shadow-lg rounded-xl p-8 backdrop-blur-sm text-center">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign in to Apply</h2>
                    <p className="mb-6 text-gray-600">You need to be signed in to apply for this position.</p>
                    <button
                        onClick={() => signIn()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Sign In to Apply
                    </button>
                </div>}
            </div>
        </div>
    );
}