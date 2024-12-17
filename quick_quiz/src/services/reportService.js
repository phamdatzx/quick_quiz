import axiosConfig from "../config/customizations/axiosConfig";

 const getReports = async (search) => {
    try {
      const response = await axiosConfig.get("/report/all", {
        params: { search },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  };
  
const updateReportStatus = async (reportId, status) => {
    try {
      const response = await axiosConfig.patch(`/report/${reportId}`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating report status:", error);
      throw error;
    }
};
  
export default {
    getReports,
    updateReportStatus,
}