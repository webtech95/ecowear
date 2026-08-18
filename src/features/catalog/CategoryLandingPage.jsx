import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SubCategoryPage from "../../pages/catalog/SubCategoryPage";

const CategoryLandingPage = ({
  pageTitle,
  pageDescription,
  category,
  subCategory,
  title,
}) => (
  <>
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <SubCategoryPage
        category={category}
        subCategory={subCategory}
        title={title}
      />
    </motion.div>
  </>
);

export default CategoryLandingPage;
