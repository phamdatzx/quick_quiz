import axiosConfig from "../config/customizations/axiosConfig";

const createTopic = async (topicData) => {
  try {
    const response = await axiosConfig.post('/topic', topicData);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return { success: false, error: 'Đã tồn tại Chủ đề này' };
  }
  return { success: false, error: error.message || 'Lỗi không xác định' };
  }
  };
  
  const deleteTopic = async (id) => {
    const response = await axiosConfig.delete(`/topic/${id}`);
    return response.data;
  };
  
const getTopics = async ({
  page = 0,
    limit = 10,}) => {
    const response = await axiosConfig.get('/topics', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  };
  
  const updateTopic = async (id, topicData) => {
    const response = await axiosConfig.patch(`/topic/${id}`, topicData);
    return response.data;
  };
  
  export default {
    createTopic,
    deleteTopic,
    getTopics,
    updateTopic,
  };