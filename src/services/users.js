import axios from "axios";

const userURL = "http://localhost:3500/users";

export const getAllUsers = () => {
  return axios.get(userURL);
};

export const postUser = async (userToCreate) => {

  if (userToCreate) {
    const body = {
      name: userToCreate.userToCreate.name,
      surname: userToCreate.userToCreate.surname,
      email: userToCreate.userToCreate.email,
      profile: userToCreate.userToCreate.profile,
      password: userToCreate.userToCreate.password,
    }
    alert(JSON.stringify(body));
    const postUserResponse = await axios.post(userURL, body);
    console.log(postUserResponse);
    return;
  }
  return alert('ALL IS NULL');

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