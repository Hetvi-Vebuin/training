import styles from "../styles/GetDetails.module.scss";
import useGetDetails from "../../hooks/useGetDetails";
import { useTranslation } from "react-i18next";

const GetDetails = () => {  
  const { users, loading, error } = useGetDetails();
  const {t}=useTranslation();
  return (
    <div className={styles.getDetailsContainer}>
      <h2>{t("GETDETAILS.ALLUSERS")}</h2>
      {loading && <p>{t("GETDETAILS.LOADING")}</p>}
      {error && <p className={styles.error}>{error}</p>}
      {users && users.length > 0 ? (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>{t("GETDETAILS.USERNAME")}</th>
              <th>{t("GETDETAILS.EMAIL")}</th>
              <th>{t("GETDETAILS.ROLE")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noData}>{t("GETDETAILS.NOUSERDETAILSAVAILABEL")}</p>
      )}
    </div>
  );
};

export default GetDetails;
