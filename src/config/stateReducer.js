export const initialState = {
  currentUser: null,
  isLoggedIn: null,
  twoots: null,
  users: null
};

export const ACTIONS = {
  SET_IS_LOGGED_IN: 'setIsLoggedIn',
  SET_CURRENT_USER: 'setCurrentUser',
  SET_USERS: 'setUsers',
  SET_TWOOTS: 'setTwoots',
}

export const stateReducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.SET_IS_LOGGED_IN:
      console.log('ACTIONS.SET_IS_LOGGED_IN called');
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case ACTIONS.SET_TWOOTS:
      return {
        ...state,
        twoots: action.payload
      };
    default:
      return state;
  }
};