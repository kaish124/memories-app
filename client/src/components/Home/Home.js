import React, { useState, useEffect} from 'react';
import { Container, Grow, Grid, Button, Paper, AppBar, TextField } from '@material-ui/core';
//import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
 
import { getPosts, getPostsBySearch } from '../../action/posts';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination'; 
import Form from '../Forms/Form';
import useStyles from './styles';
 
 function useQuery(){
    return new URLSearchParams(useLocation().search);
 }

 const Home = () => {
    // console.log(new URLSearchParams(useLocation().search));
    // console.log(useLocation());
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || '1';
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }

    // useEffect(() => {
    //     console.log("hello");
    //     dispatch(getPosts(page));
    // } , [currentId, dispatch]); 

    const searchPost = () =>{
        if(search.trim() || tags.length){
            dispatch(getPostsBySearch({ search, tags: tags.join(',')})); 
            history.push(`/posts/search?searchQuery=${search || 'none' }&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            // console.log("key presses");
            searchPost();        
        }
    };
    
    const handleAdd = (tag) => {
       setTags([...tags, tag]);
    }
  
    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) =>  tag !== tagToDelete));
    }

   return ( 
    <Grow in>
    <Container maxWidth= "xl">
        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
                <Posts currentId={currentId} setCurrentId={setCurrentId} topFunction={topFunction}/>                    {/*edited...*/}
            </Grid> 
            <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField 
                        size="small"
                        name="search"
                        variant="outlined"
                        label = "Search Memories"
                        onKeyDown={handleKeyPress}
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <ChipInput 
                        style={{margin:'10px 0'}}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label="Search Tags"
                        variant='outlined' 
                    />
                    <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search</Button>
                </AppBar>
                <Form   currentId={currentId} setCurrentId={setCurrentId} />
                {(!searchQuery && !tags.length) && (
                    <Paper className={classes.pagination} elevation={6}>
                        <Pagination page={page} />
                    </Paper>
                )}
            </Grid>
            <Button className={classes.goTop} variant="contained" color="secondary" size = "small" onClick={topFunction}>Top</Button>
        </Grid>
    </Container>
    </Grow>
   )
 }
 
 export default Home