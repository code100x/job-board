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
