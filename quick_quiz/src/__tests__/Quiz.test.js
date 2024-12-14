import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import QuizCreate from "../pages/quizset/QuizCreate";
import QuizSetCard from "../pages/quizset/QuizSetCard";
import QuizSetLibrary from "../pages/quizset/QuizSetLibrary";
import QuizSetPreview from "../pages/quizset/QuizSetPreview";
import QuizSetView from "../pages/quizset/QuizSetView";
import Quiz from "../pages/quiz/Quiz";
import Result from "../pages/quiz/Result";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("QuizCreate Component", () => {
    test("renders all input fields and buttons", () => {
        render(
            <BrowserRouter>
                <QuizCreate />
            </BrowserRouter>
        );

        // Kiểm tra hiển thị các trường nhập
        expect(screen.getByLabelText(/tiêu đề của bộ câu hỏi/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mô tả của bộ câu hỏi/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/chủ đề/i)).toBeInTheDocument();

        // Kiểm tra các nút
        expect(screen.getByText(/thêm câu hỏi/i)).toBeInTheDocument();
        expect(screen.getByText(/tạo bộ câu hỏi/i)).toBeInTheDocument();
    });

    test("adds and removes questions", () => {
        render(
            <BrowserRouter>
                <QuizCreate />
            </BrowserRouter>
        );

        const addQuestionButton = screen.getByText(/thêm câu hỏi/i);

        // Thêm câu hỏi
        fireEvent.click(addQuestionButton);
        expect(screen.getByText(/câu hỏi số 1/i)).toBeInTheDocument();

        // Xóa câu hỏi
        const removeQuestionButton = screen.getByText(/xóa câu hỏi/i);
        fireEvent.click(removeQuestionButton);
        expect(screen.queryByText(/câu hỏi số 1/i)).not.toBeInTheDocument();
    });
});

describe("QuizSetCard Component", () => {
    test("renders quiz set card with correct data and handles click", () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }));

        render(
            <QuizSetCard
                title="Math Basics"
                questionCount={20}
                quizId={1}
            />
        );

        // Kiểm tra dữ liệu hiển thị
        expect(screen.getByText(/math basics/i)).toBeInTheDocument();
        expect(screen.getByText(/20 câu hỏi/i)).toBeInTheDocument();

        // Kiểm tra sự kiện click
        fireEvent.click(screen.getByText(/math basics/i));
        expect(mockNavigate).toHaveBeenCalledWith("/quizsetview/1");
    });
});

describe("QuizSetLibrary Component", () => {
    test("renders search field, sort dropdown, and tabs", () => {
        render(
            <BrowserRouter>
                <QuizSetLibrary />
            </BrowserRouter>
        );

        // Kiểm tra các trường và tabs
        expect(screen.getByLabelText(/tìm kiếm/i)).toBeInTheDocument();
        expect(screen.getByText(/bộ câu hỏi của bạn/i)).toBeInTheDocument();
        expect(screen.getByText(/bộ câu hỏi đã lưu/i)).toBeInTheDocument();
    });

    test("filters and paginates quiz sets", () => {
        render(
            <BrowserRouter>
                <QuizSetLibrary />
            </BrowserRouter>
        );

        const searchField = screen.getByLabelText(/tìm kiếm/i);
        fireEvent.change(searchField, { target: { value: "history" } });

        // Kiểm tra kết quả tìm kiếm
        expect(screen.getByText(/history 101/i)).toBeInTheDocument();
        expect(screen.queryByText(/math basics/i)).not.toBeInTheDocument();
    });
});

describe("QuizSetPreview Component", () => {
    test("renders preview with correct data and handles click", () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }));

        render(
            <QuizSetPreview
                title="Math Basics"
                questionCount={20}
                quizId={1}
            />
        );

        // Kiểm tra hiển thị dữ liệu
        expect(screen.getByText(/math basics/i)).toBeInTheDocument();
        expect(screen.getByText(/20 câu hỏi/i)).toBeInTheDocument();

        // Kiểm tra sự kiện click
        fireEvent.click(screen.getByText(/math basics/i));
        expect(mockNavigate).toHaveBeenCalledWith("/quizsetview/1");
    });
});

describe("QuizSetView Component", () => {
    test("renders quiz set view with questions and start button", () => {
        render(
            <BrowserRouter>
                <QuizSetView />
            </BrowserRouter>
        );

        // Kiểm tra hiển thị danh sách câu hỏi
        expect(screen.getByText(/what is the capital of france\?/i)).toBeInTheDocument();
        expect(screen.getByText(/solve: 2 \+ 2 = \?/i)).toBeInTheDocument();

        // Kiểm tra nút bắt đầu làm bài
        const startButton = screen.getByText(/bắt đầu làm bài/i);
        fireEvent.click(startButton);
        expect(startButton).toBeInTheDocument();
    });
});

describe("Quiz Component", () => {
    test("renders quiz questions and handles answer selection", () => {
        render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );

        // Kiểm tra hiển thị câu hỏi
        expect(screen.getByText(/theo quan điểm của triết gia aristotle/i)).toBeInTheDocument();
        expect(screen.getByText(/nguyên nhân vật chất/i)).toBeInTheDocument();

        // Chọn câu trả lời
        fireEvent.click(screen.getByText(/nguyên nhân mục đích/i));
        expect(screen.getByText(/nguyên nhân mục đích/i)).toHaveStyle("background-color: rgb(255, 0, 0)");
    });

    test("submits quiz and navigates to result page", () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }));

        render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );

        // Nộp bài
        const submitButton = screen.getByText(/nộp bài/i);
        fireEvent.click(submitButton);
        expect(mockNavigate).toHaveBeenCalledWith("/result", expect.anything());
    });
});

describe("Result Component", () => {
    test("renders results with correct answers and user selections", () => {
        const mockState = {
            quizzes: [
                {
                    question: "What is the capital of France?",
                    choices: ["Paris", "London", "Berlin", "Madrid"],
                    correctAnswer: 0,
                },
            ],
            userAnswers: [0],
        };

        jest.mock("react-router-dom", () => ({
            useLocation: () => ({ state: mockState }),
            useNavigate: jest.fn(),
        }));

        render(
            <BrowserRouter>
                <Result />
            </BrowserRouter>
        );

        // Kiểm tra hiển thị kết quả
        expect(screen.getByText(/bạn đã trả lời đúng 1\/1 câu/i)).toBeInTheDocument();
        expect(screen.getByText(/paris/i)).toHaveStyle("background-color: rgb(111, 209, 129)");
    });

    test("navigates to home page on retry", () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }));

        render(
            <BrowserRouter>
                <Result />
            </BrowserRouter>
        );

        const retryButton = screen.getByText(/làm lại/i);
        fireEvent.click(retryButton);
        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
});
