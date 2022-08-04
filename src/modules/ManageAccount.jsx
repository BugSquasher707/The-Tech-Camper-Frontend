import React, { Fragment, useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { TailSpin } from "react-loader-spinner";

const ManageAccount = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");

    if (state) {
      setFormData({
        name: state.name,
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [state]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.name !== "") {
      setLoading(true);

      fetch(`/auth/updatedetails`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            localStorage.setItem("user", JSON.stringify(data.data));
            dispatch({ type: "USER", payload: data.data });
            setTimeout(() => {
              setLoading(false);
              toast.success("Name updated successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }, 1500);
          } else {
            setTimeout(() => {
              setLoading(false);
              toast.error("Something went wrong", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }, 1500);
          }
        });
    } else {
      setLoading(false);
      toast.error("Please enter a name", {
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
          className="w-100 container d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "100vh" }}
        >
          <div className="row w-100">
            <div className="col-md-8 m-auto">
              <div className="card bg-white py-2 px-4">
                <div className="card-body">
                  <h1 className="mb-2">Manage Account</h1>
                  <form>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleFormData}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={state?.email}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="button"
                            value="Save"
                            className="btn btn-success btn-block"
                            onClick={handleSubmit}
                          />
                        </div>
                        <div className="col-md-6">
                          <Link
                            to={"/updatePassword"}
                            style={{ textDecoration: "none" }}
                          >
                            <a href="#" className="btn btn-secondary btn-block">
                              Update Password
                            </a>
                          </Link>
                        </div>
                      </div>
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

export default ManageAccount;
