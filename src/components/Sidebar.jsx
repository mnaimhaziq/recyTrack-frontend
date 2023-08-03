import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  History,
  ChevronRightOutlined,
  HomeOutlined,
  Domain,
  Feedback,
  Article,
  Leaderboard,
  AccountCircle,
  GroupAdd,
} from "@mui/icons-material";

const UserNavItems = [
  {
    url: "dashboard",
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    url: "recyclinghistory",
    text: "Recycling History",
    icon: <History />,
  },
  {
    url: "recyclinglocation",
    text: "Recycling Location",
    icon: <Domain />,
  },
  {
    url: "education",
    text: "Education",
    icon: <Article />,
  },
  {
    url: "leaderboard",
    text: "Leaderboard",
    icon: <Leaderboard />,
  },
  {
    url: "feedbacks",
    text: "Feedbacks",
    icon: <Feedback />,
  },
  {
    url: "",
    text: "User",
    icon: null,
  },
  {
    url: "userprofile",
    text: "User Profile",
    icon: <AccountCircle />,
  },
];

const AdminNavItems = [
  {
    url: "dashboard",
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    url: "recyclinghistory",
    text: "Recycling History",
    icon: <History />,
  },
  {
    url: "recyclinglocation",
    text: "Recycling Location",
    icon: <Domain />,
  },
  {
    url: "education",
    text: "Education",
    icon: <Article />,
  },
  {
    url: "leaderboard",
    text: "Leaderboard",
    icon: <Leaderboard />,
  },
  {
    url: "feedbacks",
    text: "Feedbacks",
    icon: <Feedback />,
  },
  {
    url: "",
    text: "User",
    icon: null,
  },
  {
    url: "manageusers",
    text: "Manage Users",
    icon: <GroupAdd />,
  },
  {
    url: "userprofile",
    text: "User Profile",
    icon: <AccountCircle />,
  },
];

function Sidebar({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    setActive(pathname.substring(1));
    window.scrollTo(0, 0);
  }, [pathname]);



  const [navItems, setNavItems] = useState(user && user.isAdmin ? AdminNavItems : UserNavItems);

  useEffect(() => {
    setNavItems(user && user.isAdmin ? AdminNavItems : UserNavItems);
  }, [user]);


  


  return (
    <Box className="sidebar" component="nav">
      {isSidebarOpen && (
        <Drawer 
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              zIndex: "1100",
              elevation: 3
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 2rem">
              <FlexBetween>
                <Box display="flex" alignItems="center" gap="0.5rem">
                {/* <Box
                component="img"
                alt="profile"
                src="../assets/recycleLogo.png"
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />  */}
              
                  <Typography
                    m="0 0 0  2rem "
                    variant="h4"
                    fontWeight="bold"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    RECYTRACK
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List sx={{ paddingBottom: "1.5rem" }}>
              {navItems.map(({ url, text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 3rem" }}
                      fontWeight="bold"
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase().replace(/\s+/g, '');;

                return (
                  <ListItem key={text} sx={{ p: "0.3rem 0" }}>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${url}`);
                        setActive(url);
                        if (!isNonMobile) {
                          setIsSidebarOpen(!isSidebarOpen);
                        }
                      }}
                      sx={{
                        borderLeft: active === lcText && "5px solid green",
                        backgroundColor:
                          active === lcText
                            ? theme.palette.primary.main
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.neutral[1000]
                            : theme.palette.secondary[100],
                        "&:hover": {
                          color:
                            active === lcText
                              ? theme.palette.neutral[10]
                              : theme.palette.primary.main,
                          "& .MuiListItemIcon-root": {
                            color:
                              active === lcText
                                ? theme.palette.neutral[10]
                                : theme.palette.primary.main
                          },
                          "& .MuiListItemText-primary": {
                            color:
                              active === lcText
                                ? theme.palette.neutral[10]
                                : theme.palette.primary.main,
                          },
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.neutral[1000]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ fontSize: "0.87rem" }}
                      />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
