import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./AuthScreen.css";
import { register, reset } from "../../redux/Auth/AuthSlice";
import Spinner from "../../components/Spinner";
import { useMediaQuery, useTheme } from "@mui/material";

const Register = () => {
  const [userImg, setUserImg] = useState("");
  const [registeredFormData, setRegisteredFormData] = useState({
    name: "",
    registeredEmail: "",
    registerPassword: "",
    confirmPassword: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const { name, registeredEmail, registerPassword, confirmPassword, address } = registeredFormData;
  const { street, city, postalCode, country } = address;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const auth = useSelector((state) => state.auth);
  const { user, isLoading, isSuccess, isError, message } = auth;

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

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/dashboard");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    if (e.target.name.startsWith("address.")) {
      setRegisteredFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [e.target.name.split(".")[1]]: e.target.value,
        },
      }));
    } else {
      setRegisteredFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      registerPassword === "" ||
      registeredEmail === "" ||
      confirmPassword === "" ||
      userImg === "" ||
      street === "" ||
      city === "" ||
      postalCode === "" ||
      country === ""
    ){
      toast.error("Please fill in all required fields.")
      return;
    }
      if (registerPassword !== confirmPassword) {
        toast.error("Password do not match");
      } else {
        const userData = {
          name,
          email : registeredEmail,
          password : registerPassword,
          picture: userImg,
          address: {
            street: street,
            city: city,
            postalCode: postalCode,
            country: country,
          },
        };
        dispatch(register(userData));
      }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="register-body">
      <ToastContainer />
      <Card className="register">
        <Card.Title as="h2" className="text-center mb-2">
          Register
        </Card.Title>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-2 " controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={onChange}
              autoComplete="nope"
            />
          </Form.Group>
          <Form.Group className="mb-2 " controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={registeredEmail}
              onChange={onChange}
              autoComplete="nope"
            />
          </Form.Group>
          <div className="d-flex">
            <Form.Group className="mb-2 me-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={registerPassword}
                onChange={onChange}
                autoComplete="nope"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="confirmPassword">
            <Form.Label>{isSmallScreen ? 'Confirm Pass' : 'Confirm Password'}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                autoComplete="nope"
              />
            </Form.Group>
          </div>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </Form.Group>
          <div className="d-flex">
            <Form.Group className="mb-2 me-3" controlId="address.street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter street"
                name="address.street"
                value={registeredFormData.address.street}
                onChange={onChange}
                autoComplete="nope"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="address.city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="address.city"
                value={registeredFormData.address.city}
                onChange={onChange}
                autoComplete="nope"
              />
            </Form.Group>
          </div>
          <div className="d-flex">
            <Form.Group className="mb-2 me-3" controlId="address.postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                name="address.postalCode"
                value={registeredFormData.address.postalCode}
                onChange={onChange}
                autoComplete="nope"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="address.country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                name="address.country"
                value={registeredFormData.address.country}
                onChange={onChange}
                autoComplete="nope"
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <p>
            {" "}
            Have an account? <Link to={"/login"}>Login</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
