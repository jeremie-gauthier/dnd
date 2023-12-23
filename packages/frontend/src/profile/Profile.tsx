import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async (userSub: string) => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${userSub}`;

        const [metadataResponse, res] = await Promise.all([
          fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch('http://localhost:3000/auth/private/connection', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);
        console.log(res);

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

  return user ? (
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
  );
};

export default Profile;
