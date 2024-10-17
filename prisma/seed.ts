/* eslint-disable no-console */
import {
  PrismaClient,
  Currency,
  EmployementType,
  Role,
  WorkMode,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const users = [
  { id: '1', name: 'Jack', email: 'user@gmail.com' },
  { id: '2', name: 'Admin', email: 'admin@gmail.com', role: Role.ADMIN },
  { id: '3', name: 'Hr', email: 'hr@gmail.com', role: Role.HR },
];

const companies = [
  {
    id: '1',
    name: 'Tech Corp',
    bio: 'Leading tech solutions provider specializing in innovative web development.',
    email: 'contact@techcorp.com',
    userId: '1',
    logo: '',
  },
  {
    id: '2',
    name: 'Innovatech',
    bio: 'Innovatech specializes in backend systems and cloud-based solutions.',
    email: 'careers@innovatech.com',
    userId: '2',
    logo: '',
  },
  {
    id: '3',
    userId: '1',
    name: 'Global Solutions',
    bio: 'Global Solutions offers comprehensive IT services for businesses worldwide.',
    email: 'recruitment@globalsolutions.com',
    logo: '',
  },
  {
    id: '4',
    userId: '2',
    name: 'DevOps Ltd.',
    bio: 'DevOps Ltd. specializes in automation and cloud infrastructure management.',
    email: 'jobs@devopsltd.com',

    logo: '',
  },
  {
    id: '5',
    userId: '1',
    name: 'Productive Minds',
    bio: 'Productive Minds helps businesses achieve their goals through strategic product management.',
    email: 'hr@productiveminds.com',
    logo: '',
  },
  {
    id: '6',
    userId: '2',
    name: 'Data Insights',
    bio: 'Data Insights provides data-driven solutions to empower businesses.',
    email: 'recruitment@datainsights.com',
    logo: '',
  },
  {
    id: '7',
    userId: '1',
    name: 'Creative Designs',
    bio: 'Creative Designs excels in crafting intuitive and visually appealing user interfaces.',
    email: 'careers@creativedesigns.com',
    logo: '',
  },
  {
    id: '8',
    userId: '2',
    name: 'App Innovators',
    bio: 'App Innovators is a leader in mobile application development and innovation.',
    email: 'careers@appinnovators.com',
    logo: '',
  },
  {
    id: '9',
    userId: '1',
    name: 'Cloud Works',
    bio: 'Cloud Works provides cutting-edge cloud computing solutions.',
    email: 'hr@cloudworks.com',
    logo: '',
  },
  {
    id: '10',
    userId: '2',
    name: 'SecureTech',
    bio: 'SecureTech specializes in cybersecurity solutions for modern businesses.',
    email: 'security@securetech.com',
    logo: '',
  },
  {
    id: '11',
    userId: '1',
    name: 'QA Solutions',
    bio: 'QA Solutions ensures top-notch quality assurance services for software.',
    email: 'contact@qasolutions.com',
    logo: '',
  },
  {
    id: '12',
    userId: '2',
    name: 'WriteTech',
    bio: 'WriteTech specializes in high-quality technical writing services.',
    email: 'hr@writetech.com',
    logo: '',
  },
];

let jobs = [
  {
    id: '1',
    userId: '1',
    title: 'Frontend Developer',
    description: 'Develop and maintain web applications.',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasExperiencerange: true,
    minExperience: 1,
    maxExperience: 2,
    hasSalaryRange: true,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
    minSalary: 60000,
    maxSalary: 80000,
    isVerifiedJob: true,
    companyId: '1',
  },
  {
    id: '2',
    userId: '2',
    title: 'Backend Developer',
    description: 'Build and maintain server-side logic.',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
    hasExperiencerange: false,
    hasSalaryRange: false,
    minSalary: null,
    maxSalary: null,
    isVerifiedJob: false,
    companyId: '2',
  },
  {
    id: '3',
    userId: '1',
    title: 'Full Stack Developer',
    description: 'Develop both client-side and server-side software.',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasExpiryDate: false,
    hasExperiencerange: true,
    minExperience: 3,
    maxExperience: 4,
    hasSalaryRange: true,
    minSalary: 90000,
    maxSalary: 120000,
    isVerifiedJob: true,
    companyId: '3',
  },
  {
    id: '4',
    userId: '2',
    title: 'DevOps Engineer',
    description:
      'Automate and streamline the company’s operations and processes.',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasExperiencerange: true,
    minExperience: 1,
    maxExperience: 2,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
    hasSalaryRange: true,
    minSalary: 50000,
    maxSalary: 70000,
    isVerifiedJob: true,
    companyId: '4',

  },
  {
    id: '5',
    userId: '1',
    title: 'Product Manager',
    description:
      'Oversee product development and ensure the success of the product.',
    category: 'management',
    type: EmployementType.Full_time,
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
    hasExperiencerange: false,
    hasSalaryRange: true,
    minSalary: 110000,
    maxSalary: 150000,
    isVerifiedJob: true,
    companyId: '5',

  },
  {
    id: '6',
    userId: '2',
    title: 'Data Scientist',
    description:
      'Analyze and interpret complex data to help the company make informed decisions.',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasExperiencerange: true,
    minExperience: 1,
    maxExperience: 2,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
    hasSalaryRange: true,
    minSalary: 80000,
    maxSalary: 100000,
    isVerifiedJob: false,
    companyId: '6',

  },
  {
    id: '7',
    userId: '1',
    title: 'UX/UI Designer',
    description:
      'Design user-friendly interfaces for web and mobile applications.',
    category: 'design',
    type: EmployementType.Full_time,
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasExperiencerange: true,
    hasExpiryDate: false,
    minExperience: 1,
    maxExperience: 2,
    hasSalaryRange: true,
    minSalary: 70000,
    maxSalary: 90000,
    isVerifiedJob: false,
    companyId: '7',
  },
  {
    id: '8',
    userId: '2',
    title: 'Mobile App Developer',
    description: 'Develop and maintain mobile applications.',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasExperiencerange: true,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
    minExperience: 1,
    maxExperience: 2,
    hasSalaryRange: false,
    minSalary: null,
    maxSalary: null,
    isVerifiedJob: true,
    companyId: '8',
  },
  {
    id: '9',
    userId: '1',
    title: 'Cloud Engineer',
    description: 'Design and manage cloud-based systems and services.',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasExperiencerange: true,
    hasExpiryDate: false,
    minExperience: 1,
    maxExperience: 2,
    hasSalaryRange: true,
    minSalary: 100000,
    maxSalary: 130000,
    isVerifiedJob: true,
    companyId: '9',
  },
  {
    id: '10',
    userId: '2',
    title: 'Security Analyst',
    description: 'Ensure the security and integrity of company systems.',
    category: 'support',
    type: EmployementType.Full_time,
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasExperiencerange: true,
    minExperience: 1,
    maxExperience: 2,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
    hasSalaryRange: true,
    minSalary: 75000,
    maxSalary: 95000,
    isVerifiedJob: false,
    companyId: '10',
  },
  {
    id: '11',
    userId: '1',
    title: 'QA Engineer',
    description: 'Ensure the quality of software products.',
    category: 'support',
    type: EmployementType.Full_time,
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasSalaryRange: true,
    hasExpiryDate: false,
    hasExperiencerange: false,
    minSalary: 25000,
    maxSalary: 50000,
    isVerifiedJob: true,
    companyId: '11',
  },
  {
    id: '12',
    userId: '2',
    title: 'Technical Writer',
    description: 'Create and manage technical documentation.',
    category: 'writing',
    type: EmployementType.Contract,
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
    hasExperiencerange: true,
    minExperience: 1,
    maxExperience: 2,
    hasSalaryRange: false,
    minSalary: null,
    maxSalary: null,
    isVerifiedJob: true,
    companyId: '12',
  },
];

async function seedUsers() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10);
    for (const u of users) {
      try {
        await prisma.user.upsert({
          where: { email: u.email },
          update: {},
          create: {
            id: u.id,
            email: u.email,
            name: u.name,
            password: hashedPassword,
            role: u.role || Role.USER,
            emailVerified: new Date(),
          },
        });
        console.log(`User created or updated: ${u.email}`);
      } catch (error) {
        console.log(`Error processing user ${u.email}:`, error);
      }
    }
    console.log('✅ User seed completed');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

async function seedCompanies() {
  try {
    await Promise.all(
      companies.map(async (c) =>
        prisma.company.upsert({
          where: { id: c.id },
          create: {
            id: c.id,
            name: c.name,
            bio: c.bio,
            email: c.email,
            userId: c.userId,
            logo: '/main.svg',
          },
          update: {},
        })
      )
    );
    console.log('✅ Company seed completed successfully');
  } catch (error) {
    console.error('Error seeding companies:', error);
  }
}

async function seedJobs() {
  try {
    const existingUsers = await prisma.user.findMany({
      select: { id: true },
    });
    const existingUserIds = new Set(existingUsers.map((user) => user.id));

    const validJobs = jobs.filter((job) => existingUserIds.has(job.userId));

    await Promise.all(
      validJobs.map(async (j) =>
        prisma.job.upsert({
          where: { id: j.id },
          create: {
            id: j.id,
            userId: j.userId,
            title: j.title,
            description: j.description,
            category: j.category,
            type: j.type,
            workMode: j.workMode,
            currency: j.currency,
            application: 'https://x.com/100xDevs',
            city: faker.location.city(),
            address: faker.location.city(),
            hasExperiencerange: j.hasExperiencerange,
            hasExpiryDate: j.hasExpiryDate,
            expiryDate: j.expiryDate,
            minExperience: j.minExperience,
            maxExperience: j.maxExperience,
            hasSalaryRange: j.hasSalaryRange,
            minSalary: j.minSalary,
            maxSalary: j.maxSalary,
            skills: [
              'Java',
              'REST API',
              'React',
              'Node.js',
              'CSS',
              'HTML',
              'Python',
              'SQL',
            ],
            isVerifiedJob: j.isVerifiedJob,
            companyId: j.companyId,

          },
          update: {},
        })
      )
    );
    console.log('✅ Job seed completed successfully');
  } catch (error) {
    console.error('Error seeding jobs:', error);
  }
}

async function main() {
  await seedUsers();
  await seedCompanies();
  await seedJobs();
}

main();
