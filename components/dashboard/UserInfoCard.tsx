"use client";

import { useAuthStore } from "@/store/authStore";

export function UserInfoCard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 w-full max-w-md">
      <h2 className="text-base sm:text-lg font-medium mb-4 text-gray-800">
        User Information
      </h2>
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
          <span className="text-gray-500 sm:w-20 text-sm sm:text-base">
            ID:
          </span>
          <span className="text-gray-800 font-medium text-sm sm:text-base break-all">
            {user?.id}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-0">
          <span className="text-gray-500 sm:w-20 text-sm sm:text-base">
            Name:
          </span>
          <span className="text-gray-800 font-medium text-sm sm:text-base">
            {user?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
