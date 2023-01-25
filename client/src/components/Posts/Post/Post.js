import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAtlIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './style';
import './post.css';
import  { useDispatch } from 'react-redux';

import { deletePost, likePost } from "../../../action/posts";

const Post = ({ post, currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    return(
       <Card className={classes.Card} >
            {/* <h1 style= {{color: "orange"}} className={classes.overlay}>Hello</h1> */}
            <div style={{position: 'relative'}}>

            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                    <Typography variant="h6">{ post.creator }</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>   
            </div>
            <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={() => currentId? setCurrentId(null) : setCurrentId(post._id) }>   {/*edited....*/}
                         <MoreHorizIcon fontSize="medium" /> 
                    </Button>
            </div>
            </div>
           <div className={classes.details}>
                <Typography variant="body2" color = "textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
           </div>
           <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
           <CardContent>
                <Typography  variant="body2" color= "textSecondary" component='p' >{post.message}</Typography>
           </CardContent>
           <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAtlIcon fontSize="small" />
                    &nbsp; Like 
                    &nbsp; {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    &nbsp;Delete
                </Button>
           </CardActions>
       </Card>
    );
}

export default Post;