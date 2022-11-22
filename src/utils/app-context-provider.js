import { createContext, useState } from "react";

export const AppContext = createContext({
    regions: [],
    handleRegionUpdate: () => {},
    countries: [],
    handleCountryUpdate: () => {},
});

export const AppProvider = ({ children }) => {
    const [regions, setRegions] = useState([]);

    const handleRegionUpdate = (regionArray) => {
        console.log(regionArray);
        setRegions(regionArray);
    };

    return (
        <AppContext.Provider
            value={{
                regions: regions,
                handleRegionUpdate: handleRegionUpdate,
                // countries: countries,
                // handleCountryUpdate: handleCountryUpdate,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
