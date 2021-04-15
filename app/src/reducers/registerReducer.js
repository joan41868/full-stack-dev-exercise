import { REGISTER_SUCCESS, REGISTER_ERROR } from "../containers/Register/types";

/** Store states
 * @constant {Object} */
export const initialState = {
  email: "",
  userName: "",
  confirmationCode: "",
  registerErrorMessage: "",
};

/** Register reducer.
 * @param {Object} state - Initial state
 * @param {Object} action - Payload object
 * @return {Object} - return new state
 */
function registerReducer(state = initialState, action) {
  switch (action.type) {
    /** Action Creator - register
     * it will receive user info dispatching from the saga
     */
    case REGISTER_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        userName: action.payload.username,
        confirmationCode: action.payload.confirmationCode,
        registerErrorMessage: "",
      };

    /** Action Creator - register failed
     * it will receive the error message  dispatching from the saga
     */
    case REGISTER_ERROR:
      return {
        ...state,
        email: "",
        userName: "",
        confirmationCode: "",
        registerErrorMessage: action.payload,
      };

    default:
      return state;
  }
}

export default registerReducer;
