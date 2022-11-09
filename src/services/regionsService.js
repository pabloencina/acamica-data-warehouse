import axios from "axios";

const regionURL = "http://localhost:3500/regions";

export const getAllRegions = () => {
    return axios.get(regionURL);
};

export const postRegion = async (regionToCreate) => {
    if (regionToCreate) {
        const body = {
            countries: regionToCreate.countries,
            name: regionToCreate.name,
            _id: regionToCreate._id,
        };

        const postRegionResponse = await axios.post(regionURL, body);

        return postRegionResponse;
    }

    return null;
};
