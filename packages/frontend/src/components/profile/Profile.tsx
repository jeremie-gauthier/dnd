import type { User } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

type Props = {
  user: User;
};

const Profile = ({ user }: Props) => {
  const { t } = useTranslation(["common", "profile"]);

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.id}</p>
      <h1 className="text-xl font-bold">{t("title", { ns: "profile" })}</h1>
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
