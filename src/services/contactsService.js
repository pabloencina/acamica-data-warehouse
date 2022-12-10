import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const contactURL = `${baseUrl}/contacts`;

export const getAllContacts = async () => {
    const response = await axios.get(contactURL);
    return response.data;
};

export const postContact = async (contactToCreate) => {
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

        const postContactResponse = await axios.post(contactURL, body);

        return postContactResponse;
    }

    return null;
};

export const getContactById = async (id) => {
    const response = await axios.get(`${contactURL}/${id}`);

    return response.data;
};

export const editContact = async (id, contactToEdit) => {
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
        const contactEdited = await axios.put(`${contactURL}/${id}`, body);

        return contactEdited;
    }
    return null;
};

export const deleteContact = async (id) => {
    const response = await axios.delete(`${contactURL}/${id}`);

    return response.data;
};
