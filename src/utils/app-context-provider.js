import { createContext, useState } from "react";

export const AppContext = createContext({
    regions: [],
    handleRegionUpdate: () => {},
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
