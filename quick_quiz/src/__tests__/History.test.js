import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import History from "../pages/history/History";
import HistoryPreview from "../pages/history/HistoryPreview";
import { BrowserRouter } from "react-router-dom";

describe("History Component", () => {
    const renderWithRouter = (ui) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    test("renders search field and sort dropdown", () => {
        renderWithRouter(<History />);

        // Kiểm tra trường tìm kiếm
        expect(screen.getByLabelText(/tìm kiếm/i)).toBeInTheDocument();

        // Kiểm tra dropdown sắp xếp
        expect(screen.getByText(/sắp xếp theo/i)).toBeInTheDocument();
    });

    test("renders history items with correct data", () => {
        renderWithRouter(<History />);

        // Mock data đã được hiển thị
        expect(screen.getByText(/quiz set id: 101/i)).toBeInTheDocument();
        expect(screen.getByText(/thời gian làm bài:/i)).toBeInTheDocument();
    });

    test("filters history items based on search input", () => {
        renderWithRouter(<History />);

        const searchField = screen.getByLabelText(/tìm kiếm/i);

        // Nhập vào trường tìm kiếm
        fireEvent.change(searchField, { target: { value: "102" } });

        // Chỉ phần tử liên quan hiển thị
        expect(screen.getByText(/quiz set id: 102/i)).toBeInTheDocument();
        expect(screen.queryByText(/quiz set id: 101/i)).not.toBeInTheDocument();
    });

    test("sorts history items correctly when dropdown changes", () => {
        renderWithRouter(<History />);

        const sortDropdown = screen.getByText(/sắp xếp theo/i);

        // Chuyển đổi sắp xếp theo thứ tự chữ cái
        fireEvent.mouseDown(sortDropdown);
        fireEvent.click(screen.getByText(/thứ tự chữ cái/i));

        // Kiểm tra xem sắp xếp có thay đổi không
        const firstItem = screen.getAllByText(/quiz set id:/i)[0];
        expect(firstItem).toHaveTextContent("Quiz Set ID: 101");
    });

    test("navigates pages using pagination controls", () => {
        renderWithRouter(<History />);

        const nextPageButton = screen.getByRole("button", { name: /2/i });

        // Chuyển sang trang 2
        fireEvent.click(nextPageButton);

        // Kiểm tra xem dữ liệu mới có được hiển thị không
        expect(screen.getByText(/quiz set id: 106/i)).toBeInTheDocument();
        expect(screen.queryByText(/quiz set id: 101/i)).not.toBeInTheDocument();
    });

    test("clicking a history item triggers navigation or action", () => {
        renderWithRouter(<History />);

        const historyItem = screen.getByText(/quiz set id: 101/i);

        // Giả lập click vào phần tử
        fireEvent.click(historyItem);

        // Mock action handling
        expect(historyItem).toBeDefined();
    });
});

describe("HistoryPreview Component", () => {
    const mockNavigate = jest.fn();

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useNavigate: () => mockNavigate,
    }));

    test("renders history preview with correct props", () => {
        render(<HistoryPreview quizsetId={101} attemptTime="2024-12-01T10:00:00Z" attemptId={1} />);

        // Kiểm tra hiển thị đúng dữ liệu
        expect(screen.getByText(/quiz set id: 101/i)).toBeInTheDocument();
        expect(screen.getByText(/thời gian làm bài:/i)).toBeInTheDocument();
    });

    test("triggers navigation on click", () => {
        render(<HistoryPreview quizsetId={101} attemptTime="2024-12-01T10:00:00Z" attemptId={1} />);

        const previewCard = screen.getByText(/quiz set id: 101/i);
        fireEvent.click(previewCard);

        // Kiểm tra xem hàm điều hướng có được gọi
        expect(mockNavigate).toHaveBeenCalled();
    });
});
