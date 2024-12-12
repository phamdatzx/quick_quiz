import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SignUp from "../../pages/signup/SignUp";
import SignUpCard from "../../pages/signup/SignUpCard";

describe("SignUp Component", () => {
    test("renders the signup page with all elements", () => {
        render(<SignUp />);

        // Check for header
        expect(screen.getByRole("heading", { name: /Đăng ký/i })).toBeInTheDocument();

        // Check for form fields
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mật khẩu/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nhập lại mật khẩu/i)).toBeInTheDocument();

        // Check for submit button
        expect(screen.getByRole("button", { name: /Đăng ký/i })).toBeInTheDocument();
    });

    test("displays an error message when form is submitted with invalid data", async () => {
        render(<SignUpCard />);

        const submitButton = screen.getByRole("button", { name: /Đăng ký/i });
        await act(async () => {
            fireEvent.click(submitButton);
        });

        // Mock validation: Ensure error message renders
        const errorMessage = screen.queryByText(/Vui lòng điền đúng địa chỉ email./i);
        expect(errorMessage).toBeInTheDocument();
    });
});
