import axios from "axios";

const API_URL = "https://recytrack-backend.onrender.com/api/recycle/";

// Get all recycle locations
const getAllRecycleLocation = async (token) => {
  

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + "location" ,config);
    return response.data;
  }

  const deleteRecycleCollection = async (id, token) => {
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(API_URL + `location/${id}`, config);
        return id; // return the deleted user id to update the Redux store
     
    }



  // Get all Waste Types 
const getAllWasteTypes = async (token) => {
  

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + "wasteType" ,config);
    return response.data;
  }

  const recycleService = {
   getAllRecycleLocation,
   getAllWasteTypes,
   deleteRecycleCollection,
  };
  
  export default recycleService;
