import axios from "axios";
import { getAuthRequestConfig } from "./loginService";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const cityURL = `${baseUrl}/cities`;

export const getAllCities = () => {
    const config = getAuthRequestConfig();
    return axios.get(cityURL, config);
};

export const postCity = async (cityToCreate) => {
    const config = getAuthRequestConfig();
    if (cityToCreate) {
        const body = {
            name: cityToCreate.name,
            country: cityToCreate.country,
        };

        const postCityResponse = await axios.post(cityURL, body, config);

        return postCityResponse;
    }

    return null;
};

export const deleteCity = async (id) => {
    const config = getAuthRequestConfig();
    const response = await axios.delete(`${cityURL}/${id}`, config);

    return response.data;
};
