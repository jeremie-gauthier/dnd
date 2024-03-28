import type { User } from "@auth0/auth0-react";

type Props = {
  user: User;
};

const Profile = ({ user }: Props) => {
  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.id}</p>
      <h3>User Metadata</h3>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        "No user metadata defined"
      )}
    </div>
  );
};

export default Profile;
