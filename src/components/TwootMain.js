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

const TwootMain = ({ fireDb, history }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      { fireDb &&
      <Switch>
        <Route path="/twoots/new" render={props => <NewTwoot {...props} fireDb={fireDb}/>} />
        <Route exact path="/twoots/:id/edit" render={props => <NewTwoot {...props} fireDb={fireDb} twootId={props.match.params.id}/>} />
        <Route exact path="/twoots/:id" render={props => <Twoot {...props} twootId={props.match.params.id} fireDb={fireDb}/>} />
        <Route exact path="/" render={props => <Twoots {...props} fireDb={fireDb}/>} />
      </Switch>
      }
    </main>
  )
}

export default TwootMain
