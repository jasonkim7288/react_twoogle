import React, { useEffect, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core'
import TwootMain from './components/TwootMain'
import Header from './components/Header';
import { blue, pink, deepOrange} from '@material-ui/core/colors'
import './styles/App.css';
import { IsLoggedInContext } from './contexts/IsLoggedInContext';
import LogIn from './components/LogIn';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { firebase, fireDb } from './db/firebase.js';
import { emailToId } from './utils/strUtils';
import { UsersContext } from './contexts/UsersContext';

console.log('firebase, fireDb:', firebase, fireDb);

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

const App = () => {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);
  const [, setCurrentUser] = useContext(CurrentUserContext);
  const [, setUsers] = useContext(UsersContext);

  useEffect(() => {
    fireDb.ref('users')
      .once('value')
      .then(snapshot => {
        console.log('here', snapshot.val());
        setUsers(snapshot.val());
      });

    firebase.auth().onAuthStateChanged(user => {
      console.log('user:', user);
      if (user) {
        const newUser = {
          id: user.uid,
          displayName: user.displayName,
          userName: emailToId(user.email),
          photo: user.photoURL
        }
        fireDb.ref('users/' + user.uid).set(newUser);
        setIsLoggedIn(true);
        setCurrentUser(newUser);

      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
    { isLoggedIn === null ?
      <div /> : (
        isLoggedIn ?
          <MuiThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
              <div className={classes.root}>
                <CssBaseline />
                <Header />
                <NavBar firebase={firebase}/>
                <TwootMain firebase={firebase} fireDb={fireDb}/>
              </div>
            </BrowserRouter>
          </MuiThemeProvider>
        :
          <LogIn firebase={firebase} />
      )
    }
    </div>
  )
}

export default App;
