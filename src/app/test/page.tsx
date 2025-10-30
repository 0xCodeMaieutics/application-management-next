"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { FileUpload } from "@/components/ui/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const acceptedVideoTypes = ["video/mp4", "video/quicktime"];
const formSchema = z.object({
  introductionVideo: z
    .instanceof(File, { message: "Ein Vorstellungsvideo ist erforderlich" })
    .refine((file) => acceptedVideoTypes.includes(file.type), {
      message: "Nur MP4 Dateien sind erlaubt",
    }),
});

const TestPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      introductionVideo: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const input = document.querySelector(
      'input[id="introductionVideo"]'
    ) as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const clonedFile = new File([file], file.name, { type: file.type });
    const formData = new FormData();
    formData.append("file", clonedFile, clonedFile.name);

    fetch("/api/test", {
      method: "POST",
      body: formData,
    }).then(console.log);
  };

  const onInvalid = (errors: unknown) => {};

  return (
    <form
      id="application-form"
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      noValidate
    >
      <div className="space-y-8">
        <div>
          <Controller
            name="introductionVideo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="foto">Foto *</FieldLabel>
                <FileUpload
                  id="introductionVideo"
                  accept=".mp4,.mov"
                  value={field.value || null}
                  onChange={(file) => field.onChange(file)}
                  placeholder="Vorstellungsvideo hochladen"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button className="mx-auto" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default TestPage;
