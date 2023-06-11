import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const MetaData = ({ metaTitle, metaDescription }) => {
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>ICMarketing | {metaTitle}</title>
      <meta
        name="description"
        content={`IC Marketing | ${metaDescription || t("home.description")}`}
      />
    </Helmet>
  );
};
export default MetaData;
