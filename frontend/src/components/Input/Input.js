import React from 'react';
import {Grid, TextField, InputAdornment, IconButton} from '@material-ui/core'; 
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const Input = ({name,label, type='text', value, onChange, autoFocus=false, half=false, handleShowPassword}) => {
  return ( 
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        variant='outlined'
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={(name === 'password' || name === 'confirmPassword') ? {
          endAdornment: (
            <InputAdornment position='end' >
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          )
        } : null }
      />
    </Grid>
   );
}
 
export default Input;