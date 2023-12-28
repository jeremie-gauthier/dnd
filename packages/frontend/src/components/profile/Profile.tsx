import { AuthUser } from '../../contexts/auth.context';

type Props = {
  user: AuthUser;
  userMetadata: Record<string, string> | null;
};

const Profile = ({ user, userMetadata }: Props) => {
  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.id}</p>
      <h3>User Metadata</h3>
      {userMetadata ? (
        <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
      ) : (
        'No user metadata defined'
      )}
    </div>
  );
};

export default Profile;
