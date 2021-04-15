import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Components
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import ConformationScreen from "../ConformationScreen/ConformationScreen";
// Styles
import "./Register.scss";

// Actions && Redux
import { useDispatch } from "react-redux";
import { registerUser } from "./actions";
import { formValidation } from "../../services/validationService";

export default function SignUp() {
  const dispatch = useDispatch();
  /** Access store  */
  const { email } = useSelector((state) => state.register);

  

  /** Email address state */
  const [emailAddress, setEmailAddress] = useState("");
  /** userName state */
  const [userName, setUsername] = useState("");
  /** Password state */
  const [password, setPassword] = useState({ pass: "", repPass: "" });
  /** Error validation message */
  const [errorMessage, setErrorMessage] = useState("");

  /** Method for updating the email Address state
   * @param {Object} event - Object which contains input field value
   */
  const onEmailChange = (event) => {
    setEmailAddress(event.target.value);
    clearErrorMessage();
  };
  /** Method for updating the userName state
   * @param {Object} event - Object which contains input field value
   */
  const onUserNameChange = (event) => {
    setUsername(event.target.value);
    clearErrorMessage();
  };

  /** Method for updating the password state
   * @param {Object} eventPassword - Object which contains input field value
   */
  const onChangePassword = (eventPassword) => {
    let newPassword = { ...password, ...eventPassword };
    setPassword(newPassword);
    clearErrorMessage();
  };

  /** Clear error message*/
  function clearErrorMessage() {
    setErrorMessage("");
  }

  /** Creat register request and redirect
   * @param {Object} event - Object which contain form event
   */
  const onSubmitCredentials = (event) => {
    event.preventDefault();

    // Form validation
    let isNotValid = formValidation(password, emailAddress, userName);
    if (isNotValid) {
      setErrorMessage(isNotValid);
    } else {
      dispatch(registerUser(userName, emailAddress, password.pass));
      if(email){
        setEmailAddress()
        setUsername()
        setErrorMessage()
      }
    }
  };

  if (!email) {
    return (
      <div className="register-wrapper">
        <Container className="container-wrapper" component="main" maxWidth="xs">
          <div className="div-wrapper">
            <div className="paper">
              <Typography className="form-title" component="h1" variant="h5">
                Create Account
              </Typography>
              <form onSubmit={onSubmitCredentials} noValidate>
                <Grid className="form-container" container spacing={2}>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      value={emailAddress}
                      onChange={onEmailChange}
                      label="Email Address"
                      fullWidth
                      margin="dense"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      value={userName}
                      onChange={onUserNameChange}
                      label="Username"
                      fullWidth
                      margin="dense"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      value={password.pass}
                      onChange={(event) =>
                        onChangePassword({ pass: event.target.value })
                      }
                      label="Password"
                      fullWidth
                      margin="dense"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      value={password.repPass}
                      onChange={(event) =>
                        onChangePassword({ repPass: event.target.value })
                      }
                      label="Password (Again)"
                      fullWidth
                      margin="dense"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid className="button-wrapper" item xs={12}>
                  <Button
                    disabled={!!errorMessage}
                    variant="outlined"
                    size="medium"
                    color="primary"
                    type="submit"
                    className="register-button"
                  >
                    Sign Up
                  </Button>
                  <p className="errorMessage">{errorMessage} </p>
                </Grid>
              </form>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="register-wrapper">
        <Container className="container-wrapper" component="main" maxWidth="xs">
          <ConformationScreen email={email} />
        </Container>
      </div>
    );
  }
}
