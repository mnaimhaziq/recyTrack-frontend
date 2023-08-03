
import axios from "axios";

const API_URL = "https://recytrack-backend.onrender.com/api/education/";

// Create Education
 const createEducation = async (education, token) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    const response = await axios.post(API_URL + "create", education, config);
  
    return response.data;
  };

   // Get all Content By Pages
const getAllEducationByPages = async (token, page) => {
 
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `getAllEducationByPages?page=${page}` ,config);
  return response.data;
}

const deleteEducation = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(API_URL + `delete/${id}`, config);
  return id;
};

const updateEducation = async (id, editFormData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `update/${id}`,
    editFormData,
    config
  );
  return response.data; 
};

  
  const EducationService = {
    deleteEducation,
  createEducation,
  getAllEducationByPages,
  updateEducation
   };
   
   export default EducationService;