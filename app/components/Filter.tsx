'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Filter = () => {
    const { status } = useSession();
    const router = useRouter();

    if (status === 'unauthenticated') {
        return null;
    }

    return (
        <div className="w-full flex items-center justify-end px-8 py-4 bg-gray-100 shadow-md">
            <button
                onClick={() => router.push('/jobs/my-job-postings')}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
                Get My Job Listings
            </button>
        </div>
    );
};
