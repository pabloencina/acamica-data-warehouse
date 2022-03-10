
import { useState } from "react";
import NextLink from "next/link";
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
  Link
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postUser } from "src/services/users";

export const AccountProfileDetails = (props) => {
  
  const options = ['ADMIN', 'BASIC'];
  // const [profileInputValue, setProfileInputValue] = useState('');
  const [state, setState] = useState({
    profileInputValue: '',
    formError: false,
    formSuccess: false
  });
  // const [errorValues, setErrorValues] = useState('');

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  //   console.log(values);
  // };

  const formik = useFormik({

    initialValues: {
      name: '',
      surname: '',
      email: '',
      profile: 'BASIC',
      password: ''
    },

    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required(
          'Name is required'),
      surname: Yup
        .string()
        .max(255)
        .required(
          'Surname is required'),
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),

    onSubmit: async (values) => {
      //alert(JSON.stringify(values));
      try {
        const response = await postUser(values);
        console.log('response')
        console.log(response);
        setState({
          ...state,
          formSuccess: true
        })

      } catch (error) {
        console.log('error')
        setState({
          ...state,
          formError:true
        })
      }
      
    },

  });
  return (
    <>
      <form
        {...props}
        onSubmit={formik.handleSubmit}

      >
        <Card>
          <CardHeader
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.name}
                  variant="outlined"
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Surname"
                  name="surname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.surname}
                  variant="outlined"
                  error={Boolean(formik.touched.surname && formik.errors.surname)}
                  helperText={formik.touched.surname && formik.errors.surname}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.email}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Autocomplete
                  value={formik.values.profile}
                  name="profile"
                  error={Boolean(formik.touched.profile && formik.errors.profile)}
                  fullWidth
                  variant="outlined"
                  helperText={formik.touched.profile && formik.errors.profile}
                  onBlur={formik.handleBlur}
                  onChange={(e, value) => formik.setFieldValue("profile", value)}
                  inputValue={state.profileInputValue}
                  onInputChange={(event, newInputValue) => {
                    // setProfileInputValue(newInputValue);
                    setState({
                      ...state,
                      profileInputValue: newInputValue
                    })
                  }}
                  options={options}
                  renderInput={(params) => <TextField {...params} label="Profile" />}
                />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                variant="contained"
                underline="hover"
                type="submit"
              >
                Create
              </Button>
            
          </Box>
        </Card>
      </form>
      {state.formSuccess ?
      <>
      
        <Alert
          severity="success">
          This is a success alert — check it out!
        </Alert>
        <NextLink href="/users">
          <Link
          to="/users"
          ></Link>
        </NextLink>
        </>
        : null
        
      }
      {state.formError ?
        <Alert severity="error">
          This is an error alert — check it out!
        </Alert>
        : null
      }


    </>


  );
};

/*
<Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                type="string"
                value={values.password}
                variant="outlined"
              />
            </Grid>
*/

/*
<Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Profile"
                name="profile"
                onChange={handleChange}
                required
                value={values.profile}
                variant="outlined"
                type="object"
              />
            </Grid>
*/