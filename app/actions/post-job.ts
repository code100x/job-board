'use server';
import prisma from "@/prisma/db";
import { Resend } from "resend";
import { render } from '@react-email/render';
import JobNotificationEmail from '../components/email-template'
export async function postJob(jobDetails: {
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    salary: string;
    authorEmail: string;
}) {
    const { title, company, location, type, description, requirements, salary, authorEmail } = jobDetails;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

    const author = await prisma.user.findUnique({
        where: {
            email: authorEmail
        }
    });

    if (!author) {
        throw new Error('Author not found');
    }

    const authorId = author.id;

    try {
        const job = await prisma.job.create({
            data: {
                title,
                company,
                location,
                jobType: type,
                jobDescription: description,
                requirements,
                salaryRange: salary,
                author: {
                    connect: { id: authorId }
                }
            }
        });

        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authorId
                }
            }
        });

        users.map(async (user) => {
            await resend.emails.send({
                from: '100xdevs@gmail.com',
                to: user.email,
                subject: 'New Job Posted at 100xdevs Job Portal',
                react: JobNotificationEmail({ jobTitle: title, company, jobId: job.id, baseUrl: "http://localhost:3000" })
            });
        });

        const notifications = users.map(user => ({
            message: `New job posted: ${title} at ${company}`,
            userId: user.id,
            jobId: job.id
        }));

        await prisma.notification.createMany({
            data: notifications
        });

        return { message: 'Job posted and notifications sent', job };
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while posting the job');
    }
}
