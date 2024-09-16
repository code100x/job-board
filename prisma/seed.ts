/* eslint-disable no-console */
import { Currency, Role, WorkMode } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import prisma from '../src/config/prisma.config';

const users = [
  { id: '1', name: 'Jack', email: 'user@gmail.com' },
  { id: '2', name: 'Admin', email: 'admin@gmail.com', role: Role.ADMIN },
];

let jobs = [
  {
    id: '1',
    userId: '1',
    title: 'Frontend Developer',
    description: 'Develop and maintain web applications.',
    companyName: 'Tech Corp',
    companyBio:
      'Leading tech solutions provider specializing in innovative web development.',
    companyEmail: 'contact@techcorp.com',
    category: 'development',
    type: 'full-time',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    application: 'apply@techcorp.com',
    companyLogo: '',
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
    companyBio:
      'Innovatech specializes in backend systems and cloud-based solutions.',
    companyEmail: 'careers@innovatech.com',
    category: 'development',
    type: 'full-time',
    workMode: WorkMode.office,
    currency: Currency.USD,
    application: 'jobs@innovatech.com',
    companyLogo: '',
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
    companyBio:
      'Global Solutions offers comprehensive IT services for businesses worldwide.',
    companyEmail: 'recruitment@globalsolutions.com',
    category: 'development',
    type: 'full-time',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    application: 'careers@globalsolutions.com',
    companyLogo: '',
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
    companyBio:
      'DevOps Ltd. specializes in automation and cloud infrastructure management.',
    companyEmail: 'jobs@devopsltd.com',
    category: 'development',
    type: 'full-time',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    application: 'apply@devopsltd.com',
    companyLogo: '',
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
    companyBio:
      'Productive Minds helps businesses achieve their goals through strategic product management.',
    companyEmail: 'hr@productiveminds.com',
    category: 'management',
    type: 'full-time',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    application: 'careers@productiveminds.com',
    companyLogo: '',
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
    companyBio:
      'Data Insights provides data-driven solutions to empower businesses.',
    companyEmail: 'recruitment@datainsights.com',
    category: 'development',
    type: 'full-time',
    workMode: WorkMode.office,
    currency: Currency.USD,
    application: 'apply@datainsights.com',
    companyLogo: '',
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
    companyBio:
      'Creative Designs excels in crafting intuitive and visually appealing user interfaces.',
    companyEmail: 'careers@creativedesigns.com',
    category: 'design',
    type: 'full-time',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    application: 'jobs@creativedesigns.com',
    companyLogo: '',
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
    companyBio:
      'App Innovators is a leader in mobile application development and innovation.',
    companyEmail: 'careers@appinnovators.com',
    category: 'development',
    type: 'full-time',
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    application: 'apply@appinnovators.com',
    companyLogo: '',
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
    companyBio: 'Cloud Works provides cutting-edge cloud computing solutions.',
    companyEmail: 'hr@cloudworks.com',
    category: 'development',
    type: 'full-time',
    workMode: WorkMode.office,
    currency: Currency.USD,
    application: 'careers@cloudworks.com',
    companyLogo: '',
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
    companyBio:
      'SecureTech specializes in cybersecurity solutions for modern businesses.',
    companyEmail: 'security@securetech.com',
    category: 'support',
    type: 'full-time',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    application: 'jobs@securetech.com',
    companyLogo: '',
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
    companyBio:
      'QA Solutions ensures top-notch quality assurance services for software.',
    companyEmail: 'contact@qasolutions.com',
    category: 'support',
    type: 'full-time',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    application: 'apply@qasolutions.com',
    companyLogo: '',
    hasSalaryRange: true,
    minSalary: 45000,
    maxSalary: 50000,
    isVerifiedJob: true,
  },
  {
    id: '12',
    userId: '2',
    title: 'Technical Writer',
    description: 'Create and manage technical documentation.',
    companyName: 'WriteTech',
    companyBio:
      'WriteTech specializes in high-quality technical writing services.',
    companyEmail: 'hr@writetech.com',
    category: 'writing',
    type: 'contract',
    workMode: WorkMode.remote,
    currency: Currency.USD,
    application: 'careers@writetech.com',
    companyLogo: '',
    hasSalaryRange: false,
    minSalary: null,
    maxSalary: null,
    isVerifiedJob: true,
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
            companyBio: j.companyBio,
            companyEmail: j.companyEmail,
            category: j.category,
            type: j.type,
            workMode: j.workMode,
            currency: j.currency,
            application: j.application,
            city: faker.location.city(),
            address: faker.location.streetAddress(),
            companyLogo: j.companyLogo,
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
