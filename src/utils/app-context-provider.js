import { createContext, useState } from "react";
import { getJwtPayload } from "src/services/loginService";

export const AppContext = createContext({
    regions: [],
    handleRegionUpdate: () => {},
    companies: [],
    handleCompanyUpdate: () => {},
    loggedUser: {
        email: "",
        profile: "",
    },
    handleLoggedUserChange: (user) => {},
});

export const AppProvider = ({ children }) => {
    const { email, profile } = getJwtPayload();

    const [regions, setRegions] = useState([]);

    const [companies, setCompanies] = useState([]);

    const [loggedUser, setLoggedUser] = useState({
        email,
        profile,
    });

    const handleRegionUpdate = (regionArray) => {
        setRegions(regionArray);
    };

    const handleCompanyUpdate = (companyArray) => {
        setCompanies(companyArray);
    };

    const handleLoggedUserChange = (user) => {
        setLoggedUser(user);
    };

    return (
        <AppContext.Provider
            value={{
                regions: regions,
                handleRegionUpdate: handleRegionUpdate,
                companies: companies,
                handleCompanyUpdate: handleCompanyUpdate,
                loggedUser: loggedUser,
                handleLoggedUserChange: handleLoggedUserChange,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
