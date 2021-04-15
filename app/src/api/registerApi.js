import axios from "axios";
import { REGISTER_SERVICE_URL } from "./config";

export const api = {
  register: async function (username, email, password) {
    return axios.post(REGISTER_SERVICE_URL, {
      username,
      email,
      password
    });
  },
};
