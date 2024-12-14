import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Topic from "../pages/topic/Topic";
import TopicCreate from "../pages/topic/TopicCreate";
import TopicPreview from "../pages/topic/TopicPreview";
import TopicView from "../pages/topic/TopicView";

// Mock navigate function
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("Topic Component", () => {
    const renderWithRouter = (ui) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    test("renders search field and create topic button", () => {
        renderWithRouter(<Topic />);

        // Kiểm tra trường tìm kiếm
        expect(screen.getByLabelText(/tìm kiếm/i)).toBeInTheDocument();

        // Kiểm tra nút tạo bộ câu hỏi
        expect(screen.getByText(/tạo bộ câu hỏi/i)).toBeInTheDocument();
    });

    test("renders topics with correct data", () => {
        renderWithRouter(<Topic />);

        // Kiểm tra dữ liệu mô phỏng được hiển thị
        expect(screen.getByText(/mathematics/i)).toBeInTheDocument();
        expect(screen.getByText(/learn about algebra, geometry, and more./i)).toBeInTheDocument();
    });

    test("filters topics based on search input", () => {
        renderWithRouter(<Topic />);

        const searchField = screen.getByLabelText(/tìm kiếm/i);

        // Nhập từ khóa tìm kiếm
        fireEvent.change(searchField, { target: { value: "history" } });

        // Kiểm tra kết quả lọc
        expect(screen.getByText(/history/i)).toBeInTheDocument();
        expect(screen.queryByText(/mathematics/i)).not.toBeInTheDocument();
    });

    test("handles pagination correctly", () => {
        renderWithRouter(<Topic />);

        const nextPageButton = screen.getByRole("button", { name: /2/i });

        // Chuyển sang trang 2
        fireEvent.click(nextPageButton);

        // Kiểm tra hiển thị dữ liệu mới (nếu có dữ liệu đủ để phân trang)
        expect(screen.queryByText(/mathematics/i)).not.toBeInTheDocument();
    });
});

describe("TopicPreview Component", () => {
    test("renders preview with correct data and handles click", () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }));

        render(
            <TopicPreview
                title="Mathematics"
                description="Learn about algebra, geometry, and more."
                topicId={1}
            />
        );

        // Kiểm tra hiển thị dữ liệu
        expect(screen.getByText(/mathematics/i)).toBeInTheDocument();
        expect(screen.getByText(/learn about algebra, geometry, and more./i)).toBeInTheDocument();

        // Kiểm tra hành động khi nhấp vào
        fireEvent.click(screen.getByText(/mathematics/i));
        expect(mockNavigate).toHaveBeenCalledWith("/topic/1");
    });
});

describe("TopicCreate Component", () => {
    test("renders create topic page", () => {
        render(
            <BrowserRouter>
                <TopicCreate />
            </BrowserRouter>
        );

        // Kiểm tra hiển thị trang tạo bộ câu hỏi
        expect(screen.getByText(/topiccreate/i)).toBeInTheDocument();
    });
});

describe("TopicView Component", () => {
    test("renders topic view with quiz sets and pagination", () => {
        render(
            <BrowserRouter>
                <TopicView />
            </BrowserRouter>
        );

        // Kiểm tra hiển thị tiêu đề
        expect(screen.getByText(/danh sách bộ câu hỏi của chủ đề/i)).toBeInTheDocument();

        // Kiểm tra hiển thị bộ câu hỏi mô phỏng
        expect(screen.getByText(/algebra basics/i)).toBeInTheDocument();
        expect(screen.getByText(/world war ii/i)).toBeInTheDocument();

        // Kiểm tra phân trang
        const nextPageButton = screen.getByRole("button", { name: /2/i });
        fireEvent.click(nextPageButton);
        expect(screen.queryByText(/algebra basics/i)).not.toBeInTheDocument();
    });
});
