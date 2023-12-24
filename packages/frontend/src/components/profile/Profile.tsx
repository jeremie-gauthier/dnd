import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { AuthUser } from '../../contexts/auth.context';

type Props = {
  user: AuthUser;
};

const Profile = ({ user }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  console.log('PAGE PROFIL');

  useEffect(() => {
    const getUserMetadata = async (userSub: string) => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${userSub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();
        // console.log('user_metadata', user_metadata);
        // console.log('discordProfile', discordProfile);

        setUserMetadata(user_metadata);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };

    getUserMetadata(user.id);
  }, [getAccessTokenSilently, user.id]);

  // console.log('user', user);

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
