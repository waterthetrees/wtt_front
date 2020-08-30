import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import cx from "classnames";
import "./Header.scss";

const Header = (props) => {
  const component_name = "Header";
  const [collapsed, setCollapsed] = useState(false);
  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <Navbar className="text-right" dark color="dark">
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={collapsed} navbar>
        <Nav className="justify-content-beginning text-right">
          <NavItem>
            <NavLink
              tag={RRNavLink}
              onClick={toggleNavbar}
              activeClassName="active"
              to="/about"
            >
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RRNavLink}
              onClick={toggleNavbar}
              activeClassName="active"
              to="/treemap"
            >
              TreeMap
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RRNavLink}
              onClick={toggleNavbar}
              activeClassName="active"
              to="/mapper"
            >
              Mapper
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
