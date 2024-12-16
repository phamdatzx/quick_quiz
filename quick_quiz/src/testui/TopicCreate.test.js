import { render, screen, fireEvent } from "@testing-library/react";
import TopicCreate from "../pages/topic/TopicCreate";
import { Provider } from "react-redux";
import store from "../stores/store";
import { BrowserRouter } from "react-router-dom";
import topicService from "../services/topicService";

jest.mock("../services/topicService");

describe("TopicCreate Component", () => {
    test("Tạo chủ đề thành công", async () => {
        topicService.createTopic.mockResolvedValue({ id: 1 });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <TopicCreate />
                </BrowserRouter>
            </Provider>
        );

        const nameInput = screen.getByLabelText("Tên chủ đề");
        const descriptionInput = screen.getByLabelText("Mô tả");
        const submitButton = screen.getByRole("button", { name: /Tạo chủ đề/i });

        fireEvent.change(nameInput, { target: { value: "Chủ đề mới" } });
        fireEvent.change(descriptionInput, { target: { value: "Mô tả chủ đề mới" } });
        fireEvent.click(submitButton);

        expect(await screen.findByText("Đã tạo chủ đề thành công!")).toBeInTheDocument();
    });

    test("Xử lý lỗi khi tên chủ đề trùng", async () => {
        topicService.createTopic.mockRejectedValue({ response: { status: 409 } });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <TopicCreate />
                </BrowserRouter>
            </Provider>
        );

        const nameInput = screen.getByLabelText("Tên chủ đề");
        const submitButton = screen.getByRole("button", { name: /Tạo chủ đề/i });

        fireEvent.change(nameInput, { target: { value: "Chủ đề trùng" } });
        fireEvent.click(submitButton);

        expect(await screen.findByText("Đã tồn tại Chủ đề này")).toBeInTheDocument();
    });
});
