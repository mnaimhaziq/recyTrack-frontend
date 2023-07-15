import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Pagination,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Formik } from 'formik';
import { createFeedback,  getAllFeedbacksByPages } from '../features/feedback/FeedbackFunction/FeedbackFunction';
import Header from '../components/Header';
import { Table } from 'react-bootstrap';

function Feedbacks() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobile = useMediaQuery('(min-width: 942px)');

  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const feedbacks = useSelector((state) => state.feedback.feedbacks);
  const { data,  pages} = feedbacks;
  const initialValues = {
    comment: ''
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };


  useEffect(() => {
    if(user.isAdmin)
    {dispatch(getAllFeedbacksByPages({token : user.token, page}));}
    setTotalPages(pages);
  }, [dispatch, user.token, page, pages]);

  const submitHandler = async (values, { resetForm }) => {
    const { comment } = values;
    if (comment === '') {
      toast.error('Please fill in all required fields.');
      return;
    } else {
      const feedback = {
        comment
      };
      await dispatch(createFeedback({ feedback, token: user.token }));
      toast.success('Your Feedback has been submitted');
      resetForm();
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <ToastContainer theme="colored" />
      <Box
        display={isNonMobile ? 'flex' : 'block'}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          m: '2rem 2rem 3rem'
        }}
      >
        <Header title="Feedback" />
      </Box>
      {!user.isAdmin && <Grid xs={12}>
        <Paper elevation={3} sx={{ width: isNonMobile ? '50%' : '100%', padding: '1rem' }}>
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
                    padding: '0.5rem 1rem',
                    color: theme.palette.neutral[1000],
                    backgroundColor: theme.palette.primary.light,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main
                    }
                  }}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Grid>}
      {user.isAdmin && <Paper>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
              <TableCell style={{ color: "#ffffff" }}>
                  User ID
                </TableCell>
                <TableCell style={{ color: "#ffffff" }}>
                  Name
                </TableCell>
                <TableCell style={{ color: "#ffffff" }}>
                  Comment
                </TableCell>
                <TableCell style={{ color: "#ffffff" }}>CREATED AT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.isAdmin && data &&
                data.map((feedback, index) => (
                  <TableRow key={feedback._id} sx={{backgroundColor: index % 2 !== 0 && theme.palette.neutral[800] }}>
                    <TableCell>
                        {feedback._id }
                      </TableCell>
                      <TableCell>
                        {feedback.user.name }
                      </TableCell>
                  

                    <TableCell>{feedback.comment}</TableCell>
                    <TableCell>{new Date(feedback.timestamp).toLocaleString()}</TableCell>
                   

                   
                  </TableRow>
                )) }
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination
             sx={{
              m: "1rem 0",
              "& .Mui-selected": { backgroundColor: "rgba(101, 180, 55, 0.4) !important" },
            }}
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              siblingCount={1}
              showFirstButton
              showLastButton
            />
          </Box>
      </Paper>}
    </Box>
  );
}

export default Feedbacks;
