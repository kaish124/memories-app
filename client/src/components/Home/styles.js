import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  goTop:{
    // display: 'none', /* Hidden by default */
    position: 'fixed', /* Fixed/sticky position */
    bottom: '20px', /* Place the button at the bottom of the page */
    right: '30px',/* Place the button 30px from the right */
    zIndex: '99', /* Make sure it does not overlap */
    border: 'none', /* Remove borders */
    outline: 'none', /* Remove outline */
    // background-color: 'red', /* Set a background color */
    // color: 'white', /* Text color */
    cursor: 'pointer', /* Add a mouse pointer on hover */
    padding: '15px', /* Some padding */
    // border-radius: '10px', /* Rounded corners */
    // font-size: '18px', /* Increase font size */
    //  width: '20px',
    //  height: '40px',
     borderRadius: '30%',
     

  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));