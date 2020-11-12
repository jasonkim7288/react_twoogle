import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Twoots from './Twoots';
import { TwootsContext } from '../contexts/TwootsContext';
import Twoot from './Twoot';
import NewTwoot from './NewTwoot';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { UsersContext } from '../contexts/UsersContext';


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingLeft: '0'
  }
}));

const TwootMain = () => {
  const [twoots, setTwoots] = useContext(TwootsContext);
  const [users, setUsers] = useContext(UsersContext);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const classes = useStyles();

  const getTwootFromId = (id) => {
    return twoots.find(twoot => twoot.id == id);
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route path="/twoots/new" render={props => <NewTwoot {...props} />} />
        <Route path="/twoots/:id" render={props => <Twoot twoot={getTwootFromId(props.match.params.id)} showControls={true}/>} />
        <Route exact path="/" render={props => <Twoots />} />
      </Switch>
    </main>
  )
}

export default TwootMain
