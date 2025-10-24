import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  success: boolean;
  redirectUrl?: string;
}

async function signIn(data: SignInData): Promise<SignInResponse> {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);

  const response = await fetch("/api/auth/admin/login", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return {
    success: true,
    redirectUrl: response.redirected ? response.url : undefined,
  };
}

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    },
    onError: (error) => {
      toast.error("Login failed. Please try again.");
      console.error("Sign in error:", error);
    },
  });
}
