"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Spinner } from "@/components/ui/Spinner";
import { BackgroundEllipses } from "./BackgroundEllipses";
import { FormSection } from "./FormSection";
import { LogoSection } from "./LogoSection";

export function LoginContent() {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth().then((authenticated) => {
      if (authenticated) {
        router.push("/dashboard");
      }
    });
  }, [checkAuth, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" className="border-purple-500 border-t-purple-200" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      <BackgroundEllipses />
      <FormSection />
      <LogoSection />
    </div>
  );
}
