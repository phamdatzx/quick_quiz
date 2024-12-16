import axiosConfig from "../config/customizations/axiosConfig";

const quizService = {
    async createQuizSet(requestBody) {
        try {
            const response = await axiosConfig.post("/quiz-set", requestBody);
            return response.data;
          } catch (error) {
            console.error("Error creating quiz set:", error);
            throw error;
          }
    },
    async createQuiz(quizSetId, questions){
      
  
      try {
        const response = await axiosConfig.post(`/quiz-set/${quizSetId}/quizzes`, questions);
        return response.data;
      } catch (error) {
        console.error("Error creating quiz set:", error);
        throw error;
      }
    },
  };
  
  export default quizService;