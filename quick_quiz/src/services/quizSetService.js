import axiosConfig from "../config/customizations/axiosConfig";

const getAllQuizSets = async () => {
    const response = await axiosConfig.get('/quiz-set/all');
    return response.data;
};

const getQuizSetById = async (quizId) => {
  try {
    const response = await axiosConfig.get(`/quiz-set/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch quiz set by ID:", error);
    throw error;
  }
};
  
const getQuizSetsByTopic = async ({
  topicId = 1,
  page = 0,
  limit = 10,
  direction = "asc",
  search = "",
}) => {
  try {
    const response = await axiosConfig.get("/quiz-set/all", {
      params: {
        topicId,
        page,
        limit,
        direction,
        search,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch quiz sets:", error);
    throw error; 
  }
};

const getQuizzesByQuizSetId = async (quizSetId) => {
  try {
    const response = await axiosConfig.get(`/quiz/all`, {
      params: { quizSetId },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch quizzes by Quiz Set ID:", error);
    throw error;
  }
};
  
  const createQuizSet = async (quizSetData) => {
    const response = await axiosConfig.post('/quiz-set', quizSetData);
    return response.data;
};
  
const bookmarkQuizSet = async (quizId) => {
  try {
    const response = await axiosConfig.post(`/quiz-set/${quizId}/bookmark`);
    return response.data;
  } catch (error) {
    console.error("Failed to bookmark quiz set:", error);
    throw error;
  }
};

const unbookmarkQuizSet = async (quizId) => {
  try {
    const response = await axiosConfig.delete(`/quiz-set/${quizId}/bookmark`);
    return response.data;
  } catch (error) {
    console.error("Failed to unbookmark quiz set:", error);
    throw error;
  }
};

const getBookmarkedQuizSets = async () => {
  try {
    const response = await axiosConfig.get(`/quiz-set/bookmarks`);
    return response.data.quizSets;
  } catch (error) {
    console.error("Failed to unbookmark quiz set:", error);
    throw error;
  }
};
  
const getRandomQuizSets = async () => {
  try {
    const response = await axiosConfig.get(`/quiz-set/random?limit=19`);
    return response.data.quizSets;
  } catch (error) {
    console.error("Failed to get quiz set:", error);
    throw error;
  }
};
export default {
  getQuizSetsByTopic,
  getQuizSetById,
  getAllQuizSets,
  getQuizzesByQuizSetId,
  createQuizSet,
  bookmarkQuizSet,
  unbookmarkQuizSet,
  getBookmarkedQuizSets,
    getRandomQuizSets,
  };