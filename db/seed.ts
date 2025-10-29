import { config } from "dotenv";
config({
  path: ".env.local",
});
import { generateRandomString } from "../src/lib/random";
import { encrypt } from "../src/utils/encrypt";
import { $Enums, PrismaClient } from "@prisma/client";

const email = "anna@application.com";
const password = "#AdminIsCool2025";

void (async function () {
  const prisma = new PrismaClient();
  await prisma.user.create({
    data: {
      email,
      name: "Anna Admin",
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

  const applicationIds = Array.from({ length: 100 }).map(() =>
    generateRandomString(32)
  );

  const applicationsPromises = applicationIds.map((id, index) => {
    return prisma.application.create({
      data: {
        id,
        firstName: `FirstName${index + 1}`,
        lastName: `LastName${index + 1}`,
        email: `applicant${index + 1}@example.com`,
        status: "PENDING",
        agencyAddress: `123 Main St, City ${index + 1}`,
        phone: `+1234567890${index + 1}`,
        instagram: `applicant${index + 1}`,
        agencyName: `Agency ${index + 1}`,
        birthCountry: `Country ${index + 1}`,
        birthDate: new Date(1990, 0, 1),
        city: `City ${index + 1}`,
        birthPlace: `BirthPlace ${index + 1}`,
        country: `Country ${index + 1}`,
        emergencyContactPhone: `+0987654321${index + 1}`,
        emergencyContactName: `Emergency Contact ${index + 1}`,
        fotoKey: "applications/YyVNlWI8H2CiH6X5-TKO9hGFV3Of1eJV/foto.png",
        passportKey:
          "applications/YyVNlWI8H2CiH6X5-TKO9hGFV3Of1eJV/passport.png",
        gender: "diverse",
        hasBeenInCountryBefore: false,
        nationality: `Nationality ${index + 1}`,
        postalCode: `0000${index + 1}`,
        street: `Street ${index + 1}`,
        allergies: `Allergies info ${index + 1}`,
        canRideBike: true,
        clothingSize: "M",
        driverLicense: "B",
        germanLevel: "A1",
        healthRestrictions: `Health restrictions ${index + 1}`,
        languageCertificateKey:
          "applications/YyVNlWI8H2CiH6X5-TKO9hGFV3Of1eJV/language_certificate.png",
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
})();
