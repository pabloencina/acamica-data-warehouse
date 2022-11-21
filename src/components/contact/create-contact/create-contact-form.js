import { useState } from "react";
import { useRouter } from "next/router";
import {
    Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Box,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddChannelDialog from "../channel-alert-dialog";
import TableAddChannels from "../table-add-channels";
import CardPersonalInformation from "./card-personal-information";
import CardRegionInformation from "./card-region-information";

export const CreateContactForm = (props) => {
    const optionsPreference = ["NO_PREFERENCE", "FAVORITE_CHANNEL", "DO_NOT_DISTURB"];

    const optionsInterest = ["0%", "25%", "50%", "75%", "100%"];

    const [state, setState] = useState({
        profileInputValue: "",
        formError: false,
        dialogOpen: false,
        errorMessage: "",
        error: false,
    });

    const router = useRouter();

    const handleDialogClose = () => {
        setState({
            ...state,
            dialogOpen: false,
        });
        router.push("/contacts");
    };

    const formikCreateContact = useFormik({
        // initialValues: {
        //     region: "",
        //     country: "",
        //     city: "",
        //     direction: "",
        //     interest: "75%",
        // },

        validationSchema: Yup.object({
            name: Yup.string().max(10).min(3).required("Name is required"),
            surname: Yup.string().max(15).min(3).required("Surname is required"),
            email: Yup.string()
                .email("Must be a valid email")
                .max(40)
                .min(10)
                .required("Email is required"),
            position: Yup.mixed()
                //.oneOf(optionsPreference, "Position must be one of the options")
                .required("Position is required"),
            company: Yup.string().max(15).min(3).required("Company is required"),
        }),

        onSubmit: async (values) => {
            try {
                const response = await postContact(values);

                //console.log(response);
                setState({
                    ...state,
                    dialogOpen: true,
                    formError: false,
                });
            } catch (error) {
                let message = "Contact creation failed.";
                if (error.response) {
                    if (error.response.status === 400) {
                        message += " Please verify the fields in the form.";
                    } else if (error.response.status === 409) {
                        message += " The email already exists in the database.";
                    } else if (error.response.status === 500) {
                        message += " There's issues in the server. Please try again later...";
                    }
                } else {
                    message += " Can't connect with the server. Please try again later...";
                }
                console.log(error.response);
                setState({
                    ...state,
                    errorMessage: message,
                    formError: true,
                });
            }
        },
    });
    return (
        <div sx={{ display: "flex", justifyContent: "space-between" }}>
            <form {...props} onSubmit={formikCreateContact.handleSubmit}>
                <CardPersonalInformation />
                <Divider />

                <CardRegionInformation />
            </form>

            <Dialog
                open={state.dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The contact has been created successfully.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>

            {state.formError ? <Alert severity="error">{state.errorMessage}</Alert> : null}
        </div>
    );
};
