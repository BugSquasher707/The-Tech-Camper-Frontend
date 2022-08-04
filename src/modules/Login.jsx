import React, { Fragment, useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.email
      )
    ) {
      setLoading(false);
      toast.error("Invalid Email Address", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (formData.password.length >= 6) {
        setLoading(true);

        fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success("You are successfully logged in", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data.user));
              dispatch({ type: "USER", payload: data.user });
              setTimeout(() => {
                history.push("/");
              }, 2000);
            } else {
              setLoading(false);
              toast.error("Invalid Credentials", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          })
          .catch((e) => {
            setLoading(false);
            toast.error(e, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      } else {
        setLoading(false);
        toast.error("Password must be greater than 6 characters", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <Fragment>
      {!loading ? (
        <section className="form mt-5 pt-5">
          <div className="container">
            <div className="row pt-5">
              <div className="col-md-6 m-auto">
                <div className="card bg-white p-4 mb-4">
                  <div className="card-body">
                    <h1>
                      <i className="fas fa-sign-in-alt"></i> Login
                    </h1>
                    <p>
                      Log in to list your bootcamp or rate, review and favorite
                      bootcamps
                    </p>
                    <form>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          required
                          value={formData.email}
                          onChange={handleFormData}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter password"
                          required
                          value={formData.password}
                          onChange={handleFormData}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary btn-block"
                          onClick={handleSubmit}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <p>
                      Forgot Password? 
                      { " " }
                      <Link
                      to={"/resetPassword"}
                      style={{ textDecoration: "none" }}
                      >
                        <a href="#">Reset Password</a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "100vh" }}
        >
          <TailSpin color="#E05433" height={100} width={100} />
        </div>
      )}
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

export default Login;
