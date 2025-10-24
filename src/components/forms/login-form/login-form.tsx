"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { FieldError } from "@/components/ui/field";
import { loginFormSchema } from "./login-form-schema";
import { useSignIn } from "@/lib/mutations/use-sign-in";

export function LoginForm() {
  const signInMutation = useSignIn();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "anna@application.com",
      password: "#AdminIsCool2025",
    },
  });

  function onSubmit(data: z.infer<typeof loginFormSchema>) {
    signInMutation.mutate(data);
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <h1 className="text-2xl text-center font-bold mb-6">Admin Login</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="email"
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  type="password"
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            className="w-full"
            disabled={signInMutation.isPending}
          >
            {signInMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
}
