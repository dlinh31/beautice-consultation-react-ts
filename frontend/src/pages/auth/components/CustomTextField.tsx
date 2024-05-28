import TextField from '@mui/material/TextField';

const CustomTextField = (props: any) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      size='medium'
      
      autoFocus
      InputProps={{
        style: {
          borderRadius: "10px",
        }
      }}

      {...props}
    />
  );
}

export default CustomTextField
