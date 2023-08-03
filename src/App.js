import { useEffect, useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/Dashboard/Dashboard";
import Layout from "./scenes/Layout";
import AllUsers from "./scenes/ManageUsers/AllUsers";
import Login from "./scenes/Authentication/Login";
import Register from "./scenes/Authentication/Register";
import Profile from "./scenes/Profile/Profile";
import RecyclingHistory from "./scenes/History/RecyclingHistory";
import RecyclingLocation from "./scenes/Location/RecyclingLocation";
import Education from "./scenes/Education/Education";
import Leaderboard from "./scenes/Leaderboard/Leaderboard";
import Feedbacks from "./scenes/Feedback/Feedbacks";
import Home from "./scenes/Home/Home";
import Education_Create_Form from "./scenes/Education/CreateEducation";
import { Education_Content } from "./scenes/Education/EducationContent";
import Education_Edit_Form from "./scenes/Education/EditEducation";
import { UserProvider } from "./context/UserContext";
import ManageUser from "./scenes/ManageUsers/ManageUser";
import ManageUsersLayout from "./scenes/ManageUsers/ManageUsersLayout";


function App() {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const userMode = user ? user.darkMode : null;
  const globalMode = useSelector((state) => state.global.mode);
  const mode = userMode || globalMode;
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* Wrap the routes with the UserProvider */}
          <UserProvider user={user}>
            <Routes>
              <Route element={<Layout />}>
                {user ? (
                  <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/education" element={<Education />}>
                      <Route path="" element={<Education_Content />} />
                      <Route
                        path="create"
                        element={<Education_Create_Form />}
                      />
                      <Route
                        path="update"
                        element={<Education_Edit_Form />}
                      />
                    </Route>
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/feedbacks" element={<Feedbacks />} />
                    {user.isAdmin && (
                      <Route path="/manageusers" element={<ManageUsersLayout />} >
                          <Route path="" element={<AllUsers />} />
                          <Route path=":id" element={<ManageUser />} />
                      </Route>
                    )}
                    <Route path="/userprofile" element={<Profile />} />
                    <Route
                      path="/recyclinghistory"
                      element={<RecyclingHistory />}
                    />
                    <Route
                      path="/recyclinglocation"
                      element={<RecyclingLocation />}
                    />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </>
                )}
                <Route
                  path="*"
                  element={
                    <Navigate to={user ? "/dashboard" : "/home"} replace />
                  }
                />
              </Route>
            </Routes>
          </UserProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
