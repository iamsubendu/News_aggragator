import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useDispatch } from "react-redux";
import { nytSpecificNews, searchNews } from "../redux/actions/newsActions";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(searchNews(searchText));
  };

  const customFeed = useCallback(
    (category) => {
      setActiveLink(category);
      if (category !== "personalized") {
        dispatch(nytSpecificNews(category));
        navigate("/");
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (location.pathname.slice(1) === "personalized") {
      setActiveLink("personalized");
    } else {
      customFeed(activeLink);
    }
  }, [location.pathname, activeLink, customFeed]);

  return (
    <nav>
      <div className="first">
        <div className="header">
          <NavLink to="/" onClick={() => customFeed("home")}>
            News Aggregator
          </NavLink>
        </div>
        <form className="search" onSubmit={searchHandler}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search for topic, location & sources"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={searchHandler}>Search</button>
        </form>
      </div>
      <div className="second">
        <div className="categories">
          <ul>
            <li>
              <NavLink
                to="/"
                className={activeLink === "home" ? "activeLink" : ""}
                onClick={() => customFeed("home")}
              >
                #Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/personalized"
                onClick={() => setActiveLink("personalized")}
                className={activeLink === "personalized" ? "activeLink" : ""}
              >
                #Personalized
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink
                to="/"
                className={activeLink === "world" ? "activeLink" : ""}
                onClick={() => customFeed("world")}
              >
                #World
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={activeLink === "us" ? "activeLink" : ""}
                onClick={() => customFeed("us")}
              >
                #US
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={activeLink === "science" ? "activeLink" : ""}
                onClick={() => customFeed("science")}
              >
                #Science
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={activeLink === "arts" ? "activeLink" : ""}
                onClick={() => customFeed("arts")}
              >
                #Arts
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                className={activeLink === "technology" ? "activeLink" : ""}
                onClick={() => customFeed("technology")}
              >
                #Technology
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={activeLink === "entertainment" ? "activeLink" : ""}
                onClick={() => {
                  dispatch(searchNews("entertainment"));
                  setActiveLink("entertainment");
                }}
              >
                #Entertainment
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={activeLink === "sports" ? "activeLink" : ""}
                onClick={() => customFeed("sports")}
              >
                #Sports
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={activeLink === "health" ? "activeLink" : ""}
                onClick={() => customFeed("health")}
              >
                #Health
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
