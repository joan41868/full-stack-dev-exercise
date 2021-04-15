import { REGISTER_REQUEST } from "./types.js";
// Actions
import { registerSuccess, registerError } from "./actions.js";
// Redux
import { put, take, call } from "redux-saga/effects";

/** Call createUser with username and email */
export default function* loginSaga(api) {
  while (true) {
    const registerRequest = yield take(REGISTER_REQUEST);
    if (registerRequest.payload) {
      const { username, email, password } = registerRequest.payload;
      yield call(createUser, api, username, email, password);
    }
  }
}

/** Create register request
 * @param {object} api - API providing access to the backend
 * @param {string} username - Username of the user
 * @param {string} emailAddress - Email of the user
 * @param {string} password - User's password
 */
function* createUser(api, username, emailAddress, password) {
  var response;
  try {
    response = yield call(api.register, username, emailAddress, password);
    const {
      email,
      accountConfirmationLink,
      confirmationCode,
      userName,
    } = response.data;
    yield put(
      registerSuccess(
        email,
        accountConfirmationLink,
        confirmationCode,
        userName
      )
    );
  } catch (error) {
    yield put(registerError("Acount already exist"));

  }
}
