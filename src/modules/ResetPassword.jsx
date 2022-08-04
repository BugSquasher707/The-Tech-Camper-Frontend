import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import "../assets/css/global.css";

const ResetPassword = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
  });

  useEffect(() => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.email
      )
    ) {
      setLoading(true);

      fetch("/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            localStorage.setItem("resetURL", JSON.stringify(data.resetUrl));
            toast.success(
              "Reset confirmation email send to this email address",
              {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );

            history.push("/updatePassword");
          } else {
            setLoading(false);
            toast.error("Email could not be sent", {
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
      setLoading(false);
      toast.error("Please enter a valid email", {
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
        <section class="container mt-5 py-5">
          <div class="row">
            <div class="col-md-8 m-auto">
              <div class="card bg-white py-2 px-4">
                <div class="card-body">
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    <a href="#" className="manageBootcampText">
                      Back to login
                    </a>
                  </Link>
                  <h1 class="mb-2">Reset Password</h1>
                  <p>
                    {" "}
                    Use this form to reset your password using the registered
                    email address.
                  </p>
                  <form>
                    <div class="form-group">
                      <label>Enter Email</label>
                      <input
                        type="email"
                        name="email"
                        class="form-control"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleFormData}
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="button"
                        value="Reset Password"
                        class="btn btn-dark btn-block"
                        onClick={handleSubmit}
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

export default ResetPassword;
