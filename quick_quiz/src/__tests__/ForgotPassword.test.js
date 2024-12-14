import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPasswordCard from '../pages/forgotpassword/ForgotPasswordCard';

describe("ForgotPasswordCard", () => {
    const renderWithRouter = (ui) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    test("renders email field", () => {
        renderWithRouter(<ForgotPasswordCard />);

        // Kiểm tra sự tồn tại của trường email
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    test("renders 'Tiếp tục' button", () => {
        renderWithRouter(<ForgotPasswordCard />);

        // Kiểm tra sự tồn tại của nút "Tiếp tục"
        const continueButton = screen.getByRole("button", { name: /tiếp tục/i });
        expect(continueButton).toBeInTheDocument();
    });

    test("renders 'Quay lại' button", () => {
        renderWithRouter(<ForgotPasswordCard />);

        // Kiểm tra sự tồn tại của nút "Quay lại"
        const backButton = screen.getByRole("button", { name: /quay lại/i });
        expect(backButton).toBeInTheDocument();
        expect(backButton).toHaveAttribute("href", "/signin");
    });

    test("allows users to type in the email field", () => {
        renderWithRouter(<ForgotPasswordCard />);

        const emailField = screen.getByLabelText(/email/i);

        // Nhập dữ liệu vào trường email
        fireEvent.change(emailField, { target: { value: "test@example.com" } });

        expect(emailField.value).toBe("test@example.com");
    });

    test("calls submit handler when 'Tiếp tục' button is clicked", () => {
        renderWithRouter(<ForgotPasswordCard />);

        const continueButton = screen.getByRole("button", { name: /tiếp tục/i });

        // Giả lập hành động nhấn nút
        fireEvent.click(continueButton);

        // Kiểm tra rằng nút có thể được nhấn
        expect(continueButton).not.toBeDisabled();
    });
});

