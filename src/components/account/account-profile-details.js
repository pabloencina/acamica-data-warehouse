
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { ButtonCreate } from "./buttonCreate";
import Autocomplete from '@mui/material/Autocomplete';

export const AccountProfileDetails = (props) => {

  const [values, setValues] = useState({
    name: '',
    surname: '',
    email: '',
    profile: 'BASIC',
    password: ''
  });
  const options = ['ADMIN', 'BASIC'];
  const [profileInputValue, setProfileInputValue] = useState('');

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(values);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
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
                helperText="Please specify the name"
                label="Name"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
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
                onChange={handleChange}
                required
                value={values.surname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                value={values.profile}
                name="profile"
                onChange={(event, newValue) => {
                  setValues({
                    ...values,
                    profile: newValue
                  });
                }}
                inputValue={profileInputValue}
                onInputChange={(event, newInputValue) => {
                  setProfileInputValue(newInputValue);
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
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                type="password"
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
          <ButtonCreate userToCreate={values} />

        </Box>
      </Card>
    </form>
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