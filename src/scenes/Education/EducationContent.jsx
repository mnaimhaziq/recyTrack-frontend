import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEducationByPages } from "../../redux/Education/Function/EducationFunction";
import { Video } from "cloudinary-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import InfiniteScroll from "react-infinite-scroll-component";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import "./Education.css";
import { Add, MoreVert } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import EducationService from "../../redux/Education/EducationService";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { currentEditEducation } from "../../redux/Education/EducationSlice";
import Header from "../../components/Header";
import { useUser } from "../../context/UserContext";

export const Education_Content = () => {
  const [page, setPage] = useState(1);
  const [showFullContent, setShowFullContent] = useState([]);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useUser();
  const educations = useSelector((state) => state.education.educations);
  const { pages } = educations;
  const [listData, setListData] = useState([]);
  const [totalPages, setTotalPages] = useState(pages);
  const [anchorEls, setAnchorEls] = useState([]);

  useEffect(() => {
    // Update totalPages when the data changes
    setTotalPages(pages);
  }, [pages]);

  const fetchMoreData = async () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      const response = await dispatch(
        getAllEducationByPages({ token: user.token, page: nextPage })
      );
      // Append the new data to the existing listData
      setListData((prevListData) => [
        ...prevListData,
        ...response.payload.data,
      ]);
      // Update the current page state
      setPage(nextPage);
    }
  };

  const handleClick = (index, event) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleDelete = async (index, id) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);

    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        EducationService
          .deleteEducation(id, user.token)
          .then(async () => {
            setListData([])
            const response = await dispatch(
              getAllEducationByPages({ token: user.token, page })
            );
            setListData((prevListData) => [
              ...prevListData,
              ...response.payload.data,
            ]);
          })
          .finally(toast.error("Your Content Has Been Deleted "));
      }
    });
  };
  useEffect(() => {
    const getAllEducationByPage = async () => {
      const response = await dispatch(
        getAllEducationByPages({ token: user.token, page })
      );
      setListData((prevListData) => [
        ...prevListData,
        ...response.payload.data,
      ]);
    };
    getAllEducationByPage();
    // eslint-disable-next-line
  }, []);

  const handleReadMoreClick = (index) => {
    setShowFullContent((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
          <Box
        display={ "flex" }
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mb: "3rem",
          marginX: isNonMobile && "50px" ,
        }}
      >
        <Header title="EDUCATION" />

        <Box >
          <FlexBetween>
          <Button
            variant="contained"
            color="primary"
            onClick={ () => {navigate('/education/create')}}
            sx={{
              
             
              color: "#000000",
              backgroundColor: theme.palette.primary.light,
             
            }}
          >
            <Add /> {isNonMobile ? "Create New Content" : "create"}
          </Button>
          </FlexBetween>
         
        </Box>
      </Box>
      <ToastContainer theme="colored" />
      {listData !== 0 && (
        <InfiniteScroll
          dataLength={listData.length} // This is important to track the length of data
          next={fetchMoreData} // Function to load more data when the user scrolls to the bottom
          hasMore={page < totalPages} // Set this to false when you've loaded all data
          loader={<div style={{marginY: '2rem', marginX: isNonMobile && '10rem', width: isNonMobile ? '100vh' : '100vw', display: 'flex', justifyContent: 'center'}}><CircularProgress/></div>} // Optional loading indicator element
        >
          {listData &&
            listData.map((item, index) => (
              <Paper
                elevation={6}
                sx={{
                  minHeight: "20vh",
                  width: isNonMobile ? "100vh" : "100%",
                  backgroundColor: theme.palette.background.alt,
                  margin: isNonMobile ? "50px" : "5px",
                  marginTop: isNonMobile ? "10px" : "5px",
                  marginBottom: isNonMobile ? "50px" : "25px",
                  padding: "1rem",
                }}
              >
                
                <FlexBetween>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textTransform: "none",
                      gap: "1rem",
                      margin: "1rem",
                    }}
                  >
                    <Box
                      component="img"
                      alt="profile"
                      src={item.author_id.picture.secure_url}
                      height="32px"
                      width="32px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover" }}
                    />

                    <Box textAlign="left">
                      <Typography
                        fontWeight="bold"
                        fontSize="1rem"
                        sx={{ color: theme.palette.neutral[10] }}
                      >
                        {item.author_id.name}
                      </Typography>
                      <Typography
                        fontSize="0.75rem"
                        sx={{ color: theme.palette.neutral[10] }}
                      >
                        {formatPostTimestamp(item.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                 {(user.isAdmin && (user.name === item.author_id.name) ) && <> <Button
                    onClick={(event) => handleClick(index, event)}
                    sx={{
                      borderRadius: "50%",
                      minWidth: 0,
                      minHeight: 0,
                    }}
                  >
                    {<MoreVert />}
                  </Button>
                  <Menu
                    anchorEl={anchorEls[index]}
                    open={Boolean(anchorEls[index])}
                    onClose={() => handleClose(index)}
                    anchorOrigin={{ vertical: 40, horizontal: -50 }}
                    sx={{ position: "fixed" }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/education/update");
                        dispatch(currentEditEducation(item));
                      }}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(index, item._id)}>
                      Delete
                    </MenuItem>
                  </Menu></> }
                </FlexBetween>
                <Box sx={{ margin: " 0.8rem 1.3rem" }}>
                  <div style={{marginBottom: '1rem'}}>
                  <h5>{item.title}</h5>
                  </div>
                  <div
                    style={{ textAlign: "justify" }}
                    dangerouslySetInnerHTML={{
                      __html:
                        item.content.split(" ").length <= 15 ||
                        showFullContent[index]
                          ? item.content
                          : item.content.split(" ").slice(0, 25).join(" ") +
                            "...",
                    }}
                  ></div>
                  {item.content.split(" ").length > 15 && (
                    <>
                      {!showFullContent[index] && (
                        <Typography
                          sx={{
                            cursor: "pointer",
                            color: theme.palette.primary.main,
                          }}
                          onClick={() => handleReadMoreClick(index)}
                        >
                          Read more
                        </Typography>
                      )}
                      {showFullContent[index] && (
                        <Typography
                          sx={{
                            cursor: "pointer",
                            color: theme.palette.primary.main,
                          }}
                          onClick={() => handleReadMoreClick(index)}
                        >
                          Read less
                        </Typography>
                      )}
                    </>
                  )}
                </Box>

                {item.media.length !== 0 && (
                  <Box
                    width="100%"
                    height={isNonMobile ? "80vh" : "40vh"}
                    sx={{ marginTop: "2.5rem" }}
                  >
                    <Swiper
                      pagination={true}
                      navigation={true}
                      modules={[Navigation, Pagination]}
                      style={{ height: "100%" }}
                    >
                      {item.media.map((mediaItem, index) => (
                        <SwiperSlide
                          key={index}
                          style={{
                            backgroundColor:
                              mediaItem.cloudinary.resource_type === "image"
                                ? theme.palette.background.default
                                : "black",
                          }}
                        >
                          {mediaItem.cloudinary.resource_type === "image" && (
                            // <a
                            //   href={mediaItem.cloudinary.secure_url}
                            //   target="_blank"
                            //   rel="noopener noreferrer"
                            // >
                              <img
                                src={mediaItem.cloudinary.secure_url}
                                alt="content_media is not available"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            // </a>
                          )}
                          {mediaItem.cloudinary.resource_type === "video" && (
                            <Video
                              cloudName="mnaimhaziq"
                              publicId="recyTrack_education_media/niofwviehdpn6pmz79ze"
                              sourceTypes={["mp4"]}
                              style={{ width: "100%", height: "100%" }}
                              controls
                              // Adjust video dimensions
                            >
                              <source
                                src={mediaItem.cloudinary.secure_url}
                                type="video/mp4"
                              />
                            </Video>
                          )}
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Box>
                )}
              </Paper>
            ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

function formatPostTimestamp(createdAt) {
  const now = new Date();
  const submissionTime = new Date(createdAt);
  const elapsedMilliseconds = now - submissionTime;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays > 3) {
    return submissionTime.toLocaleString();
  } else if (elapsedDays > 0) {
    return `${elapsedDays}d ago`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours}h ago`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes}m ago`;
  } else {
    return `${elapsedSeconds}s ago`;
  }
}
