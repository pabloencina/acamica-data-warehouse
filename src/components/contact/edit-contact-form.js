import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    Alert,
    Box,
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
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editContact, getContactById } from "src/services/contactsService";

export const EditContactForm = (props) => {
    // TODO: Las props llegan vacías. Hay que buscar una forma de, al moverse a una pagina nueva, enviarle los datos a esa nueva página, para que no tenga que ir al backend a buscarlos nuevamente: useRouter de React*
    // TODO: Si lo anterior no se puede, hay que llamar de nuevo al Back End y pedirle los datos, tomando el ID que aparece en la URL.
    //const options = ["ADMIN", "BASIC"];
    const [state, setState] = useState({
        profileInputValue: "",
        formError: false,
        dialogOpen: false,
        errorMessage: "",
        error: false,
    });
    let id;

    if (typeof window !== "undefined") {
        const search = window.location.search;
        const searchParams = new URLSearchParams(search);
        id = searchParams.get("id");
    }

    useEffect(() => {
        getContactById(id).then((user) => {
            const { name, surname, password, email, profile } = user;
            formik.setValues({ name, surname, password, profile, email });
        });
    }, []);

    const router = useRouter();

    const handleDialogClose = () => {
        setState({
            ...state,
            dialogOpen: false,
        });
        router.push("/contacts");
    };

    const formikPersonalInformation = useFormik({
        initialValues: {
            region: "",
            country: "",
            city: "",
            direction: "",
            interest: "75%",
        },

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
        <>
            <form {...props} onSubmit={formikPersonalInformation.handleSubmit}></form>
            {/* <CardPersonalInformation /> */}
            {/* <CardRegionInformation /> */}
            <Dialog
                open={state.dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The contact has been edited successfully.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>

            {state.formError ? <Alert severity="error">{state.errorMessage}</Alert> : null}
        </>
    );
};
