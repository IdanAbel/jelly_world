import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import { Box, TextField, Button } from "@mui/material";

import Message from "../../Components/Message";
import { container, inputContainer, submitButton } from "../Register/components/styles";
import { getUserDetails, updateUserProfile } from "../../Services/userService";
import ImageInput from "../../Components/ImageInput";

const Profile: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password] = useState<string>("");
  const [confirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [image, setImage] = useState<File>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state: RootState) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(
    (state: RootState) => state.userUpdateProfile
  );
  const { success, userInfo: updatedUserInfo } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user?.name || user._id !== userInfo.id) {
        dispatch(getUserDetails(userInfo.id) as any);
      } else {
        setName(user.name);
        setEmail(user.email);
        setImage(user.image);
      }
    }
  }, [navigate, userInfo, dispatch, user]);

  useEffect(() => {
    if (updatedUserInfo) {
      setName(updatedUserInfo.name);
      setEmail(updatedUserInfo.email);
      setImage(updatedUserInfo.image);
    }
  }, [success, updatedUserInfo]);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImage(file);
    }
  }

  const submitHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
           _id: userInfo?.id, name, email, password, image 
        }) as any
      );
    }
  };

  return (
    <div
      className="row"
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <div className="col-md-3 pt-5 text-center">
        {message && <Message variant="alert-danger">{message}</Message>}
        {error && <Message variant="alert-danger">{error}</Message>}
        {success && <Message variant="alert-success">Profile Updated</Message>}
        {loading && <></> /* <Loader /> */}
        <Box sx={container} style={{ textAlign: "left" }}>
          <h2
            className="text-center"
            style={{ color: "#0e5540", marginBottom: "5px", marginLeft: "35%" }}
          >
            User Profile
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ImageInput
              onChange={handleImageChange}
              initialImage={image}
              label={"Profile Picture"}
            />
            {/* <img
              src={image}
              alt="User"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: "15px", marginLeft: "100px" }}
            /> */}
          </div>
          <div className="form-group">
            <label
              className="form-label"
              htmlFor="name"
              style={{ marginRight: "10px" }}
            >
              Name:
            </label>
            <TextField
              sx={inputContainer}
              placeholder="Enter Name"
              value={name || ""}
              id="name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginTop: "15px" }}>
            <label
              className="form-label"
              htmlFor="email"
              style={{ marginRight: "10px" }}
            >
              Email:
            </label>
            <TextField
              sx={inputContainer}
              placeholder="Enter Email"
              value={email}
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button
            sx={{
              ...submitButton,
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              marginTop: "15px",
              backgroundColor: "rgb(14, 85, 64)",
            }}
            onClick={submitHandler}
          >
            Update
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Profile;
