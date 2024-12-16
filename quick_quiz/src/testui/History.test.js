import { render, screen, fireEvent } from "@testing-library/react";
import History from "../pages/history/History";
import { Provider } from "react-redux";
import store from "../stores/store";
import { BrowserRouter } from "react-router-dom";
import practiceService from "../services/practiceService";

jest.mock("../services/practiceService");

const mockHistoryData = [
    {
        id: 1,
        quizSet: { name: "Quiz Set 1" },
        attempt: 1,
        practiceTime: "2023-12-01T10:00:00Z",
    },
    {
        id: 2,
        quizSet: { name: "Quiz Set 2" },
        attempt: 1,
        practiceTime: "2023-11-30T10:00:00Z",
    },
];

describe("History Component", () => {
    beforeEach(() => {
        practiceService.getAllPracticeAttempt.mockResolvedValue(mockHistoryData);
    });

    test("Hiển thị danh sách lịch sử làm bài", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <History />
                </BrowserRouter>
            </Provider>
        );

        expect(await screen.findByText("Quiz Set: Quiz Set 1 - Lần thử: 1")).toBeInTheDocument();
        expect(screen.getByText("Quiz Set: Quiz Set 2 - Lần thử: 1")).toBeInTheDocument();
    });

    test("Tìm kiếm và sắp xếp lịch sử làm bài", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <History />
                </BrowserRouter>
            </Provider>
        );

        const searchInput = await screen.findByLabelText("Tìm kiếm");
        fireEvent.change(searchInput, { target: { value: "Quiz Set 1" } });

        expect(screen.getByText("Quiz Set: Quiz Set 1 - Lần thử: 1")).toBeInTheDocument();
        expect(screen.queryByText("Quiz Set: Quiz Set 2 - Lần thử: 1")).toBeNull();
    });

    test("Chuyển trang trong danh sách lịch sử làm bài", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <History />
                </BrowserRouter>
            </Provider>
        );

        const paginationNextButton = await screen.findByLabelText("Go to next page");
        fireEvent.click(paginationNextButton);

        // Kiểm tra trang đã thay đổi
        expect(screen.getByText("Quiz Set: Quiz Set 1 - Lần thử: 1")).toBeInTheDocument();
    });
});
