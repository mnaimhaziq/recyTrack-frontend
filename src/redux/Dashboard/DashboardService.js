import axios from "axios";

const API_URL = "https://recytrack-backend.onrender.com/api/dashboard/";

// Get Total Recycling History
const getTotalRecyclingHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `total-recycling-history`, config);
  return response.data;
};

const getTotalRecyclingHistoryByUserId = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + `getTotalRecyclingHistoryByUserId/${id}`,
    config
  );
  return response.data;
};

const getMostRecycledWasteTypeByUserId = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + `getMostRecycledWasteTypeByUserId/${id}`,
    config
  );
  return response.data; 
};

const getMostRecycledWasteType = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + `getMostRecycledWasteType`,
    config
  );
  return response.data; 
};

const getRecyclingPercentagesByUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `percentages/${id}`, config);
  return response.data; 
};

const getRecyclingPercentages = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `percentages`, config);
  return response.data; 
};



const DashboardService = {
  getTotalRecyclingHistory,
  getTotalRecyclingHistoryByUserId,
  getMostRecycledWasteTypeByUserId,
  getMostRecycledWasteType,
  getRecyclingPercentagesByUser,
  getRecyclingPercentages
};

export default DashboardService;
