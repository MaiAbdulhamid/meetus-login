import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginApi, getUserInfo } from "./auth";

describe("auth API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("loginApi", () => {
    it("should call the correct endpoint with credentials", async () => {
      const mockResponse = { token: "test-token", refresh: "refresh-token" };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const credentials = {
        email: "test@example.com",
        password: "password123",
      };
      const result = await loginApi(credentials);

      expect(fetch).toHaveBeenCalledWith(
        "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
            orgId: 2,
            isEmployee: false,
          }),
        },
      );
      expect(result).toEqual(mockResponse);
    });

    it("should throw error with message on failed login", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      } as Response);

      const credentials = { email: "test@example.com", password: "wrong" };

      await expect(loginApi(credentials)).rejects.toThrow(
        "Invalid credentials",
      );
    });

    it("should throw default error when no message in response", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.reject(new Error("Parse error")),
      } as Response);

      const credentials = { email: "test@example.com", password: "wrong" };

      await expect(loginApi(credentials)).rejects.toThrow(
        "Invalid credentials",
      );
    });
  });

  describe("getUserInfo", () => {
    it("should call the correct endpoint with authorization header", async () => {
      const mockUser = { id: 1, name: "Test User" };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser),
      } as Response);

      const result = await getUserInfo("test-token");

      expect(fetch).toHaveBeenCalledWith(
        "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer test-token",
          },
        },
      );
      expect(result).toEqual(mockUser);
    });

    it("should throw Unauthorized error on failed request", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
      } as Response);

      await expect(getUserInfo("invalid-token")).rejects.toThrow(
        "Unauthorized",
      );
    });
  });
});
