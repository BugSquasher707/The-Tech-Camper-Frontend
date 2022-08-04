import React, { useEffect, useState, useContext } from "react";
import CourseCard from "../components/CourseCard/CourseCard";
import { Link, useParams } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import "../assets/css/marker.css";
import { TailSpin } from "react-loader-spinner";
import { UserContext } from "../App";

const SingleBootcamp = () => {
  const { id } = useParams();

  const { state, dispatch } = useContext(UserContext);

  const [bootcampData, setBootcampData] = useState("");
  const [course, setCourse] = useState([]);

  useEffect(() => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");

    fetch(`/bootcamps/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          fetch(`/bootcamps/${id}/courses`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data1) => {
              if (data1.success === true) {
                setTimeout(() => {
                  setBootcampData(data.data);
                  setCourse(data1.data);
                }, 2000);
              }
            });
        }
      });
  }, []);

  return (
    <>
      {bootcampData ? (
        <section className="bootcamp my-5">
          <div className="container">
            <div className="row pt-5">
              {/* <!-- Main col --> */}
              <div className="col-md-8">
                <h1>{bootcampData && bootcampData.name}</h1>
                {/* <!-- Description --> */}
                <p>{bootcampData && bootcampData.description}</p>
                {/* <!-- Avg cost --> */}
                <p className="lead mb-4">
                  Average Course Cost:{" "}
                  <span className="text-primary" style={{ fontWeight: "500" }}>
                    Rs.{bootcampData && bootcampData.averageCost} PKR
                  </span>
                </p>
                {/* <!-- Courses --> */}

                {course.length > 0 ? (
                  <h1
                    style={{
                      width: "fit-content",
                      fontSize: "1.3rem",
                      fontWeight: "500",
                      marginTop: "1rem",
                      marginBottom: "1.2rem",
                    }}
                  >
                    Available Courses:
                  </h1>
                ) : (
                  ""
                )}

                {course.length > 0 ? (
                  course.map((item, i) => {
                    return (
                      <>
                        <CourseCard
                          key={i}
                          title={item.title}
                          weeks={item.weeks}
                          description={item.description}
                          tuition={item.tuition}
                          minimumSkill={item.minimumSkill}
                          scholarshipAvailable={item.scholarshipAvailable}
                        />
                      </>
                    );
                  })
                ) : (
                  <h1
                    style={{
                      width: "fit-content",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      margin: "auto",
                      marginTop: "2rem",
                    }}
                  >
                    No Courses Available
                  </h1>
                )}
              </div>
              {/* <!-- Sidebar --> */}
              <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
                {/* <!-- Image --> */}
                <img
                  src={bootcampData && bootcampData.photo}
                  className=""
                  alt=""
                />
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
                    {bootcampData.averageRating
                      ? bootcampData.averageRating
                      : "-"}
                  </span>{" "}
                  Rating
                </h1>
                {/* <!-- Buttons --> */}

                <Link
                  to={"/reviews"}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <a
                    href="#"
                    className="btn btn-dark btn-block my-1"
                    onClick={() => localStorage.setItem("bootcampId", id)}
                  >
                    <i className="fas fa-comments mr-2"></i> Read Reviews
                  </a>
                </Link>
                {state && state.role !== "publisher" && (
                  <Link
                    to={"/createReview"}
                    style={{ textDecoration: "none", width: "100%" }}
                  >
                    <a
                      href="#"
                      className="btn btn-light btn-block py-2 my-1 bg-primary text-white"
                      style={{ width: "100%" }}
                      onClick={() => localStorage.setItem("bootcampId", id)}
                    >
                      <i className="fas fa-pencil-alt mr-2"></i>
                      Write a Review
                    </a>
                  </Link>
                )}
                <a
                  href={bootcampData && bootcampData.website}
                  target="_blank"
                  className="btn btn-secondary btn-block my-1"
                >
                  <i className="fas fa-globe mr-2"></i>
                  Visit Website
                </a>
                {/* <!-- Map --> */}
                <div
                  id="map"
                  className="mt-2"
                  style={{ width: "100%", height: "300px" }}
                >
                  {bootcampData && (
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyDZhfeaIKTvo6MOnVykhzBS7G6DsdT3Pyg",
                      }}
                      defaultCenter={{
                        lat: bootcampData.location.coordinates[1],
                        lng: bootcampData.location.coordinates[0],
                      }}
                      defaultZoom={15}
                    >
                      <Marker
                        lat={bootcampData.location.coordinates[1]}
                        lng={bootcampData.location.coordinates[0]}
                        name="My Marker"
                        color="red"
                      />
                    </GoogleMapReact>
                  )}
                </div>
                {/* <!-- Perks --> */}
                <div className="w-100">
                  <ul className="list-group list-group-flush mt-4">
                    <li className="list-group-item">
                      {bootcampData &&
                        (bootcampData.housing === true ? (
                          <i className="fas fa-check text-success mr-2"></i>
                        ) : (
                          <i className="fas fa-times text-danger mr-2"></i>
                        ))}
                      Housing
                    </li>
                    <li className="list-group-item">
                      {bootcampData &&
                        (bootcampData.jobAssistance === true ? (
                          <i className="fas fa-check text-success mr-2"></i>
                        ) : (
                          <i className="fas fa-times text-danger mr-2"></i>
                        ))}
                      Job Assistance
                    </li>
                    <li className="list-group-item">
                      {bootcampData &&
                        (bootcampData.jobGuarantee === true ? (
                          <i className="fas fa-check text-success mr-2"></i>
                        ) : (
                          <i className="fas fa-times text-danger mr-2"></i>
                        ))}
                      Job Guarantee
                    </li>
                    <li className="list-group-item">
                      {bootcampData &&
                        (bootcampData.acceptGi === true ? (
                          <i className="fas fa-check text-success mr-2"></i>
                        ) : (
                          <i className="fas fa-times text-danger mr-2"></i>
                        ))}
                      Accepts GI Bill
                    </li>
                  </ul>
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
    </>
  );
};

const Marker = (props) => {
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: props.color, cursor: "pointer" }}
        title={props.name}
      />
      <div className="pulse" />
    </div>
  );
};

export default SingleBootcamp;
