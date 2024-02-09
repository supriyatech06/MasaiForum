import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
