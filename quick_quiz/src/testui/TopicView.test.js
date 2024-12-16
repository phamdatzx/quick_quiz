import { render, screen, fireEvent } from "@testing-library/react";
import TopicView from "../pages/topic/TopicView";
import { Provider } from "react-redux";
import store from "../stores/store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import quizSetService from "../services/quizSetService";

jest.mock("../services/quizSetService");

const mockQuizSets = [
    { id: 1, name: "Quiz 1", description: "Mô tả Quiz 1" },
    { id: 2, name: "Quiz 2", description: "Mô tả Quiz 2" },
];

describe("TopicView Component", () => {
    beforeEach(() => {
        quizSetService.getQuizSetsByTopic.mockResolvedValue({ quizSets: mockQuizSets, totalElements: 2 });
    });

    test("Hiển thị danh sách bộ câu hỏi", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <TopicView />
                </BrowserRouter>
            </Provider>
        );

        expect(await screen.findByText("Quiz 1")).toBeInTheDocument();
        expect(screen.getByText("Quiz 2")).toBeInTheDocument();
    });

    test("Hành động bookmark Bộ câu hỏi", async () => {
        quizSetService.bookmarkQuizSet.mockResolvedValue({});
        quizSetService.unbookmarkQuizSet.mockResolvedValue({});

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <TopicView />
                </MemoryRouter>
            </Provider>
        );

        const bookmarkButton = await screen.findByRole("button", { name: /bookmark/i });
        fireEvent.click(bookmarkButton);

        expect(quizSetService.bookmarkQuizSet).toHaveBeenCalled();
    });
});
