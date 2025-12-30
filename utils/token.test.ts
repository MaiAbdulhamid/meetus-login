import { describe, it, expect, vi, beforeEach } from "vitest";
import { saveToken, getToken, removeToken, saveUser, getUser } from "./token";

describe("token utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe("saveToken", () => {
    it("should save token to localStorage", () => {
      saveToken("test-token");
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "auth_token",
        "test-token",
      );
    });

    it("should set cookie with token", () => {
      saveToken("test-token");
      expect(document.cookie).toContain("token=test-token");
    });
  });

  describe("getToken", () => {
    it("should return token from localStorage", () => {
      vi.mocked(localStorage.getItem).mockReturnValue("stored-token");
      const token = getToken();
      expect(localStorage.getItem).toHaveBeenCalledWith("auth_token");
      expect(token).toBe("stored-token");
    });

    it("should return null when no token exists", () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      const token = getToken();
      expect(token).toBeNull();
    });
  });

  describe("removeToken", () => {
    it("should remove token from localStorage", () => {
      removeToken();
      expect(localStorage.removeItem).toHaveBeenCalledWith("auth_token");
    });

    it("should remove user from localStorage", () => {
      removeToken();
      expect(localStorage.removeItem).toHaveBeenCalledWith("auth_user");
    });

    it("should delete cookie", () => {
      removeToken();
      expect(document.cookie).toContain("expires=Thu, 01 Jan 1970");
    });
  });

  describe("saveUser", () => {
    it("should save user object to localStorage as JSON", () => {
      const user = { id: 1, name: "Test User" };
      saveUser(user);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "auth_user",
        JSON.stringify(user),
      );
    });
  });

  describe("getUser", () => {
    it("should return parsed user object from localStorage", () => {
      const user = { id: 1, name: "Test User" };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(user));
      const result = getUser();
      expect(result).toEqual(user);
    });

    it("should return null when no user exists", () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      const result = getUser();
      expect(result).toBeNull();
    });
  });
});
