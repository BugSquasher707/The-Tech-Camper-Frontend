import React, { useEffect, useState, useContext, Fragment } from "react";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "../assets/css/global.css";
import Card from "../components/Card/Card";

const ManageCourse = () => {
  const { state, dispatch } = useContext(UserContext);

  const [bootcamps, setBootcamps] = useState([]);
  const [course, setCourse] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    renderDataAtFirst();
  }, [state]);

  const renderDataAtFirst = () => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");

    setLoading(true);

    if (state) {
      const { _id } = state;
      fetch("bootcamps/userOwned", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: _id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setBootcamps(data.data);

          fetch(`/bootcamps/${data.data[0]._id}/courses`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data1) => {
              setLoading(false);
              setCourse(data1.data);
            });
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
    }
  };

  const handleDeleteCourse = (courseId) => {
    setLoading(true);
    if (course.length > 0) {
      fetch(`/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            toast.success("Course deleted successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              renderDataAtFirst();
            }, 1200);
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
      toast.error("There is no course to delete", {
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
                    to={"/manageBootcamp"}
                    style={{ textDecoration: "none" }}
                  >
                    <a
                      href="#"
                      className="btn btn-link my-3 manageBootcampText"
                    >
                      <i className="fas fa-chevron-left"></i> Manage Bootcamp
                    </a>
                  </Link>
                  <h1 className="mb-4">Manage Courses</h1>

                  {bootcamps.length > 0 &&
                    bootcamps.map((item, i) => {
                      return (
                        <>
                          <Card
                            key={i}
                            id={item._id}
                            name={item.name}
                            address={`${item.location.city}, ${item.location.country}`}
                            carrers={item.careers}
                            rating={
                              item.averageRating ? item.averageRating : "-"
                            }
                            photo={item.photo}
                          />
                        </>
                      );
                    })}

                  <Link to={"/createCourse"} style={{ textDecoration: "none" }}>
                    <a href="#" className="btn btn-primary btn-block mb-4">
                      Add Bootcamp Course
                    </a>
                  </Link>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          style={{
                            width: "50%",
                            paddingLeft: "2rem",
                            boxSizing: "border-box",
                          }}
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          style={{ width: "50%", textAlign: "center" }}
                        >
                          Operations
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ width: "100%" }}>
                      {course.length > 0 ? (
                        course.map((item, i) => {
                          return (
                            <>
                              <tr key={item._id} style={{ width: "100%" }}>
                                <td
                                  style={{
                                    width: "50%",
                                    paddingLeft: "2rem",
                                    boxSizing: "border-box",
                                  }}
                                >
                                  {item.title}
                                </td>
                                <td
                                  style={{ width: "50%", textAlign: "center" }}
                                >
                                  <Link
                                    to={"/updateCourse"}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <a
                                      href="#"
                                      className="btn btn-secondary mr-0 mr-sm-2"
                                      onClick={() =>
                                        localStorage.setItem(
                                          "courseId",
                                          item._id
                                        )
                                      }
                                    >
                                      <i className="fas fa-pencil-alt"></i>
                                    </a>
                                  </Link>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteCourse(item._id)}
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <tr style={{ width: "100%" }}>
                          <td
                            style={{
                              width: "50%",
                              paddingLeft: "2rem",
                              boxSizing: "border-box",
                            }}
                          >
                            No Courses Available
                          </td>
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

export default ManageCourse;
