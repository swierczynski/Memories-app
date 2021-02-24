import React, { useState, useEffect } from 'react';
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import memoriesLogo from '../../assets/images/memories-logo.png'
import useStyles from './styles';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {routes} from '../../routes';
import {connect} from 'react-redux';
import {logout} from '../../store/actions/userAction';
import decode from 'jwt-decode';

const Navbar = ({logout}) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history = useHistory()
  const location = useLocation()
  useEffect(()=> {
    const token = user?.token
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout(history, setUser)
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])
  return ( 
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography component={Link} to={routes.home} className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memoriesLogo} alt="Memories Logo" height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result?.name} src={user.result?.imageUrl}>{user.result?.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.result?.name}
            </Typography>
            <Button variant='contained' color="secondary" className={classes.logout} onClick={() => logout(history, setUser)} component={Link} to={routes.autentication}>logout</Button>
          </div>
        ) : (
          <Button component={Link} to={routes.autentication} variant='contained' color='primary'>Sign in</Button>
        )}
      </Toolbar>
    </AppBar>
   );
}
const mapDispatchToProps = dispatch => ({
  logout: (history, setUser) => dispatch(logout(history, setUser))
})
const NavbarConsumer = connect (null, mapDispatchToProps)(Navbar)
 
export default NavbarConsumer;