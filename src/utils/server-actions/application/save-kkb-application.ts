"use server";

import { ApplicationFormData } from "@/components/forms/application-form/application-form-schema";
import { prisma } from "@/lib/db/prisma-client";
import { generateRandomString } from "@/lib/random";
import { $Enums } from "@prisma/client";

export const saveKKBApplication = async (
  data: ApplicationFormData,
  visaType: $Enums.VisaType
) => {
  "use server";

  await prisma.application.create({
    data: {
      id: generateRandomString(32),
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      nationality: data.nationality,
      birthDate: new Date(data.birthDate),
      birthPlace: data.birthPlace,
      birthCountry: data.birthCountry,
      street: data.street,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
      // Agency
      agencyName: data.agencyName,
      agencyAddress: data.agencyAddress,
      // Study Information
      semesterBreakFrom: data.semesterBreakFrom
        ? new Date(data.semesterBreakFrom)
        : null,
      semesterBreakTo: data.semesterBreakTo
        ? new Date(data.semesterBreakTo)
        : null,
      university: data.university,
      studySubject: data.studySubject,
      germanLevel: data.germanLevel,
      otherLanguages: data.otherLanguages,
      driverLicense: data.driverLicense,
      canRideBike: data.canRideBike,
      shiftWork: data.shiftWork,
      healthRestrictions: data.healthRestrictions,
      allergies: data.allergies,
      clothingSize: data.clothingSize,
      shoeSize: data.shoeSize,
      // Previous stay in Germany
      hasBeenInCountryBefore: data.previousStayInGermany === "Ja",
      previousStayCountry: "Germany",
      previousStayPlace: data.previousStayPlace,
      previousStayPeriodFrom: data.previousStayPeriodFrom
        ? new Date(data.previousStayPeriodFrom)
        : null,
      previousStayPeriodTo: data.previousStayPeriodTo
        ? new Date(data.previousStayPeriodTo)
        : null,
      // Contact Information
      taxId: data.taxId,
      phone: data.phone,
      email: data.email,
      instagram: data.instagram,
      // Emergency Contact
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyPhone,
      // File Uploads
      fotoUrl: "",
      passportUrl: "",

      visa: {
        create: {
          id: generateRandomString(32),
          type: visaType,
          visaKKB: { create: {} },
        },
      },
    },
  });
};
