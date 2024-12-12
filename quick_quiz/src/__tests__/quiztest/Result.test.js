import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Result from "../../pages/quiz/Result";

describe("Result Component", () => {
    const mockLocation = {
        state: {
            quizzes: [
                {
                    question: "Question 1?",
                    choices: ["Option A", "Option B", "Option C"],
                    correctAnswer: 0,
                },
            ],
            userAnswers: [0],
        },
    };

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => mockLocation,
    }));

    it("calculates and displays the correct result", () => {
        render(
            <MemoryRouter>
                <Result />
            </MemoryRouter>
        );

        expect(screen.getByText("Kết quả làm bài")).toBeInTheDocument();
        expect(screen.getByText("Bạn đã trả lời đúng 1/1 câu.")).toBeInTheDocument();
    });

    it("shows correct and incorrect answers", () => {
        render(
            <MemoryRouter>
                <Result />
            </MemoryRouter>
        );

        expect(screen.getByText("Đáp án đúng: Option A")).toBeInTheDocument();
        expect(screen.getByText("Đáp án của bạn: Option A")).toBeInTheDocument();
    });

    it("navigates to retry quiz on 'Làm lại' button click", () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useNavigate: () => mockNavigate,
        }));

        render(
            <MemoryRouter>
                <Result />
            </MemoryRouter>
        );

        const retryButton = screen.getByText("Làm lại");
        fireEvent.click(retryButton);

        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
});
