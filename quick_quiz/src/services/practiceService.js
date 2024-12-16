import axiosConfig from "../config/customizations/axiosConfig";

const submitPracticeAttempt = async (quizId, submissionData) => {
  try {
    const response = await axiosConfig.post(`/practice/${quizId}`, submissionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllPracticeAttempt = async () => {
  try {
    const response = await axiosConfig.get(`/practices`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDetailPracticeAttempt = async (id) => {
  try {
    const response = await axiosConfig.get(`/practice/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  submitPracticeAttempt,
  getAllPracticeAttempt,
  getDetailPracticeAttempt,
};