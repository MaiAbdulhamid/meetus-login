import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuthStore } from "./authStore";
import * as tokenUtils from "@/utils/token";
import * as authApi from "@/lib/api/auth";

vi.mock("@/utils/token", () => ({
  getToken: vi.fn(),
  saveToken: vi.fn(),
  removeToken: vi.fn(),
  saveUser: vi.fn(),
  getUser: vi.fn(),
}));

vi.mock("@/lib/api/auth", () => ({
  getUserInfo: vi.fn(),
}));

describe("authStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
    });
  });

  describe("initial state", () => {
    it("should have correct initial state", () => {
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(true);
    });
  });

  describe("setAuth", () => {
    it("should set auth state and save to storage", () => {
      const token = "test-token";
      const user = { id: 1, name: "Test User" };

      useAuthStore.getState().setAuth(token, user);

      const state = useAuthStore.getState();
      expect(state.token).toBe(token);
      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(tokenUtils.saveToken).toHaveBeenCalledWith(token);
      expect(tokenUtils.saveUser).toHaveBeenCalledWith(user);
    });
  });

  describe("logout", () => {
    it("should clear auth state and remove from storage", () => {
      useAuthStore.setState({
        token: "test-token",
        user: { id: 1, name: "Test" },
        isAuthenticated: true,
        isLoading: false,
      });

      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.token).toBeNull();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(tokenUtils.removeToken).toHaveBeenCalled();
    });
  });

  describe("checkAuth", () => {
    it("should return false and set loading false when no token", async () => {
      vi.mocked(tokenUtils.getToken).mockReturnValue(null);

      const result = await useAuthStore.getState().checkAuth();

      expect(result).toBe(false);
      expect(useAuthStore.getState().isLoading).toBe(false);
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    it("should validate token and set user on success", async () => {
      const mockUser = { id: 1, name: "Test User" };
      vi.mocked(tokenUtils.getToken).mockReturnValue("valid-token");
      vi.mocked(tokenUtils.getUser).mockReturnValue(mockUser);
      vi.mocked(authApi.getUserInfo).mockResolvedValue(mockUser);

      const result = await useAuthStore.getState().checkAuth();

      expect(result).toBe(true);
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe("valid-token");
      expect(state.isLoading).toBe(false);
    });

    it("should clear auth and return false on API error", async () => {
      vi.mocked(tokenUtils.getToken).mockReturnValue("invalid-token");
      vi.mocked(authApi.getUserInfo).mockRejectedValue(
        new Error("Unauthorized"),
      );

      const result = await useAuthStore.getState().checkAuth();

      expect(result).toBe(false);
      expect(tokenUtils.removeToken).toHaveBeenCalled();
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBeNull();
      expect(state.user).toBeNull();
    });
  });

  describe("setLoading", () => {
    it("should update loading state", () => {
      useAuthStore.getState().setLoading(false);
      expect(useAuthStore.getState().isLoading).toBe(false);

      useAuthStore.getState().setLoading(true);
      expect(useAuthStore.getState().isLoading).toBe(true);
    });
  });
});
