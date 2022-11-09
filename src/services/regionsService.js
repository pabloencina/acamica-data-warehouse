import axios from "axios";

const regionURL = "http://localhost:3500/regions";

export const getAllRegions = () => {
    return axios.get(regionURL);
};

export const postRegion = async (regionToCreate) => {
    console.log(regionToCreate);
    if (regionToCreate) {
        const body = {
            name: regionToCreate.name,
        };

        const postRegionResponse = await axios.post(regionURL, body);

        return postRegionResponse;
    }

    return null;
};
