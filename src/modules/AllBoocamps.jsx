import React, { Fragment, useEffect, useState } from "react";
import Card from "../components/Card/Card";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const AllBoocamps = () => {
  const history = useHistory();

  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");

    renderDataAtFirst();
  }, []);

  const renderDataAtFirst = () => {
    setLoading(true);

    setLocation({
      distance: "",
      zipcode: "",
    });

    setFilterData({
      averageRating: "",
      averageCost: "",
    });

    history.replace(`/bootcamps`);

    fetch("/bootcamps", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setBootcamps(data.data);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      });
  };

  const [location, setLocation] = useState({
    distance: "",
    zipcode: "",
  });

  const handlelocationData = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleFindingLocation = () => {
    if (location.distance !== "") {
      if (location.zipcode !== "") {
        setLoading(true);

        history.replace(
          `/bootcamps?zipcode=${location.zipcode}&distance=${location.distance}`
        );

        fetch(`/bootcamps/radius/${location.zipcode}/${location.distance}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success === true) {
              setFilterData({
                averageRating: "",
                averageCost: "",
              });
              if (data.data?.length > 0) {
                setBootcamps(data.data);
                setTimeout(() => {
                  toast.success("Bootcamps available in this region", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }, 1600);
              } else {
                setBootcamps([]);
                setTimeout(() => {
                  toast.error("No Bootcamps available in this region", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }, 1600);
              }
              setTimeout(() => {
                setLoading(false);
              }, 1500);
            }
          });
      } else {
        setLoading(false);
        toast.error("Zipcode must be entered", {
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
      toast.error("Distance must be entered", {
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

  const [filterData, setFilterData] = useState({
    averageRating: "",
    averageCost: "",
  });

  const handleFilterData = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const handleFilters = () => {
    setLoading(true);

    history.replace(
      `/bootcamps?averageRating=${filterData.averageRating}&averageCost=${filterData.averageCost}`
    );

    fetch(
      `/bootcamps?${
        filterData.averageRating && `averageRating=${filterData.averageRating}`
      }${filterData.averageCost && filterData.averageCost ? "&" : ""}${
        filterData.averageCost && `averageCost=${filterData.averageCost}`
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          if (data.data?.length > 0) {
            setBootcamps(data.data);
            setTimeout(() => {
              toast.success("Bootcamps available", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }, 1600);
          } else {
            setBootcamps([]);
            setTimeout(() => {
              toast.error("No Bootcamps available", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }, 1600);
          }
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      });
  };

  return (
    <>
      {!loading ? (
        <section className="browse my-5">
          <div className="container">
            <div className="row pt-5">
              {/* <!-- Sidebar --> */}
              <div className="col-md-4">
                <div className="card card-body mb-4">
                  <h4 className="mb-3">By Location</h4>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="distance"
                            placeholder="Miles From"
                            value={location.distance}
                            onChange={handlelocationData}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="zipcode"
                            placeholder="Enter Zipcode"
                            value={location.zipcode}
                            onChange={handlelocationData}
                          />
                        </div>
                      </div>
                    </div>
                    <input
                      type="button"
                      value="Find Bootcamps"
                      className="btn btn-primary btn-block"
                      onClick={handleFindingLocation}
                    />
                    <input
                      type="button"
                      value="Reset Filter"
                      className="btn btn-secondary btn-block"
                      onClick={() => {
                        renderDataAtFirst();
                        setTimeout(() => {
                          toast.success("Filters reset successfully", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }, 1600);
                      }}
                    />
                  </form>
                </div>

                <h4>Filter</h4>
                <form>
                  <div className="form-group">
                    <label> Rating</label>
                    <select
                      className="custom-select mb-2"
                      name="averageRating"
                      onChange={handleFilterData}
                      value={filterData.averageRating}
                      defaultValue=''
                    >
                      <option disabled selected value={""}>
                        Choose the option
                      </option>
                      <option value="9">9</option>
                      <option value="8">8</option>
                      <option value="7">7</option>
                      <option value="6">6</option>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label> Budget</label>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="averageCost"
                        placeholder="Enter Budget"
                        value={filterData.averageCost}
                        onChange={handleFilterData}
                      />
                    </div>
                  </div>
                  <input
                    type="button"
                    value="Find Bootcamps"
                    className="btn btn-primary btn-block"
                    onClick={handleFilters}
                  />
                  <input
                    type="button"
                    value="Reset Filter"
                    className="btn btn-secondary btn-block"
                    onClick={() => {
                      renderDataAtFirst();
                      setTimeout(() => {
                        toast.success("Filters reset successfully", {
                          position: "top-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }, 1600);
                    }}
                  />
                </form>
              </div>
              {/* <!-- Main col --> */}
              <div
                className="col-md-8"
                style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  height: "81.5vh",
                }}
              >
                {bootcamps.length > 0 ? (
                  bootcamps.map((item, i) => {
                    return (
                      <div className="my-3" key={i}>
                        <Card
                          id={item._id}
                          name={item.name}
                          address={`${item.location.city}, ${item.location.country}`}
                          carrers={item.careers}
                          rating={item.averageRating ? item.averageRating : "-"}
                          photo={item.photo}
                        />
                      </div>
                    );
                  })
                ) : (
                  <h4
                    className="text-center"
                    style={{
                      position: "relative",
                      top: "50%",
                      transform: "translate(0%, -50%)",
                    }}
                  >
                    No Bootcamp Available
                  </h4>
                )}
              </div>
              {/* <!-- Extra Space --> */}
              <div className="col-md-4"></div>
            </div>
          </div>
        </section>
      ) : (
        <div
          className="col-12 d-flex justify-content-center align-items-center"
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

export default AllBoocamps;
