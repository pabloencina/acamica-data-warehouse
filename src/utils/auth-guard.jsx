import { AppContext } from "src/utils/app-context-provider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export const AuthGuard = ({ children }) => {
    const { user } = useContext(AppContext);

    const router = useRouter();
    const verifyUser = (user) => {
        console.log(router.route);
        if (user.email && user.profile) {
            return;
        }
        router.push("/login");
    };

    useEffect(() => {
        verifyUser(user);
    }, []);

    return <>{children}</>;
};
