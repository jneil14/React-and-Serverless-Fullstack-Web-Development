import React from "react";
import { Link } from "react-router-dom";
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink
} from "../styled/Navbar";
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
            <button onClick={loginWithRedirect}>Login</button>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
        <button onClick={toggleTheme}>
          {localStorageTheme === "light" ? "DARK" : "LIGHT"}
        </button>
      </StyledNavItems>
    </StyledNavbar>
  );
}
