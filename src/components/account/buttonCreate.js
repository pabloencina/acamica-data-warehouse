
import { Button } from "@mui/material";
import { postUser } from 'src/services/users';

export const ButtonCreate = (userToCreate) => {
    return(
        <Button 
        // href="/users"
        color="primary"
        variant="contained"
        underline="hover"
        onClick={ () => { postUser(userToCreate); } }
        // onClick={ () => {alert('CreateButton onClick')} }
        >
            Create
        </Button>  
    );
}

/*
const [values, setValues] = useState([]);
    useEffect(() => {
        postUser().then((response) => {
            let userResponse = response.data;
            console.log(userResponse);
            setValues(userResponse);
        })
            .catch((e) => {
                console.log(e);
            });
    }, [])
*/