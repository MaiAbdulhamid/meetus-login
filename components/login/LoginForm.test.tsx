import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "./LoginForm";
import React from "react";

vi.mock("@/hooks/useAuth", () => ({
  useLogin: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    error: null,
  })),
}));

vi.mock("../icons", () => ({
  MailIcon: () => <span data-testid="mail-icon" />,
  LockIcon: () => <span data-testid="lock-icon" />,
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }
  return Wrapper;
}

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render email and password inputs", () => {
    render(<LoginForm />, { wrapper: createWrapper() });
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("should render login button", () => {
    render(<LoginForm />, { wrapper: createWrapper() });
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should render icons", () => {
    render(<LoginForm />, { wrapper: createWrapper() });
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
    expect(screen.getByTestId("lock-icon")).toBeInTheDocument();
  });

  it("should show validation error for invalid email", async () => {
    render(<LoginForm />, { wrapper: createWrapper() });
    const emailInput = screen.getByPlaceholderText("Email");

    await userEvent.type(emailInput, "invalid-email");
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });
  });

  it("should show validation error when email is cleared", async () => {
    render(<LoginForm />, { wrapper: createWrapper() });
    const emailInput = screen.getByPlaceholderText("Email");

    await userEvent.type(emailInput, "test@test.com");
    await userEvent.clear(emailInput);

    await waitFor(() => {
      // Zod validates empty string as invalid email format
      const errorElement = screen.getByText("Invalid email format");
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("should show validation error for empty password after clearing", async () => {
    render(<LoginForm />, { wrapper: createWrapper() });
    const passwordInput = screen.getByPlaceholderText("Password");

    await userEvent.type(passwordInput, "a");
    await userEvent.clear(passwordInput);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should disable submit button when form is invalid", () => {
    render(<LoginForm />, { wrapper: createWrapper() });
    const submitButton = screen.getByRole("button", { name: /login/i });
    expect(submitButton).toBeDisabled();
  });

  it("should enable submit button when form is valid", async () => {
    render(<LoginForm />, { wrapper: createWrapper() });

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "test@example.com",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Password"),
      "password123",
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /login/i })).not.toBeDisabled();
    });
  });

  it("should call login mutation with form data on submit", async () => {
    const mockMutate = vi.fn();
    const { useLogin } = await import("@/hooks/useAuth");
    vi.mocked(useLogin).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    } as unknown as ReturnType<typeof useLogin>);

    render(<LoginForm />, { wrapper: createWrapper() });

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "test@example.com",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Password"),
      "password123",
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /login/i })).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("should show loading state when login is pending", async () => {
    const { useLogin } = await import("@/hooks/useAuth");
    vi.mocked(useLogin).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
      error: null,
    } as unknown as ReturnType<typeof useLogin>);

    render(<LoginForm />, { wrapper: createWrapper() });

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should display error message when login fails", async () => {
    const { useLogin } = await import("@/hooks/useAuth");
    vi.mocked(useLogin).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      error: new Error("Invalid credentials"),
    } as unknown as ReturnType<typeof useLogin>);

    render(<LoginForm />, { wrapper: createWrapper() });

    expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
  });
});
