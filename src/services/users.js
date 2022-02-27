import axios from "axios";

const userURL = "http://localhost:3500/users";

export const getAllUsers = () => {
  return axios.get(userURL);
};
