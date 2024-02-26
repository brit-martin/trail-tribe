import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
// MUI components
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Button } from "@mui/material";
import { primHoverSX, secHoverSX, terHoverSX } from "./Theme";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
// create endpoints
import axios from "axios";
// Alerts
import Swal from "sweetalert2";
// CSS
import "../styles/EditInfo.css";

const EditSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">\
        <path fill="${encodeURIComponent(
          "#fff"
        )}" d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>\
        </svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
        border: "1px solid black",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.secondary.main,
    border: "1px solid black",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundColor: theme.palette.primary.main,
      borderRadius: "50%",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 50 50"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M46.574219 3.425781C45.625 2.476563 44.378906 2 43.132813 2C41.886719 2 40.640625 2.476563 39.691406 3.425781C39.691406 3.425781 39.621094 3.492188 39.53125 3.585938C39.523438 3.59375 39.511719 3.597656 39.503906 3.605469L4.300781 38.804688C4.179688 38.929688 4.089844 39.082031 4.042969 39.253906L2.035156 46.742188C1.941406 47.085938 2.039063 47.453125 2.292969 47.707031C2.484375 47.898438 2.738281 48 3 48C3.085938 48 3.171875 47.988281 3.257813 47.964844L10.746094 45.957031C10.917969 45.910156 11.070313 45.820313 11.195313 45.695313L46.394531 10.5C46.40625 10.488281 46.410156 10.472656 46.417969 10.460938C46.507813 10.371094 46.570313 10.308594 46.570313 10.308594C48.476563 8.40625 48.476563 5.324219 46.574219 3.425781ZM45.160156 4.839844C46.277344 5.957031 46.277344 7.777344 45.160156 8.894531C44.828125 9.222656 44.546875 9.507813 44.304688 9.75L40.25 5.695313C40.710938 5.234375 41.105469 4.839844 41.105469 4.839844C41.644531 4.296875 42.367188 4 43.132813 4C43.898438 4 44.617188 4.300781 45.160156 4.839844ZM5.605469 41.152344L8.847656 44.394531L4.414063 45.585938Z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.secondary.main,
    border: "1px solid black",
    borderRadius: 20 / 2,
  },
}));

export default function EditInfo() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.userReducer);

  // state variables
  const [editOn, setEditOn] = useState(false);
  const [editFName, setEditFName] = useState(null);
  const [editLName, setEditLName] = useState(null);
  const [editEmail, setEditEmail] = useState(null);
  const [editBio, setEditBio] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [verified, setVerified] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordShow, setOldPasswordShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  function sessionCheck() {
    axios
      .get("/checkLoginStatus")
      .then((response) => {
        console.log(response.data.user);
        dispatch({ type: "SET_USER", payload: response.data.user });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.reRoute) {
          navigate(error.response.data.reRoute);
        }
      });
  }

  useEffect(() => {
    sessionCheck();
  }, []);

  // MUI Styles
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "secondary.main",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: theme.shape.outerBorderRadius,
  };

  const boxModalStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const boxStyle = {
    border: "1px solid aqua",
    width: "100%",
    // height: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    fontFamily: theme.fontStyle.secondaryFont,
    // borderRadius: theme.shape.outerBorderRadius,
  };

  const buttonStyle = {
    position: "absolute",
    top: 0,
    right: "-10px",
  };

  const h1Style = {
    fontFamily: "Permanent Marker, cursive",
  };

  const passwordStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontWeight: 600,
  };

  function handleClickShowOldPassword() {
    setOldPasswordShow(!oldPasswordShow);
  }

  function handleClickShowNewPassword() {
    setNewPasswordShow(!newPasswordShow);
  }

  function handleClickShowConfirmPassword() {
    setConfirmPasswordShow(!confirmPasswordShow);
  }

  function handleOpen() {
    setOpenModal(true);
  }

  function handleClose() {
    setOpenModal(false);
    setVerified(false);
  }

  function handleOpenDeleteModal() {
    setOpenDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

  async function deleteUserHandler() {
    const { isConfirmed } = await Swal.fire({
      customClass: {
        container: "my-swal",
        popup: "popup__class",
      },
      title: "Are you sure you want to delete your account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
      iconColor: "#FF4b1f",
      confirmButtonColor: "#FF4b1f",
      background: theme.palette.tertiary.main,
      color: "white",
    });

    if (isConfirmed) {
      let deleteMaBod = {
        password: deletePassword,
      };

      try {
        const res = await axios.put("/delete-user", deleteMaBod);
        console.log(res);

        Swal.fire({
          title: "Account Deleted!",
          background: theme.palette.tertiary.main,
          text: "Your account has been deleted.",
          icon: "success",
          iconColor: "#FF4b1f",
          timer: 2000,
          showConfirmButton: false,
          color: "white",
        });

        dispatch({ type: "RESET_USER" });
        navigate("/");
      } catch (err) {
        if (err.response.status === 400) {
          Swal.fire({
            customClass: {
              container: "my-swal",
              popup: "popup__class",
            },
            icon: "error",
            iconColor: "#FF4b1f",
            title: "Oops...",
            text: "Passwords do not match",
            confirmButtonColor: "#FF4b1f",
            background: theme.palette.tertiary.light,
            color: "white",
          });
        } else {
          console.error("Error during edit request:", err);
        }
      }
    }
  }

  async function oldPasswordHandler() {
    let oldMaBod = {
      password: oldPassword,
    };

    try {
      const res = await axios.post("/old-password", oldMaBod);
      setVerified(true);
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          customClass: {
            container: "my-swal",
            popup: "popup__class",
          },
          icon: "error",
          iconColor: "#FF4b1f",
          title: "Oops...",
          text: "Incorrect password",
          confirmButtonColor: "#FF4b1f",
          background: theme.palette.tertiary.light,
          // borderRadius: theme.shape.outerBorderRadius,
          color: "white",
        });
      } else {
        console.error(
          "Error during old password request:",
          error.response.status
        );
      }
    }
    setNewPassword("");
    setConfirmPassword("");
    setOldPassword("");
  }

  async function changePasswordHandler() {
    let changeMaBod = {
      nPassword: newPassword,
      cPassword: confirmPassword,
    };
    if (newPassword !== confirmPassword) {
      Swal.fire({
        customClass: {
          container: "my-swal",
          popup: "popup__class",
        },
        icon: "error",
        iconColor: "#FF4b1f",
        title: "Oops...",
        text: "Passwords don't match",
        confirmButtonColor: "#FF4b1f",
        background: theme.palette.tertiary.light,
        color: "white",
      });
    }

    try {
      const res = await axios.put("/change-password", changeMaBod);
      Swal.fire({
        customClass: {
          container: "my-swal",
          popup: "popup__class",
        },
        title: "Password changed!",
        confirmButtonColor: "#FF4b1f",
        background: theme.palette.tertiary.light,
        // borderRadius: theme.shape.outerBorderRadius,
        color: "white",
      });
      setVerified(false);
      setOpenModal(false);
    } catch (error) {
      console.error("Error during change password request:", error);
    }
  }

  async function editInfoHandler() {
    // if(editEmail === "" || editFName === "" || editLName === "" || editBio === ""){
    //   setEditEmail(reduxUser.email);
    //   setEditFName(reduxUser.fname);
    //   setEditLName(reduxUser.lname);
    //   setEditBio(reduxUser.bio);

    // }
    if (editEmail !== reduxUser.email) {
      // confirm("Are you sure you want to change your email?")
      //------------ if we have enough time get this working where user has to input there password inorder to reset the email.
      // Swal.fire({
      //   title: "Are you sure you want to change your email?",
      //   icon: "question",
      //   color: "white",
      //   showCancelButton: true,
      //   confirmButtonColor: "#BACDCD",
      //   cancelButtonColor: "#cd5c5c",
      //   confirmButtonText: "Change",
      //   iconColor: "#FF4b1f",
      //   background: theme.palette.tertiary.light,
      // })
    }

    const editMaBod = {
      fname: editFName ?? reduxUser.fname,
      lname: editLName ?? reduxUser.lname,
      email: editEmail ?? reduxUser.email,
      bio: editBio ?? reduxUser.bio,
      id: reduxUser.id,
    };
    try {
      axios.put("/edit-user", editMaBod);

      Swal.fire({
        customClass: {
          container: "my-swal",
          popup: "popup__class",
        },
        title: "User info updated!",
        confirmButtonColor: "#FF4b1f",
        background: theme.palette.tertiary.light,
        // borderRadius: theme.shape.outerBorderRadius,
        color: "white",
      });

      setEditFName(null);
      setEditLName(null);
      setEditEmail(null);
      setEditBio(null);
      setEditOn(editOn ? false : true);
      setVerified(false);
      dispatch({ type: "SET_USER", payload: editMaBod });
    } catch (error) {
      console.error("Error during edit info request:", error);
    }
  }

  return (
    <>
      <div className="useless" style={boxStyle}>
        <div className="edit__bg__img"></div>
        <div className="mini__container">
          <h1 style={h1Style}>Edit Profile</h1>
          <FormGroup>
            <FormControlLabel
              control={<EditSwitch onChange={() => setEditOn(!editOn)} />}
              label="Edit"
              labelPlacement="top"
            />
            <div className="text__container">
              {editOn ? (
                <div id="edit__fields">
                  <h3 id="edit__h3">Edit Information</h3>
                  <div className="edit__field">
                    <TextField
                      id="outlined-input"
                      label="First Name"
                      placeholder={reduxUser.fname}
                      focused
                      multiline
                      required
                      value={editFName}
                      onChange={(e) => setEditFName(e.target.value)}
                    />
                  </div>

                  <div className="edit__field">
                    <TextField
                      id="outlined-input"
                      label="Last Name"
                      placeholder={reduxUser.lname}
                      focused
                      multiline
                      required
                      value={editLName}
                      onChange={(e) => setEditLName(e.target.value)}
                    />
                  </div>
                  <div className="edit__field">
                    <TextField
                      id="outlined-input"
                      label="Email"
                      placeholder={reduxUser.email}
                      focused
                      multiline
                      required
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                    <div className="edit__field">
                      <TextField
                        id="outlined-multiline-static"
                        label="Bio"
                        placeholder={reduxUser.bio}
                        focused
                        multiline
                        rows={1}
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                      />
                    </div>
                    <div className="edit__field">
                      <Button
                        onClick={editInfoHandler}
                        key="submit changes"
                        sx={secHoverSX}
                      >
                        Submit Changes
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="edit__fields">
                  <h3 id="edit__h3">Edit Information</h3>
                  <div className="edit__field">
                    <div>First Name: {reduxUser.fname}</div>
                  </div>
                  <div className="edit__field">
                    <div>Last Name: {reduxUser.lname}</div>
                  </div>
                  <div className="edit__field">
                    <div>Email :{reduxUser.email}</div>
                  </div>
                  <div className="edit__field">
                    <div>Bio: {reduxUser.bio}</div>
                  </div>
                </div>
              )}
              <div style={passwordStyle}>
                <Button
                  key="password change"
                  onClick={handleOpen}
                  sx={secHoverSX}
                  color="primary"
                >
                  Change Password
                </Button>
                <Modal
                  open={openModal}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={modalStyle}>
                    {verified ? (
                      <>
                        <Button sx={buttonStyle} onClick={handleClose}>
                          X
                        </Button>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Please enter and re-enter new password.
                        </Typography>
                        <FormControl
                          focused
                          color="black"
                          variant="outlined"
                          sx={{ m: 1, width: "30ch" }}
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          autoComplete="off"
                        >
                          <InputLabel
                            htmlFor="outlined-adornment-password"
                            color="black"
                          >
                            New Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            value={newPassword}
                            color="black"
                            label="New Password"
                            type={newPasswordShow ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  color="black"
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                  // onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {newPasswordShow ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                        <FormControl
                          focused
                          color="black"
                          variant="outlined"
                          sx={{ m: 1, width: "30ch" }}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                          <InputLabel
                            htmlFor="outlined-adornment-password"
                            color="black"
                          >
                            Confirm Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            color="black"
                            label="Confirm Password"
                            type={confirmPasswordShow ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  color="black"
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  // onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {newPasswordShow ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <Button
                            onClick={changePasswordHandler}
                            sx={terHoverSX}
                          >
                            Verify Password
                          </Button>
                        </FormControl>
                      </>
                    ) : (
                      <>
                        <Button sx={buttonStyle} onClick={handleClose}>
                          X
                        </Button>
                        <Box sx={boxModalStyle}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Enter current password below.
                          </Typography>
                        </Box>
                        <FormControl
                          focused
                          color="black"
                          variant="outlined"
                          sx={{ m: 1, width: "30ch" }}
                          required
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        >
                          <InputLabel
                            htmlFor="outlined-adornment-password"
                            color="black"
                          >
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            color="black"
                            label="Password"
                            type={oldPasswordShow ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  color="black"
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowOldPassword}
                                  // onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {oldPasswordShow ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <Button onClick={oldPasswordHandler} sx={terHoverSX}>
                            Verify Password
                          </Button>
                        </FormControl>
                      </>
                    )}
                  </Box>
                </Modal>
                <div id="delete__button">
                  <Button
                    onClick={handleOpenDeleteModal}
                    color="quadratiary"
                    sx={primHoverSX}
                  >
                    Delete Account
                  </Button>
                  <Modal
                    open={openDeleteModal}
                    onClose={handleCloseDeleteModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={modalStyle}>
                      <Button sx={buttonStyle} onClick={handleCloseDeleteModal}>
                        X
                      </Button>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Enter current password below to delete account.
                      </Typography>
                      <FormControl
                        focused
                        color="black"
                        variant="outlined"
                        sx={{ m: 1, width: "30ch" }}
                        required
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                      >
                        <InputLabel
                          htmlFor="outlined-adornment-password"
                          color="black"
                        >
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          color="black"
                          label="Password"
                          type={oldPasswordShow ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                color="black"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowOldPassword}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {oldPasswordShow ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <Button onClick={deleteUserHandler} sx={terHoverSX}>
                          Delete Account
                        </Button>
                      </FormControl>
                    </Box>
                  </Modal>
                </div>
              </div>
            </div>
          </FormGroup>
        </div>
      </div>
    </>
  );
}
