import React, { useEffect } from "react";
import { Link } from "react-router-dom"

const LandingPage = () => {
  useEffect(() => {
    localStorage.removeItem("bootcampId");
    localStorage.removeItem("courseId");
    localStorage.removeItem("reviewId");
    localStorage.removeItem("resetURL");
  }, []);

  return (
    <>
      <section className="showcase">
        <div className="dark-overlay">
          <div className="showcase-inner container">
            <div className="w-75">
              <h1 className="display-4">Find a Code Bootcamp</h1>
              <p className="lead mb-3">
                Find, rate and read reviews on coding bootcamps
              </p>
              <Link 
              to="/bootcamps"
              style={{ textdecoration: 'none' }}
              >
                <input
                  type="button"
                  value="Find Bootcamps"
                  className="btn btn-primary btn-block"
                  style={{ width: "50%", margin: 'auto' }}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
