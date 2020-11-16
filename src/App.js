import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core'
import TwootMain from './components/TwootMain'
import Header from './components/Header';
import { blue, pink, deepOrange} from '@material-ui/core/colors'
import './styles/App.css';
import LogIn from './components/LogIn';
import { emailToId } from './utils/strUtils';
import { useGlobalState } from './config/globalState';
import { ACTIONS } from './config/stateReducer';

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
  const { state, dispatch, firebase, fireDb } = useGlobalState();
  const { isLoggedIn } = state;

  const setLogin = (value) => {
    dispatch({
      type: ACTIONS.SET_IS_LOGGED_IN,
      payload: value
    })
  }

  const setCurrentUser = (value) => {
    dispatch({
      type: ACTIONS.SET_CURRENT_USER,
      payload: value
    })
  }

  useEffect(() => {
    console.log('fireDb:', fireDb);
    fireDb.ref('users')
      .once('value')
      .then(snapshot => {
        console.log('here', snapshot.val());
        dispatch({
          type: ACTIONS.SET_USERS,
          payload: snapshot.val()
        })
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
        setLogin(true);
        setCurrentUser(newUser);
      } else {
        setLogin(false);
        setCurrentUser(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('isLoggedIn:', isLoggedIn);

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
                <NavBar />
                <TwootMain />
              </div>
            </BrowserRouter>
          </MuiThemeProvider>
        :
          <LogIn />
      )
    }
    </div>
  )
}

export default App;
