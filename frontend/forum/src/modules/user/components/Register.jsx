import React, { useRef, useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register, resetRegisterStatus } from "../redux/user-slice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../../shared/services/notify";

export const Register = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const imageInput = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (state.registerStatus === "succeeded") {
      notify.success("Register successfully");
      dispatch(resetRegisterStatus());
    }
    if (state.registerStatus === "failed") {
      notify.error("Register failed");
      dispatch(resetRegisterStatus());
    }
  }, [state.registerStatus, dispatch]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const doRegister = () => {
    if (!selectedImage) {
      notify.error("Please select a profile photo");
      return;
    }
    const user = {
      email: email.current.value,
      password: password.current.value,
      name: name.current.value,
      image: selectedImage,
    };

    dispatch(register(user));
  };

  return (
    <>
      <Box sx={{ width: 300, maxWidth: "100%" }}>
        <TextField
          inputRef={email}
          id="outlined-basic"
          label="Email Id"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          inputRef={password}
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          inputRef={name}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <br />
        <br />
        <label
          style={{ textDecoration: "underline", cursor: "pointer" }}
          htmlFor="fileInput"
          class="custom-file-upload"
        >
          Choose your profile photo
        </label>
        <input
          id="fileInput"
          type="file"
          ref={imageInput}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <br />
        <br />
        <Button
          disabled={state.loading}
          onClick={doRegister}
          variant="contained"
        >
          Register
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};
