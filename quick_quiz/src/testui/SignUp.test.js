import { render, screen, fireEvent } from "@testing-library/react";
import SignUpCard from "../pages/signup/SignUpCard";
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

describe("SignUpCard Component", () => {
    test("Hiển thị lỗi khi bỏ trống tất cả các trường", () => {
        renderWithProviders(<SignUpCard />);

        const submitButton = screen.getByRole("button", { name: /Đăng ký/i });
        fireEvent.click(submitButton);

        // Kiểm tra toast thông báo lỗi
        expect(toast.error).toHaveBeenCalledWith("Vui lòng điền đầy đủ thông tin!");
    });

    test("Hiển thị lỗi khi email không hợp lệ", () => {
        renderWithProviders(<SignUpCard />);

        const emailField = screen.getByPlaceholderText("your@email.com");
        const submitButton = screen.getByRole("button", { name: /Đăng ký/i });

        fireEvent.change(emailField, { target: { value: "invalid-email" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Vui lòng nhập email hợp lệ!")).toBeInTheDocument();
    });

    test("Hiển thị lỗi khi mật khẩu có ít hơn 6 ký tự", () => {
        renderWithProviders(<SignUpCard />);

        const passwordField = screen.getByPlaceholderText("••••••");
        const confirmPasswordField = screen.getByPlaceholderText("••••••");
        const submitButton = screen.getByRole("button", { name: /Đăng ký/i });

        fireEvent.change(passwordField, { target: { value: "12345" } });
        fireEvent.change(confirmPasswordField, { target: { value: "12345" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Mật khẩu phải có ít nhất 6 ký tự!")).toBeInTheDocument();
    });

    test("Hiển thị lỗi khi mật khẩu không khớp", () => {
        renderWithProviders(<SignUpCard />);

        const passwordField = screen.getByPlaceholderText("••••••");
        const confirmPasswordField = screen.getByPlaceholderText("••••••");
        const submitButton = screen.getByRole("button", { name: /Đăng ký/i });

        fireEvent.change(passwordField, { target: { value: "123456" } });
        fireEvent.change(confirmPasswordField, { target: { value: "654321" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Mật khẩu không khớp!")).toBeInTheDocument();
    });

    test("Gửi hành động `userRegister` khi thông tin hợp lệ", async () => {
        renderWithProviders(<SignUpCard />);

        const nameField = screen.getByPlaceholderText("Nguyễn Văn A");
        const emailField = screen.getByPlaceholderText("your@email.com");
        const passwordField = screen.getByPlaceholderText("••••••");
        const confirmPasswordField = screen.getByPlaceholderText("••••••");
        const submitButton = screen.getByRole("button", { name: /Đăng ký/i });

        // Nhập thông tin hợp lệ
        fireEvent.change(nameField, { target: { value: "Nguyen Van A" } });
        fireEvent.change(emailField, { target: { value: "test@example.com" } });
        fireEvent.change(passwordField, { target: { value: "123456" } });
        fireEvent.change(confirmPasswordField, { target: { value: "123456" } });
        fireEvent.click(submitButton);

        // Kiểm tra toast thành công
        expect(toast.success).toHaveBeenCalledWith("Đăng ký thành công!");
    });
});
