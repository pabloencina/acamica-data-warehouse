import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { getAllCompanies } from "src/services/companiesService";
import { getAllRegions } from "src/services/regionsService";
import { AppContext } from "./app-context-provider";

export const ContextGuard = ({ children }) => {
    const { regions, handleRegionUpdate, companies, handleCompanyUpdate } = useContext(AppContext);

    const verifyRegions = async () => {
        if (regions.length === 0) {
            const result = await getAllRegions();
            handleRegionUpdate(result);
        }
    };

    const verifyCompanies = async () => {
        if (companies.length === 0) {
            const result = await getAllCompanies();
            handleCompanyUpdate(result);
        }
    };

    useEffect(() => {
        verifyRegions();
        verifyCompanies();
    }, []);

    return <>{children}</>;
};
