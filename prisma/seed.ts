import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Jane",
        email: "user1@gmail.com",
        password: hashedPassword,
        role: "USER",
      },
      {
        name: "Max",
        email: "user2gmail.com",
        password: hashedPassword,
        role: "USER",
      },
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    ],
    skipDuplicates: true,
  });
  console.log(users, "Users created");

  const adminUser = await prisma.user.findUnique({
    where: { email: "admin@gmail.com" },
  });

  // Check if Admin user exists
  if (adminUser) {
    const adminUserId = adminUser.id;

    // Create job entries with the Admin user ID
    const jobs = await prisma.job.createMany({
      data: [
        {
          userId: adminUserId,
          title: "Software Engineer",
          description: "Develop and maintain software solutions.",
          companyName: "Tech Corp",
          salary: "100000",
          currency: "USD",
          location: "New York",
          state: "NY",
          country: "USA",
        },
        {
          userId: adminUserId,
          title: "Product Manager",
          description: "Lead the product team and define product strategy.",
          companyName: "Innovate Ltd",
          salary: "120000",
          currency: "USD",
          location: "San Francisco",
          state: "CA",
          country: "USA",
        },
      ],
    });
    console.log(jobs, "Jobs created");
  } else {
    console.log("Admin user not found");
  }
  
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
