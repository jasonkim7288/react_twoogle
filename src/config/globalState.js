import { createContext, useContext, useReducer } from 'react';
import { stateReducer, initialState } from './stateReducer';
import firebase from 'firebase';
var fireDb = null;

export const StateContext = createContext();

export const useGlobalState = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: "fir-auth-c91a1.firebaseapp.com",
      databaseURL: "https://fir-auth-c91a1.firebaseio.com",
      projectId: "fir-auth-c91a1",
      storageBucket: "fir-auth-c91a1.appspot.com",
      messagingSenderId: "92877570975",
      appId: "1:92877570975:web:3e270fbb2cb681cba033aa",
      measurementId: "G-JB0NZ4TZSW"
    });

    fireDb = firebase.database();
    console.log('firebase:', firebase);
    console.log('fireDb:', fireDb);
  }

  return (
    <StateContext.Provider value={{state, dispatch, firebase, fireDb}}>
      {children}
    </StateContext.Provider>
  )
}