import React from "react";
import Page from "../../components/Page";
import "./About.scss";

const About = (component, props) => {
  const componentName = "About Water the Trees";
  
  return (
    <Page title={componentName} className={componentName}>
      <div className="d-flex justify-content-sm-center">
        <div>
          <p>
            Water the Trees is working to crowd source tree maintenance and tree planting, restore our
            natural habitat for birds, insects and fauna, and assure the
            increase of carbon sequestration capacity.
          </p>
        </div>
      </div>
    </Page>
  );
};

export default About;
