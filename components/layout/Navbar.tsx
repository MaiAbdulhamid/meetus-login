"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/useAuth";

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/dashboard">
            <Image
              src="/logo-name.svg"
              alt="MeetusVR"
              width={120}
              height={32}
              className="h-6 sm:h-8 w-auto"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* User Menu - Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
            )}
            <button
              onClick={logout}
              className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-100 py-4">
            {user && (
              <div className="flex items-center gap-3 px-2 py-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <span className="font-medium text-gray-700">{user.name}</span>
              </div>
            )}
            <Link
              href="/dashboard"
              className="block px-2 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-2 py-3 text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
