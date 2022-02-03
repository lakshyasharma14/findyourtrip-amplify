import * as React from "react";
import ProductCategories from "../components/modules/views/ProductCategories";
import ProductSmokingHero from "../components/modules/views/ProductSmokingHero";
import AppFooter from "../components/modules/views/AppFooter";
import ProductHero from "../components/modules/views/ProductHero";
import ProductValues from "../components/modules/views/ProductValues";
import ProductHowItWorks from "../components/modules/views/ProductHowItWorks";
import ProductCTA from "../components/modules/views/ProductCTA";
import AppAppBar from "../components/modules/views/AppAppBar";
import withRoot from "../components/modules/withRoot";

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
