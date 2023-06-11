import Product from "./Product";
import { useTranslation } from "react-i18next";

const BasicProductGrid = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-center mb-2">{t("home.basicProducts")}</h2>
      <Product premium={false} />
    </div>
  );
};

export default BasicProductGrid;
