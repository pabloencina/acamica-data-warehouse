import { Button } from "@mui/material";
import { postUser } from "src/services/usersService";

export const ButtonCreateUser = (userToCreate) => {
    return (
        <Button
            // href="/users"
            color="primary"
            variant="contained"
            underline="hover"
            onClick={() => {
                postUser(userToCreate);
            }}
        >
            Create
        </Button>
    );
};
