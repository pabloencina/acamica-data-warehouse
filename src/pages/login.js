import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import { useContext, useState } from "react";
import { decodeJwt, postLogin } from "src/services/loginService";
import { AppContext } from "src/utils/app-context-provider";
import * as Yup from "yup";

import { useRouter } from "next/router";

const Login = () => {
    const { handleUserChange } = useContext(AppContext);

    const [state, setState] = useState({
        errorMessage: "",
        formError: false,
    });

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
        }),

        onSubmit: async (values) => {
            try {
                const token = await postLogin(values.email, values.password);
                const { email, profile } = decodeJwt(token);
                handleUserChange({ email, profile });
                setState({ ...state, formError: false });
                router.push("/contacts");
            } catch (e) {
                const errorMessage = "Cannot authenticate user.";
                window.localStorage.setItem("token", "");
                setState({ ...state, formError: true, errorMessage });
            }
        },
    });

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexGrow: 1,
                    minHeight: "100%",
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{ my: 3 }}>
                        <Typography color="textPrimary" variant="h3">
                            Acamica Datawarehouse
                        </Typography>
                    </Box>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h5">
                                Login
                            </Typography>
                        </Box>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email Address"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                        />
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Login
                            </Button>
                        </Box>
                        {state.formError ? (
                            <Alert severity="error">{state.errorMessage}</Alert>
                        ) : null}
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Login;
