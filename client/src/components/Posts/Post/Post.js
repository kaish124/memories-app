import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './style';
import {useHistory} from 'react-router-dom';
import './post.css';
import  { useDispatch } from 'react-redux';
import { deletePost, likePost } from "../../../action/posts";

const Post = ({ topFunction, post, currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
     if(post?.likes?.length > 0){
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
               <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length >= 2 ? `You and ${post.likes.length - 1} ${post.likes.length - 1 === 1 ? 'other' : 'others'}`: `${post.likes.length} Like${post.likes.length > 1 ? 's': ''}`}</>
          ) : (
               <><ThumbUpAltOutlined fontSize="small" />&nbsp; {`${post.likes.length} Like${post.likes.length > 1 ? 's': ''}`}</> 
          )
     }
     return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Likes</>;
    };

    const openPost = () => {
          history.push(`/posts/${post._id}`);
    };

    return(
       <Card className={classes.card} raised elevation={6}>
            <ButtonBase  component="span" name="test" className={classes.cardAction} onClick={openPost} >

               <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
               <div className={classes.overlay}>
                         <Typography style={{ fontSize: '15px' }} variant="h6">{ post.name }</Typography>
                         <Typography style={{ fontSize: '12px' }} variant="h6">{moment(post.createdAt).fromNow()}</Typography>   
               </div>
           <div className={classes.details}>
                <Typography variant="body2" color = "textSecondary">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
           </div>
           <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
          </ButtonBase>
               {(user?.result.googleId === post.creator || user?.result?._id === post.creator) && (
               <div className={classes.overlay2}> 
                         <Button style={{color: 'white'}} size="small" onClick={() => {currentId? setCurrentId(null) : setCurrentId(post._id); topFunction();} }>   {/*edited....*/}
                              <MoreHorizIcon fontSize="medium" /> 
                         </Button>
               </div>
               )}
           <CardContent>
                <Typography  variant="body2" color= "textSecondary" component='p' >{post.message.substr(0, 80)}...</Typography>
           </CardContent>
           <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes/>
                </Button>
                {(user?.result.googleId === post.creator || user?.result?._id === post.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                         <DeleteIcon fontSize="small" />
                         &nbsp;Delete
                    </Button>
               )}
           </CardActions>
       </Card>
    );
}

export default Post;