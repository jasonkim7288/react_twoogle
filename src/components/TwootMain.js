import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Twoots from './Twoots';
import Twoot from './Twoot';
import NewTwoot from './NewTwoot';
import Profile from './Profile';
import { useGlobalState } from '../config/globalState';

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
  const { fireDb } = useGlobalState();
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      { fireDb &&
      <Switch>
        <Route path="/twoots/new" component={NewTwoot} />
        <Route exact path="/twoots/:id/comments/new" render={props => <NewTwoot {...props} twootId={props.match.params.id} isComment={true}/>} />
        <Route exact path="/twoots/:id/edit" render={props => <NewTwoot {...props} twootId={props.match.params.id}/>} />
        <Route exact path="/twoots/:id" render={props => <Twoot {...props} twootId={props.match.params.id}/>} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/" component={Twoots} />
      </Switch>
      }
    </main>
  )
}

export default TwootMain
