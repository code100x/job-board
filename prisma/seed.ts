/* eslint-disable no-console */
import { Currency, Role, WorkMode } from '@prisma/client';
import bcrypt from 'bcryptjs';
import prisma from '../src/config/prisma.config';
import { JobLocations } from '@prisma/client';

const users = [
  { id: '1', name: 'Jack', email: 'user@gmail.com' },
  { id: '2', name: 'Admin', email: 'admin@gmail.com', role: Role.ADMIN },
];

const locationArr = Object.keys(JobLocations);

let jobs = [
  {
    id: '1',
    userId: '1',
    title: 'Frontend Developer',
    description: 'Develop and maintain web applications.',
    companyName: 'Tech Corp',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 60000,
    maxSalary: 80000,
    isVerifiedJob: true,
  },
  {
    id: '2',
    userId: '2',
    title: 'Backend Developer',
    description: 'Build and maintain server-side logic.',
    companyName: 'Innovatech',
    workMode: WorkMode.office,
    currency: Currency.INR,
    hasSalaryRange: false,
    minSalary: null,
    maxSalary: null,
    isVerifiedJob: false,
  },
  {
    id: '3',
    userId: '1',
    title: 'Full Stack Developer',
    description: 'Develop both client-side and server-side software.',
    companyName: 'Global Solutions',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 90000,
    maxSalary: 120000,
    isVerifiedJob: true,
  },
  {
    id: '4',
    userId: '2',
    title: 'DevOps Engineer',
    description:
      'Automate and streamline the company’s operations and processes.',
    companyName: 'DevOps Ltd.',
    workMode: WorkMode.remote,
    currency: Currency.INR,
    hasSalaryRange: true,
    minSalary: 50000,
    maxSalary: 70000,
    isVerifiedJob: true,
  },
  {
    id: '5',
    userId: '1',
    title: 'Product Manager',
    description:
      'Oversee product development and ensure the success of the product.',
    companyName: 'Productive Minds',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 110000,
    maxSalary: 150000,
    isVerifiedJob: true,
  },
  {
    id: '6',
    userId: '2',
    title: 'Data Scientist',
    description:
      'Analyze and interpret complex data to help the company make informed decisions.',
    companyName: 'Data Insights',
    workMode: WorkMode.office,
    currency: Currency.INR,
    hasSalaryRange: true,
    minSalary: 80000,
    maxSalary: 100000,
    isVerifiedJob: false,
  },
  {
    id: '7',
    userId: '1',
    title: 'UX/UI Designer',
    description:
      'Design user-friendly interfaces for web and mobile applications.',
    companyName: 'Creative Designs',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 70000,
    maxSalary: 90000,
    isVerifiedJob: false,
  },
  {
    id: '8',
    userId: '2',
    title: 'Mobile App Developer',
    description: 'Develop and maintain mobile applications.',
    companyName: 'App Innovators',
    workMode: WorkMode.hybrid,
    currency: Currency.INR,
    hasSalaryRange: false,
    minSalary: null,
    maxSalary: null,
    isVerifiedJob: true,
  },
  {
    id: '9',
    userId: '1',
    title: 'Cloud Engineer',
    description: 'Design and manage cloud-based systems and services.',
    companyName: 'Cloud Works',
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 100000,
    maxSalary: 130000,
    isVerifiedJob: true,
  },
  {
    id: '10',
    userId: '2',
    title: 'Security Analyst',
    description: 'Ensure the security and integrity of company systems.',
    companyName: 'SecureTech',
    workMode: WorkMode.remote,
    currency: Currency.INR,
    hasSalaryRange: true,
    minSalary: 75000,
    maxSalary: 95000,
    isVerifiedJob: false,
  },
  {
    id: '11',
    userId: '1',
    title: 'QA Engineer',
    description: 'Ensure the quality of software products.',
    companyName: 'QA Solutions',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 45000,
    maxSalary: 50000,
    isVerifiedJob: true,
  },
  {
    id: '12',
    userId: '2',
    title: 'Technical Writer',
    description: 'Write technical documentation for software and hardware.',
    companyName: 'Tech Docs',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 30000,
    maxSalary: 35000,
    isVerifiedJob: false,
  },
  {
    id: '13',
    userId: '1',
    title: 'IT Support Specialist',
    description: 'Provide technical support for IT systems.',
    companyName: 'Support Corp',
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 20000,
    maxSalary: 25000,
    isVerifiedJob: true,
  },
  {
    id: '14',
    userId: '2',
    title: 'Network Administrator',
    description: 'Manage and maintain network infrastructure.',
    companyName: 'Net Admins',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 35000,
    maxSalary: 40000,
    isVerifiedJob: true,
  },
  {
    id: '15',
    userId: '1',
    title: 'System Analyst',
    description: 'Analyze and improve IT systems.',
    companyName: 'Sys Solutions',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 27000,
    maxSalary: 32000,
    isVerifiedJob: false,
  },
  {
    id: '16',
    userId: '2',
    title: 'Sales Engineer',
    description: 'Support sales teams with technical expertise.',
    companyName: 'Sales Tech',
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 30000,
    maxSalary: 35000,
    isVerifiedJob: true,
  },
  {
    id: '17',
    userId: '1',
    title: 'Marketing Specialist',
    description: 'Develop and execute marketing strategies.',
    companyName: 'Market Pro',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 20000,
    maxSalary: 25000,
    isVerifiedJob: true,
  },
  {
    id: '18',
    userId: '2',
    title: 'Content Manager',
    description: 'Manage and curate content for the company.',
    companyName: 'Content Creators',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 25000,
    maxSalary: 30000,
    isVerifiedJob: false,
  },
  {
    id: '19',
    userId: '1',
    title: 'Graphic Designer',
    description: 'Design visual content for digital and print media.',
    companyName: 'Design Pros',
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 22000,
    maxSalary: 27000,
    isVerifiedJob: true,
  },
  {
    id: '20',
    userId: '2',
    title: 'Business Analyst',
    description: 'Analyze business processes and recommend improvements.',
    companyName: 'Business Solutions',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 38000,
    maxSalary: 43000,
    isVerifiedJob: true,
  },
  {
    id: '21',
    userId: '1',
    title: 'SEO Specialist',
    description: 'Optimize websites for search engines.',
    companyName: 'SEO Experts',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 15000,
    maxSalary: 20000,
    isVerifiedJob: false,
  },
  {
    id: '22',
    userId: '2',
    title: 'Data Analyst',
    description: 'Analyze data to provide business insights.',
    companyName: 'DataPro',
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 23000,
    maxSalary: 28000,
    isVerifiedJob: true,
  },
  {
    id: '23',
    userId: '1',
    title: 'Operations Manager',
    description: 'Oversee daily operations of the company.',
    companyName: 'OpsCorp',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 29000,
    maxSalary: 34000,
    isVerifiedJob: true,
  },
  {
    id: '24',
    userId: '2',
    title: 'Customer Service Manager',
    description: 'Manage customer service teams and operations.',
    companyName: 'Customer Care Inc.',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 26000,
    maxSalary: 31000,
    isVerifiedJob: true,
  },
  {
    id: '25',
    userId: '1',
    title: 'Product Designer',
    description: 'Design and develop new products.',
    companyName: 'Product Innovators',
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 32000,
    maxSalary: 37000,
    isVerifiedJob: true,
  },
  {
    id: '26',
    userId: '2',
    title: 'Social Media Manager',
    description: 'Manage the company’s social media presence.',
    companyName: 'Social Media Pros',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 18000,
    maxSalary: 23000,
    isVerifiedJob: true,
  },
  {
    id: '27',
    userId: '1',
    title: 'HR Specialist',
    description: 'Manage human resources activities.',
    companyName: 'HR Hub',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 24000,
    maxSalary: 29000,
    isVerifiedJob: true,
  },
  {
    id: '28',
    userId: '2',
    title: 'Supply Chain Manager',
    description: 'Oversee supply chain operations.',
    companyName: 'Supply Chain Solutions',
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 30000,
    maxSalary: 35000,
    isVerifiedJob: true,
  },
  {
    id: '29',
    userId: '1',
    title: 'E-commerce Manager',
    description: 'Manage online sales and operations.',
    companyName: 'E-commerce Pros',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 27000,
    maxSalary: 32000,
    isVerifiedJob: true,
  },
  {
    id: '30',
    userId: '2',
    title: 'Project Coordinator',
    description: 'Assist in project management and coordination.',
    companyName: 'Project Managers Inc.',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasSalaryRange: true,
    minSalary: 12000,
    maxSalary: 17000,
    isVerifiedJob: false,
  },
];

async function seedUsers() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10);
    await Promise.all(
      users.map(
        async (u) =>
          await prisma.user.upsert({
            where: { id: u.id },
            create: {
              id: u.id,
              email: u.email,
              name: u.name,
              password: hashedPassword,
              role: u.role || Role.USER,
            },
            update: {},
          })
      )
    );
    console.log('✅ user seed successfully');
    await prisma.$disconnect();
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function seedJobs() {
  jobs = jobs.map((j, index) => {
    return {
      ...j,
      location:
        locationArr[index] !== undefined ? locationArr[index] : locationArr[3],
    };
  });
  try {
    await Promise.all(
      jobs.map(async (j) =>
        prisma.job.upsert({
          where: { id: j.id },
          create: {
            id: j.id,
            userId: j.userId,
            title: j.title,
            description: j.description,
            companyName: j.companyName,
            workMode: j.workMode,
            currency: j.currency,
            //@ts-ignore
            location: j.location,
            hasSalaryRange: j.hasSalaryRange,
            minSalary: j.minSalary,
            maxSalary: j.maxSalary,
            isVerifiedJob: j.isVerifiedJob,
          },
          update: {},
        })
      )
    );
    console.log('✅ job seed successfully');
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  await seedUsers();
  await seedJobs();
}

main();
