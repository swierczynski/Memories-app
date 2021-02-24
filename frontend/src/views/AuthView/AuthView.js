import React, { useState } from 'react';
import useStyles from './styles';
import {Avatar, Button, Paper, Grid, Typography, TextFiled, Container} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import Input from '../../components/Input/Input';
import {GoogleLogin} from 'react-google-login';
import Icon from '../../components/Icon/Icon';
import {connect} from 'react-redux';
import {googleAuthSuccess, signIn, signUp} from '../../store/actions/userAction';
import { useHistory } from 'react-router-dom';

const initialFormData = {
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  email: ''
}

const AuthView = ({googleAuthSuccess, signUp, signIn}) => {
  const classes = useStyles()
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialFormData)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const history = useHistory()

  const handleChange = e => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  const handleShowPassword = () => {
    setIsPasswordVisible(prevValue => !prevValue)
  }
  const handleSubmit = e => {
    e.preventDefault();
    if(isSignUp) {
      signUp(formData, history)
    } else {
      signIn(formData, history)
    }
  }


  const googleFaulure = (error)=> {
    console.log('Google Sign in unsuccessfull', error);
  }

  return ( 
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant='h5'>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input 
                  name='firstName'
                  label='First Name'
                  value={formData.firstName}
                  onChange={handleChange}
                  autoFocus={true}
                  half
                />
                <Input 
                  name='lastName'
                  label='Last Name'
                  value={formData.lastName}
                  onChange={handleChange}
                  half
                />
              </>
            )}
              <Input 
                name='email'
                label='E-mail'
                value={formData.email}
                onChange={handleChange}
                autoFocus={isSignUp ? false : true}
                type='email'
              />
              <Input 
                name='password'
                label='Password'
                value={formData.password}
                onChange={handleChange}
                type={isPasswordVisible ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input 
                  name='confirmPassword'
                  label='Confirm Password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={isPasswordVisible ? 'text' : 'password'}
                  handleShowPassword={handleShowPassword}
                />
              )}
            <Button type='submit' fullWidth variant='contained' size='large' color='primary' className={classes.submit}>
              {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>
            <GoogleLogin 
              clientId='dsdsd'
              render={(renderProps) => (
                <Button 
                  className={classes.googleButton} 
                  color="primary"
                  fullWidth 
                  onClick={renderProps.onClick} 
                  disabled={renderProps.disabled} 
                  startIcon={<Icon />} 
                  variant='contained' 
                >
                  Google Sign in
                </Button>
              )}
              onSuccess={(res) => googleAuthSuccess(res, history)}
              onFailure={googleFaulure}
              cookiePolicy='single_host_origin'
            />
            <Button fullWidth type='button' variant='contained' size='small' color='secondary' onClick={()=> setIsSignUp(prevValue => !prevValue)}>
                {isSignUp? 'Already have an account' : "Don't have an account"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
   );
}

const mapDispatchToProps = dispatch => ({
  googleAuthSuccess: (res, history) => dispatch(googleAuthSuccess(res,history)),
  signIn: (formData, history) => dispatch(signIn(formData, history)),
  signUp: (formData, history) => dispatch(signUp(formData, history))
})

const AuthViewConsumer = connect(null, mapDispatchToProps)(AuthView)
 
export default AuthViewConsumer;