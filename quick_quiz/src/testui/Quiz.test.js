import { render, screen, fireEvent } from "@testing-library/react";
import Quiz from "../pages/quiz/Quiz";
import { Provider } from "react-redux";
import store from "../stores/store";
import { BrowserRouter } from "react-router-dom";
import quizSetService from "../services/quizSetService";
import practiceService from "../services/practiceService";

jest.mock("../services/quizSetService");
jest.mock("../services/practiceService");

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

describe("Quiz Component", () => {
    beforeEach(() => {
        quizSetService.getQuizzesByQuizSetId.mockResolvedValue(mockQuizzes);
    });

    test("Hiển thị danh sách câu hỏi", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Quiz />
                </BrowserRouter>
            </Provider>
        );

        expect(await screen.findByText("Câu hỏi 1")).toBeInTheDocument();
        expect(screen.getByText("Câu hỏi 2")).toBeInTheDocument();
    });

    test("Xử lý chọn câu trả lời", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Quiz />
                </BrowserRouter>
            </Provider>
        );

        const answerButton = await screen.findByText("Đáp án A");
        fireEvent.click(answerButton);

        // Kiểm tra trạng thái đã chọn
        expect(answerButton).toHaveStyle("background-color: rgb(111, 209, 129)");
    });

    test("Nộp bài thành công", async () => {
        practiceService.submitPracticeAttempt.mockResolvedValue({});
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Quiz />
                </BrowserRouter>
            </Provider>
        );

        const submitButton = await screen.findByRole("button", { name: /Nộp bài/i });
        fireEvent.click(submitButton);

        expect(practiceService.submitPracticeAttempt).toHaveBeenCalled();
    });
});
