import axiosConfig from "../config/customizations/axiosConfig";

const createTopic = async (topicData) => {
    const response = await axiosConfig.post('/topic', topicData);
    return response.data;
  };
  
  const deleteTopic = async (id) => {
    const response = await axiosConfig.delete(`/topic/${id}`);
    return response.data;
  };
  
  const getTopics = async () => {
    const response = await axiosConfig.get('/topics');
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