import './App.css';
import ChatRoom from './Components/ChatRoom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './Components/Authentication/Login';
import Loader from './Components/Loader/Loader';


function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;
  return (
    <div className="App">
      {user ? <ChatRoom /> : <Login />}
    </div>
  );
}

export default App;
