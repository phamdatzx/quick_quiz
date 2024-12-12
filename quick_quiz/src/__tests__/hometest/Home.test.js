import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home";
import QuizSetCard from "../../pages/home/QuizSetCard";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

const mockedNavigate = require("react-router-dom").useNavigate;

describe("Home Component", () => {
    //Kiểm tra việc hiển thị danh sách các quiz.
    test("renders all quiz cards correctly", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const quizTitles = [
            "Math Quiz",
            "Science Quiz",
            "History Quiz",
            "Geography Quiz",
            "Programming Quiz",
            "Literature Quiz",
            "Art Quiz",
            "Music Theory Quiz",
            "Physics Quiz",
            "Chemistry Quiz",
            "World Capitals Quiz",
            "Space Exploration Quiz",
        ];

        quizTitles.forEach((title) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });
    //Kiểm tra việc chuyển hướng đúng khi nhấp vào một thẻ quiz.
    test("navigates to the correct quiz on card click", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const quizCard = screen.getByText("Math Quiz");
        fireEvent.click(quizCard);

        expect(mockedNavigate).toHaveBeenCalledWith("/quiz/1");
    });
});

describe("QuizSetCard Component", () => {
    //Kiểm tra tiêu đề quiz và số lượng câu hỏi hiển thị đúng.
    test("renders the quiz title and question count", () => {
        render(
            <MemoryRouter>
                <QuizSetCard title="Sample Quiz" questionCount={10} quizId={1} />
            </MemoryRouter>
        );

        expect(screen.getByText("Sample Quiz")).toBeInTheDocument();
        expect(screen.getByText("10 Câu hỏi")).toBeInTheDocument();
    });
    //Kiểm tra chuyển hướng đúng khi nhấp vào thẻ quiz.
    test("handles click to navigate to quiz page", () => {
        render(
            <MemoryRouter>
                <QuizSetCard title="Sample Quiz" questionCount={10} quizId={1} />
            </MemoryRouter>
        );

        const quizCard = screen.getByText("Sample Quiz");
        fireEvent.click(quizCard);

        expect(mockedNavigate).toHaveBeenCalledWith("/quiz/1");
    });
});
