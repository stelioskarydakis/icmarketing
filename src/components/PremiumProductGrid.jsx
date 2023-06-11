import Product from "./Product";
import { useTranslation } from "react-i18next";

const PremiumProductGrid = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-center mb-2">{t("home.premiumProducts")}</h2>
      {/* we add the premium prop true in order to have the premium products */}
      <Product premium={true} />
    </div>
  );
};

export default PremiumProductGrid;
