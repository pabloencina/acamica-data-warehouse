import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const companyURL = `${baseUrl}/companies`;

export const getAllCompanies = () => {
    return axios.get(companyURL);
};
