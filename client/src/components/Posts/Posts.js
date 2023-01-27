import React from "react";
import {Grid, CircularProgress } from '@material-ui/core';
//import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ topFunction, currentId, setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

   //  console.log(posts);
    return(
        !posts.length ? < CircularProgress /> :(
           <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}> 
                   <Post topFunction={topFunction} post={post} currentId={currentId} setCurrentId={ setCurrentId } />                    {/*edited...*/}
                </Grid>
              ))}
           </Grid>
        )
    );
}

export default Posts;