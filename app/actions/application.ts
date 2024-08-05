'use server';
import prisma from "@/prisma/db";

export async function postApplication(applicationDetails: {
    applicantName: string,
    applicantEmail: string,
    phoneNumber: string,
    coverLetter: string,
    resumeUrl: string,
    jobId: number
}) {
    try {
        const application = await prisma.application.create({
            data: {
                applicantName: applicationDetails.applicantName,
                applicantEmail: applicationDetails.applicantEmail,
                phoneNumber: applicationDetails.phoneNumber,
                coverLetter: applicationDetails.coverLetter,
                resumeUrl: applicationDetails.resumeUrl,
                job: {
                    connect: { id: applicationDetails.jobId }
                }
            }
        });
        return application;
    } catch (error) {
        console.error("Error creating application:", error);
        throw error;
    }
}

export async function fetchApplicationsByJobId(jobId: number) {
    const applications = await prisma.application.findMany({
        where: {
            jobId
        }
    })
    return applications;
}

