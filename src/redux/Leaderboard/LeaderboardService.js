import axios from "axios";

const API_URL = "https://recytrack-backend.onrender.com/api/leaderboard/";

const calculatePoints = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `calculatePoints`, config);
  return response.data;
};

const calculatePointsById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + `calculatePointsById/${id}`,
    config
  );
  return response.data;
};

const calculateAndRankUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `calculateAndRankUsers`, config);
  return response.data;
};

const LeaderboardService = {
  calculatePoints,
  calculatePointsById,
  calculateAndRankUsers,
};

export default LeaderboardService;
