import Product from "./Product";
import { useTranslation } from "react-i18next";

const BasicProductGrid = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-center mb-2">{t("home.basicProducts")}</h2>
      {/* we add the premium prop false in order to have the basic products */}
      <Product premium={false} />
    </div>
  );
};

export default BasicProductGrid;
