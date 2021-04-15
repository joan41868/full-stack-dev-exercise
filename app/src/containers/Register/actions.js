import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from "./types";

/** Action which accepts username,password and emails parameters.
 * @param {string} username - Username of the user
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @return {object}  with accessToken,and user info
 */
export function registerUser(username, email, password) {
  return {
    type: REGISTER_REQUEST,
    payload: {
      username,
      email,
      password,
    },
  };
}

/** On successfully register set user info to store .
 * @param {string} username - Username of the current user
 * @param {Number} email - email of the user
 * @param {string} accountConfirmationLink - Link for account activation
 * @param {string} confirmationCode- Register confirmation code
 */
export function registerSuccess(
  email,
  accountConfirmationLink,
  confirmationCode,
  userName
) {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      email,
      accountConfirmationLink,
      confirmationCode,
      userName,
    },
  };
}

/** On unsuccessfully register update store and show error message .
 * @param {string} errorMessage - Error message
 */
export function registerError(errorMessage) {
  return {
    type: REGISTER_ERROR,
    payload: errorMessage,
  };
}
