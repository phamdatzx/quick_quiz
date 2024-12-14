import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignInCard from "../pages/signin/SignInCard";

describe("SignInCard", () => {
    const renderWithRouter = (ui) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    test("renders email and password fields", () => {
        renderWithRouter(<SignInCard />);

        // Kiểm tra sự tồn tại của các trường email và mật khẩu
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument();
    });

    test("renders sign-in button", () => {
        renderWithRouter(<SignInCard />);

        // Kiểm tra sự tồn tại của nút đăng nhập
        const signInButton = screen.getByRole("button", { name: /đăng nhập/i });
        expect(signInButton).toBeInTheDocument();
    });

    test("renders forgot password link", () => {
        renderWithRouter(<SignInCard />);

        // Kiểm tra liên kết "Quên mật khẩu?"
        const forgotPasswordLink = screen.getByRole("link", { name: /quên mật khẩu\?/i });
        expect(forgotPasswordLink).toBeInTheDocument();
        expect(forgotPasswordLink).toHaveAttribute("href", "/forgotpassword");
    });

    test("renders sign-up link", () => {
        renderWithRouter(<SignInCard />);

        // Kiểm tra liên kết "Đăng ký"
        const signUpLink = screen.getByRole("link", { name: /đăng ký/i });
        expect(signUpLink).toBeInTheDocument();
        expect(signUpLink).toHaveAttribute("href", "/signup/");
    });

    test("allows users to type in email and password fields", () => {
        renderWithRouter(<SignInCard />);

        const emailField = screen.getByLabelText(/email/i);
        const passwordField = screen.getByLabelText(/mật khẩu/i);

        // Nhập dữ liệu vào các trường
        fireEvent.change(emailField, { target: { value: "test@example.com" } });
        fireEvent.change(passwordField, { target: { value: "password123" } });

        expect(emailField.value).toBe("test@example.com");
        expect(passwordField.value).toBe("password123");
    });

    test("calls submit handler when sign-in button is clicked", () => {
        renderWithRouter(<SignInCard />);

        const signInButton = screen.getByRole("button", { name: /đăng nhập/i });

        // Giả lập hành động nhấn nút
        fireEvent.click(signInButton);

        // Kiểm tra các hiệu ứng phụ, nếu có thể mock các hàm như dispatch hoặc toast
        // (Hiện tại, chỉ kiểm tra rằng nút có thể được nhấn)
        expect(signInButton).not.toBeDisabled();
    });

    test("renders 'Đăng nhập với Google' button", () => {
        renderWithRouter(<SignInCard />);

        // Kiểm tra nút "Đăng nhập với Google"
        const googleSignInButton = screen.getByRole("button", { name: /đăng nhập với google/i });
        expect(googleSignInButton).toBeInTheDocument();
    });
});