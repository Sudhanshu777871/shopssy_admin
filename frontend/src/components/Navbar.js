import React from "react";
import logo from "./img/log.jpg";
import "./css/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { allActions } from "../state";

import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  // code for accessing mode value by redux
  const myMode = useSelector((state) => state.myMode);
  // code for set mode value by redux
  const dispatch = useDispatch();
  const { mode } = bindActionCreators(allActions, dispatch);
  // using usenavigate
  const navigate = useNavigate();
  // function for logut
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <img src={logo} alt="edusmartly" width="35" height="35" style={{ border: '2px solid white', borderRadius: '50%', objectFit: 'contain' }} />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ml-3">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>

            <form className="form-inline my-2 my-lg-0 ml-5">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </ul>

          {/* code for manage students,  and expenses */}

          <Link to="/console">
            {" "}
            <button type="button" className="btn btn-info">
              PlayStore Dashboard
            </button>
          </Link>
          <Link to={"/developer"}>
            {" "}
            <button type="button" className="btn btn-info ml-3">
              Contact Developer
            </button>
          </Link>
          {/* dark/light mode starts here */}
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch1"
              onClick={() => {
                mode(!myMode);
              }}
            />
            <label className="custom-control-label" htmlFor="customSwitch1">
              {myMode ? (
                <i className="fa-solid fa-sun modeStyle"></i>
              ) : (
                <i className="fa-solid fa-moon modeStyle"></i>
              )}
            </label>
          </div>
          {/* logout code starts here */}

          <div className="btn btn-danger" title="Logout" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket logoutBtn"></i>
          </div>
        </div>
      </nav>
    </>
  );
}
