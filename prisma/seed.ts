import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash("12345", 10);
  const users = await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@gmail.com",
        password: hashedPassword,
        role: "USER",
        emailVerified: new Date(),
      },

      {
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    ],
  });
  console.log(users, "Users created");
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
