import React,{ useState, useEffect} from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createPost, updatePost } from '../../action/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
       if(post) setPostData(post);
      //  console.log(post);
    }, [post])

    useEffect(() => {
      if(currentId == null)setPostData({ title: '', message: '', tags: '', selectedFile: ''});    //edited.......
    }, [currentId])

    const clear = () => {
      setCurrentId(null);
      setPostData({ title: '', message: '', tags: '', selectedFile: ''});
      
    }
    const handleSubmit = (e) => {
         e.preventDefault();
         if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
            clear(); 
         }else if(postData.creator !== '' && postData.message !== '' && postData.title !== ''){
           dispatch(createPost({...postData, name: user?.result?.name}));
           clear(); 
         }
         
    };

    if(!user?.result?.name){
      return(
        <Paper className={classes.paper}>
        <Typography varient= "h6" align="center"> 
           Please sign In to create your own memories and like other's memories.
        </Typography>
        </Paper>
      );
    }
    return(
        <Paper className={classes.paper}>
           <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
             <Typography  variant="h6">{currentId? "Editing" :"Creating"} a memory</Typography>
             {/* <TextField required name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value})}/> */}
             <TextField required name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
             <TextField required name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
             <TextField  name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>
             <div className={classes.fileInput}><FileBase type = "file" multiple= {false} onDone = {({base64}) => setPostData({ ...postData, selectedFile: base64 })} /></div>
             <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type= "submit" fullWidth>Submit</Button>
             <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
           </form>
        </Paper>
        
    )
}

export default Form;