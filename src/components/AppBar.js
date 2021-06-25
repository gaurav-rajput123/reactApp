import React from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import auth from '../firebase/firebase'
import Modal from "@material-ui/core/Modal"
import { TextField } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#FFFFFF"
        }
    }
})


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "white"
  },
  authButton: {
      padding: "8px 16px",
      marginRight: 16
  },
  form:{
    width: 500,
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "24px 60px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000"
  },
  block:{
    marginBottom: 18
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

}));

export default function PrimarySearchAppBar({userAcc, updateUser}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUSer] = React.useState(userAcc);
  const isMenuOpen = Boolean(anchorEl);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const handleCloseLogin = ()=>{
    setOpenLogin(false)
  }
  const handleCloseSignup = ()=>{
    setOpenSignup(false)
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = (e)=>{
    e.preventDefault();
    console.log(email + "   " + password)
  }
  const handleSignUp = (e) =>{
    e.preventDefault();
    console.log(email + "    " + password)
    auth.createUserWithEmailAndPassword(email, password).then(user=>{
      console.log(user)
    }).catch(err=>{console.log(err)})
  }
  const openLoginModal = () => {
    setOpenLogin(true);
  }
  const openSignUpModal = () => {
    setOpenSignup(true);
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  
  const loginModal = (
    <Modal
      open={openLogin}
      onClose={handleCloseLogin}
    >
      <form className={classes.form}>
        <div className={classes.block}>
        <TextField variant='outlined' helperText="Your Email Please" required label="Email" fullWidth onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
        </div>
        <div className={classes.block}>
        <TextField variant='outlined' helperText="Your Password Please" required label="Password" fullWidth onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        </div>
        <div className={classes.block} style={{display: "flex", justifyContent: "center"}}>
          <Button variant="outlined" style={{padding: "12px 48px"}} onClick={handleLogin}>Log In</Button>
        </div>
      </form>
    </Modal>
  )

const signUpModal = (
  <Modal
    open={openSignup}
    onClose={handleCloseSignup}
  >
    <form className={classes.form}>
      <div className={classes.block} style={{display: "flex", justifyContent: "space-between"}}>
        <TextField variant="outlined" helperText="Enter Your First Name" required label="First Name" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}/>
        <TextField variant="outlined" helperText="Enter Your Last Name" required label="Last Name" onChange={(e)=>{setLastName(e.target.value)}} value={lastName}/>
      </div>
      
      <div className={classes.block}>
        <TextField variant='outlined' helperText="Enter Your Email Please" required label="Email" fullWidth onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
      </div>
      <div className={classes.block}>
        <TextField variant='outlined' helperText="Enter Your Password Please" required label="Password" type="password" fullWidth onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
      </div>
      <div className={classes.block} style={{display: "flex", justifyContent: "center"}}>
        <Button variant="outlined" style={{padding: "12px 48px"}} onClick={handleSignUp}>Sign Up</Button>
      </div>
    </form>
  </Modal>
  )


  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
           {
                !user ?
                    (
                            <span>
                            <Button variant='outlined' className={classes.authButton} onClick={openSignUpModal} color="primary">Sign Up</Button>
                            <Button variant='outlined' className={classes.authButton} onClick={openLoginModal} color="primary">Log in</Button>
                            </span> 
                    )
                :
                (
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                )
           }
         </div>         
        </Toolbar>
      </AppBar>
      {renderMenu}
      {loginModal}
      {signUpModal}
    </div>
  
  );
}
