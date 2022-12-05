import { createContext, useState } from "react";

export const AppContext = createContext({
    regions: [],
    handleRegionUpdate: () => {},
    companies: [],
    handleCompanyUpdate: () => {},
});

export const AppProvider = ({ children }) => {
    const [regions, setRegions] = useState([]);

    const [companies, setCompanies] = useState([]);

    const handleRegionUpdate = (regionArray) => {
        setRegions(regionArray);
    };

    const handleCompanyUpdate = (companyArray) => {
        setCompanies(companyArray);
    };

    return (
        <AppContext.Provider
            value={{
                regions: regions,
                handleRegionUpdate: handleRegionUpdate,
                companies: companies,
                handleCompanyUpdate: handleCompanyUpdate,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
