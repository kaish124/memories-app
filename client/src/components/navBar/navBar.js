import React, {useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from '../../images/memories.png';
import decode from 'jwt-decode';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const logOut = () =>{
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
      const token = user = user?.token;
      if(token){
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) logOut();
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return(
            <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer} > 
               <Typography component={Link} to= "/" className={classes.heading} variant="h2" align="center" >Memories</Typography>
               <img className={classes.image} src={memories} alt= "memories" height= "60" />
            </div>
            <Toolbar className={classes.toolbar}>
              {user ? (
                <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" color="secondary" size = "small" onClick={logOut}>Logout</Button>
                </div>
              ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
              )}
            </Toolbar>
            </AppBar>
    )
}

export default Navbar;