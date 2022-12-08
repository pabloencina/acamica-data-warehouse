import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const contactURL = `${baseUrl}/contacts`;

export const getAllContacts = async () => {
    const response = await axios.get(contactURL);
    return response.data;
};
//console.log(getAllContacts);

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
        console.log(body);
        const postContactResponse = await axios.post(contactURL, body);
        console.log(postContactResponse);

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
            //region: contactToEdit.region,
            //country: contactToEdit.country,
            //city: contactToEdit.city,
            address: contactToEdit.address,
        };
        const contactEdited = await axios.put(`${contactURL}/${id}`, body);
        console.log(contactEdited.data);
        return contactEdited;
    }
    return null;
};

export const deleteContact = async (id) => {
    const response = await axios.delete(`${contactURL}/${id}`);
    console.log(response.data);
    return response.data;
};
