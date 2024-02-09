import axios from 'axios';

export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({ type: 'FETCH_POSTS', payload: res.data });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};
