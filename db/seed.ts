import { config } from "dotenv";
config({
  path: ".env.local",
});
import { generateRandomString } from "../src/lib/random";
import { encrypt } from "../src/utils/encrypt";
import { $Enums, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const email = "anna@application.com";
const password = "#AdminIsCool2025";

void (async function () {
  const prisma = new PrismaClient();

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.application.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 Creating admin user...");
  await prisma.user.create({
    data: {
      email,
      name: "Anna Admin",
      emailVerified: faker.datatype.boolean(),
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

  console.log("📝 Creating applications with faker data...");
  const applicationIds = Array.from({ length: 100 }).map(() =>
    generateRandomString(32)
  );

  const applicationsPromises = applicationIds.map((id, index) => {
    return prisma.application.create({
      data: {
        id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        status: faker.helpers.arrayElement(["PENDING", "APPROVED", "REJECTED"]),
        agencyAddress: faker.location.streetAddress({ useFullAddress: true }),
        phone: faker.phone.number(),
        instagram: faker.internet.username(),
        agencyName: faker.company.name(),
        birthCountry: faker.location.country(),
        birthDate: faker.date.birthdate({ min: 18, max: 45, mode: "age" }),
        city: faker.location.city(),
        birthPlace: faker.location.city(),
        country: faker.location.country(),
        emergencyContactPhone: faker.phone.number(),
        emergencyContactName: faker.person.fullName(),
        fotoKey: "applications/YyVNlWI8H2CiH6X5-TKO9hGFV3Of1eJV/foto.png",
        passportKey:
          "applications/YyVNlWI8H2CiH6X5-TKO9hGFV3Of1eJV/passport.png",
        gender: faker.helpers.arrayElement(["male", "female", "diverse"]),
        hasBeenInCountryBefore: faker.datatype.boolean(),
        nationality: faker.location.country(),
        postalCode: faker.location.zipCode(),
        street: faker.location.streetAddress(),
        allergies:
          faker.helpers.maybe(() => faker.lorem.sentence(), {
            probability: 0.3,
          }) || null,
        canRideBike: faker.datatype.boolean(),
        clothingSize: faker.helpers.arrayElement([
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
        ]),
        driverLicense: faker.helpers.arrayElement(["A", "B", "C", "D", "NONE"]),
        germanLevel: faker.helpers.arrayElement([
          "A1",
          "A2",
          "B1",
          "B2",
          "C1",
          "C2",
        ]),
        healthRestrictions:
          faker.helpers.maybe(() => faker.lorem.sentence(), {
            probability: 0.2,
          }) || null,
        semesterBreakFrom: faker.helpers.maybe(
          () => faker.date.future({ years: 1 }),
          { probability: 0.6 }
        ),
        semesterBreakTo: faker.helpers.maybe(
          () => faker.date.future({ years: 1 }),
          { probability: 0.6 }
        ),
        university: faker.helpers.maybe(
          () => faker.company.name() + " University",
          { probability: 0.7 }
        ),
        studySubject: faker.helpers.maybe(
          () =>
            faker.helpers.arrayElement([
              "Computer Science",
              "Business Administration",
              "Engineering",
              "Medicine",
              "Psychology",
              "Law",
              "Economics",
              "International Relations",
            ]),
          { probability: 0.7 }
        ),
        otherLanguages: faker.helpers.maybe(
          () =>
            faker.helpers
              .arrayElements([
                "Spanish",
                "French",
                "Italian",
                "Russian",
                "Chinese",
                "Japanese",
              ])
              .join(", "),
          { probability: 0.4 }
        ),
        shiftWork: faker.helpers.maybe(() => faker.datatype.boolean(), {
          probability: 0.5,
        }),
        shoeSize: faker.helpers.maybe(
          () => faker.number.int({ min: 35, max: 48 }).toString(),
          { probability: 0.8 }
        ),
        taxId: faker.helpers.maybe(() => faker.string.alphanumeric(10), {
          probability: 0.3,
        }),
        previousStayCountry: faker.helpers.maybe(
          () => faker.location.country(),
          { probability: 0.3 }
        ),
        previousStayPlace: faker.helpers.maybe(() => faker.location.city(), {
          probability: 0.3,
        }),
        previousStayPeriodFrom: faker.helpers.maybe(
          () => faker.date.past({ years: 5 }),
          { probability: 0.3 }
        ),
        previousStayPeriodTo: faker.helpers.maybe(
          () => faker.date.past({ years: 3 }),
          { probability: 0.3 }
        ),
        languageCertificateKey:
          "applications/YyVNlWI8H2CiH6X5-TKO9hGFV3Of1eJV/language_certificate.png",
        studyCertificateKey: faker.helpers.maybe(
          () =>
            "applications/YyVNlWI8H2CiH6X5-TKO9hGFV3Of1eJV/study_certificate.png",
          { probability: 0.6 }
        ),
        visa: {
          create: {
            id: generateRandomString(32),
            type:
              index % 2 === 0
                ? $Enums.VisaType.KKB_3_MONTHS
                : $Enums.VisaType.STUDENT,
            visaKKB:
              index % 2 === 0
                ? {
                    create: {},
                  }
                : undefined,
            visaStudent:
              index % 2 === 1
                ? {
                    create: {},
                  }
                : undefined,
          },
        },
      },
    });
  });

  await Promise.all(applicationsPromises);

  console.log("✅ Seed completed successfully!");
  console.log(
    `Created 1 admin user and ${applicationIds.length} applications with realistic faker data`
  );

  await prisma.$disconnect();
})();
