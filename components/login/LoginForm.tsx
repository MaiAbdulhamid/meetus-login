"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { MailIcon, LockIcon } from "../icons";
import { useLogin } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <Input
        {...register("email")}
        type="email"
        placeholder="Email"
        icon={<MailIcon />}
        error={errors.email?.message}
        autoComplete="email"
      />

      <Input
        {...register("password")}
        type="password"
        placeholder="Password"
        icon={<LockIcon />}
        error={errors.password?.message}
        autoComplete="current-password"
      />

      {error && (
        <p className="text-red-500 text-sm text-center">
          Invalid email or password
        </p>
      )}

      <Button
        className="mt-8 mb-8"
        type="submit"
        disabled={!isValid}
        isLoading={isPending}
      >
        Login
      </Button>
    </form>
  );
}
