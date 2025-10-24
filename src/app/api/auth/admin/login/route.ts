import { env } from "@/env";
import { prisma } from "@/lib/db/prisma-client";
import { decrypt } from "@/utils/encrypt";

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const decryptedPassword = decrypt(String(password), env.ENCRYPTION_KEY);
    if (!email || !password) {
      throw new Error("Missing email or password");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "admin") {
      throw new Error("User is not an admin");
    }
    const account = await prisma.account.findFirst({
      where: {
        userId: user?.id,
        providerId: "credential",
      },
    });
    if (!account || !account.password) {
      throw new Error("Account not found");
    }
    const storedDecryptedPassword = decrypt(
      account.password,
      env.ENCRYPTION_KEY
    );
    if (storedDecryptedPassword !== decryptedPassword) {
      throw new Error("Invalid credentials");
    }
    return new Response(null, { status: 302 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during admin login:", error.message);
    } else {
      console.error("Unknown error during admin login");
    }
    return new Response("Internal server error", { status: 500 });
  }
};
