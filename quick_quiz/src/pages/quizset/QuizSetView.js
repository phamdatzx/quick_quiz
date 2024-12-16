import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import quizSetService from "../../services/quizSetService";
import topicService from "../../services/topicService";

const QuizSetView = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizOverview, setQuizOverview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const getTopicNameById = (topics, id) => {
    const topic = topics.find((topic) => topic.id === id);
    return topic ? topic.name : "Topic not found";
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const overview = await quizSetService.getQuizSetById(quizId);
        setQuizOverview(overview);
        
        const topicList = await topicService.getTopics({page:"", limit:""});
        setTopicList(topicList.topics);

        const quizzes = await quizSetService.getQuizzesByQuizSetId(quizId);
        setQuestions(quizzes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleStartQuiz = () => {
    navigate(`/quiz/${quizId}/`);
  };

  if (loading) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" color="error">
          Lỗi: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Hiển thị thông tin overview */}
      {quizOverview && (
        <>
          <Typography variant="h4" gutterBottom>
            Chủ đề: {getTopicNameById(topicList,quizOverview.topicId)}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Bộ câu hỏi: {quizOverview.name}
          </Typography>
          <Typography variant="body1" gutterBottom marginBottom={3}>
            {quizOverview.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Được tạo vào lúc: {formatDateTime(quizOverview.createdTime)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Tổng số câu hỏi: {questions.length}
          </Typography>
        </>
      )}

      {/* Hiển thị danh sách câu hỏi nếu allowShowAnswer là true */}
      {quizOverview?.isYourQuizSet ? (
        questions.length > 0 ? (
          <List>
            {questions.map((question) => (
              <ListItem
                key={question.id}
                divider
                sx={{
                  display: "flex",
                  p: 2,
                  m: 2,
                  flexDirection: "column",
                  gap: 2,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  maxWidth: "60vw",
                  justifySelf: "center",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body1" gutterBottom>
                    {question.content}
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                    }}
                  >
                    {question.answers.map((answer, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1,
                          borderRadius: 2,
                          backgroundColor: "#f0f0f0",
                          boxShadow: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#000",
                          }}
                        >
                          {answer}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">
            Không có câu hỏi nào trong bộ này.
          </Typography>
        )
      ) : (
        <Typography variant="body1">
          Bạn không được quyền xem danh sách câu hỏi.
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStartQuiz}
        >
          Bắt đầu làm bài
        </Button>
      </Box>
    </Box>
  );
};

export default QuizSetView;
