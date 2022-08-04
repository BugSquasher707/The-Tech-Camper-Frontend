import React, { Fragment, useEffect, useState } from "react";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

const UpdateBootcamp = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);

  const [uploadImage, setUploadImage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    averageCost: "",
    description: "",
    careers: [],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
    photo: "",
  });

  useEffect(async () => {
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");
    
    let bootcampId = localStorage.getItem("bootcampId");
    await fetch(`/bootcamps/${bootcampId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          photo: data?.data?.photo,
          name: data?.data?.name,
          address: data?.data?.location.formattedAddress,
          phone: data?.data?.phone,
          email: data?.data?.email,
          website: data?.data?.website,
          description: data?.data?.description,
          careers: data?.data?.careers,
          housing: data?.data?.housing,
          jobAssistance: data?.data?.jobAssistance,
          jobGuarantee: data?.data?.jobGuarantee,
          acceptGi: data?.data?.acceptGi,
        });

        setTimeout(() => {
          setLoading(false);
        }, 1200);

        $(".custom-select").val(data?.data?.careers);
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

  const handleUpdate = () => {
    let bootcampId = localStorage.getItem("bootcampId");

    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.email
      )
    ) {
      if (
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
          formData.website
        )
      ) {
        if (formData.name.length <= 50) {
          if (formData.description.length <= 500) {
            const data = new FormData();
            data.append("file", uploadImage);
            data.append("upload_preset", "the-techCamper");
            data.append("cloud_name", "dq2s0p5ue");

            fetch("https://api.cloudinary.com/v1_1/dq2s0p5ue/image/upload", {
              method: "post",
              body: data,
            })
              .then((res) => res.json())
              .then((data) => {
                setLoading(true);
                setUploadImage("");

                fetch(`/bootcamps/${bootcampId}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                  body: uploadImage
                    ? `${JSON.stringify({ ...formData, photo: data.url })}`
                    : `${JSON.stringify(formData)}`,
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.success === true) {
                      toast.success("Bootcamp Updated successfully", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                      localStorage.removeItem("bootcampId");
                      localStorage.removeItem("courseId");
                      localStorage.removeItem("reviewId");

                      setTimeout(() => {
                        history.push("/manageBootcamp");
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
              })
              .catch((err) => {
                setLoading(false);
                toast.error(err , {
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
            toast.error("Description can not be more than 500 characters", {
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
          toast.error("Name cannot be more than 50 characters", {
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
        toast.error("Please use a valid URL with HTTP or HTTPS", {
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
      toast.error("Invalid Email Address", {
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
    <Fragment>
      {!loading ? (
        <section className="container mt-5 py-5">
          <h1 className="mb-4">Update Bootcamp</h1>

          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="card bg-white py-2 px-4">
                  <div className="card-body">
                    <h3>Location & Contact</h3>

                    <form className="my-3">
                      <label
                        className="form-check-label my-2"
                        htmlFor="jobGuarantee"
                      >
                        Bootcamp Image
                      </label>

                      <div className="form-group">
                        <div
                          id="imageUploadContainer"
                          style={{
                            width: "220px",
                            height: "200px",
                            marginBottom: "15px",
                            borderRadius: "5px",
                          }}
                        >
                          <img
                            src={
                              uploadImage
                                ? URL.createObjectURL(uploadImage)
                                : formData.photo
                            }
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        </div>

                        <div className="custom-file">
                          <input
                            type="file"
                            name="photo"
                            className="custom-file-input"
                            id="photo"
                            onChange={(e) => {
                              setUploadImage(e.target.files[0]);
                              setFormData({
                                ...formData,
                                photo: e.target.files[0],
                              });
                            }}
                          />
                          <label className="custom-file-label" htmlFor="photo">
                            Choose image
                          </label>
                        </div>
                      </div>

                      {/* {uploadImage && (
                      <input
                        type="button"
                        className="btn btn-light btn-block"
                        value="Upload Image"
                        // onClick={ handleUploadImage }
                      />
                    )} */}
                    </form>

                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Bootcamp Name"
                        required
                        value={formData.name}
                        onChange={handleFormData}
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Full Address"
                        required
                        value={formData.address}
                        onChange={handleFormData}
                      />
                      <small className="form-text text-muted">
                        Street, city, state, etc
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleFormData}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-white py-2 px-4">
                  <div className="card-body">
                    <h3>Other Info</h3>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Contact Email"
                        value={formData.email}
                        onChange={handleFormData}
                      />
                    </div>
                    <div className="form-group">
                      <label>Website</label>
                      <input
                        type="text"
                        name="website"
                        className="form-control"
                        placeholder="Website URL"
                        value={formData.website}
                        onChange={handleFormData}
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        rows="5"
                        className="form-control"
                        placeholder="Description (What you offer, etc)"
                        maxLength="500"
                        value={formData.description}
                        onChange={handleFormData}
                      ></textarea>
                      <small className="form-text text-muted">
                        No more than 500 characters
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Careers</label>
                      <select
                        defaultValue={[0]}
                        name="careers"
                        className="custom-select"
                        onChange={handleFormData}
                      >
                        <option disabled>Select all that apply</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Development">
                          Mobile Development
                        </option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Business">Business</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="housing"
                        id="housing"
                        checked={formData.housing}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, housing: true });
                          } else {
                            setFormData({ ...formData, housing: false });
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="housing">
                        Housing
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="jobAssistance"
                        id="jobAssistance"
                        checked={formData.jobAssistance}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, jobAssistance: true });
                          } else {
                            setFormData({ ...formData, jobAssistance: false });
                          }
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="jobAssistance"
                      >
                        Job Assistance
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="jobGuarantee"
                        id="jobGuarantee"
                        checked={formData.jobGuarantee}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, jobGuarantee: true });
                          } else {
                            setFormData({ ...formData, jobGuarantee: false });
                          }
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="jobGuarantee"
                      >
                        Job Guarantee
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="acceptGi"
                        id="acceptGi"
                        checked={formData.acceptGi}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, acceptGi: true });
                          } else {
                            setFormData({ ...formData, acceptGi: false });
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor="acceptGi">
                        Accepts GI Bill
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                type="button"
                onClick={handleUpdate}
                value="Update Bootcamp"
                className="btn btn-success btn-block my-4"
              />
            </div>
          </form>
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
    </Fragment>
  );
};

export default UpdateBootcamp;
