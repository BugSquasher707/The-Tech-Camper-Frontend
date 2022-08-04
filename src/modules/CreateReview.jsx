import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import "../assets/css/global.css";

const CreateReview = () => {
  const history = useHistory();

  const [bootcamp, setBootcamp] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    rating: 1,
  });

  useEffect(() => {
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");

    const bootcampId = localStorage.getItem("bootcampId");

    fetch(`bootcamps/${bootcampId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.success === true) {
          setBootcamp(data.data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
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
  }, []);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.title !== "") {
      if (formData.text !== "") {
        setLoading(true);

        fetch(`/bootcamps/${bootcamp?._id}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success("Review added successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setTimeout(() => {
                localStorage.removeItem("bootcampId");
                localStorage.removeItem("courseId");
                localStorage.removeItem("reviewId");

                history.push(`/reviews`);
              }, 2000);
            } else {
              setLoading(false);
              toast.error("You already gave review to this bootcamp", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          });
      } else {
        setLoading(false);
        toast.error("Please add some text", {
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
      toast.error("Please add a title for the review", {
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
        <section className="container mt-5 py-5">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="card bg-white py-2 px-4">
                <div className="card-body">
                  <Link
                    to={`/bootcamps/${bootcamp?._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <a
                      href="#"
                      className="btn btn-link manageBootcampText my-3"
                    >
                      <i className="fas fa-chevron-left"></i> Bootcamp Info
                    </a>
                  </Link>
                  <h1 className="mb-2">{bootcamp?.name}</h1>
                  <h3 className="text-primary mb-4">Write a Review</h3>
                  <p>
                    You must have attended and graduated this bootcamp to review
                  </p>
                  <form>
                    <div className="form-group">
                      <label htmlFor="rating">
                        Rating:{" "}
                        <span className="text-primary">{formData.rating}</span>
                      </label>
                      <input
                        type="range"
                        name="rating"
                        className="custom-range"
                        min="1"
                        max="10"
                        step="1"
                        id="rating"
                        value={formData.rating}
                        onChange={handleFormData}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Review title"
                        value={formData.title}
                        onChange={handleFormData}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="text"
                        rows="10"
                        className="form-control"
                        placeholder="Your review"
                        value={formData.text}
                        onChange={handleFormData}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <input
                        type="button"
                        value="Submit Review"
                        className="btn btn-dark btn-block"
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

export default CreateReview;
