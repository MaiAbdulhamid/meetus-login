"use client";

import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <div
          className={`
            flex items-center gap-2 sm:gap-3
            w-full h-[48px] sm:h-[57px] p-3 sm:p-4
            bg-[#ffffff] rounded-lg border border-transparent
            focus-within:border-purple-500/50
            transition-all duration-200
            ${error ? "border-red-500" : ""}
          `}
        >
          {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
          <input
            ref={ref}
            className={`
              flex-1 bg-transparent
              placeholder-[#62626B] text-[#62626B]
              text-sm sm:text-base
              focus:outline-none
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500 pl-4">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
