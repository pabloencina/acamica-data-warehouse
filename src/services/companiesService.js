import axios from "axios";

const companyURL = "http://localhost:3500/companies";

export const getAllCompanies = () => {
    return axios.get(companyURL);
};
