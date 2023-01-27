 import React, { useState, useEffect} from 'react';
 import { Container, Grow, Grid, Button } from '@material-ui/core';
//  import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
 import { useDispatch } from "react-redux";
 import { getPosts } from '../../action/posts';
 import Posts from '../Posts/Posts';
 import Form from '../Forms/Form';
 import useStyles from '../../styles';
 
 const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }

    useEffect(() => {
        dispatch(getPosts());
    } , [currentId, dispatch]); 

   return (
    <Grow in>
    <Container>
        <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
                <Posts currentId={currentId} setCurrentId={setCurrentId} topFunction={topFunction}/>                    {/*edited...*/}
            </Grid>
            <Grid item xs={12} sm={4}>
                <Form   currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Button className={classes.goTop} variant="contained" color="secondary" size = "small" onClick={topFunction}>Top</Button>
        </Grid>
    </Container>
    </Grow>
   )
 }
 
 export default Home