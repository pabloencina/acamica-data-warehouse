import axios from "axios";
import { getAuthRequestConfig } from "./loginService";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const regionURL = `${baseUrl}/regions`;

export const getAllRegions = async () => {
    const config = getAuthRequestConfig();
    const response = await axios.get(regionURL, config);
    return response.data;
};

export const postRegion = async (regionToCreate) => {
    const config = getAuthRequestConfig();
    if (regionToCreate) {
        const body = {
            name: regionToCreate.name,
        };

        const postRegionResponse = await axios.post(regionURL, body, config);

        return postRegionResponse;
    }

    return null;
};

export const editRegion = async (id, regionToEdit) => {
    const config = getAuthRequestConfig();
    if (regionToEdit && id) {
        const body = {
            name: regionToEdit.name,
        };
        const regionEdited = await axios.put(`${regionURL}/${id}`, body, config);

        return regionEdited;
    }
    return null;
};

export const deleteRegion = async (id) => {
    const config = getAuthRequestConfig();
    const response = await axios.delete(`${regionURL}/${id}`, config);

    return response.data;
};
