import Image from "next/image";
import { LoginForm } from "./LoginForm";

export function FormSection() {
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-12 lg:py-0 relative z-10 min-h-screen lg:min-h-0">
      <div className="w-full max-w-[381px]">
        {/* Logo for mobile only */}
        <div className="flex justify-center mb-8 lg:hidden">
          <Image
            src="/logo-name.svg"
            alt="Meetus Logo"
            width={180}
            height={48}
            priority
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[56px] font-normal leading-none tracking-normal mb-2">
            Welcome back
          </h1>
          <p className="text-base sm:text-[18px] font-normal leading-[155%] tracking-normal text-center text-gray-500 mb-8">
            Step into our shopping metaverse for an unforgettable shopping
            experience
          </p>
          <LoginForm />
        </div>

        <p className="text-center mt-6 text-[#62626B]">
          Don&apos;t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}
