import axios from "axios";

const contactURL = "http://localhost:3500/contacts";

export const getAllContacts = () => {
    return axios.get(contactURL);
};
