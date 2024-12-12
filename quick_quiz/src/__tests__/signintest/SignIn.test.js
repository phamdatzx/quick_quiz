import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import SignIn from "../../pages/signin/SignIn";
import SignInCard from "../../pages/signin/SignInCard";

describe("SignIn Component", () => {
    test("renders the background and quote correctly", () => {
        render(<SignIn />);
        expect(screen.getByText(/Those people who develop the ability/i)).toBeInTheDocument();
        expect(screen.getByText(/Brian Tracy/i)).toBeInTheDocument();
    });

    test("renders the SignInCard", () => {
        render(<SignIn />);
        expect(screen.getByRole("form")).toBeInTheDocument();
    });
});

describe("SignInCard Component", () => {
    test("renders email and password input fields", () => {
        render(<SignInCard />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
    });

    test("renders 'Đăng nhập' button", () => {
        render(<SignInCard />);
        expect(screen.getByRole("button", { name: /đăng nhập/i })).toBeInTheDocument();
    });

    test("shows validation error for empty inputs", () => {
        render(<SignInCard />);
        const loginButton = screen.getByRole("button", { name: /đăng nhập/i });

        fireEvent.click(loginButton);

        // Assuming validation is implemented with error messages
        expect(screen.queryByText(/vui lòng điền đúng địa chỉ email/i)).not.toBeNull();
        expect(screen.queryByText(/mật khẩu phải chứa ít nhất 6 ký tự/i)).not.toBeNull();
    });

    test("navigates to 'Quên mật khẩu?' link", () => {
        render(<SignInCard />);
        const forgotPasswordLink = screen.getByRole("link", { name: /quên mật khẩu/i });

        expect(forgotPasswordLink).toBeInTheDocument();
        expect(forgotPasswordLink).toHaveAttribute("href", "/forgotpassword");
    });

    test("navigates to 'Đăng ký' link", () => {
        render(<SignInCard />);
        const signUpLink = screen.getByRole("link", { name: /đăng ký/i });

        expect(signUpLink).toBeInTheDocument();
        expect(signUpLink).toHaveAttribute("href", "/signup/");
    });

    test("handles login button click", () => {
        render(<SignInCard />);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/mật khẩu/i);
        const loginButton = screen.getByRole("button", { name: /đăng nhập/i });

        fireEvent.change(emailInput, { target: { value: "user@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(loginButton);

        // Assuming a success message or navigation occurs
        expect(screen.queryByText(/đăng nhập thành công/i)).not.toBeNull();
    });
});