import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import { updateProfile } from "../../redux/Auth/AuthSlice";

import { ToastContainer, toast } from "react-toastify";
import { useUser } from "../../context/UserContext";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(false);
  const user = useUser();
  const [userImg, setUserImg] = useState(user.picture.secure_url);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserImg(reader.result);
      };
    } else {
      setUserImg("");
    }
  };

  const initialValues = {
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    street: user.address.street,
    city: user.address.city,
    postalCode: user.address.postalCode,
    country: user.address.country,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is Required"),
    email: Yup.string().email().required("This field is Required"),
    street: Yup.string().required("This field is Required"),
    city: Yup.string().required("This field is Required"),
    postalCode: Yup.string().required("This field is Required"),
    country: Yup.string().required("This field is Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setUpdateButtonDisabled(true);
    const { name, email, street, city, postalCode, country } = values;

    const userUpdateData = {
      name,
      email,
      picture: userImg,
      address: {
        stress: street,
        city: city,
        postalCode: postalCode,
        country: country,
      },
    };

    try {
      await dispatch(updateProfile({ token: user.token, userUpdateData }));
      toast.success("User Profile Updated!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      // Enable the update button after the request is complete (success or error)
      setUpdateButtonDisabled(false);
    }
  };

  const cancelEdit = () => {
    formRef.current.resetForm(); // Reset form values to initial values
    setUserImg(user.picture.secure_url); // Restore the original user image
    setEditMode(false);
  };

  return (
    <Box m="1.5rem 2.5rem " p="0 0 4rem 0">
      <ToastContainer theme="colored" />
      <Box
        display={isNonMobile ? 'flex' : 'block'}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          m: '2rem 2rem 3rem'
        }}
      >
        <Header title="Personal Information" />
      </Box>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formRef}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Grid container sx={{ mt: 2 }} >
                <Grid item xs={12}>
                  <Paper
                    elevation={3}
                    sx={{
                      borderRadius: "1rem 0 0  1rem",
                      backgroundColor: "theme",
                      p: isNonMobile && "2rem 4rem" ,
                    }}
                  >
                    <Box p={2} sx={{ minHeight: "60vh" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "4rem",
                        }}
                      >
                        <img
                          src={userImg ? userImg : user.picture.secure_url}
                          width="60px"
                          alt="User"
                          style={{ marginBottom: "1rem" }}
                        />
                        {editMode && (
                          <Button variant="contained" component="label">
                            Upload
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={handleImageUpload}
                            />
                          </Button>
                        )}
                      </div>

                      <TextField
                        label="name"
                        id="name"
                        fullWidth
                        sx={{ my: 2,  }}
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        error={errors.name && touched.name}
                        helperText={
                          touched.name && errors.name ? (
                            <span style={{ color: "red" }}>{errors.name}</span>
                          ) : null
                        }
                        disabled={!editMode} // disable the input field when not in edit mode
                        InputLabelProps={{
                          style: {color: theme.palette.neutral[100]}, // Label color when disabled
                        }}
                      
                      />

                      <TextField
                        label="email"
                        id="email"
                        fullWidth
                        sx={{ my: 2 }}
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email && touched.email}
                        helperText={
                          touched.email && errors.email ? (
                            <span style={{ color: "red" }}>{errors.email}</span>
                          ) : null
                        }
                        disabled // disable the input field when not in edit mode
                        InputLabelProps={{
                          style: {color: theme.palette.neutral[100]}, // Label color when disabled
                        }}
                      />

                      <TextField
                        label="Role (Only Admin Can Edit)"
                        id="isAdmin"
                        fullWidth
                        sx={{ my: 2 }}
                        name="isAdmin"
                        value={values.isAdmin ? "Admin" : "User"}
                        onChange={handleChange}
                        disabled
                        InputLabelProps={{
                          style: {color: theme.palette.neutral[100]}, // Label color when disabled
                        }}
                      />
                      <div className="d-flex">
                        <TextField
                          className="me-3"
                          label="Street"
                          id="street"
                          fullWidth
                          sx={{ my: 2 }}
                          name="street"
                          value={values.street}
                          onChange={handleChange}
                          error={errors.street && touched.street}
                          helperText={
                            touched.street && errors.street ? (
                              <span style={{ color: "red" }}>
                                {errors.street}
                              </span>
                            ) : null
                          }
                          disabled={!editMode} // disable the input field when not in edit mode
                          InputLabelProps={{
                            style: {color: theme.palette.neutral[100]}, // Label color when disabled
                          }}
                        />

                        <TextField
                          label="City"
                          id="city"
                          fullWidth
                          sx={{ my: 2 }}
                          name="city"
                          value={values.city}
                          onChange={handleChange}
                          error={errors.city && touched.city}
                          helperText={
                            touched.city && errors.city ? (
                              <span style={{ color: "red" }}>
                                {errors.city}
                              </span>
                            ) : null
                          }
                          disabled={!editMode} // disable the input field when not in edit mode
                          InputLabelProps={{
                            style: {color: theme.palette.neutral[100]}, // Label color when disabled
                          }}
                        />
                      </div>
                      <div className="d-flex">
                        <TextField
                          className="me-3"
                          label="Postal Code"
                          id="postalCode"
                          fullWidth
                          sx={{ my: 2 }}
                          name="postalCode"
                          value={values.postalCode}
                          onChange={handleChange}
                          error={errors.postalCode && touched.postalCode}
                          helperText={
                            touched.postalCode && errors.postalCode ? (
                              <span style={{ color: "red" }}>
                                {errors.postalCode}
                              </span>
                            ) : null
                          }
                          disabled={!editMode} // disable the input field when not in edit mode
                          InputLabelProps={{
                            style: {color: theme.palette.neutral[100]}, // Label color when disabled
                          }}
                        />

                        <TextField
                          label="Country"
                          id="country"
                          fullWidth
                          sx={{ my: 2 }}
                          name="country"
                          value={values.country}
                          onChange={handleChange}
                          error={errors.country && touched.country}
                          helperText={
                            touched.country && errors.country ? (
                              <span style={{ color: "red" }}>
                                {errors.country}
                              </span>
                            ) : null
                          }
                          disabled={!editMode} // disable the input field when not in edit mode
                          InputLabelProps={{
                            style: {color: theme.palette.neutral[100]}, // Label color when disabled
                          }}
                        />
                      </div>
                      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
                      {editMode ? ( // conditionally render the submit button based on whether the form is in edit mode or not
                        
                        <>
                          <Button
                            onClick={cancelEdit} // enable edit mode when the user clicks the "edit" button
                            sx={{
                              color: theme.palette.neutral[10],
                              backgroundColor: theme.palette.primary.main,
                              mr: "1rem",
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            sx={{
                              color: theme.palette.neutral[10],
                              backgroundColor: theme.palette.primary.main,
                            }}
                            disabled={updateButtonDisabled}
                          >
                            Update
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setEditMode(true)} // enable edit mode when the user clicks the "edit" button
                          sx={{
                            color: theme.palette.neutral[10],
                            backgroundColor: theme.palette.primary.main,
                          }}
                        >
                          Edit
                        </Button>
                        
                      )}</div>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Profile;
