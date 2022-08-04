import React, { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const Register = () => {
  const history = useHistory();

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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.email)
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
        if (formData.password === formData.confirmPassword) {
          setLoading(true);

          fetch("/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                toast.success("You are successfully registered", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                setTimeout(() => {
                  history.push("/login");
                }, 2000)
              }
            })
            .catch((e) => {
              setLoading(false);
              toast.success(e, {
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
          toast.error("Password not matched", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
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
      {
        !loading
        ?
        <section className="form mt-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <div className="card bg-white p-4 mb-4">
                  <div className="card-body">
                    <h1>
                      <i className="fas fa-user-plus"></i> Register
                    </h1>
                    <p>
                      Register to list your bootcamp or rate, review and favorite
                      bootcamps
                    </p>
                    <form>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter full name"
                          required
                          value={formData.name}
                          onChange={handleFormData}
                        />
                      </div>
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
                      <div className="form-group">
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
                      <div className="form-group mb-4">
                        <label htmlFor="password2">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleFormData}
                        />
                      </div>

                      <div className="card card-body mb-3">
                        <h5>User Role</h5>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="user"
                            onChange={handleFormData}
                          />
                          <label className="form-check-label">
                            Regular User (Browse, Write reviews, etc)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="publisher"
                            onChange={handleFormData}
                          />
                          <label className="form-check-label">
                            Bootcamp Publisher
                          </label>
                        </div>
                      </div>
                      <p className="text-danger">
                        * You must be affiliated with the bootcamp in some way in
                        order to add it to TechCamper.
                      </p>
                      <div className="form-group">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-primary btn-block"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        :
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "100vh" }}
        >
          <TailSpin color="#E05433" height={100} width={100} />
        </div>
      }
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

export default Register;
