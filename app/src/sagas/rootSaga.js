import { all } from "redux-saga/effects";
// Saga
import registerSaga from "../containers/Register/saga.js";
// API
import { api as registerApi } from "../api/registerApi";
/** Root saga.
 * @return {Object} - return store
 */
function* rootSaga() {
  yield all([registerSaga(registerApi)]);
}

export default rootSaga;
