import axios from "axios";

const countryURL = "http://localhost:3500/countries";

export const getAllCountries = () => {
    return axios.get(countryURL);
};

export const postCountry = async (countryToCreate) => {
    if (countryToCreate) {
        const body = {
            cities: countryToCreate.cities,
            name: countryToCreate.name,
            _id: countryToCreate._id,
        };

        const postCountryResponse = await axios.post(countryURL, body);

        return postCountryResponse;
    }

    return null;
};
