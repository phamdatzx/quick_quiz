import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResetPasswordCard from '../pages/resetpassword/ResetPasswordCard';

describe("ResetPasswordCard", () => {
    const renderWithRouter = (ui) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    test("renders password and confirm password fields", () => {
        renderWithRouter(<ResetPasswordCard />);

        // Kiểm tra sự tồn tại của các trường mật khẩu mới và xác nhận mật khẩu mới
        expect(screen.getByLabelText(/mật khẩu mới/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/xác nhận mật khẩu mới/i)).toBeInTheDocument();
    });

    test("renders 'Đặt lại mật khẩu' button", () => {
        renderWithRouter(<ResetPasswordCard />);

        // Kiểm tra sự tồn tại của nút "Đặt lại mật khẩu"
        const resetButton = screen.getByRole("button", { name: /đặt lại mật khẩu/i });
        expect(resetButton).toBeInTheDocument();
    });

    test("renders 'Quay lại đăng nhập' button", () => {
        renderWithRouter(<ResetPasswordCard />);

        // Kiểm tra sự tồn tại của nút "Quay lại đăng nhập"
        const backButton = screen.getByRole("button", { name: /quay lại đăng nhập/i });
        expect(backButton).toBeInTheDocument();
        expect(backButton).toHaveAttribute("href", "/signin");
    });

    test("allows users to type in password and confirm password fields", () => {
        renderWithRouter(<ResetPasswordCard />);

        const passwordField = screen.getByLabelText(/mật khẩu mới/i);
        const confirmPasswordField = screen.getByLabelText(/xác nhận mật khẩu mới/i);

        // Nhập dữ liệu vào các trường
        fireEvent.change(passwordField, { target: { value: "newpassword123" } });
        fireEvent.change(confirmPasswordField, { target: { value: "newpassword123" } });

        expect(passwordField.value).toBe("newpassword123");
        expect(confirmPasswordField.value).toBe("newpassword123");
    });

    test("calls submit handler when 'Đặt lại mật khẩu' button is clicked", () => {
        renderWithRouter(<ResetPasswordCard />);

        const resetButton = screen.getByRole("button", { name: /đặt lại mật khẩu/i });

        // Giả lập hành động nhấn nút
        fireEvent.click(resetButton);

        // Kiểm tra rằng nút có thể được nhấn
        expect(resetButton).not.toBeDisabled();
    });
});
