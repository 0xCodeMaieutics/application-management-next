import { ApplicationFormData } from "@/components/forms/application-form/application-form-schema";
import { env } from "@/env";

export class TelegramAPI {
  private botToken: string;
  private chatId: string;

  constructor() {
    this.botToken = env.TELEGRAM_BOT_TOKEN;
    this.chatId = env.TELEGRAM_BOT_CHAT_ID;
    if (!this.botToken || !this.chatId) {
      console.error(
        "Telegram bot token or chat ID not found in environment variables"
      );
    }
  }

  private formatApplicationFormData(data: ApplicationFormData): string {
    const formatSection = (
      title: string,
      fields: Record<string, string | undefined>
    ) => {
      const formattedFields = Object.entries(fields)
        .filter(([, value]) => value !== undefined && value !== "")
        .map(([key, value]) => {
          const label = this.getFieldLabel(key);
          return `- ${label}: ${value}`;
        })
        .join("\n");

      return formattedFields
        ? `📋 <b>${title}</b>\n${formattedFields}\n\n`
        : "";
    };

    const fullName = `${data.firstName} ${data.lastName}`;
    let message = `<b>${fullName}</b> sent a new application\n\n`;

    message += formatSection("AGENTUR INFORMATION", {
      agencyName: data.agencyName,
      agencyAddress: data.agencyAddress,
    });

    message += formatSection("PERSÖNLICHE DATEN", {
      gender: data.gender,
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      birthPlace: data.birthPlace,
      birthCountry: data.birthCountry,
      street: data.street,
      postalCode: data.postalCode,
      country: data.country,
      nationality: data.nationality,
    });

    message += formatSection("STUDIUM & QUALIFIKATIONEN", {
      semesterBreak: data.semesterBreak,
      university: data.university,
      studySubject: data.studySubject,
      germanLevel: data.germanLevel,
      otherLanguages: data.otherLanguages,
      driverLicense: data.driverLicense,
      canRideBike: data.canRideBike,
      shiftWork: data.shiftWork,
    });

    message += formatSection("GESUNDHEIT & PERSÖNLICHE ANGABEN", {
      healthRestrictions: data.healthRestrictions,
      allergies: data.allergies,
      clothingSize: data.clothingSize,
      shoeSize: data.shoeSize,
    });

    message += formatSection("AUFENTHALT IN DEUTSCHLAND", {
      previousStayInGermany: data.previousStayInGermany,
      previousStayWhere: data.previousStayWhere,
      previousStayPeriod: data.previousStayPeriod,
    });

    message += formatSection("KONTAKTDATEN", {
      taxId: data.taxId,
      phone: data.phone,
      email: data.email,
      instagram: data.instagram,
    });

    message += formatSection("NOTFALLKONTAKT", {
      emergencyContact: data.emergencyContact,
      emergencyPhone: data.emergencyPhone,
    });

    message += `\n⏰ Eingereicht am: ${new Date().toLocaleString("de-DE")}`;

    return message;
  }

  private getFieldLabel(key: string): string {
    const labels: Record<string, string> = {
      agencyName: "Agentur Name",
      agencyAddress: "Agentur Adresse",
      gender: "Geschlecht",
      firstName: "Vorname",
      lastName: "Nachname",
      birthDate: "Geburtsdatum",
      birthPlace: "Geburtsort",
      birthCountry: "Geburtsland",
      street: "Straße",
      postalCode: "PLZ/Ort",
      country: "Land",
      nationality: "Staatsangehörigkeit",
      semesterBreak: "Semesterferien",
      university: "Universität",
      studySubject: "Studienfach",
      germanLevel: "Deutschkenntnisse",
      otherLanguages: "Weitere Sprachen",
      driverLicense: "Führerschein",
      canRideBike: "Fahrradfahren",
      shiftWork: "Schichtarbeit",
      healthRestrictions: "Gesundheitliche Einschränkungen",
      allergies: "Allergien",
      clothingSize: "Kleidergröße",
      shoeSize: "Schuhgröße",
      previousStayInGermany: "Vorheriger Aufenthalt in Deutschland",
      previousStayWhere: "Aufenthaltsort",
      previousStayPeriod: "Aufenthaltszeitraum",
      taxId: "Steuer-ID",
      phone: "Telefon",
      email: "E-Mail",
      instagram: "Instagram",
      emergencyContact: "Notfallkontakt",
      emergencyPhone: "Notfalltelefon",
    };
    return labels[key] || key;
  }

  private escapeHtml(text: string): string {
    if (!text) return "";
    return text
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  sendMessage(text: string) {
    return fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: this.chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  }

  async sendDocument(file: File, caption?: string) {
    const formData = new FormData();
    formData.append("chat_id", this.chatId);
    formData.append("document", file);
    if (caption) {
      formData.append("caption", caption);
    }
    return fetch(`https://api.telegram.org/bot${this.botToken}/sendDocument`, {
      method: "POST",
      body: formData,
    });
  }

  async sendVideo(file: File, caption?: string) {
    const formData = new FormData();
    formData.append("chat_id", this.chatId);
    formData.append("video", file);
    if (caption) {
      formData.append("caption", caption);
    }

    return fetch(`https://api.telegram.org/bot${this.botToken}/sendVideo`, {
      method: "POST",
      body: formData,
    });
  }

  async sendPhoto(file: File, caption?: string) {
    const formData = new FormData();
    formData.append("chat_id", this.chatId);
    formData.append("photo", file);
    if (caption) {
      formData.append("caption", caption);
    }
    return fetch(`https://api.telegram.org/bot${this.botToken}/sendPhoto`, {
      method: "POST",
      body: formData,
    });
  }

  async setApplicationData(data: ApplicationFormData) {
    const formattedMessage = this.formatApplicationFormData(data);
    const result = await this.sendMessage(formattedMessage);
    if (!result.ok) {
      throw new Error("Failed to send message to Telegram");
    }
    const filePromises = [];
    if (data.introductionVideo) {
      filePromises.push(
        this.sendVideo(
          data.introductionVideo,
          `🎥 Vorstellungsvideo: ${data.firstName} ${data.lastName}`
        )
      );
    }
    if (data.foto) {
      filePromises.push(
        this.sendPhoto(
          data.foto,
          `📸 Bewerberfoto: ${data.firstName} ${data.lastName}`
        )
      );
    }
    if (data.passport) {
      filePromises.push(
        this.sendDocument(
          data.passport,
          `📄 Reisepass: ${data.firstName} ${data.lastName}`
        )
      );
    }
    if (filePromises.length > 0) {
      await Promise.all(filePromises);
    }
  }
}
