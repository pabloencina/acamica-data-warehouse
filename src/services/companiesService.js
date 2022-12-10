import axios from "axios";
import { getAuthRequestConfig } from "./loginService";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const companyURL = `${baseUrl}/companies`;

export const getAllCompanies = async () => {
    const config = getAuthRequestConfig();
    const response = await axios.get(companyURL, config);
    return response.data;
};

export const getCompanyById = async (id) => {
    const config = getAuthRequestConfig();
    const response = await axios.get(`${companyURL}/${id}`, config);
    return response.data;
};

export const postCompany = async (companyToCreate) => {
    const config = getAuthRequestConfig();
    if (companyToCreate) {
        const body = {
            name: companyToCreate.name,
            email: companyToCreate.email,
            phone: companyToCreate.phone,
            address: companyToCreate.address,
            city: companyToCreate.city,
        };

        const postCompanyResponse = await axios.post(companyURL, body, config);

        return postCompanyResponse;
    }

    return null;
};

export const editCompany = async (id, companyToEdit) => {
    const config = getAuthRequestConfig();
    if (companyToEdit && id) {
        const body = {
            name: companyToEdit.name,
            email: companyToEdit.email,
            phone: companyToEdit.phone,
            address: companyToEdit.address,
            city: companyToEdit.city,
        };
        const companyEdited = await axios.put(`${companyURL}/${id}`, body, config);

        return companyEdited;
    }
    return null;
};

export const deleteCompany = async (id) => {
    const config = getAuthRequestConfig();
    const response = await axios.delete(`${companyURL}/${id}`, config);

    return response.data;
};
