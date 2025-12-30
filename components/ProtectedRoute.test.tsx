import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ProtectedRoute } from "./ProtectedRoute";

const mockCheckAuth = vi.fn();

vi.mock("@/store/authStore", () => ({
  useAuthStore: () => ({
    checkAuth: mockCheckAuth,
  }),
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading spinner while checking auth", () => {
    mockCheckAuth.mockImplementation(() => new Promise(() => {}));

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("should render children after auth check completes", async () => {
    mockCheckAuth.mockResolvedValue(true);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );

    await waitFor(() => {
      expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });
  });

  it("should call checkAuth on mount", async () => {
    mockCheckAuth.mockResolvedValue(true);

    render(
      <ProtectedRoute>
        <div>Content</div>
      </ProtectedRoute>,
    );

    await waitFor(() => {
      expect(mockCheckAuth).toHaveBeenCalled();
    });
  });

  it("should render children when auth check fails", async () => {
    mockCheckAuth.mockResolvedValue(false);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );

    await waitFor(() => {
      expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });
  });

  it("should hide spinner after auth check completes with false result", async () => {
    mockCheckAuth.mockResolvedValue(false);

    render(
      <ProtectedRoute>
        <div>Content</div>
      </ProtectedRoute>,
    );

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });
});
