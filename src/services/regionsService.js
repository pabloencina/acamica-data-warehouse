import axios from "axios";

const regionURL = "http://localhost:3500/regions";

export const getAllRegions = () => {
    return axios.get(regionURL);
};
