import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SignIn from "../../pages/signin/SignIn";
import SignInCard from "../../pages/signin/SignInCard";

describe("SignIn Component", () => {
    test("renders the signin page with all elements", () => {
        render(<SignIn />);

        // Check for header
        expect(screen.getByRole("heading", { name: /Đăng nhập/i })).toBeInTheDocument();

        // Check for form fields
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mật khẩu/i)).toBeInTheDocument();

        // Check for submit button
        expect(screen.getByRole("button", { name: /^Đăng nhập$/i })).toBeInTheDocument();
    });

    test("displays an error message when form is submitted with invalid credentials", async () => {
        render(<SignInCard />);

        const submitButton = screen.getByRole("button", { name: /^Đăng nhập$/i });
        await act(async () => {
            fireEvent.click(submitButton);
        });

        // Mock validation: Ensure error message renders
        const errorMessage = screen.queryByText(/Sai tài khoản hoặc mật khẩu/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
