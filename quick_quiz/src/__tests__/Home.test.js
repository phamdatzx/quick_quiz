import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";

describe("Home Component", () => {
    const renderWithRouter = (ui) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    test("renders user quiz sets and saved quiz sets sections", () => {
        renderWithRouter(<Home />);

        // Kiểm tra tiêu đề của các phần
        expect(screen.getByText(/bộ câu hỏi của bạn/i)).toBeInTheDocument();
        expect(screen.getByText(/bộ câu hỏi đã lưu/i)).toBeInTheDocument();
    });

    test("renders quiz set cards correctly", () => {
        renderWithRouter(<Home />);

        // Kiểm tra sự tồn tại của các bộ câu hỏi
        expect(screen.getByText(/quiz set 1/i)).toBeInTheDocument();
        expect(screen.getByText(/quiz set 2/i)).toBeInTheDocument();
        expect(screen.getByText(/saved quiz set 1/i)).toBeInTheDocument();
        expect(screen.getByText(/saved quiz set 2/i)).toBeInTheDocument();
    });

    test("handles pagination for user quiz sets", () => {
        renderWithRouter(<Home />);

        const nextButton = screen.getAllByRole("button", { name: /arrowforward/i })[0];
        const prevButton = screen.getAllByRole("button", { name: /arrowback/i })[0];

        // Kiểm tra phân trang trước khi nhấn
        expect(screen.getByText(/quiz set 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/quiz set 6/i)).not.toBeInTheDocument();

        // Chuyển trang tiếp theo
        fireEvent.click(nextButton);
        expect(screen.getByText(/quiz set 6/i)).toBeInTheDocument();
        expect(screen.queryByText(/quiz set 1/i)).not.toBeInTheDocument();

        // Quay lại trang trước
        fireEvent.click(prevButton);
        expect(screen.getByText(/quiz set 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/quiz set 6/i)).not.toBeInTheDocument();
    });

    test("handles pagination for saved quiz sets", () => {
        renderWithRouter(<Home />);

        const nextButton = screen.getAllByRole("button", { name: /arrowforward/i })[1];
        const prevButton = screen.getAllByRole("button", { name: /arrowback/i })[1];

        // Kiểm tra phân trang trước khi nhấn
        expect(screen.getByText(/saved quiz set 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/saved quiz set 6/i)).not.toBeInTheDocument();

        // Chuyển trang tiếp theo
        fireEvent.click(nextButton);
        expect(screen.getByText(/saved quiz set 6/i)).toBeInTheDocument();
        expect(screen.queryByText(/saved quiz set 1/i)).not.toBeInTheDocument();

        // Quay lại trang trước
        fireEvent.click(prevButton);
        expect(screen.getByText(/saved quiz set 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/saved quiz set 6/i)).not.toBeInTheDocument();
    });
});
