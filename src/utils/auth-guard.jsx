import { AppContext } from "src/utils/app-context-provider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export const AuthGuard = ({ children }) => {
    const { loggedUser } = useContext(AppContext);

    const router = useRouter();

    const verifyLoggedUser = (loggedUser) => {
        if (loggedUser.email && loggedUser.profile) {
            return;
        }
        router.push("/login");
    };

    useEffect(() => {
        verifyLoggedUser(loggedUser);
    }, []);

    return <>{children}</>;
};
