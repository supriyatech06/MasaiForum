import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post('/api/login', { username, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token); // Store token in localStorage
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  } catch (error) {
    console.error('Error logging in:', error);
    dispatch({ type: 'LOGIN_FAILURE' });
  }
};

export const register = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post('/api/register', { username, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token); // Store token in localStorage
    dispatch({ type: 'REGISTER_SUCCESS', payload: { user, token } });
  } catch (error) {
    console.error('Error registering:', error);
    dispatch({ type: 'REGISTER_FAILURE' });
  }
};

export const logout = () => {
  localStorage.removeItem('token'); // Remove token from localStorage
  return { type: 'LOGOUT' };
};
