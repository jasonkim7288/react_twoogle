import React, { useEffect, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, createMuiTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes, Toolbar, Typography } from '@material-ui/core'
import TwootMain from './components/TwootMain'
import Header from './components/Header';
import { blue, pink, deepOrange} from '@material-ui/core/colors'
import firebase from 'firebase';
import './styles/App.css';
import { IsLoggedInContext } from './contexts/IsLoggedInContext';
import LogIn from './components/LogIn';


const drawerWidth = 200;

const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: blue[200]
      },
      secondary: {
        main: pink[200]
      },
      background: {
        default: '#111a22',
        paper: '#111a22'
      },
      error: deepOrange
    }
  })
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

firebase.initializeApp({
  apiKey: 'AIzaSyA8IjIXj8oKzpeNPzNb87mSB2GrfYIQ22c',
  authDomain: 'fir-auth-c91a1.firebaseapp.com'
})

const App = () => {
  const classes = useStyles();
  console.log('darkTheme:', darkTheme);
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsLoggedIn(!!user)
    })
  }, [])

  return (
    <div>
    { isLoggedIn ? (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <NavBar />
          <TwootMain />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
    )
    :
      <LogIn firebase={firebase} />
    }
    </div>
  )
}

export default App;
