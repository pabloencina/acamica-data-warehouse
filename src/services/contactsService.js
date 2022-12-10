import axios from "axios";
import { getAuthRequestConfig } from "./loginService";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const contactURL = `${baseUrl}/contacts`;

export const getAllContacts = async () => {
    const config = getAuthRequestConfig();
    const response = await axios.get(contactURL, config);
    return response.data;
};

export const postContact = async (contactToCreate) => {
    const config = getAuthRequestConfig();
    if (contactToCreate) {
        const body = {
            name: contactToCreate.name,
            surname: contactToCreate.surname,
            email: contactToCreate.email,
            position: contactToCreate.position,
            company: contactToCreate.company,
            city: contactToCreate.city,
            address: contactToCreate.address,
            channels: contactToCreate.channels,
            interest: contactToCreate.interest,
        };

        const postContactResponse = await axios.post(contactURL, body, config);

        return postContactResponse;
    }

    return null;
};

export const getContactById = async (id) => {
    const config = getAuthRequestConfig();
    const response = await axios.get(`${contactURL}/${id}`, config);

    return response.data;
};

export const editContact = async (id, contactToEdit) => {
    const config = getAuthRequestConfig();
    if (contactToEdit && id) {
        const body = {
            name: contactToEdit.name,
            surname: contactToEdit.surname,
            email: contactToEdit.email,
            position: contactToEdit.position,
            company: contactToEdit.company,
            city: contactToEdit.city,
            address: contactToEdit.address,
            channels: contactToEdit.channels,
        };
        const contactEdited = await axios.put(`${contactURL}/${id}`, body, config);

        return contactEdited;
    }
    return null;
};

export const deleteContact = async (id) => {
    const config = getAuthRequestConfig();
    const response = await axios.delete(`${contactURL}/${id}`, config);

    return response.data;
};
