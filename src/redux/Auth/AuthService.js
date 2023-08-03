import axios from "axios";

const API_URL = "https://recytrack-backend.onrender.com/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
  
    if (response.data) {
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    }
    return response.data;
  };

  // Update user
const updateProfile = async (token, userUpdateData) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + "profile", userUpdateData, config);

  if (response.data) {
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  }
  return response.data;
};

// Get Users By Page
const getUsersByPage = async (token, page, search) => {
  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `getUsersByPage?page=${page}&search=${search}` ,config);
  return response.data;
}

// Get All Users
const getAllUsers = async (token) => {
  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `getAllUsers` ,config);
  return response.data;
}

const getUserById = async (token, id) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `${id}`, config);

  return response.data;
};

const changeUserRole = async (token, id) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(API_URL + `change-role/${id}`, {}, config);

  return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('userInfo')
}

// Update dark mode
const updateDarkMode = async (userId, darkMode, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    userId,
    darkMode,
    token
  };

  const response = await axios.patch(API_URL + `users/${userId}/dark-mode`, data, config);

  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};


const authService = {
  register,
  login,
  updateProfile,
  getUsersByPage,
  getAllUsers,
  getUserById,
  changeUserRole,
  logout,
  updateDarkMode,
};

export default authService;
