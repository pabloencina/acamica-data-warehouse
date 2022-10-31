import axios from "axios";

const userURL = "http://localhost:3500/users";

export const getAllUsers = () => {
    return axios.get(userURL);
};

export const getUserById = async (id) => {
    const response = await axios.get(`${userURL}/${id}`);
    return response.data;
};

export const postUser = async (userToCreate) => {
    if (userToCreate) {
        const body = {
            name: userToCreate.name,
            surname: userToCreate.surname,
            email: userToCreate.email,
            profile: userToCreate.profile,
            password: userToCreate.password,
        };
        const postUserResponse = await axios.post(userURL, body);
        console.log(postUserResponse);

        return postUserResponse;
    }

    return null;
};

export const editUser = async (id,userToEdit) => {
    if (userToEdit  && id){
        const body = {
            name: userToEdit.name,
            surname: userToEdit.surname,
            email: userToEdit.email,
            profile: userToEdit.profile,
            password: userToEdit.password,
        };
        const userEdited = await axios.put(`${userURL}/${id}`, body);
        console.log(userEdited.data);
        return userEdited;
    }
    return null;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${userURL}/${id}`);
    console.log(response.data);
    return response.data;
};
