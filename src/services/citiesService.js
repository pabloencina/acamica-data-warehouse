import axios from "axios";

const cityURL = "http://localhost:3500/cities";

export const getAllCities = () => {
    return axios.get(cityURL);
};

export const postCity = async (cityToCreate) => {
    if (cityToCreate) {
        const body = {
            name: cityToCreate.name,
            country: cityToCreate.country,
        };

        const postCityResponse = await axios.post(cityURL, body);

        return postCityResponse;
    }

    return null;
};
