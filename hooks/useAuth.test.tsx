import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLogin, useLogout } from "./useAuth";
import * as authApi from "@/lib/api/auth";
import { useAuthStore, type AuthStore } from "@/store/authStore";
import React from "react";

vi.mock("@/lib/api/auth", () => ({
  loginApi: vi.fn(),
  getUserInfo: vi.fn(),
}));

vi.mock("@/store/authStore", () => ({
  useAuthStore: vi.fn(),
}));

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
    },
  });
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }
  return Wrapper;
}

describe("useAuth hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useLogin", () => {
    it("should call loginApi and getUserInfo on mutation", async () => {
      const mockSetAuth = vi.fn();
      vi.mocked(useAuthStore).mockImplementation(
        <T,>(selector: (state: AuthStore) => T) =>
          selector({ setAuth: mockSetAuth } as unknown as AuthStore) as T,
      );

      const mockLoginResponse = { token: "test-token", refresh: "refresh" };
      const mockUser = { id: 1, name: "Test User" };
      vi.mocked(authApi.loginApi).mockResolvedValue(mockLoginResponse);
      vi.mocked(authApi.getUserInfo).mockResolvedValue(mockUser);

      const { result } = renderHook(() => useLogin(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({
        email: "test@example.com",
        password: "password",
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(authApi.loginApi).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(authApi.getUserInfo).toHaveBeenCalledWith("test-token");
      expect(mockSetAuth).toHaveBeenCalledWith("test-token", mockUser);
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });

    it("should set error state on failed login", async () => {
      const mockSetAuth = vi.fn();
      vi.mocked(useAuthStore).mockImplementation(
        <T,>(selector: (state: AuthStore) => T) =>
          selector({ setAuth: mockSetAuth } as unknown as AuthStore) as T,
      );
      vi.mocked(authApi.loginApi).mockRejectedValue(
        new Error("Invalid credentials"),
      );

      const { result } = renderHook(() => useLogin(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ email: "test@example.com", password: "wrong" });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(mockSetAuth).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe("useLogout", () => {
    it("should call logout and navigate to login", () => {
      const mockLogout = vi.fn();
      vi.mocked(useAuthStore).mockImplementation(
        <T,>(selector: (state: AuthStore) => T) =>
          selector({ logout: mockLogout } as unknown as AuthStore) as T,
      );

      const { result } = renderHook(() => useLogout());

      result.current();

      expect(mockLogout).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
