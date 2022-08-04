import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { UserContext } from "../App";

const ManageReviews = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const [review, setReview] = useState([]);

  useEffect(() => {
    renderDataAtFirstTime();
  }, [state]);

  const renderDataAtFirstTime = () => {
    setLoading(true);
    if (state) {
      fetch("reviews", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            let reviews = data.data.filter((item, i) => {
              return item.user === state._id;
            });

            localStorage.removeItem("bootcampId");
            localStorage.removeItem("courseId");
            localStorage.removeItem("reviewId");
            localStorage.removeItem("resetURL");

            setReview(reviews);

            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }
        });
    }
  };

  const handleDeleteReview = (reviewId, bootcampId) => {
    setLoading(true);

    fetch(`reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ bootcampId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          toast.success("Review deleted successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          renderDataAtFirstTime();
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
  };

  return (
    <>
      {!loading ? (
        <section className="container mt-5 py-5">
          <div className="row">
            <div className="col-md-10 m-auto">
              <div className="card bg-white py-2 px-2 px-sm-4">
                <div className="card-body">
                  <h1 className="mb-4">Manage Reviews</h1>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Bootcamp</th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Rating
                        </th>
                        <th scope="col" style={{ textAlign: "center" }}>
                          Operations
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {review.length > 0 ? (
                        review.map((item, i) => {
                          return (
                            <tr>
                              <td>{item.bootcamp.name}</td>
                              <td style={{ textAlign: "center" }}>
                                {item.rating}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <Link
                                  to={"/updateReview"}
                                  style={{ textDecoration: "none" }}
                                >
                                  <a
                                    href="#"
                                    className="btn btn-secondary mr-0 mr-sm-2"
                                    onClick={() =>
                                      localStorage.setItem("reviewId", item._id)
                                    }
                                  >
                                    <i className="fas fa-pencil-alt"></i>
                                  </a>
                                </Link>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    handleDeleteReview(
                                      item._id,
                                      item.bootcamp._id
                                    );
                                  }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr style={{ width: "100%" }}>
                          <td
                            style={{
                              paddingLeft: "2rem",
                              boxSizing: "border-box",
                            }}
                          >
                            No Reviews Available
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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

export default ManageReviews;
