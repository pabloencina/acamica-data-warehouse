import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { upLoad as UploadIcon } from '../../icons/upload';
//import { Download as DownloadIcon } from '../../icons/download';

export const CustomerListToolbar = (props) => (
  <Box {...props}>
    
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h6"
      >
        Contacts
      </Typography>
      <Box sx={{ m: 1 }} >
        <Button variant="contained"
          startIcon={(<UploadIcon fontSize="small" alignItems= "center"/>)}
          sx={{ mr: 2 }}
        >
        </Button>

        <Button color="primary" sx={{ m: 1 }}
          variant="contained" >
          Export Contacts
        </Button>
        <Button sx={{ m: 1 }}
          color="primary"
          variant="contained"
        >
          Add Contact
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
