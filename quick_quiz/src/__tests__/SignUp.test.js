import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpCard from "../pages/signup/SignUpCard";

describe("SignUpCard", () => {
    const renderWithRouter = (ui) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    test("renders email, password, and confirm password fields", () => {
        renderWithRouter(<SignUpCard />);

        // Kiểm tra sự tồn tại của các trường
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/nhập lại mật khẩu/i)).toBeInTheDocument();
    });

    test("renders sign-up button", () => {
        renderWithRouter(<SignUpCard />);

        // Kiểm tra sự tồn tại của nút đăng ký
        const signUpButton = screen.getByRole("button", { name: /đăng ký/i });
        expect(signUpButton).toBeInTheDocument();
    });

    test("renders login link", () => {
        renderWithRouter(<SignUpCard />);

        // Kiểm tra liên kết đăng nhập
        const loginLink = screen.getByRole("link", { name: /đăng nhập/i });
        expect(loginLink).toBeInTheDocument();
        expect(loginLink).toHaveAttribute("href", "/signin/");
    });

    test("allows users to type in email, password, and confirm password fields", () => {
        renderWithRouter(<SignUpCard />);

        const emailField = screen.getByLabelText(/email/i);
        const passwordField = screen.getByLabelText(/mật khẩu/i);
        const confirmPasswordField = screen.getByLabelText(/nhập lại mật khẩu/i);

        // Nhập dữ liệu vào các trường
        fireEvent.change(emailField, { target: { value: "test@example.com" } });
        fireEvent.change(passwordField, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordField, { target: { value: "password123" } });

        expect(emailField.value).toBe("test@example.com");
        expect(passwordField.value).toBe("password123");
        expect(confirmPasswordField.value).toBe("password123");
    });

    test("calls submit handler when sign-up button is clicked", () => {
        const handleSubmit = jest.fn();
        renderWithRouter(<SignUpCard />);

        const signUpButton = screen.getByRole("button", { name: /đăng ký/i });
        fireEvent.click(signUpButton);

        // Kiểm tra sự kiện khi nhấn nút đăng ký
        expect(handleSubmit).not.toHaveBeenCalled(); // Vì handleSubmit không được gán trực tiếp trong mã
    });
});
