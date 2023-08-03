import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { createEducation } from "../../redux/Education/Function/EducationFunction";
import CustomButton from "../../components/CustomButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Education.css";
import { useNavigate } from "react-router-dom";
import SingleFileUploadWithProgress from "./SingleFileUploadWithProgress";
import axios from "axios";
import { UploadError } from "./UploadError";
import { useUser } from "../../context/UserContext";

const Education_Create_Form = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(false);
  const user = useUser();
  const [file, setFile] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mappedAcc = acceptedFiles.map((file) => ({ file, errors: [] }));
    setFile((curr) => [...curr, ...mappedAcc, ...rejectedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "video/mp4": [".mp4"],
      "video/mkv": [".mkv"],
    },
  });

  // useCallback to create a memoized version of onUpload
  const onUpload = useCallback((file, cloudinary) => {
    setFile((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, cloudinary };
        }
        return fw;
      })
    );
  }, []);

  async function onDelete(file, public_id) {
    const formData = {
      publicId: public_id,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:5000/api/education/delete`,
        formData,
        config
      );

      setTimeout(() => {
        setFile((curr) => curr.filter((fw) => fw.file !== file));
      }, 200);

      return response.data;
    } catch (error) {
      throw new Error("File deletion failed.");
    }
  }

  function onDeleteError(file) {
    setFile((curr) => curr.filter((fw) => fw.file !== file));
  }

  const initialValues = {
    title: "",
    content: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is Required"),
    content: Yup.string().required("This field is Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      setUpdateButtonDisabled(true);

      const { title, content } = values;

      const educationCreateData = {
        title,
        content,
        media: file,
      };

      await dispatch(createEducation({ token: user.token, education: educationCreateData }));

      toast.success("New Content Created!");
    } catch (error) {
      console.error("Error Creating Content:", error);
      toast.error("Failed to create content");
    } finally {
      setUpdateButtonDisabled(false);
      resetForm();
      navigate("/education");
    }
  };

  return (
    <Box>
      <CustomButton
        nonMobileText="Go Back"
        mobileText="Back"
        onClick={() => {
          navigate("/education");
        }}
      />
      <ToastContainer theme="colored" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Grid container sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{ p: isNonMobile ? "2rem 4rem" : "1rem" }}
                >
                  <Box sx={{ marginY: "2rem" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "2rem",
                      }}
                    >
                      <h3>Create Your Content Here</h3>
                    </div>

                    <div
                      style={{
                        display: !isNonMobile && "flex",
                      }}
                    >
                      <h6>Title:  {touched.title && !values.title && (
                      <span style={{ color: "red" }}>*required {values.title}</span>
                    )}</h6>
                    </div>
                    <TextField
                      
                      id="title"
                      fullWidth
                      sx={{ my: 2 }}
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                     
                    />
                       <div
                      style={{
                        display: !isNonMobile && "flex",
                      }}
                    >
                      <h6>Content:  {touched.content && !values.content && (
                      <span style={{ color: "red" }}>*required </span>
                    )}</h6>
                    </div>

                    <ReactQuill
                      theme="snow"
                      value={values.content}
                      onChange={(content) => {
                        if (content === "<p><br></p>") {
                          content = "";
                        }
                        handleChange({
                          target: { name: "content", value: content },
                        })
                      }
                      }
                  
                      style={{
                        height: "300px",
                        marginBottom: isNonMobile ? "4rem" : "8rem",
                        overflowWrap: "break-word",
                      }}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link"],
                          ["clean"],
                        ],
                      }}
                      formats={[
                        "header",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "blockquote",
                        "list",
                        "bullet",
                        "link",
                      ]}
                      className="custom-toolbar"
                    />
                    

                    <div
                      style={{
                        display: !isNonMobile && "flex",
                      }}
                    >
                      <h6>Upload Some Media:</h6>
                    </div>

                    <div
                      style={{
                        marginTop: "1rem",
                        border: "2px dotted gray",
                        height: "80px",
                        backgroundColor: isDragActive
                          ? "lightblue" // color when file is on the div
                          : theme.palette.background.alt,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        {...getRootProps()}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p style={{ textAlign: "center" }}>
                            Drop the files here ...
                          </p>
                        ) : isNonMobile ? (
                          <p style={{ textAlign: "center" }}>
                            Drag 'n' drop some files here, or click to select
                            files <br /> (Files should be not more than 35mb)
                          </p>
                        ) : (
                          <p style={{ textAlign: "center" }}>
                            Drag & Drop the files here ... <br /> (Files should
                            be not more than 35mb)
                          </p>
                        )}
                      </div>
                    </div>
                    {file.map((fileWrapper) => (
                      <Grid item key={fileWrapper.id}>
                        {fileWrapper.errors.length ? (
                          <UploadError
                            file={fileWrapper.file}
                            errors={fileWrapper.errors}
                            onDeleteError={onDeleteError}
                          />
                        ) : (
                          <SingleFileUploadWithProgress
                            file={fileWrapper.file}
                            cloudinary={fileWrapper.cloudinary}
                            onUpload={onUpload}
                            onDelete={onDelete}
                          />
                        )}
                      </Grid>
                    ))}

                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <CustomButton
                      type='submit'
                        nonMobileText="Create"
                        mobileText="Create"
                        disabled={
                          updateButtonDisabled ||
                          file.some((fw) => !fw.cloudinary) // Check if any file is not uploaded
                        }
                      />
                    </div>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Education_Create_Form;
