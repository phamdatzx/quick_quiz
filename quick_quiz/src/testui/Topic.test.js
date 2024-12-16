import { render, screen, fireEvent } from "@testing-library/react";
import Topic from "../pages/topic/Topic";
import { Provider } from "react-redux";
import store from "../stores/store";
import { BrowserRouter } from "react-router-dom";
import topicService from "../services/topicService";

jest.mock("../services/topicService");

const mockTopics = [
    { id: 1, name: "Chủ đề 1", description: "Mô tả chủ đề 1" },
    { id: 2, name: "Chủ đề 2", description: "Mô tả chủ đề 2" },
];

describe("Topic Component", () => {
    beforeEach(() => {
        topicService.getTopics.mockResolvedValue({ topics: mockTopics });
    });

    test("Hiển thị danh sách chủ đề", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Topic />
                </BrowserRouter>
            </Provider>
        );

        expect(await screen.findByText("Chủ đề 1")).toBeInTheDocument();
        expect(screen.getByText("Chủ đề 2")).toBeInTheDocument();
    });

    test("Tìm kiếm chủ đề", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Topic />
                </BrowserRouter>
            </Provider>
        );

        const searchInput = await screen.findByLabelText("Tìm kiếm");
        fireEvent.change(searchInput, { target: { value: "Chủ đề 1" } });

        expect(screen.getByText("Chủ đề 1")).toBeInTheDocument();
        expect(screen.queryByText("Chủ đề 2")).toBeNull();
    });

    test("Phân trang danh sách chủ đề", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Topic />
                </BrowserRouter>
            </Provider>
        );

        const nextPageButton = await screen.findByLabelText("Trang kế tiếp");
        fireEvent.click(nextPageButton);

        // Mock API trả về danh sách mới
        expect(topicService.getTopics).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }));
    });
});
