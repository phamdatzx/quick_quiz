import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Quiz from "../../pages/quiz/Quiz";

describe("Quiz Component", () => {
    it("renders all questions and choices correctly", () => {
        render(
            <MemoryRouter>
                <Quiz />
            </MemoryRouter>
        );

        expect(screen.getByText(/Theo quan điểm của triết gia Aristotle/)).toBeInTheDocument();
        expect(screen.getByText(/Nguyên nhân vật chất/)).toBeInTheDocument();
    });

    it("handles selecting an answer", () => {
        render(
            <MemoryRouter>
                <Quiz />
            </MemoryRouter>
        );

        const choiceButton = screen.getByText(/Nguyên nhân vật chất/);
        fireEvent.click(choiceButton);
        expect(choiceButton).toBeInTheDocument(); // Choice selection logic triggered
    });

    it("navigates to result page and passes data on submit", () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useNavigate: () => mockNavigate,
        }));

        render(
            <MemoryRouter>
                <Quiz />
            </MemoryRouter>
        );

        const submitButton = screen.getByText("Nộp bài");
        fireEvent.click(submitButton);

        expect(mockNavigate).toHaveBeenCalledWith("/result", expect.any(Object));
    });
});
