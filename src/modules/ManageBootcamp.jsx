import React, { useEffect, useContext, useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "../components/Card/Card";
import { UserContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from  'react-loader-spinner' 

const ManageBootcamp = () => {

  const history = useHistory()

  const { state, dispatch } = useContext(UserContext);

  const [bootcamps, setBootcamps] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");

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
          if(data.success === true){
            setBootcamps(data.data)
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
  }, [state]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])

  const handleDelete = () => {
    setLoading(true)

    setTimeout(() => {
      if(bootcamps.length > 0){
        fetch(`/bootcamps/${bootcamps[0]._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if(data.success === true){
              toast.success("Bootcamp deleted successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                history.push('/bootcamps')
              }, 2000);
            }
          })
          .catch((e) => {
            setLoading(false);
            toast.error(e , {
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
      else{
        setLoading(false);
        toast.error("There is no bootcamp to delete", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }, 1500)
  }

  const handleBootcamp = () => {
    if(bootcamps?.length){
      localStorage.setItem('bootcampId', bootcamps[0]._id)
    }
  }

  return (
    <>
    {
      !loading 
      ?
      <section className="container mt-5 py-5">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card bg-white py-2 px-4">
              <div className="card-body">
                <h1 className="mb-4">Manage Bootcamp</h1>
                {/* Bootcamps Cards */}

                {/* <Card /> */}

                {bootcamps.length > 0 ? (
                  bootcamps.map((item, i) => {
                    return (
                      <Fragment key={i}>
                        <Card
                          id={item._id}
                          name={item.name}
                          address={`${item.location.city}, ${item.location.country}`}
                          carrers={item.careers}
                          rating={item.averageRating ? item.averageRating : "-"}
                          photo={item.photo}
                        />
                      </Fragment>
                    );
                  })
                ) : (
                  <div className="w-100 text-center my-5">
                    <h5>No Bootcamp Added</h5>
                  </div>
                )}

                {bootcamps.length > 0 ? (
                  <>
                    <Link
                      to={"/updateBootcamp"}
                      style={{ textDecoration: "none" }}
                    >
                      <a href="#" className="btn btn-primary btn-block my-2" onClick={ handleBootcamp }>
                        Edit Bootcamp Details
                      </a>
                    </Link>
                    <Link
                    to={"/manageCourse"}
                    style={{ textDecoration: "none" }}
                    >
                      <a
                        href="#"
                        className="btn btn-secondary btn-block"
                      >
                        Manage Courses
                      </a>
                    </Link>
                    <button type="button" onClick={handleDelete} className="btn btn-danger btn-block mt-2">
                      Remove Bootcamp
                    </button>
                  </>
                ) :
                    <>
                     {loading != true && <Link
                        to={"/createBootcamp"}
                        style={{ textDecoration: "none" }}
                      >
                        <a href="#" className="btn btn-primary btn-block">
                          Add Bootcamp
                        </a>
                      </Link>}
                    </>
                }
                <p className="text-muted mt-5">
                  * You can only add one bootcamp per account.
                </p>
                <p className="text-muted">
                  * You must be affiliated with the bootcamp in some way in
                  order to add it to TechCamper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      :
      <div className="d-flex justify-content-center align-items-center" style={{width: '100%', height: '100vh'}}>
        <TailSpin color="#E05433" height={100} width={100} />
      </div>
    }
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

export default ManageBootcamp;
