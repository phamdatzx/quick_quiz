import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuizCreate from "../../pages/quiz/QuizCreate";

describe("QuizCreate Component", () => {
    it("renders the quiz creation form", () => {
        render(<QuizCreate />);
        expect(screen.getByText("Tạo Quiz")).toBeInTheDocument();
    });

    it("allows adding a new question", () => {
        render(<QuizCreate />);
        const addButton = screen.getByText("Thêm câu hỏi");
        fireEvent.click(addButton);
        expect(screen.getByText("Câu hỏi số 1")).toBeInTheDocument();
    });

    it("displays fields for questions and answers", () => {
        render(<QuizCreate />);
        fireEvent.click(screen.getByText("Thêm câu hỏi"));
        expect(screen.getByLabelText("Nhập câu hỏi")).toBeInTheDocument();
        expect(screen.getByLabelText("Lựa chọn số 1")).toBeInTheDocument();
    });

    it("submits the quiz successfully", async () => {
        jest.spyOn(window, "alert").mockImplementation(() => {});
        global.fetch = jest.fn(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
        );

        render(<QuizCreate />);
        fireEvent.change(screen.getByLabelText("Tiêu đề của Quiz"), {
            target: { value: "Test Quiz" },
        });

        const submitButton = screen.getByText("Tạo quiz");
        fireEvent.click(submitButton);

        expect(await screen.findByText("Quiz created successfully!")).toBeTruthy();
    });
});
