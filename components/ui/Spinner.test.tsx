import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("should render with status role", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should have accessible label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("should apply default medium size", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner.className).toContain("w-6");
    expect(spinner.className).toContain("h-6");
  });

  it("should apply small size when specified", () => {
    render(<Spinner size="sm" />);
    const spinner = screen.getByRole("status");
    expect(spinner.className).toContain("w-4");
    expect(spinner.className).toContain("h-4");
  });

  it("should apply large size when specified", () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole("status");
    expect(spinner.className).toContain("w-8");
    expect(spinner.className).toContain("h-8");
  });

  it("should apply custom className", () => {
    render(<Spinner className="custom-spinner" />);
    expect(screen.getByRole("status").className).toContain("custom-spinner");
  });

  it("should have animate-spin class for rotation", () => {
    render(<Spinner />);
    expect(screen.getByRole("status").className).toContain("animate-spin");
  });
});
