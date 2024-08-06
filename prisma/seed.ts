import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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