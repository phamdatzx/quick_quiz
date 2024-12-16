import { render, screen } from "@testing-library/react";
import Result from "../pages/quiz/Result";
import { MemoryRouter } from "react-router-dom";
import quizSetService from "../services/quizSetService";

jest.mock("../services/quizSetService");

const mockQuizzes = [
    {
        id: 1,
        content: "Câu hỏi 1",
        answers: ["Đáp án A", "Đáp án B", "Đáp án C"],
        correctAnswer: "Đáp án A",
    },
    {
        id: 2,
        content: "Câu hỏi 2",
        answers: ["Đáp án D", "Đáp án E", "Đáp án F"],
        correctAnswer: "Đáp án D",
    },
];

const mockQuizOverview = {
    name: "Bộ câu hỏi kiểm tra",
    description: "Mô tả bộ câu hỏi kiểm tra",
    allowShowAnswer: true,
};

describe("Result Component", () => {
    beforeEach(() => {
        quizSetService.getQuizSetById.mockResolvedValue(mockQuizOverview);
    });

    test("Hiển thị thông tin tổng quát và kết quả", async () => {
        render(
            <MemoryRouter
                initialEntries={[
                    {
                        pathname: "/result",
                        state: {
                            quizzes: mockQuizzes,
                            userAnswers: ["Đáp án A", "Đáp án E"],
                            quizId: 1,
                            submitTime: "2023-12-16T10:00:00Z",
                        },
                    },
                ]}
            >
                <Result />
            </MemoryRouter>
        );

        expect(await screen.findByText("Bộ câu hỏi: Bộ câu hỏi kiểm tra")).toBeInTheDocument();
        expect(screen.getByText("Bạn đã trả lời đúng 1/2 câu.")).toBeInTheDocument();
    });

    test("Đánh dấu đáp án đúng/sai", async () => {
        render(
            <MemoryRouter
                initialEntries={[
                    {
                        pathname: "/result",
                        state: {
                            quizzes: mockQuizzes,
                            userAnswers: ["Đáp án A", "Đáp án E"],
                            quizId: 1,
                            submitTime: "2023-12-16T10:00:00Z",
                        },
                    },
                ]}
            >
                <Result />
            </MemoryRouter>
        );

        const correctAnswer = await screen.findByText("Đáp án A");
        const wrongAnswer = screen.getByText("Đáp án E");

        expect(correctAnswer).toHaveStyle("background-color: rgb(111, 209, 129)");
        expect(wrongAnswer).toHaveStyle("background-color: rgb(167, 15, 15)");
    });
});
