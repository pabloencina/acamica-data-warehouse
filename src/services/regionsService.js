import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const regionURL = `${baseUrl}/regions`;

export const getAllRegions = async () => {
    const response = await axios.get(regionURL);
    return response.data;
};

export const postRegion = async (regionToCreate) => {
    if (regionToCreate) {
        const body = {
            name: regionToCreate.name,
        };

        const postRegionResponse = await axios.post(regionURL, body);

        return postRegionResponse;
    }

    return null;
};

export const editRegion = async (id, regionToEdit) => {
    if (regionToEdit && id) {
        const body = {
            name: regionToEdit.name,
        };
        const regionEdited = await axios.put(`${regionURL}/${id}`, body);

        return regionEdited;
    }
    return null;
};

export const deleteRegion = async (id) => {
    const response = await axios.delete(`${regionURL}/${id}`);

    return response.data;
};
