import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import cx from 'classnames';
import { Row, Col, Button, Label } from "reactstrap";
import Page from "../../components/Page";
import TreeMap2 from "../treemap/TreeMap2";
import "./About.scss";

const About = (component, props) => {
  const component_name = "100K Trees";
  console.log("props:", props, component, component_name, "\n\n\n\n\n");
  // const email = useSelector(state => state.auth.email);
  // const {email, isAuthenticated, error, message} = useSelector(state => state.auth);
  // let {home} = useSelector(state => state);
  const { lon, lat } = { lon: -122.292739, lat: 37.770659 };
  const zoom = 17;
  console.log(component_name, "DONATE");
  return (
    <Page title={component_name} className={component_name}>
      <Row className="d-flex justify-content-sm-center">
        <Col sm="12" md="6">
          <h3> WHAT WE WILL DO</h3>
          <p>
            100K Trees is working to plant urban trees and forests, restore our
            natural habitat for birds, insects and fauna, and assure the
            increase of carbon sequestration capacity.
          </p>
        </Col>
        <Col sm="12">
          <div
            className="gfm-embed"
            data-url="https://www.gofundme.com/f/100k-trees-for-humanity/widget/large"
          ></div>
        </Col>
        <Col sm="12">
          <p>See our project PDF Flyer here .</p>
          <p>See our slide presentation here . </p>

          <TreeMap2 />
        </Col>
      </Row>
    </Page>
  );
};

export default About;
