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

    // Get all Feedbacks By Pages
const getAllFeedbacksByPages = async (token, page) => {
 
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + `getAllFeedbacksByPages?page=${page}` ,config);
    return response.data;
  }

  // Toggle Feedback Resolved Status
const toggleResolveFeedback = async (feedbackId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + `toggleResolve/${feedbackId}`, {}, config);
  return response.data;
};

const deleteFeedback = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(API_URL + `delete/${id}`, config);
  return id;
};


  const feedbackService = {
  createFeedback,
  getAllFeedbacksByPages,
  toggleResolveFeedback,
  deleteFeedback,
   };
   
   export default feedbackService;
