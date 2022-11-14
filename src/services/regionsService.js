import axios from "axios";

const regionURL = "http://localhost:3500/regions";

export const getAllRegions = () => {
    return axios.get(regionURL);
};

export const postRegion = async (regionToCreate) => {
    if (regionToCreate) {
        const body = {
            name: regionToCreate.name,
        };
        console.log(body);

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
        const regionEdited = await axios.put(`${userURL}/${id}`, body);
        console.log(regionEdited.data);
        return regionEdited;
    }
    return null;
};
