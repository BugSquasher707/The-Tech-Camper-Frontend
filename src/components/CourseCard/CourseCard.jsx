import React from "react";

const CourseCard = ({
  title,
  weeks,
  description,
  tuition,
  minimumSkill,
  scholarshipAvailable,
}) => {
  return (
    <>
      <div className="card mb-3">
        <h5 className="card-header bg-primary text-white">{title}</h5>
        <div className="card-body">
          <h5 className="card-title">
            Duration: {weeks === "1" ? `${weeks} Week` : `${weeks} Weeks`}
          </h5>
          <p className="card-text">{description}</p>
          <ul className="list-group mb-3">
            <li className="list-group-item">Cost: Rs.{tuition} PKR</li>
            <li
              className="list-group-item"
              style={{ textTransform: "capitalize" }}
            >
              Skill Required: {minimumSkill}
            </li>
            <li className="list-group-item">
              Scholarship Available:{" "}
              {scholarshipAvailable === true ? (
                <i className="fas fa-check text-success mr-2"></i>
              ) : (
                <i className="fas fa-times text-danger mr-2"></i>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
