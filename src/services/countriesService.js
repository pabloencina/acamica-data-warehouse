import axios from "axios";
import { getAuthRequestConfig } from "./loginService";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const countryURL = `${baseUrl}/countries`;

export const getAllCountries = () => {
    const config = getAuthRequestConfig();
    return axios.get(countryURL, config);
};

export const postCountry = async (countryToCreate) => {
    const config = getAuthRequestConfig();
    if (countryToCreate) {
        const body = {
            name: countryToCreate.name,
            region: countryToCreate.region,
        };
        const postCountryResponse = await axios.post(countryURL, body, config);

        return postCountryResponse;
    }

    return null;
};

export const deleteCountry = async (id) => {
    const config = getAuthRequestConfig();
    const response = await axios.delete(`${countryURL}/${id}`, config);

    return response.data;
};
