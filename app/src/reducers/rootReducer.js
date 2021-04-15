import { combineReducers } from "redux";
import registerReducer from "./registerReducer";

/** Combine all reducers
 * @returns {Object} store
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    register: registerReducer,
  });
  return rootReducer;
}
