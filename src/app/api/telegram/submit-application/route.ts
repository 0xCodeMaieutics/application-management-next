import { NextRequest, NextResponse } from "next/server";
import { TelegramAPI } from "@/lib/telegram";
import { ApplicationFormData } from "@/components/forms/application-form/application-form-schema";

const clientTelegram = new TelegramAPI();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const applicationData = {
      introductionVideo:
        (formData.get("introductionVideo") as File) || undefined,
      foto: (formData.get("foto") as File) || undefined,
      passport: (formData.get("passport") as File) || undefined,

      agencyName: formData.get("agencyName") as string,
      agencyAddress: formData.get("agencyAddress") as string,

      gender: formData.get("gender") as ApplicationFormData["gender"],
      lastName: formData.get("lastName") as string,
      firstName: formData.get("firstName") as string,
      birthDate: formData.get("birthDate") as string,
      birthPlace: formData.get("birthPlace") as string,
      birthCountry: formData.get("birthCountry") as string,
      street: formData.get("street") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
      nationality: formData.get("nationality") as string,

      semesterBreak: formData.get("semesterBreak") as string,
      university: formData.get("university") as string,
      studySubject: formData.get("studySubject") as string,
      germanLevel: formData.get(
        "germanLevel"
      ) as ApplicationFormData["germanLevel"],
      otherLanguages: formData.get("otherLanguages") as string,
      driverLicense: formData.get("driverLicense") as string,
      canRideBike: formData.get(
        "canRideBike"
      ) as ApplicationFormData["canRideBike"],
      shiftWork: formData.get("shiftWork") as ApplicationFormData["shiftWork"],
      healthRestrictions: formData.get("healthRestrictions") as string,
      allergies: formData.get("allergies") as string,
      clothingSize: formData.get("clothingSize") as string,
      shoeSize: formData.get("shoeSize") as string,

      previousStayInGermany: formData.get(
        "previousStayInGermany"
      ) as ApplicationFormData["previousStayInGermany"],
      previousStayPlace: formData.get("previousStayWhere") as string,
      previousStayPeriod: formData.get("previousStayPeriod") as string,

      taxId: formData.get("taxId") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      instagram: formData.get("instagram") as string,

      emergencyContact: formData.get("emergencyContact") as string,
      emergencyPhone: formData.get("emergencyPhone") as string,
    } satisfies ApplicationFormData;

    await clientTelegram.setApplicationData(applicationData);
    return NextResponse.json("ok");
  } catch {
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
