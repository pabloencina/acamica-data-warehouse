import axios from "axios";

const contactURL = "http://localhost:3500/contacts";

export const getAllContacts = () => {
    return axios.get(contactURL);
};

export const getContactById = async (id) => {
    const response = await axios.get(`${contactURL}/${id}`);
    return response.data;
};

export const editContact = async (id, contactToEdit) => {
    if (contactToEdit && id) {
        const body = {
            contact: contactToEdit.contact,
            position: contactToEdit.position,
            company: contactToEdit.company,
            address: contactToEdit.address,
            channels: contactToEdit.channels,
            interest: contactToEdit.interest,
        };
        const contactEdited = await axios.put(`${contactURL}/${id}`, body);
        console.log(contactEdited.data);
        return contactEdited;
    }
    return null;
};
