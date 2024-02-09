
import { useSelector } from 'react-redux';
import Login from './Component/Login';
import Register from './Component/Register';
import Posts from './Component/Posts';

function App() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <div>
      <h1>Redux Axios Example</h1>
      {isAuthenticated ? (
        <Posts />
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </div>
  );
}

export default App;
