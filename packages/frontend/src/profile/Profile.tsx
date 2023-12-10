import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

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

        if (!user?.sub) return;

        setUserMetadata(user_metadata);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };

    if (!user?.sub) return;

    getUserMetadata(user.sub);
  }, [getAccessTokenSilently, user?.sub]);

  // console.log('user', user);

  return isAuthenticated ? (
    user ? (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          'No user metadata defined'
        )}
      </div>
    ) : (
      <div>Authenticated but user is not defined</div>
    )
  ) : (
    <div>Not authenticated</div>
  );
};

export default Profile;
