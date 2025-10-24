import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { generateRandomString } from "../src/lib/random";
const prisma = new PrismaClient();

const action = process.argv[2];

const email = "admin@application-management.com";
void (async function main() {
  await prisma.$connect();
  if (action === "create-admin") {
    await prisma.user.create({
      data: {
        email,
        name: "Admin",
        emailVerified: false,
        role: "admin",
        id: generateRandomString(32),
        sessions: {
          create: {
            id: generateRandomString(32),
            expiresAt: new Date("2099-12-31T23:59:59.999Z"),
            token: generateRandomString(64),
          },
        },
      },
    });
  } else if (action === "delete") {
    await prisma.user.deleteMany({
      where: {
        email,
      },
    });
  }

  await prisma.$disconnect();
})();
