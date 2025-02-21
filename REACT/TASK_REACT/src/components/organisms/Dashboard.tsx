import { useUser } from "../../context/UserContext";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  return (
    <h1>
      {t("WELCOME.TITLE")} {user?.username}
    </h1>
  );
};

export default Dashboard;
