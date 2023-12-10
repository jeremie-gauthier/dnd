import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

const PrivateContent = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [privateContent, setPrivateContent] = useState('');

  const getPrivateContent = async () => {
    try {
      const accessToken = await getAccessTokenSilently();

      const privateContentUrl = `http://localhost:3000/auth/private`;
      const metadataResponse = await fetch(privateContentUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const privateContent = await metadataResponse.text();

      setPrivateContent(privateContent);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
    <div>
      <button onClick={() => getPrivateContent()}>Get Private Content</button>
      <p>Private content is: {privateContent}</p>
    </div>
  );
};

export default PrivateContent;
