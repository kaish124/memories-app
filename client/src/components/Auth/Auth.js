import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Container, Paper, Grid, Typography, Button} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { gapi } from "gapi-script";
import {signIn, signUp} from "../../action/users";

const Auth = () => {
    gapi.load("client:auth2", () => {
        gapi.auth2.init({
          clientId:
            "422626664841-b9mrjdpsj99jr35iahe1f8as870hdmfi.apps.googleusercontent.com",
          plugin_name: "chat",
        });
      });
    const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setMode] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setMode((prevMode) => !prevMode);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;

      try {
         dispatch({type: 'AUTH', data: { result, token }});
         history.push('/');
      } catch (error) {
          console.log(error);
      }
    };

    const googleFailure = (error) => {
      console.log('Google sign in failed, Try again.');
      console.log(error);
    };


    const handleSubmit = (e) => {
      e.preventDefault();
      if(isSignup){
        dispatch(signUp(formData, history));
      } else{
        dispatch(signIn(formData, history));
      }
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
  return (
    <Container component="main" maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{ isSignup?  'Sign up' : 'Sign In' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}> 
               <Grid container spacing={2}>
                  { isSignup && (
                        <>
                            <Input name= 'firstName' label='First Name' value = {formData.firstName} handleChange={handleChange} half />
                            <Input name= 'lastName' label='Last Name' value = {formData.lastName} handleChange={handleChange} half />
                        </>
                  )}
                  <Input name='email' label='Email Address' value = {formData.email} handleChange={handleChange} type='email' />
                  <Input name='password' label='Password' value = {formData.password} handleChange={handleChange} type={showPassword? 'text': 'password'}  handleShowPassword={handleShowPassword}/>
                  { isSignup && <Input name='confirmPassword' label='Repeat Password' type='password' value = {formData.confirmPassword} handleChange={handleChange} />}  
               </Grid>
               <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                 {isSignup? 'Sign Up' : 'Sign In'}
               </Button>
               <GoogleLogin 
                   clientId='422626664841-b9mrjdpsj99jr35iahe1f8as870hdmfi.apps.googleusercontent.com'
                   render={(renderProps) => (
                    <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>Google Sign In</Button>
                   )}
                   onSuccess={googleSuccess}
                   onFailure={googleFailure}
                   cookiePolicy="single_host_origin"
               />
               <Grid container justifyContent='flex-end'>
                   <Grid item>
                        <Button onClick={switchMode} >
                            { isSignup? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                   </Grid>
               </Grid>
            </form>
        </Paper>
    </Container>
  );
};

export default Auth