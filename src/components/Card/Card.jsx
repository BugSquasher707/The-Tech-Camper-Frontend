import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, name, address, carrers, rating, photo }) => {
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={photo} className="card-img" style={{ height: '130px', objectFit: 'contain' }} alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Link to={"/bootcamp/id"}>
                <h5 className="card-title">
                  <Link to={`/bootcamps/${id}`}>
                    {name}
                    <span className="float-right badge badge-success mt-lg-0 mt-md-3">{rating}</span>
                  </Link>
                </h5>
              </Link>
              <span className="badge badge-dark mb-2">{address}</span>
              <p className="card-text">
                {
                  carrers.length > 0 && carrers.map((item, i) => {
                    return (
                      <>
                        {item}
                      </>
                    )
                  })
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
