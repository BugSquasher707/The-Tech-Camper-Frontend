import React, { createContext, useReducer, useEffect, useContext } from "react";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import AllBoocamps from "./modules/AllBoocamps";
import SingleBootcamp from "./modules/SingleBootcamp";
import CreateBootcamp from "./modules/CreateBootcamp";
import UpdateBootcamp from "./modules/UpdateBootcamp";
import "./assets/css/global.css";
import "./assets/css/bootstrap.css";
import LandingPage from "./modules/LandingPage";
import ManageBootcamp from "./modules/ManageBootcamp";
import Login from "./modules/Login";
import Register from "./modules/Register";
import { userReducer, initialState } from "./reducers/index";
import Navbar from "./components/NavBar/NavBar";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ManageCourse from "./modules/ManageCourse";
import CreateCourse from "./modules/CreateCourse";
import UpdateCourse from "./modules/UpdateCourse";
import ManageReviews from "./modules/ManageReviews";
import CreateReview from "./modules/CreateReview";
import UpdateReview from "./modules/UpdateReview";
import AllReviews from "./modules/AllReviews";
import ResetPassword from "./modules/ResetPassword";
import UpdatePassword from "./modules/UpdatePassword";
import ManageAccount from "./modules/ManageAccount";

export const UserContext = createContext();

const RoutingComponents = () => {
  const history = useHistory();

  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });

      const url = window.location.pathname.split("/");

      if (url[url.length - 1] === "login") {
        history.push("/");
      }
      if (url[url.length - 1] === "register") {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  }, []);

  return (
    <>
      <Route exact path={"/"}>
        <LandingPage />
      </Route>

      <Route exact path={"/login"}>
        <Login />
      </Route>

      <Route exact path={"/register"}>
        <Register />
      </Route>

      <Route exact path={"/resetPassword"}>
        <ResetPassword />
      </Route>

      <Route exact path={"/updatePassword"}>
        <UpdatePassword />
      </Route>

      <Route exact path={"/manageAccount"}>
        <ManageAccount />
      </Route>

      <Route exact path={"/bootcamps"}>
        <AllBoocamps />
      </Route>

      <Route exact path={"/bootcamps/:id"}>
        <SingleBootcamp />
      </Route>

      <Route exact path={"/createBootcamp"}>
        <CreateBootcamp />
      </Route>

      <Route exact path={"/updateBootcamp"}>
        <UpdateBootcamp />
      </Route>

      <Route exact path={"/manageBootcamp"}>
        <ManageBootcamp />
      </Route>

      <Route exact path={"/manageCourse"}>
        <ManageCourse />
      </Route>

      <Route exact path={"/createCourse"}>
        <CreateCourse />
      </Route>

      <Route exact path={"/updateCourse"}>
        <UpdateCourse />
      </Route>

      <Route exact path={"/manageReview"}>
        <ManageReviews />
      </Route>

      <Route exact path={"/reviews"}>
        <AllReviews />
      </Route>

      <Route exact path={"/createReview"}>
        <CreateReview />
      </Route>

      <Route exact path={"/updateReview"}>
        <UpdateReview />
      </Route>
    </>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <RoutingComponents />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
