const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: null,
    token: localStorage.getItem('token')
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token
        };
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  