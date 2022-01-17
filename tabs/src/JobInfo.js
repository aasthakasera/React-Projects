import React from 'react';
import { FaAngleDoubleRight } from "react-icons/fa";

const JobInfo = (props) => {
    return (
        <div className="job-info">
          <h3>{props.title}</h3>
          <h4>{props.company}</h4>
          <p className="job-date">{props.dates}</p>
          {props.duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </div>
    );
}

export default JobInfo;


