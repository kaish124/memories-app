import React, {useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from '../../images/Memories1.png';
import decode from 'jwt-decode';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const logOut = useCallback(() =>{
        dispatch({type: 'LOGOUT'});
        setUser(null);
        history.push('/');
    },[dispatch, history]);

    useEffect(() => {
      const token = user?.token;
      if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) logOut();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location, logOut, user?.token]);

    return(
            <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to='/' className={classes.brandContainer} > 
               <img className={classes.image} src={memories} alt='Icon' height="55px" />
               {/* <img className={classes.image} src={memories} alt= "memories" height= "60" /> */}
            </Link>
            <Toolbar className={classes.toolbar}>
              {user ? (
                <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" color="secondary" size = "small" onClick={logOut}>Logout</Button>
                </div>
              ) : (
                <Button size = "small" component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
              )}
            </Toolbar>
            </AppBar>
    )
}

export default Navbar;