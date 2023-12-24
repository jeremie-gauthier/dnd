import { AuthUser } from '../../contexts/auth.context';
import { fetchIdentityFn } from '../../hooks/api/identity';
import { useAuthenticatedSuspenseQuery } from '../../hooks/api/useAuthenticatedSuspenseQuery';

type Props = {
  user: AuthUser;
  userMetadata: Record<string, string> | null;
};

const Profile = ({ user, userMetadata }: Props) => {
  const { data } = useAuthenticatedSuspenseQuery(['identity'], fetchIdentityFn);

  console.log('PAGE PROFIL', data);

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
