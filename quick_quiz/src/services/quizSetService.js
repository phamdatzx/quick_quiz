import axiosConfig from "../config/customizations/axiosConfig";

const getAllQuizSets = async () => {
    const response = await axiosConfig.get('/quiz-set/all');
    return response.data;
  };
  
  const createQuizSet = async (quizSetData) => {
    const response = await axiosConfig.post('/quiz-set', quizSetData);
    return response.data;
  };
  
  export default {
    getAllQuizSets,
    createQuizSet,
  };