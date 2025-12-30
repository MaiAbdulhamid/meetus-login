import Image from "next/image";

export function LogoSection() {
  return (
    <div className="hidden lg:flex w-1/2 items-center justify-center relative z-10">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src="/logo.svg"
            alt="MeetusVR Logo"
            width={744}
            height={523}
            priority
            className="w-[400px] xl:w-[600px] 2xl:w-[744px] h-auto"
          />
          <Image
            src="/logo-name.svg"
            alt="MeetusVR"
            width={350}
            height={75}
            priority
            className="absolute left-[22%] top-[65%] w-[180px] xl:w-[300px] 2xl:w-[350px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
