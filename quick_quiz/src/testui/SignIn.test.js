import { render, screen, fireEvent } from "@testing-library/react";
import SignInCard from "../pages/signin/SignInCard";
import { Provider } from "react-redux";
import store from "../stores/store";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const renderWithProviders = (ui) => {
    return render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>
    );
};

describe("SignInCard Component", () => {
    test("Hiển thị lỗi khi email không hợp lệ", () => {
        renderWithProviders(<SignInCard />);

        const emailInput = screen.getByPlaceholderText("your@email.com");
        const passwordInput = screen.getByPlaceholderText("••••••");
        const submitButton = screen.getByRole("button", { name: /Đăng nhập/i });

        // Nhập email không hợp lệ
        fireEvent.change(emailInput, { target: { value: "invalid-email" } });
        fireEvent.change(passwordInput, { target: { value: "123456" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Vui lòng nhập địa chỉ email hợp lệ.")).toBeInTheDocument();
    });

    test("Hiển thị lỗi khi mật khẩu có ít hơn 6 ký tự", () => {
        renderWithProviders(<SignInCard />);

        const emailInput = screen.getByPlaceholderText("your@email.com");
        const passwordInput = screen.getByPlaceholderText("••••••");
        const submitButton = screen.getByRole("button", { name: /Đăng nhập/i });

        // Nhập mật khẩu ngắn hơn 6 ký tự
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "123" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Mật khẩu phải có ít nhất 6 ký tự.")).toBeInTheDocument();
    });

    test("Gửi hành động đăng nhập thành công", async () => {
        renderWithProviders(<SignInCard />);

        const emailInput = screen.getByPlaceholderText("your@email.com");
        const passwordInput = screen.getByPlaceholderText("••••••");
        const submitButton = screen.getByRole("button", { name: /Đăng nhập/i });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "123456" } });
        fireEvent.click(submitButton);

        // Mock hành động thành công
        expect(toast.success).toHaveBeenCalledWith("Đăng nhập thành công!");
    });

    test("Hiển thị toast khi đăng nhập thất bại", async () => {
        renderWithProviders(<SignInCard />);

        const emailInput = screen.getByPlaceholderText("your@email.com");
        const passwordInput = screen.getByPlaceholderText("••••••");
        const submitButton = screen.getByRole("button", { name: /Đăng nhập/i });

        fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "wrongpass" } });
        fireEvent.click(submitButton);

        // Mock hành động thất bại
        expect(toast.error).toHaveBeenCalledWith("Đăng nhập thất bại!");
    });
});
