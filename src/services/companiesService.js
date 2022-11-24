import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const companyURL = `${baseUrl}/companies`;

export const getAllCompanies = () => {
    return axios.get(companyURL);
};

export const getCompanyById = async (id) => {
    const response = await axios.get(`${companyURL}/${id}`);
    return response.data;
};

export const postCompany = async (companyToCreate) => {
    if (companyToCreate) {
        const body = {
            name: companyToCreate.name,
            email: companyToCreate.email,
            phone: companyToCreate.phone,
            address: companyToCreate.address,
            city: companyToCreate.city,
        };
        console.log(body);
        const postCompanyResponse = await axios.post(companyURL, body);
        console.log(postCompanyResponse);

        return postCompanyResponse;
    }

    return null;
};

export const editCompany = async (id, companyToEdit) => {
    if (companyToEdit && id) {
        const body = {
            name: companyToEdit.name,
            email: companyToEdit.email,
            phone: companyToEdit.phone,
            address: companyToEdit.address,
            city: companyToEdit.city,
        };
        const companyEdited = await axios.put(`${companyURL}/${id}`, body);
        console.log(companyEdited.data);
        return companyEdited;
    }
    return null;
};
