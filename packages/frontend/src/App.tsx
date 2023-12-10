import './App.css';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import PrivateContent from './auth/PrivateContent';
import Profile from './profile/Profile';

function App() {
  return (
    <div>
      <LoginButton />
      <Profile />
      <PrivateContent />
      <LogoutButton />
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
