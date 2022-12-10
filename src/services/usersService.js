import axios from "axios";
import { getAuthRequestConfig } from "./loginService";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const userURL = `${baseUrl}/users`;

export const getAllUsers = async () => {
    const config = getAuthRequestConfig();
    const response = await axios.get(userURL, config);
    return response.data;
};

export const getUserById = async (id) => {
    const config = getAuthRequestConfig();
    const response = await axios.get(`${userURL}/${id}`, config);
    return response.data;
};

export const postUser = async (userToCreate) => {
    const config = getAuthRequestConfig();
    if (userToCreate) {
        const body = {
            name: userToCreate.name,
            surname: userToCreate.surname,
            email: userToCreate.email,
            profile: userToCreate.profile,
            password: userToCreate.password,
        };
        const postUserResponse = await axios.post(userURL, body, config);

        return postUserResponse;
    }

    return null;
};

export const editUser = async (id, userToEdit) => {
    const config = getAuthRequestConfig();
    if (userToEdit && id) {
        const body = {
            name: userToEdit.name,
            surname: userToEdit.surname,
            email: userToEdit.email,
            profile: userToEdit.profile,
            password: userToEdit.password,
        };
        const userEdited = await axios.put(`${userURL}/${id}`, body, config);

        return userEdited;
    }
    return null;
};

export const deleteUser = async (id) => {
    const config = getAuthRequestConfig();
    const response = await axios.delete(`${userURL}/${id}`, config);

    return response.data;
};
