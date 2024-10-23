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
  { id: '2', name: 'Admin', email: 'admin@gmail.com', role: Role.ADMIN, onBoard: true },
  { id: '3', name: 'Hr', email: 'hr@gmail.com', role: Role.HR },
];

const jobs = [
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
    type: EmployementType.Full_time,
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasExperienceRange: true,
    minExperience: 1,
    maxExperience: 2,
    companyLogo: '',
    hasSalaryRange: true,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
    minSalary: 60000,
    maxSalary: 80000,
    isVerifiedJob: true,
  },
  {
    id: '14',
    userId: '5',
    title: 'Blockchain Developer',
    description: 'Develop and implement blockchain solutions for various industries.',
    companyName: 'ChainTech',
    companyBio: 'ChainTech is revolutionizing industries through innovative blockchain solutions.',
    companyEmail: 'jobs@chaintech.io',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasExperienceRange: true,
    minExperience: 2,
    maxExperience: 4,
    companyLogo: '',
    hasSalaryRange: true,
    hasExpiryDate: false,
    minSalary: 90000,
    maxSalary: 140000,
    isVerifiedJob: true,
  },
  {
    id: '15',
    userId: '4',
    title: 'AR/VR Developer',
    description: 'Create immersive augmented and virtual reality experiences.',
    companyName: 'ImmerseTech',
    companyBio: 'ImmerseTech is pushing the boundaries of AR and VR technology.',
    companyEmail: 'hiring@immersetech.com',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.office,
    currency: Currency.USD,
    hasExperienceRange: true,
    minExperience: 1,
    maxExperience: 3,
    companyLogo: '',
    hasSalaryRange: true,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 45)),
    minSalary: 80000,
    maxSalary: 120000,
    isVerifiedJob: false,
  },
  {
    id: '16',
    userId: '5',
    title: 'Cybersecurity Specialist',
    description: 'Protect company assets from cyber threats and implement security measures.',
    companyName: 'CyberShield',
    companyBio: 'CyberShield provides top-tier cybersecurity solutions for businesses of all sizes.',
    companyEmail: 'careers@cybershield.com',
    category: 'security',
    type: EmployementType.Full_time,
    workMode: WorkMode.hybrid,
    currency: Currency.USD,
    hasExperienceRange: true,
    minExperience: 3,
    maxExperience: 6,
    companyLogo: '',
    hasSalaryRange: true,
    hasExpiryDate: true,
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    minSalary: 100000,
    maxSalary: 150000,
    isVerifiedJob: true,
  },
  {
    id: '17',
    userId: '4',
    title: 'Data Engineer',
    description: 'Design and implement data pipelines and infrastructure for big data processing.',
    companyName: 'DataFlow',
    companyBio: 'DataFlow specializes in building scalable data solutions for enterprise clients.',
    companyEmail: 'jobs@dataflow.io',
    category: 'development',
    type: EmployementType.Full_time,
    workMode: WorkMode.remote,
    currency: Currency.USD,
    hasExperienceRange: true,
    minExperience: 2,
    maxExperience: 5,
    companyLogo: '',
    hasSalaryRange: true,
    hasExpiryDate: false,
    minSalary: 95000,
    maxSalary: 140000,
    isVerifiedJob: true,
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
            onBoard: u.onBoard || false,
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

async function seedJobs() {
  try {
    const existingUsers = await prisma.user.findMany({
      select: { id: true },
    });
    const existingUserIds = new Set(existingUsers.map((user) => user.id));

    const validJobs = jobs.filter((job) => existingUserIds.has(job.userId));

    await Promise.all(
      validJobs.map(async (j) => {
        // Create a company for each job
        const company = await prisma.company.create({
          data: {
            name: j.companyName,
            description: j.companyBio,
            website: faker.internet.url(),
            userId: j.userId,
          },
        });

        return prisma.job.upsert({
          where: { id: j.id },
          create: {
            id: j.id,
            userId: j.userId,
            companyId: company.id,
            title: j.title,
            description: j.description,
            companyName: j.companyName,
            companyBio: j.companyBio,
            companyEmail: j.companyEmail,
            category: j.category,
            type: j.type,
            workMode: j.workMode,
            currency: j.currency,
            application: 'https://x.com/100xDevs',
            city: faker.location.city(),
            address: faker.location.city(),
            hasExperienceRange: j.hasExperienceRange,
            hasExpiryDate: j.hasExpiryDate,
            expiryDate: j.expiryDate,
            minExperience: j.minExperience,
            maxExperience: j.maxExperience,
            companyLogo: '/main.svg',
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
          },
          update: {},
        });
      })
    );
    console.log('✅ Job seed completed successfully');
  } catch (error) {
    console.error('Error seeding jobs:', error);
  }
}

async function main() {
  await seedUsers();
  await seedJobs();
}

main()
