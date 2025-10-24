import { config } from "dotenv";
config({
  path: ".env.local",
});
import { PrismaClient } from "@prisma/client";
import { generateRandomString } from "../src/lib/random";
import { encrypt } from "@/utils/encrypt";
const prisma = new PrismaClient();

const action = process.argv[2];
const password = process.argv[3];
const email = "admin@application-management.com";
void (async function main() {
  await prisma.$connect();

  if (action === "create-admin" && typeof password === "string") {
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
        accounts: {
          create: {
            id: generateRandomString(32),
            accountId: generateRandomString(32),
            providerId: "credential",
            password: encrypt(password, process.env.ENCRYPTION_KEY!),
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
  } else if (action === "delete-all-tables") {
    await prisma.user.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verification.deleteMany();
  }

  await prisma.$disconnect();
})();
