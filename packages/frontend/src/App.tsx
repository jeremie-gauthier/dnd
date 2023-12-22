import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import PrivateContent from './auth/PrivateContent';
import Profile from './profile/Profile';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Profile />
          <PrivateContent />
          <LogoutButton />
        </>
      ) : (
        <>
          <LoginButton />
          <div>Not authenticated</div>
        </>
      )}
      {/* <Canvas
        height={1000}
        width={1000}
        onClick={(evt) => {
          console.log(evt);
        }}
      /> */}
    </div>
  );
}

export default App;
