import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("should render input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("should render icon when provided", () => {
    render(<Input icon={<span data-testid="icon">Icon</span>} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should not render icon container when no icon provided", () => {
    const { container } = render(<Input />);
    const iconSpans = container.querySelectorAll("span.text-gray-400");
    expect(iconSpans.length).toBe(0);
  });

  it("should display error message when error prop is provided", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("should apply error border styling when error exists", () => {
    const { container } = render(<Input error="Error" />);
    const wrapper = container.querySelector(".border-red-500");
    expect(wrapper).toBeInTheDocument();
  });

  it("should call onChange handler when value changes", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should forward ref to input element", () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>;
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("should apply type attribute correctly", () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute(
      "type",
      "email",
    );
  });

  it("should apply custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("custom-class");
  });

  it("should support disabled state", () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
  });
});
