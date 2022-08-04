import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import "../assets/css/global.css";
import { UserContext } from "../App";

const UpdatePassword = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [isResetURL, setIsResetURL] = useState(false);

  useEffect(() => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");

    let resetURL = JSON.parse(localStorage.getItem("resetURL"));

    if (resetURL) {
      setIsResetURL(true);
    } else {
      setIsResetURL(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    cPassword: "",
  });

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = () => {
    if (formData.newPassword >= 6) {
      if (formData.newPassword === formData.cPassword) {
        setLoading(true);

        let resetURL = JSON.parse(localStorage.getItem("resetURL"));

        if (resetURL) {
          fetch(resetURL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success === true) {
                toast.success("Password successfully changed", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });

                setTimeout(() => {
                  localStorage.removeItem("resetURL");
                  history.push("/login");
                }, 2000);
              } else {
                setLoading(false);
                toast.error("Something Wrong", {
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
            .catch((err) => {
              setLoading(false);
              toast.error(err, {
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
          if (formData.currentPassword !== "") {
            if (formData.currentPassword !== formData.newPassword) {
              fetch(`/auth/updatepassword`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(formData),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success === true) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({ type: "USER", payload: data.user });

                    toast.success("Password changed successfully", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });

                    setTimeout(() => {
                      history.push("/manageAccount");
                    }, 1500);
                  } else {
                    setTimeout(() => {
                      toast.error(data.error, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      setLoading(false);
                    }, 1500);
                  }
                });
            } else {
              setLoading(false);
              toast.error("The current and new password do not same", {
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
            toast.error("Please enter current password", {
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
  };

  return (
    <>
      {!loading ? (
        <section
          className="container w-100 d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "100vh" }}
        >
          <div className="row w-100">
            <div className="col-md-8 m-auto">
              <div className="card bg-white py-2 px-4">
                <div className="card-body">

                {!isResetURL && <Link
                  to={`/manageAccount`}
                  style={{ textDecoration: "none" }}
                >
                  <a
                    href="#"
                    target="_blank"
                    className="btn btn-secondary my-3"
                  >
                    <i className="fas fa-chevron-left"></i> Account Info
                  </a>
                </Link>}

                  <h1 className="mb-2">Update Password</h1>
                  <form>
                    {!isResetURL && (
                      <div className="form-group">
                        <label>Current Password</label>
                        <input
                          type="password"
                          name="currentPassword"
                          className="form-control"
                          placeholder="Current Password"
                          value={formData.currentPassword}
                          onChange={handleFormData}
                        />
                      </div>
                    )}
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleFormData}
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        name="cPassword"
                        className="form-control"
                        placeholder="Confirm New Password"
                        value={formData.cPassword}
                        onChange={handleFormData}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="button"
                        value="Update Password"
                        className="btn btn-dark btn-block"
                        onClick={handleChangePassword}
                      />
                    </div>
                  </form>
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
    </>
  );
};

export default UpdatePassword;
