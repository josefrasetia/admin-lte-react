import { useTranslation } from "react-i18next";

const NotFound = () => {
const [t] = useTranslation();
  return (
    <div className="col-sm-12 centerContent">
      <div className="roundedBox">
        <h1 className="h1">404</h1>
        <p className="p">{t('error.404')}</p>
      </div>
    </div>
  );
};

export default NotFound;
