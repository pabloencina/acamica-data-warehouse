import axios from "axios";
import { Alert } from "@mui/material";

const userURL = "http://localhost:3500/users";

export const getAllUsers = () => {
  return axios.get(userURL);
};

export const postUser = async (userToCreate) => {

  if (userToCreate) {
    const body = {
      name: userToCreate.name,
      surname: userToCreate.surname,
      email: userToCreate.email,
      profile: userToCreate.profile,
      password: userToCreate.password,
    }
    const postUserResponse = await axios.post(userURL, body);
    console.log(postUserResponse);
    return postUserResponse;
  }
  return null;

}
      /*

initialValues: {
name: "",
surname: "",
email: "",
profile: "",
password: "",
},
 
*/