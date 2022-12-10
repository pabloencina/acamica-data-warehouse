import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3500";
const loginURL = `${baseUrl}/login`;

export const postLogin = async (email, password) => {
    if (email && password) {
        const body = {
            email,
            password,
        };

        const loginResponse = await axios.post(loginURL, body);

        return loginResponse.data;
    }

    return null;
};

export const setTokenInCookie = (token) => {
    Cookies.set("token", token);
};

export const deleteTokenFromCookie = () => {
    Cookies.remove("token");
};

export const getAuthRequestConfig = () => {
    const token = Cookies.get("token");
    return {
        Authorization: "Bearer " + token,
    };
};

export const getJwtPayload = () => {
    const token = Cookies.get("token");
    if (token) {
        return jwtDecode(token);
    }
    return {};
};

export const decodeJwt = (token) => {
    return jwtDecode(token);
};
