import z from "zod";

const acceptedImageTypes = ["image/png", "image/jpeg"];
const acceptedPassportTypes = ["application/pdf"];
// const acceptedVideoTypes = ["video/mp4", "video/quicktime"];

export const applicationFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "Vorname ist erforderlich"),
  lastName: z.string().min(1, "Nachname ist erforderlich"),
  gender: z.enum(["männlich", "weiblich", "divers"]),
  nationality: z.string().min(1, "Staatsangehörigkeit ist erforderlich"),
  birthDate: z.string().min(1, "Geburtsdatum ist erforderlich"),
  birthPlace: z.string().min(1, "Geburtsort ist erforderlich"),
  birthCountry: z.string().min(1, "Geburtsland ist erforderlich"),
  street: z.string().min(1, "Straße, Hausnummer ist erforderlich"),
  postalCode: z.string().min(1, "Postleitzahl, Ort ist erforderlich"),
  city: z.string().min(1, "Stadt ist erforderlich"),
  country: z.string().min(1, "Land ist erforderlich"),

  // Agentur Information
  agencyName: z.string().min(1, "Name der Agentur ist erforderlich"),
  agencyAddress: z.string().min(1, "Anschrift der Agentur ist erforderlich"),

  // Study Information
  semesterBreak: z.string().optional(),
  university: z.string().optional(),
  studySubject: z.string().optional(),
  germanLevel: z.enum(["A1", "A2", "B1", "B2", "C1"]).optional(),
  otherLanguages: z.string().optional(),
  driverLicense: z.string().optional(),
  canRideBike: z.enum(["Ja", "Nein"]).optional(),
  shiftWork: z.enum(["Ja", "Nein"]).optional(),
  healthRestrictions: z.string().optional(),
  allergies: z.string().optional(),
  clothingSize: z.string().optional(),
  shoeSize: z.string().optional(),

  // Previous stay in Germany
  previousStayInGermany: z.enum(["Ja", "Nein"]).optional(),
  previousStayPlace: z.string().optional(),
  previousStayPeriodFrom: z.string().optional(),
  previousStayPeriodTo: z.string().optional(),

  // Contact Information
  taxId: z.string().optional(),
  phone: z.string().min(1, "Telefonnummer ist erforderlich"),
  email: z.string().email("Gültige E-Mail-Adresse erforderlich"),
  instagram: z.string().optional(),

  // Emergency Contact
  emergencyContactName: z
    .string()
    .min(1, "Notfall-Kontaktperson ist erforderlich"),
  emergencyPhone: z.string().min(1, "Notfall-Telefonnummer ist erforderlich"),

  // File Uploads
  // foto: z
  //   .instanceof(File, { message: "Foto ist erforderlich" })
  //   .refine((file) => acceptedImageTypes.includes(file.type), {
  //     message: "Nur PNG oder JPG Dateien sind erlaubt",
  //   }),
  // passport: z
  //   .instanceof(File, { message: "Reisepass ist erforderlich" })
  //   .refine((file) => acceptedPassportTypes.includes(file.type), {
  //     message: "Nur PDF Dateien sind erlaubt",
  //   }),
  // introductionVideo: z
  //   .instanceof(File, { message: "Ein Vorstellungsvideo ist erforderlich" })
  //   .refine((file) => acceptedVideoTypes.includes(file.type), {
  //     message: "Nur MP4 Dateien sind erlaubt",
  //   }),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
