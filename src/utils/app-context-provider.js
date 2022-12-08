import { createContext, useState } from "react";
import { getJwtPayload } from "src/services/loginService";

export const AppContext = createContext({
    regions: [],
    handleRegionUpdate: () => {},
    companies: [],
    handleCompanyUpdate: () => {},
    user: {
        email: "",
        profile: "",
    },
    handleUserChange: (user) => {},
});

export const AppProvider = ({ children }) => {
    const { email, profile } = getJwtPayload();

    const [regions, setRegions] = useState([]);

    const [companies, setCompanies] = useState([]);

    const [user, setUser] = useState({
        email,
        profile,
    });

    const handleRegionUpdate = (regionArray) => {
        setRegions(regionArray);
    };

    const handleCompanyUpdate = (companyArray) => {
        setCompanies(companyArray);
    };

    const handleUserChange = (user) => {
        setUser(user);
    };

    return (
        <AppContext.Provider
            value={{
                regions: regions,
                handleRegionUpdate: handleRegionUpdate,
                companies: companies,
                handleCompanyUpdate: handleCompanyUpdate,
                user: user,
                handleUserChange: handleUserChange,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
