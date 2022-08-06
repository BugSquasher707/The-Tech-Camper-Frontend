import React, { Fragment, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  const handleLogout = () => {
    fetch("/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("You are successfully logged out", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.clear();
        dispatch({ type: "LOGOUT" });
        history.push("/");
      })
      .catch((e) => {
        toast.error("Something Wrong", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-laptop-code mr-2"></i> TechCamper
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {!state ? (
                <>
                  <Link className="nav-link" to="/login">
                    <li className="nav-item mr-2">
                      <i className="fas fa-sign-in-alt mr-1"></i> Login
                    </li>
                  </Link>
                  <Link className="nav-link" to="/register">
                    <li className="nav-item mr-2">
                      <i className="fas fa-user-plus mr-1"></i> Register
                    </li>
                  </Link>
                </>
              ) : (
                ""
              )}
              {state &&
              (state.role === "publisher" || state.role === "admin") ? (
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                  >
                    <i className="fas fa-user mr-1"></i> Account
                  </a>
                  <div className="dropdown-menu" data-target="#navbarDropdown">
                    <Link className="dropdown-item" to="/manageBootcamp">
                      Manage Bootcamp
                    </Link>
                    {state && state.role !== "publisher" && (
                      <Link className="dropdown-item" to="/manageReview">
                        Manage Reviews
                      </Link>
                    )}
                    <Link className="dropdown-item" to="/manageAccount">
                      Manage Account
                    </Link>
                    <div className="dropdown-divider"></div>
                    <li
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </li>
                  </div>
                </li>
              ) : (
                state &&
                state.role === "user" && (
                  <li className="nav-item dropdown ">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                    >
                      <i className="fas fa-user mr-1"></i> Account
                    </a>
                    <div
                      className="dropdown-menu"
                      data-target="#navbarDropdown"
                    >
                      {state && state.role !== "publisher" && (
                        <Link className="dropdown-item" to="/manageReview">
                          Manage Reviews
                        </Link>
                      )}
                      <Link className="dropdown-item" to="/manageAccount">
                        Manage Account
                      </Link>
                      <div className="dropdown-divider"></div>
                      <li
                        className="dropdown-item"
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i> Logout
                      </li>
                    </div>
                  </li>
                  // <Link className="nav-link" to="/register">
                  //   <li
                  //     className="nav-item mr-2"
                  //     onClick={handleLogout}
                  //     style={{ cursor: "pointer" }}
                  //   >
                  //     <i className="fas fa-sign-out-alt mr-1"></i> Logout
                  //   </li>
                  // </Link>
                )
              )}
              <li className="nav-item"></li>
              <li className="nav-item"></li>
              <li className="nav-item d-none d-sm-block">
                <a className="nav-link" href="#">
                  |
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bootcamps">
                  Browse Bootcamps
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default Navbar;
