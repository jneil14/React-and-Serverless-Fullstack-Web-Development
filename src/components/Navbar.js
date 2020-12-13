import React from "react";
import { Link } from "react-router-dom";
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
  StyledButtonLink
} from "../styled/Navbar";
import { StyledButton } from "../styled/Buttons";
import { Accent } from "../styled/Random";
import { useAuth0 } from "../auth";
import useTheme from "../hooks/UseTheme";

export default function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const localStorageTheme = window.localStorage.getItem("theme");

  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          Learn.Build.<Accent>Type</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/HighScores">High Scores</StyledLink>
        </li>
        {!isAuthenticated && (
          <li>
            <StyledButtonLink onClick={loginWithRedirect}>
              Login
            </StyledButtonLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <StyledButtonLink onClick={logout}>Logout</StyledButtonLink>
          </li>
        )}
        <StyledButton onClick={toggleTheme}>
          {localStorageTheme === "light" ? "Dark" : "Light"} Theme
        </StyledButton>
        {/* <StyledButton onClick={toggleTheme}>Change Theme</StyledButton> */}
      </StyledNavItems>
    </StyledNavbar>
  );
}
