"use client";

import { BackgroundEllipses } from "./BackgroundEllipses";
import { FormSection } from "./FormSection";
import { LogoSection } from "./LogoSection";

export function LoginContent() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      <BackgroundEllipses />
      <FormSection />
      <LogoSection />
    </div>
  );
}
