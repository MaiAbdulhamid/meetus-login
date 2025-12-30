"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginApi, getUserInfo } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import { LoginCredentials } from "@/types/auth";

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const loginResponse = await loginApi(credentials);

      const userInfo = await getUserInfo(loginResponse.token);

      return { token: loginResponse.token, user: userInfo };
    },
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
      router.push("/dashboard");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
    router.push("/login");
  };
}
