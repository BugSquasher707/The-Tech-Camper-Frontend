import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { UserContext } from "../App";
import "../assets/css/global.css";
import $ from "jquery";

const UpdateCourse = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  const [bootcamps, setBootcamps] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    weeks: "",
    tuition: "",
    minimumSkill: "",
    description: "",
    scholarshipAvailable: false,
  });

  useEffect(() => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");

    renderDataAtFirstTime();
  }, [state]);

  const renderDataAtFirstTime = () => {
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
          if(data.success === true) {
            setBootcamps(data.data);
  
            let courseId = localStorage.getItem("courseId");
  
            fetch(`/courses/${courseId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data1) => {
                if(data1.success === true) {
                  setLoading(false);
                  setFormData({
                    title: data1.data.title,
                    weeks: data1.data.weeks,
                    tuition: data1.data.tuition,
                    minimumSkill: data1.data.minimumSkill,
                    description: data1.data.description,
                    scholarshipAvailable: data1.data.scholarshipAvailable,
                  });
    
                  $("#minimumSkill").val(data1?.data?.minimumSkill);
                }
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
    }
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.title !== "") {
      if (formData.weeks !== "") {
        if (formData.tuition !== "") {
          if (formData.minimumSkill !== "") {
            if (formData.description !== "") {
              if (formData.description.length <= 500) {
                setLoading(true);

                let courseId = localStorage.getItem("courseId");

                fetch(`/courses/${courseId}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                  body: JSON.stringify(formData),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.success) {
                      toast.success("Course updated successfully", {
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

                        history.push("/manageCourse");
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
                  });
              } else {
                setLoading(false);
                toast.error("Description not more than 500 characters", {
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
              toast.error("Please add a description", {
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
            toast.error("Please add a minimum skill", {
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
          toast.error("Please add a tuition cost", {
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
        toast.error("Please add number of weeks", {
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
      toast.error("Please add a course title", {
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
                  <Link to={"/manageCourse"} style={{ textDecoration: "none" }}>
                    <a
                      href="#"
                      className="btn btn-link my-3 manageBootcampText"
                    >
                      <i className="fas fa-chevron-left"></i> Manage Courses
                    </a>
                  </Link>
                  <h1 className="mb-2">{bootcamps[0].name}</h1>
                  <h3 className="text-primary mb-4">Add Course</h3>
                  <form action="manage-bootcamp.html">
                    <div className="form-group">
                      <label>Course Title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleFormData}
                      />
                    </div>
                    <div className="form-group">
                      <label>Duration</label>
                      <input
                        type="number"
                        name="weeks"
                        placeholder="Duration"
                        className="form-control"
                        value={formData.weeks}
                        onChange={handleFormData}
                      />
                      <small className="form-text text-muted">
                        Enter number of weeks course lasts
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Course Tuition</label>
                      <input
                        type="number"
                        name="tuition"
                        placeholder="Tuition"
                        className="form-control"
                        value={formData.tuition}
                        onChange={handleFormData}
                      />
                      <small className="form-text text-muted">
                        PKR Currency
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Minimum Skill Required</label>
                      <select
                        id="minimumSkill"
                        name="minimumSkill"
                        className="form-control"
                        onChange={handleFormData}
                      >
                        <option disabled selected>
                          Choose the option
                        </option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea
                        name="description"
                        rows="5"
                        className="form-control"
                        placeholder="Course description summary"
                        maxLength="500"
                        value={formData.description}
                        onChange={handleFormData}
                      ></textarea>
                      <small className="form-text text-muted">
                        No more than 500 characters
                      </small>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="scholarshipAvailable"
                        id="scholarshipAvailable"
                        checked={formData.scholarshipAvailable}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              scholarshipAvailable: true,
                            });
                          } else {
                            setFormData({
                              ...formData,
                              scholarshipAvailable: false,
                            });
                          }
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="scholarshipAvailable"
                      >
                        Scholarship Available
                      </label>
                    </div>
                    <div className="form-group mt-4">
                      <input
                        type="button"
                        value="Update Course"
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

export default UpdateCourse;
