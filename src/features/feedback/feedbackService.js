import axios from "axios";

const API_URL = "https://recytrack-backend.onrender.com/api/feedback/";

// Create Feedback
 const createFeedback = async (feedback, token) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    const response = await axios.post(API_URL + "create", feedback, config);
  
    return response.data;
  };

    // Get all recycle locations
const getAllFeedbacksByPages = async (token, page) => {
 
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + `getAllFeedbacksByPages?page=${page}` ,config);
    return response.data;
  }

  const feedbackService = {
  createFeedback,
  getAllFeedbacksByPages
   };
   
   export default feedbackService;
