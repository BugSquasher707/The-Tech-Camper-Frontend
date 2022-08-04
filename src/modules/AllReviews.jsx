import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { UserContext } from "../App";

const AllReviews = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState([]);

  useEffect(() => {
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");
    
    renderDataAtFirstTime();
  }, []);

  const renderDataAtFirstTime = () => {
    setLoading(true);

    let bootcampId = localStorage.getItem("bootcampId");

    fetch(`bootcamps/${bootcampId}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.success === true){
          setReview(data.data);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      });
  };

  return (
    <>
      {!loading ? (
        <section className="bootcamp mt-5 py-5">
          <div className="container">
            <div className="row">
              {/* <!-- Main col --> */}
              <div className="col-md-8">
                <Link
                  to={`/bootcamps/${localStorage.getItem("bootcampId")}`}
                  style={{ textDecoration: "none" }}
                >
                  <a
                    href="#"
                    target="_blank"
                    className="btn btn-secondary my-3"
                  >
                    <i className="fas fa-chevron-left"></i> Bootcamp Info
                  </a>
                </Link>
                <h1 className="mb-4">{review[0]?.bootcamp?.name} Reviews</h1>
                {/* <!-- Reviews --> */}

                {review.length > 0
                  ? review.map((item, i) => {
                      return (
                        <>
                          <div className="card mb-3" key={i}>
                            <h5 className="card-header bg-dark text-white">
                              {item.title}
                            </h5>
                            <div className="card-body">
                              <h5 className="card-title">
                                Rating: <span className="text-success">{item.rating}</span>
                              </h5>
                              <p className="card-text">
                                {item.text}
                              </p>
                              <p className="text-muted">
                                Writtern By {item.user.name}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : 
                  <h1
                    style={{
                      width: "fit-content",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      margin: "auto",
                      marginTop: "2rem",
                    }}
                  >
                    No Reviews Available
                  </h1>
                  }
              </div>
              {/* <!-- Sidebar --> */}
              <div className="col-md-4 pt-4">
                {/* <!-- Rating --> */}
                <h1 className="text-center my-4 d-flex justufy-content-center align-items-center">
                  <span
                    className=" mr-2 badge badge-secondary badge-success rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                    }}
                  >
                    {review[0]?.bootcamp?.averageRating
                      ? review[0]?.bootcamp?.averageRating
                      : "-"}
                  </span>{" "}
                  Rating
                </h1>
                {/* <!-- Buttons --> */}
                {state && state.role !== "publisher" ? (
                  <Link to={`/createReview`} style={{ textDecoration: "none" }}>
                    <a href="#" className="btn btn-primary btn-block my-3">
                      <i className="fas fa-pencil-alt"></i> Review This Bootcamp
                    </a>
                  </Link>
                ) : (
                  ""
                )}
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

export default AllReviews;
