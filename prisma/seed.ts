import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const job_placeholder = [
  {
    title: "Full-Stack Developer at Stripe",
    type: "Full-time",
    companyName: "Stripe",
    location: "San Francisco, California, United States",
    salary: "150000",
    approved: true,
    description: `
**About Stripe**

Stripe is a global technology company that builds economic infrastructure for the internet. Our suite of products and services are designed to power commerce for online businesses of all sizes. At Stripe, we're looking for passionate, creative, and innovative developers to help build the next generation of payment platforms.

**Job Description**

As a Full-Stack Developer at Stripe, you will be working on cutting-edge technology to build and maintain scalable, efficient, and reliable software solutions. You'll collaborate with a team of talented engineers, designers, and product managers to deliver exceptional user experiences.

**Key Responsibilities**

- Design, develop, test, deploy, maintain, and improve software across the stack.
- Work closely with other engineering teams to integrate and develop new features.
- Contribute to the full software development lifecycle, including requirements analysis, architecture, design, coding, testing, and deployment.
- Optimize applications for maximum speed and scalability.
- Participate in code reviews and mentor junior developers.

**Qualifications**

- Bachelor's degree in Computer Science, Engineering, or a related field, or equivalent practical experience.
- 3+ years of experience in full-stack development.
- Proficiency in one or more general-purpose programming languages including but not limited to: Ruby, Java, JavaScript, Python.
- Experience with front-end technologies such as React, Angular, or Vue.js.
- Familiarity with server-side frameworks like Ruby on Rails, Django, or Node.js.
- Knowledge of database technologies such as MySQL, PostgreSQL, and MongoDB.
- Strong understanding of web technologies and architectures.
- Excellent problem-solving skills and attention to detail.

**Benefits**

- Competitive salary and equity package.
- Health, dental, and vision insurance.
- Generous vacation and parental leave policies.
- 401(k) plan with employer match.
- Flexible work arrangements.
- Continuous learning and development opportunities.

Stripe is an equal opportunity employer. We value diversity and are committed to creating an inclusive environment for all employees.
`,
  },
  {
    title: "Full-Stack Developer at Vercel",
    type: "Part-time",
    companyName: "Vercel",
    location: "San Francisco, California, United States",
    salary: "150000",
    approved: false,
    description: `
**About Vercel:** 

Vercel is a cloud platform for static sites and Serverless Functions that fits perfectly with your workflow. It enables developers to host Jamstack websites with ease.

Job Description: We're looking for a talented Full-Stack Developer to join our dynamic team. As a Full-Stack Developer at Vercel, you'll work on a variety of projects, building high-quality, scalable web applications. You'll collaborate with a team of designers, developers, and product managers to push the boundaries of what's possible on the web.

**Key Responsibilities:**

-   Develop and maintain front-end and back-end components of our web applications.
-   Collaborate with cross-functional teams to define, design, and ship new features.
-   Ensure the performance, quality, and responsiveness of applications.
-   Identify and correct bottlenecks and fix bugs.
-   Help maintain code quality, organization, and automatization.

**Qualifications:**

-   Bachelor's degree in Computer Science or a related field, or equivalent experience.
-   Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.
-   Experience with React.js and its core principles.
-   Experience with popular React.js workflows (such as Flux or Redux).
-   Familiarity with newer specifications of EcmaScript.
-   Experience with data structure libraries (e.g., Immutable.js).
-   Knowledge of isomorphic React is a plus.
-   Experience with RESTful APIs.
-   Knowledge of modern authorization mechanisms, such as JSON Web Token.
-   Familiarity with modern front-end build pipelines and tools.
-   Experience with common front-end development tools such as Babel, Webpack, NPM, etc.
-   A knack for benchmarking and optimization.
-   Familiarity with code versioning tools (such as Git).

**Benefits:**

-   Competitive salary and equity.
-   Health, dental, and vision insurance.
-   Unlimited vacation policy.
-   Home office stipend.
-   Professional development allowance.

Vercel is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.

Join us at Vercel and be a part of shaping the future of web development!
`,
  },
];

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const userData = [
    {
      name: "Jane",
      email: "user1@gmail.com",
      password: hashedPassword,
      role: Role.USER,
    },
    {
      name: "Max",
      email: "user2@gmail.com",
      password: hashedPassword,
      role: Role.USER,
    },
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  ];

  for (const user of userData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("users created");

  await Promise.all(
    job_placeholder.map(async (job) => {
      await prisma.job.create({
        data: {
          type: job.type,
          title: job.title,
          companyName: job.companyName,
          location: job.location,
          description: job.description,
          salary: job.salary,
        },
      });
    })
  );
  console.log("job created");

  console.log("Seed operation completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
