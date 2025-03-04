import { useTranslation } from "react-i18next";
import { useUser } from "../../context/UserContext";
import styles from "../styles/Profile.module.scss";
const Profile = () => {
  const { user, loading } = useUser();
  const {t}=useTranslation();
  
  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.global}>
      <div className={styles.profileContainer}>
        <h2>{t("PROFILE.TITLE")}</h2>
        {user ? (
          <>
            <table className={styles.profileTable}>
              <tbody>
                <tr>
                  <th>{t("PROFILE.USERNAME")}</th>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <th>{t("PROFILE.EMAIL")}</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>{t("PROFILE.ROLE")}</th>
                  <td>{user.role}</td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <p>{t("PROFILE.NOUSERDATAAVAILABLE")}</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
