import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import SignUp from "../../pages/signup/SignUp";
import SignUpCard from "../../pages/signup/SignUpCard";

describe("SignUp Component", () => {
    test("renders the background and quote correctly", () => {
        render(<SignUp />);
        expect(screen.getByText(/Those people who develop the ability/i)).toBeInTheDocument();
        expect(screen.getByText(/Brian Tracy/i)).toBeInTheDocument();
    });

    test("renders the SignUpCard", () => {
        render(<SignUp />);
        expect(screen.getByRole("form")).toBeInTheDocument();
    });
});

describe("SignUpCard Component", () => {
    test("renders email, password, and re-enter password fields", () => {
        render(<SignUpCard />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/nhập lại mật khẩu/i)).toBeInTheDocument();
    });

    test("renders 'Đăng ký' button", () => {
        render(<SignUpCard />);
        expect(screen.getByRole("button", { name: /đăng ký/i })).toBeInTheDocument();
    });

    test("shows validation error for empty inputs", () => {
        render(<SignUpCard />);
        const registerButton = screen.getByRole("button", { name: /đăng ký/i });

        fireEvent.click(registerButton);

        // Assuming validation is implemented with error messages
        expect(screen.queryByText(/vui lòng điền đúng địa chỉ email/i)).not.toBeNull();
        expect(screen.queryByText(/mật khẩu phải chứa ít nhất 6 ký tự/i)).not.toBeNull();
    });

    test("renders a link to 'Đăng nhập'", () => {
        render(<SignUpCard />);
        const signInLink = screen.getByRole("link", { name: /đăng nhập/i });

        expect(signInLink).toBeInTheDocument();
        expect(signInLink).toHaveAttribute("href", "/signin/");
    });

    test("handles form submission with valid inputs", () => {
        render(<SignUpCard />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/mật khẩu/i);
        const passwordReEnterInput = screen.getByLabelText(/nhập lại mật khẩu/i);
        const registerButton = screen.getByRole("button", { name: /đăng ký/i });

        fireEvent.change(emailInput, { target: { value: "user@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(passwordReEnterInput, { target: { value: "password123" } });
        fireEvent.click(registerButton);

        // Assuming a success message or navigation occurs
        expect(screen.queryByText(/đăng ký thành công/i)).not.toBeNull();
    });

    test("shows error for mismatched passwords", () => {
        render(<SignUpCard />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/mật khẩu/i);
        const passwordReEnterInput = screen.getByLabelText(/nhập lại mật khẩu/i);
        const registerButton = screen.getByRole("button", { name: /đăng ký/i });

        fireEvent.change(emailInput, { target: { value: "user@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(passwordReEnterInput, { target: { value: "password321" } });
        fireEvent.click(registerButton);

        // Assuming validation shows mismatch error
        expect(screen.queryByText(/mật khẩu không khớp/i)).not.toBeNull();
    });
});
