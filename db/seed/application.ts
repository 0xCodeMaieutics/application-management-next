import {
  ApplicationStatus,
  ApplicationType,
} from "../../src/utils/models/applications";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const createApplications = ({
  applicationIds,
  userIds,
  tx,
}: {
  applicationIds: string[];
  userIds: string[];
  tx: Prisma.TransactionClient;
}) =>
  Promise.all(
    applicationIds.map((appId, index) =>
      tx.application.create({
        data: {
          id: appId,
          type: ApplicationType.STUDENT,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          status: faker.helpers.arrayElement(Object.values(ApplicationStatus)),
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
          driverLicense: faker.helpers.arrayElement([
            "A",
            "B",
            "C",
            "D",
            "NONE",
          ]),
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
            {
              probability: 0.3,
            }
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
          user: {
            connect: {
              id: userIds[index],
            },
          },
        } satisfies Prisma.ApplicationCreateInput,
      })
    )
  );
