import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Pagination,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Formik } from "formik";
import {
  createFeedback,
  getAllFeedbacksByPages,
  toggleResolveFeedback,
} from "../../redux/Feedback/FeedbackFunction/FeedbackFunction";
import Header from "../../components/Header";
import { Table } from "react-bootstrap";
import { CheckCircle } from "@mui/icons-material";
import FeedbackTableRow from "./FeedbackTableRow";
import { useUser } from "../../context/UserContext";

function Feedbacks() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 942px)");
  const user = useUser();
  const feedbacks = useSelector((state) => state.feedback.feedbacks);
  const { data, pages } = feedbacks;
  const initialValues = {
    comment: "",
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (user.isAdmin) {
      dispatch(getAllFeedbacksByPages({ token: user.token, page }));
    }
    setTotalPages(pages);
  }, [dispatch, user.token, page, pages]);

  const submitHandler = async (values, { resetForm }) => {
    const { comment } = values;
    if (comment === "") {
      toast.error("Please fill in all required fields.");
      return;
    } else {
      const feedback = {
        comment,
      };
      await dispatch(createFeedback({ feedback, token: user.token }));
      toast.success("Your Feedback has been submitted");
      resetForm();
    }
  };

    // useCallback hook to memoize the toggleResolvedStatus function
    const toggleResolvedStatus = useCallback((id) => {
      dispatch(toggleResolveFeedback({ feedbackId: id, token: user.token })).then(
        () => {
          // Since this function's dependency list includes `dispatch`, it's safe to memoize
          dispatch(getAllFeedbacksByPages({ token: user.token, page }));
        }
      );
    }, [dispatch, user.token, page]);

  return (
    <Box m="1.5rem 2.5rem">
      <ToastContainer theme="colored" />
      <Box
        display={isNonMobile ? "flex" : "block"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          m: "2rem 2rem 3rem",
        }}
      >
        <Header title="Feedback" />
      </Box>
      {!user.isAdmin && (
        <Grid xs={12}>
          <Paper
            elevation={3}
            sx={{ width: isNonMobile ? "50%" : "100%", padding: "1rem" }}
          >
            <Formik initialValues={initialValues} onSubmit={submitHandler}>
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Comment"
                    id="comment"
                    fullWidth
                    sx={{ my: 2 }}
                    name="comment"
                    value={values.comment}
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    sx={{
                      padding: "0.5rem 1rem",
                      color: theme.palette.neutral[1000],
                      backgroundColor: theme.palette.primary.light,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </Paper>
        </Grid>
      )}
      {user.isAdmin && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead
                style={{ backgroundColor: theme.palette.primary.main }}
              >
                <TableRow>
                  <TableCell style={{ color: "#ffffff" }}>ID</TableCell>
                  <TableCell style={{ color: "#ffffff" }}>NAME</TableCell>
                  <TableCell style={{ color: "#ffffff" }}>COMMENT</TableCell>
                  <TableCell style={{ color: "#ffffff" }}>CREATED AT</TableCell>
                  <TableCell style={{ color: "#ffffff" }}>MARK AS READ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.isAdmin &&
                  data &&
                  data.map((feedback) => (
                    <FeedbackTableRow
                    key={feedback._id}
                    feedback={{ ...feedback }}
                    toggleResolvedStatus={toggleResolvedStatus}
                  />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              sx={{
                m: "1rem 0",
                "& .Mui-selected": {
                  backgroundColor: "rgba(101, 180, 55, 0.4) !important",
                },
              }}
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              siblingCount={1}
              showFirstButton
              showLastButton
            />
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default Feedbacks;
